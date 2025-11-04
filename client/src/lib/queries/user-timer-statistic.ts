import { gql } from '@apollo/client';
import type { TUserTimer } from './user-timer.queries';

export interface THistoryTimerRecord extends Omit<TUserTimer, 'status'> {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    middleName: string | null;
  };
}

export type THistoryItem = {
  day: string;
  entries: THistoryTimerRecord[];
  general: {
    totalTimeInSeconds: number;
    percent: string;
  };
};

export type THistoryGroup = {
  groupField: string;
  records: THistoryTimerRecord[];
};

export type GET_WEEK_STATISTIC_QUERY_RESPONSE = {
  getWeekStatistic: {
    startPeriod: Date;
    endPeriod: Date;
    length: number;
    history: THistoryItem[];
  };
};

export const GET_WEEK_STATISTIC_QUERY = gql`
  query getWeekStatistic($userId: Int!, $weekOffset: Int) {
    getWeekStatistic(userId: $userId, weekOffset: $weekOffset) {
      startPeriod
      endPeriod
      length
      history {
        day
        general {
          totalTimeInSeconds
          percent
        }
        entries {
          id
          startTimer
          endTimer
          totalTimeInSeconds
          userId
          description
          timerId
          user {
            id
            firstName
            lastName
            middleName
          }
        }
      }
    }
  }
`;

export type GET_TIMER_HISTORY_QUERY_RESPONSE = {
  getByPeriod: THistoryTimerRecord[];
};

export const GET_TIMER_HISTORY_QUERY = gql`
  query getByPeriod($userId: Int!, $startPeriod: DateTime!, $endPeriod: DateTime!) {
    getByPeriod(userId: $userId, startPeriod: $startPeriod, endPeriod: $endPeriod) {
      id
      startTimer
      endTimer
      totalTimeInSeconds
      userId
      description
      timerId
      user {
        id
        firstName
        lastName
        middleName
      }
    }
  }
`;

export type GET_TIMER_HISTORY_GROUP_TIMER_ID_QUERY_RESPONSE = {
  getTimerHistoryGroupByTimerId: THistoryGroup[];
};

export const GET_TIMER_HISTORY_GROUP_TIMER_ID_QUERY = gql`
  query getTimerHistoryGroupByTimerId($userId: Int!, $startPeriod: DateTime!, $endPeriod: DateTime!) {
    getTimerHistoryGroupByTimerId(userId: $userId, startPeriod: $startPeriod, endPeriod: $endPeriod) {
      groupField
      records {
        id
        startTimer
        endTimer
        totalTimeInSeconds
        userId
        description
        timerId
        user {
          id
          firstName
          lastName
          middleName
        }
      }
    }
  }
`;

export type GET_TIMER_HISTORY_GROUP_DATE_QUERY_RESPONSE = {
  getTimerHistoryGroupByDate: THistoryGroup[];
};

export const GET_TIMER_HISTORY_GROUP_DATE_QUERY = gql`
  query getTimerHistoryGroupByDate($userId: Int!, $startPeriod: DateTime!, $endPeriod: DateTime!) {
    getTimerHistoryGroupByDate(userId: $userId, startPeriod: $startPeriod, endPeriod: $endPeriod) {
      groupField
      records {
        id
        startTimer
        endTimer
        totalTimeInSeconds
        userId
        description
        timerId
        user {
          id
          firstName
          lastName
          middleName
        }
      }
    }
  }
`;
