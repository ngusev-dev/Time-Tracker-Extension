import Skeleton from '../ui/Skeleton';

export default function TimerTrackerSkeleton() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4">
      <Skeleton className="h-5 w-24 rounded-full" />
      <Skeleton className="h-15 w-64" />
      <Skeleton className="h-26 rounded-lg" />
      <Skeleton className="h-10" />
    </div>
  );
}
