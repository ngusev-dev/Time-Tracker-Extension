export interface EVENT_PAYLOAD {
  type: EVENT_TYPE;
  data: unknown;
}

export const EVENT = {
  CLOSE_EXTENSION: 'close_extension',
} as const;

export type EVENT_TYPE = (typeof EVENT)[keyof typeof EVENT];
