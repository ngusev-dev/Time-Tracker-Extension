import { gql } from '@apollo/client';
import type { TUserTimer } from './user-timer.queries';

export type GET_WEEK_STATISTIC_QUERY_RESPONSE = {
  getWeekStatistic: {
    startPeriod: Date;
    endPeriod: Date;
    length: number;
    history: THistoryItem[];
  };
};

export type THistoryItem = {
  day: string;
  entries: TUserTimer[];
};

export const GET_WEEK_STATISTIC_QUERY = gql`
  query getWeekStatistic($userId: Int!, $weekOffset: Int) {
    getWeekStatistic(userId: $userId, weekOffset: $weekOffset) {
      startPeriod
      endPeriod
      length
      history {
        day
        entries {
          id
          startTimer
          endTimer
          totalTimeInSeconds
          userId
          description
          timerId
        }
      }
    }
  }
`;
