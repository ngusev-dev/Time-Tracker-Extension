import { endOfQuarter, setQuarter, startOfQuarter } from 'date-fns';

export type TPeriod = { start: Date; end: Date };

const QUARTER_TITLES = ['I квартал', 'II квартал', 'III квартал', 'IV квартал'];

/** Кварталы текущего года */
export const PERIOD_PRESETS: { id: string; title: string; get: (now: Date) => TPeriod }[] = QUARTER_TITLES.map(
  (title, index) => ({
    id: `q${index + 1}`,
    title,
    get: (now) => {
      const date = setQuarter(now, index + 1);
      return { start: startOfQuarter(date), end: endOfQuarter(date) };
    },
  }),
);

export const currentQuarter = (now: Date): TPeriod => ({ start: startOfQuarter(now), end: endOfQuarter(now) });
