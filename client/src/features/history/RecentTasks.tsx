import { useMemo } from 'react';
import { useGetRecentTimerGroupsQuery } from '@/shared/api/generated/output';
import { Skeleton } from '@/shared/ui/Skeleton';
import { groupRecordsByTimerId } from './lib/groupByTask';
import { TaskGroupItem } from './TaskGroupItem';

const RECENT_TASKS_LIMIT = 3;

export function RecentTasks() {
  const { data, loading } = useGetRecentTimerGroupsQuery({
    variables: { limit: RECENT_TASKS_LIMIT },
  });

  const groups = useMemo(
    () => (data?.getRecentTimerGroups ?? []).flatMap((group) => groupRecordsByTimerId(group.records)),
    [data],
  );

  if (loading && !data) {
    return (
      <div className="flex flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>
    );
  }

  if (groups.length === 0) return null;

  return (
    <section className="flex flex-col gap-2">
      <div className="text-sm font-semibold">Последние задачи</div>
      {groups.map((group) => (
        <TaskGroupItem group={group} key={group.timerId} showDate />
      ))}
    </section>
  );
}
