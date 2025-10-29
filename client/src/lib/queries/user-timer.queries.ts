import { gql } from '@apollo/client';

export type TUserTimer = {
  getTimer: {
    id: number;
    startTimer: Date | null;
    endTimer: Date | null;
    totalTimeInSeconds: number;
    status: 'WORKING' | 'NEW' | 'PAUSE';
  };
};

export const GET_TIMER_QUERY = gql`
  query getTimer($userId: Int!) {
    getTimer(userId: $userId) {
      id
      startTimer
      totalTimeInSeconds
      status
    }
  }
`;
