import { format } from 'date-fns';
import type { THistoryGroup } from '../../lib/queries/user-timer-statistic';

export default function TopHistory({ group }: { group: THistoryGroup }) {
  return (
    <div className="flex items-center  sticky top-[-16px] bg-card py-4">
      <div className="text-sm font-medium text-muted-foreground">{format(new Date(+group.groupField), 'dd.MM.yy')}</div>
      <span className="flex-1 h-px bg-border" />
      <div className=" items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground ">
        {group.records.length} сессия
      </div>
    </div>
  );
}
