import { useQuery } from '@apollo/client/react';
import {
  GET_TIMER_HISTORY_GROUP_DATE_QUERY,
  type GET_TIMER_HISTORY_GROUP_DATE_QUERY_RESPONSE,
} from '../../lib/queries/user-timer-statistic';
import HistoryItem from '../../components/HistoryItem/HistoryItem';
import TopHistory from './TopHistory';
import { endOfMonth, format, startOfMonth, subMonths } from 'date-fns';
import { Fragment, useState } from 'react';
import ControlButton from '../../components/widgets/DaysStatistic/ControlButton';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';

export default function HistoryPage() {
  const [monthOffset, setMonthOffset] = useState(0);

  const startPeriod = () => startOfMonth(subMonths(new Date(), monthOffset));
  const endPeriod = () => endOfMonth(subMonths(new Date(), monthOffset));

  const { data } = useQuery<GET_TIMER_HISTORY_GROUP_DATE_QUERY_RESPONSE>(GET_TIMER_HISTORY_GROUP_DATE_QUERY, {
    variables: {
      userId: 1,
      startPeriod: startPeriod(),
      endPeriod: endPeriod(),
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col items-center justify-between gap-4">
        <h2 className="text-xl font-bold ">📜 История использования таймера</h2>
        <div className="text-base text-gray-600 flex gap-2">
          <ControlButton onClick={() => setMonthOffset((prev) => prev + 1)}>
            <ArrowBigLeft size={20} fill="black" />
          </ControlButton>

          <div className="w-40 flex justify-center">
            {format(startPeriod(), 'dd.MM.yyyy')}-{format(endPeriod(), 'dd.MM.yyyy')}
          </div>

          <ControlButton onClick={() => setMonthOffset((prev) => prev - 1)}>
            <ArrowBigRight size={20} fill="black" />
          </ControlButton>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {data?.getTimerHistoryGroupByDate.map((group) => (
          <Fragment key={group.groupField}>
            <TopHistory group={group} />

            <div className="space-y-2">
              {group.records.map((record) => (
                <HistoryItem record={record} key={record.id} />
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
