export interface EVENT_PAYLOAD {
  type: EVENT_TYPE;
  data: unknown;
}

export const EVENT = {
  LOAD_TIMER_VALUE: 'load_timer_value',
} as const;

export type EVENT_TYPE = (typeof EVENT)[keyof typeof EVENT];
