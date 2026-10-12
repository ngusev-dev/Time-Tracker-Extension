import { makeAutoObservable, runInAction } from 'mobx';
import toast from 'react-hot-toast';
import { apolloClient } from '@/shared/api/apollo.client';
import { onSessionReset } from '@/shared/lib/session';
import {
  CreateTaskTypeDocument,
  DeleteTaskTypeDocument,
  GetTaskTypesDocument,
  SetTimerTaskTypeDocument,
  UpdateTaskTypeDocument,
  type GetTaskTypesQuery,
} from '@/shared/api/generated/output';
import { HISTORY_QUERIES, TimerStore } from '@/features/timer/Timer.store';
import { TASK_TYPE_COLORS } from './constants';
import type { TTaskSubtype, TTaskType, TTaskTypeDraft, TTaskTypeSelection } from './types';

const errorMessage = (error: unknown, fallback: string) =>
  error instanceof Error && error.message ? error.message : fallback;

class taskTypeStore {
  types: TTaskType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get selected() {
    return this.find(TimerStore.taskTypeId);
  }

  get nextColor() {
    const used = new Set(this.types.map((type) => type.color));
    return (
      TASK_TYPE_COLORS.find((color) => !used.has(color)) ??
      TASK_TYPE_COLORS[this.types.length % TASK_TYPE_COLORS.length]
    );
  }

  find = (id: string | null | undefined): { type: TTaskType; subtype?: TTaskSubtype } | undefined => {
    if (!id) return;

    for (const type of this.types) {
      if (type.id === id) return { type };

      const subtype = type.children.find((child) => child.id === id);
      if (subtype) return { type, subtype };
    }
  };

  load = async () => {
    try {
      const { data } = await apolloClient.query<GetTaskTypesQuery>({
        query: GetTaskTypesDocument,
        fetchPolicy: 'network-only',
      });

      runInAction(() => {
        this.types = data.taskTypes.map((type) => ({ ...type, color: type.color ?? TASK_TYPE_COLORS[0] }));
      });
    } catch (error) {
      toast.error(errorMessage(error, 'Не удалось загрузить типы задач'), { id: 'task-type-error' });
    }
  };

  select = async (selection: TTaskTypeSelection | null) => {
    const { timerId, taskTypeId: previous } = TimerStore;
    if (!timerId) return;

    const taskTypeId = selection ? (selection.subtypeId ?? selection.typeId) : null;
    TimerStore.setTaskTypeId(taskTypeId);

    try {
      await apolloClient.mutate({
        mutation: SetTimerTaskTypeDocument,
        variables: { timerId, taskTypeId },
        refetchQueries: HISTORY_QUERIES,
      });
    } catch (error) {
      TimerStore.setTaskTypeId(previous);
      toast.error(errorMessage(error, 'Не удалось сохранить тип задачи'), { id: 'task-type-error' });
    }
  };

  save = async (type: TTaskType | undefined, draft: TTaskTypeDraft) => {
    const name = draft.name.trim();
    const children = draft.children
      .map((child) => ({ ...child, name: child.name.trim() }))
      .filter((child) => child.name);

    try {
      let typeId = type?.id;

      if (typeId === undefined) {
        const { data } = await apolloClient.mutate({
          mutation: CreateTaskTypeDocument,
          variables: { input: { name, color: draft.color } },
        });
        typeId = data!.createTaskType.id;
      } else if (name !== type?.name || draft.color !== type?.color) {
        await apolloClient.mutate({
          mutation: UpdateTaskTypeDocument,
          variables: { id: typeId, input: { name, color: draft.color } },
        });
      }

      const parentId = typeId;
      const kept = new Set(children.map((child) => child.id));
      const requests = (type?.children ?? [])
        .filter((child) => !kept.has(child.id))
        .map((child) =>
          apolloClient.mutate({
            mutation: DeleteTaskTypeDocument,
            variables: { id: child.id },
            refetchQueries: HISTORY_QUERIES,
          }),
        );

      for (const child of children) {
        const existing = type?.children.find((x) => x.id === child.id);
        if (!existing) {
          requests.push(
            apolloClient.mutate({
              mutation: CreateTaskTypeDocument,
              variables: { input: { name: child.name, parentId } },
            }),
          );
        } else if (existing.name !== child.name) {
          requests.push(
            apolloClient.mutate({
              mutation: UpdateTaskTypeDocument,
              variables: { id: child.id, input: { name: child.name } },
            }),
          );
        }
      }

      await Promise.all(requests);
      return true;
    } catch (error) {
      toast.error(errorMessage(error, 'Не удалось сохранить тип задачи'), { id: 'task-type-error' });
      return false;
    } finally {
      await this.load();
      this._dropStaleSelection(type?.id ?? null);
    }
  };

  remove = async (id: string) => {
    const found = this.find(id);

    try {
      await apolloClient.mutate({
        mutation: DeleteTaskTypeDocument,
        variables: { id },
        refetchQueries: HISTORY_QUERIES,
      });
      await this.load();
      this._dropStaleSelection(found?.subtype ? found.type.id : null);
      return true;
    } catch (error) {
      toast.error(errorMessage(error, 'Не удалось удалить тип задачи'), { id: 'task-type-error' });
      return false;
    }
  };

  reset = () => {
    this.types = [];
  };

  private _dropStaleSelection(fallbackId: string | null) {
    if (TimerStore.taskTypeId && !this.find(TimerStore.taskTypeId)) TimerStore.setTaskTypeId(fallbackId);
  }
}

export const TaskTypeStore = new taskTypeStore();

onSessionReset(TaskTypeStore.reset);
