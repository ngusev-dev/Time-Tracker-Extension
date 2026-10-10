import { autorun, makeAutoObservable } from 'mobx';
import { TimerStore } from '@/features/timer/Timer.store';
import { onSessionReset } from '@/shared/lib/session';
import { MOCK_TASK_TYPES, TASK_TYPE_COLORS, TASK_TYPE_STORAGE_KEY } from './constants';
import type { TTaskSubtype, TTaskType, TTaskTypeSelection } from './types';

type TPersistedState = {
  types: TTaskType[];
  assignments: Record<string, TTaskTypeSelection>;
};

/**
 * Типы задач пока живут только на клиенте (моки + localStorage).
 */
class taskTypeStore {
  types: TTaskType[] = structuredClone(MOCK_TASK_TYPES);
  /** Тип, привязанный к задаче: timerId -> выбранный тип и подтип */
  assignments: Record<string, TTaskTypeSelection> = {};

  constructor() {
    makeAutoObservable(this);
    this._restore();
    autorun(() => this._persist(JSON.stringify({ types: this.types, assignments: this.assignments })));
  }

  /** Тип и подтип текущей задачи таймера */
  get selected() {
    return this.getByTimerId(TimerStore.timerId);
  }

  getById = (id: string | null | undefined) => (id ? this.types.find((type) => type.id === id) : undefined);

  getByTimerId = (timerId: string | null | undefined) => {
    const selection = timerId ? this.assignments[timerId] : undefined;
    const type = this.getById(selection?.typeId);
    if (!type) return undefined;

    const subtype = type.children.find((child) => child.id === selection?.subtypeId);
    return { type, subtype };
  };

  /** Цвет для нового типа — первый ещё не занятый из палитры */
  get nextColor() {
    const used = new Set(this.types.map((type) => type.color));
    return (
      TASK_TYPE_COLORS.find((color) => !used.has(color)) ??
      TASK_TYPE_COLORS[this.types.length % TASK_TYPE_COLORS.length]
    );
  }

  select = (selection: TTaskTypeSelection | null) => {
    const { timerId } = TimerStore;
    if (!timerId) return;

    if (selection) this.assignments[timerId] = selection;
    else delete this.assignments[timerId];
  };

  create = ({ name, color, children }: Omit<TTaskType, 'id'>) => {
    const type: TTaskType = {
      id: crypto.randomUUID(),
      name: name.trim(),
      color,
      children: children.map((child) => ({ ...child, name: child.name.trim() })),
    };
    this.types.push(type);
    return type;
  };

  update = (id: string, patch: Partial<Omit<TTaskType, 'id'>>) => {
    const type = this.getById(id);
    if (!type) return;

    if (patch.name !== undefined) type.name = patch.name.trim();
    if (patch.color !== undefined) type.color = patch.color;
    if (patch.children !== undefined) {
      type.children = patch.children.map((child) => ({ ...child, name: child.name.trim() }));
      this._dropMissingSubtypes(type);
    }
  };

  remove = (id: string) => {
    this.types = this.types.filter((type) => type.id !== id);

    for (const [timerId, selection] of Object.entries(this.assignments)) {
      if (selection.typeId === id) delete this.assignments[timerId];
    }
  };

  reset = () => {
    this.types = structuredClone(MOCK_TASK_TYPES);
    this.assignments = {};
  };

  /** Задачи с удалённым подтипом остаются привязанными к родительскому типу */
  private _dropMissingSubtypes(type: TTaskType) {
    const ids = new Set(type.children.map((child) => child.id));

    for (const selection of Object.values(this.assignments)) {
      if (selection.typeId === type.id && selection.subtypeId && !ids.has(selection.subtypeId)) {
        delete selection.subtypeId;
      }
    }
  }

  private _restore() {
    try {
      const raw = localStorage.getItem(TASK_TYPE_STORAGE_KEY);
      if (!raw) return;

      const state = JSON.parse(raw) as Partial<TPersistedState>;
      if (Array.isArray(state.types)) {
        this.types = state.types.map((type) => ({ ...type, children: type.children ?? ([] as TTaskSubtype[]) }));
      }
      if (state.assignments) this.assignments = state.assignments;
    } catch {
      // повреждённые или недоступные данные — остаёмся на моках
    }
  }

  private _persist(serialized: string) {
    try {
      localStorage.setItem(TASK_TYPE_STORAGE_KEY, serialized);
    } catch {
      // хранилище недоступно — данные проживут до перезагрузки
    }
  }
}

export const TaskTypeStore = new taskTypeStore();

onSessionReset(TaskTypeStore.reset);
