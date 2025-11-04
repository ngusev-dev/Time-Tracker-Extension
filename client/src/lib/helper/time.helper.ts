import { intervalToDuration } from 'date-fns';

export const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const computeIntervalDuration = (totalTimeInSeconds: number) => {
  const duration = intervalToDuration({ start: 0, end: totalTimeInSeconds * 1000 });

  const parts = [];
  if (duration.days) parts.push(`${duration.days}д`);
  if (duration.hours) parts.push(`${duration.hours}ч`);
  if (duration.minutes) parts.push(`${duration.minutes}м`);
  if (duration.seconds) parts.push(`${duration.seconds}с`);

  return parts.join(' ');
};
