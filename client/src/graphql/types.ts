import type { GetTimerHistoryGroupByDateQuery } from './generated/output';

export type THistoryGroup = GetTimerHistoryGroupByDateQuery['getTimerHistoryGroupByDate'][number];
export type THistoryTimerRecord = THistoryGroup['records'][number];
