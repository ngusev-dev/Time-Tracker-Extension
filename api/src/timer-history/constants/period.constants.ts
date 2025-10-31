import { registerEnumType } from '@nestjs/graphql';

export const PERIOD = {
  DAY: 'DAY',
  WEEK: 'WEEK',
  MONTH: 'MONTH',
};

registerEnumType(PERIOD, {
  name: 'PERIOD',
  description: 'Allowed values for periods',
});
