/**
 * Возвращаем интервал в секундах
 * @param startTimer
 * @param endTimer
 * @returns
 */
export const computedIntervalInSeconds = (startTimer: Date, endTimer: Date) =>
  Math.floor((endTimer.getTime() - startTimer.getTime()) / 1000);
