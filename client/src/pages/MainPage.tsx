import { RecentTasks } from '@/features/history';
import { TimeTracker } from '@/features/timer';

export function MainPage() {
  return (
    <div className="flex h-full flex-col gap-6">
      <TimeTracker />
      <div className="mx-auto w-full max-w-md">
        <RecentTasks />
      </div>
    </div>
  );
}
