import type { GetTimerHistoryGroupByDateQuery } from '@/shared/api/generated/output';

export type THistoryGroup = GetTimerHistoryGroupByDateQuery['getTimerHistoryGroupByDate'][number];
export type THistoryTimerRecord = THistoryGroup['records'][number];
