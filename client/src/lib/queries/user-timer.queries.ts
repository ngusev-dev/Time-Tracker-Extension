import { gql } from '@apollo/client';

export type TUserTimer = {
  id: number;
  startTimer: Date | null;
  endTimer: Date | null;
  totalTimeInSeconds: number;
  status: 'WORKING' | 'NEW' | 'PAUSE';
  timerId: string;
  description: string | null;
};

export type GET_TIMER_QUERY_RESPONSE = {
  getTimer: TUserTimer;
};

export const GET_TIMER_QUERY = gql`
  query getTimer($userId: Int!) {
    getTimer(userId: $userId) {
      id
      startTimer
      endTimer
      totalTimeInSeconds
      status
      description
      timerId
    }
  }
`;

export type START_TIMER_QUERY_RESPONSE = {
  startTimer: TUserTimer;
};

export const START_TIMER_MUTATION = gql`
  mutation startTimer($userId: Int!, $description: String) {
    startTimer(userId: $userId, description: $description) {
      id
      startTimer
      endTimer
      totalTimeInSeconds
      status
      description
      timerId
    }
  }
`;

export type STOP_TIMER_QUERY_RESPONSE = {
  stopTimer: TUserTimer;
};

export const STOP_TIMER_MUTATION = gql`
  mutation stopTimer($userId: Int!, $description: String) {
    stopTimer(userId: $userId, description: $description) {
      id
      startTimer
      endTimer
      totalTimeInSeconds
      status
      description
      timerId
    }
  }
`;

export type PAUSE_TIMER_QUERY_RESPONSE = {
  pauseTimer: TUserTimer;
};

export const PAUSE_TIMER_MUTATION = gql`
  mutation pauseTimer($userId: Int!, $description: String) {
    pauseTimer(userId: $userId, description: $description) {
      id
      startTimer
      endTimer
      totalTimeInSeconds
      status
      description
      timerId
    }
  }
`;
