import type { THistoryTimerRecord } from '../types';

export type TTaskGroup = {
  timerId: string;
  records: THistoryTimerRecord[];
  totalSeconds: number;
  latest: THistoryTimerRecord;
};

/** Сворачивает сессии с одинаковым timerId в одну задачу, сохраняя порядок записей */
export const groupRecordsByTimerId = (records: THistoryTimerRecord[]): TTaskGroup[] => {
  const groups = new Map<string, TTaskGroup>();

  for (const record of records) {
    const group = groups.get(record.timerId);

    if (group) {
      group.records.push(record);
      group.totalSeconds += record.totalTimeInSeconds;
    } else {
      groups.set(record.timerId, {
        timerId: record.timerId,
        records: [record],
        totalSeconds: record.totalTimeInSeconds,
        latest: record,
      });
    }
  }

  return [...groups.values()];
};
