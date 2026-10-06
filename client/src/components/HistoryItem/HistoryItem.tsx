import { format } from 'date-fns';
import { computeIntervalDuration } from '../../lib/helper/time.helper';
import type { THistoryTimerRecord } from '../../graphql/types';

export default function HistoryItem({ record }: { record: THistoryTimerRecord }) {
  return (
    <div key={record.id} className="p-4 rounded-lg border border-gray-300 bg-card hover:bg-accent/50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="font-medium">
              {record.user.lastName} {record.user.firstName} {record.user.middleName}
            </div>

            {/* <div className="text-sm text-muted-foreground">•</div>
                          <div className="text-sm">Планирование проекта</div>
                          <div className="text-sm text-muted-foreground">•</div>
                          <div className="text-sm text-muted-foreground">Документация</div> */}
          </div>
          <div className="flex flex-col text-sm space-y-2">
            {record.description && (
              <p className="text-muted-foreground text-xs whitespace-pre-line line-clamp-3"> {record.description}</p>
            )}

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span>🕐</span>
                <span>
                  {format(record.startTimer!, 'HH:mm')}-{format(record.endTimer!, 'HH:mm')}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>⏱️</span>
                <span className="font-medium text-foreground">
                  {computeIntervalDuration(record.totalTimeInSeconds)}
                </span>
              </div>
            </div>

            {/* <div className="flex items-center gap-1">
                            <span>⏸️</span>
                            <span>2 паузы</span>
                          </div> */}
          </div>
        </div>
        {/* <div className="flex items-center gap-2">
                          <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 ">
                            Завершено
                          </div>
                        </div> */}
      </div>
    </div>
  );
}
