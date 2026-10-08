import { format } from 'date-fns';
import { Clock, User } from 'lucide-react';
import { computeIntervalDuration } from '../../lib/helper/time.helper';
import type { THistoryTimerRecord } from '../../graphql/types';

export default function HistoryItem({ record }: { record: THistoryTimerRecord }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-l-2 border-l-brand bg-card px-3 py-2.5 shadow-xs transition hover:border-brand/30 hover:border-l-brand hover:shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground tabular-nums">
          <Clock className="size-3.5" />
          {format(record.startTimer!, 'HH:mm')} – {format(record.endTimer!, 'HH:mm')}
        </div>
        <div className="rounded-md bg-muted px-2 py-0.5 text-sm font-semibold tabular-nums">
          {computeIntervalDuration(record.totalTimeInSeconds)}
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <User className="size-3.5" />
        {record.user.lastName} {record.user.firstName} {record.user.middleName}
      </div>

      {record.description && <p className="line-clamp-3 whitespace-pre-line text-sm">{record.description}</p>}
    </div>
  );
}
