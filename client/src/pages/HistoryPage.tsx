import { useQuery } from '@apollo/client/react';
import { GET_TIMER_HISTORY_QUERY, type GET_TIMER_HISTORY_QUERY_RESPONSE } from '../lib/queries/user-timer-statistic';
import { format } from 'date-fns';
import { computeIntervalDuration } from '../lib/helper/time.helper';

export default function HistoryPage() {
  const { data } = useQuery<GET_TIMER_HISTORY_QUERY_RESPONSE>(GET_TIMER_HISTORY_QUERY, {
    variables: { userId: 1, startPeriod: '2025-10-1', endPeriod: '2025-11-31' },
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">📜 История использования таймера</h2>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <div className="space-y-1">
            <div className="flex items-center  sticky top-[-16px] bg-card py-4">
              <div className="text-sm font-medium text-muted-foreground">Сегодня</div>
              <span className="flex-1 h-px bg-border" />
              <div className=" items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground ">
                1 сессия
              </div>
            </div>
            <div className="space-y-2">
              {data?.getByPeriod.map((record) => (
                <div
                  key={record.id}
                  className="p-4 rounded-lg border border-gray-300 bg-card hover:bg-accent/50 transition-colors"
                >
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
                        {/* <div className="flex items-center gap-1">
                          <span>⏸️</span>
                          <span>2 паузы</span>
                        </div> */}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 ">
                        Завершено
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
