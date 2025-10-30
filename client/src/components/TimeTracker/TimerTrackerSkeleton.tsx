import { CardContent } from '../ui/Card';
import Skeleton from '../ui/Skeleton';

export default function TimerTrackerSkeleton() {
  return (
    <CardContent className="w-full flex flex-col gap-4 ">
      <Skeleton className="h-10" />
      <Skeleton className="h-45" />
      <Skeleton className="h-12" />
    </CardContent>
  );
}
