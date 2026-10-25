import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { format, isSameDay, isToday, isYesterday, subHours } from 'date-fns';
import { ru } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { useCreateManualSessionMutation } from '@/shared/api/generated/output';
import { HISTORY_QUERIES } from '@/features/timer/Timer.store';
import { TaskTypePicker } from '@/features/task-type';
import { Button } from '@/shared/ui/Button';
import { FieldError, FieldLabel } from '@/shared/ui/Field';
import { Input } from '@/shared/ui/Input';
import { formatTime } from '@/shared/lib/time';
import { cn } from '@/shared/lib/utils';

/** Совпадает с ограничением на сервере */
const MAX_SESSION_SECONDS = 24 * 60 * 60;

/** Списки, в которых появится новая сессия */
const SESSION_QUERIES = [...HISTORY_QUERIES, 'GetPeriodStatistic', 'GetWeekStatistic'];

type TManualSessionForm = {
  start: string;
  end: string;
  description: string;
  taskTypeId: string | null;
};

const toInputValue = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm");

const toSeconds = (start: string, end: string) =>
  Math.floor((new Date(end).getTime() - new Date(start).getTime()) / 1000);

const dayLabel = (date: Date) => {
  if (isToday(date)) return 'сегодня';
  if (isYesterday(date)) return 'вчера';
  return format(date, 'd MMMM', { locale: ru });
};

const intervalLabel = (startDate: Date, endDate: Date) => {
  if (isSameDay(startDate, endDate)) {
    return `${dayLabel(startDate)}, ${format(startDate, 'HH:mm')} – ${format(endDate, 'HH:mm')}`;
  }

  return `${dayLabel(startDate)}, ${format(startDate, 'HH:mm')} – ${dayLabel(endDate)}, ${format(endDate, 'HH:mm')}`;
};

const getDefaultValues = (): TManualSessionForm => {
  const end = new Date();
  end.setSeconds(0, 0);

  return {
    start: toInputValue(subHours(end, 1)),
    end: toInputValue(end),
    description: '',
    taskTypeId: null,
  };
};

export function ManualSessionForm() {
  const navigate = useNavigate();
  const [createManualSession, { loading }] = useCreateManualSessionMutation();

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TManualSessionForm>({
    mode: 'onChange',
    defaultValues: getDefaultValues(),
  });

  const [start, end] = watch(['start', 'end']);
  const isValidRange = Boolean(start && end) && !errors.start && !errors.end;
  const seconds = isValidRange ? toSeconds(start, end) : 0;

  const onSubmit = async (values: TManualSessionForm) => {
    try {
      await createManualSession({
        variables: {
          input: {
            startTimer: new Date(values.start),
            endTimer: new Date(values.end),
            description: values.description.trim() || null,
            taskTypeId: values.taskTypeId,
          },
        },
        refetchQueries: SESSION_QUERIES,
      });

      toast.success('Сессия добавлена', { id: 'manual-session' });
      await navigate(-1);
    } catch (error) {
      toast.error(error instanceof Error && error.message ? error.message : 'Не удалось добавить сессию', {
        id: 'manual-session',
      });
    }
  };

  return (
    <form className="mx-auto flex w-full max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col items-center gap-1 py-2">
        <div
          className={cn('font-mono text-5xl font-light tracking-tight tabular-nums text-muted-foreground', {
            'text-muted-foreground/40': !isValidRange,
          })}
          aria-live="polite"
        >
          {formatTime(Math.max(0, seconds))}
        </div>
        <div className="h-4 text-xs text-muted-foreground">
          {isValidRange && intervalLabel(new Date(start), new Date(end))}
        </div>
      </div>

      <div className="grid gap-2">
        <FieldLabel htmlFor="session-start">Начало</FieldLabel>
        <Input
          id="session-start"
          type="datetime-local"
          max={toInputValue(new Date())}
          aria-invalid={Boolean(errors.start)}
          {...register('start', { required: 'Укажите время начала', deps: ['end'] })}
        />
        <FieldError errors={[errors.start]} />
      </div>

      <div className="grid gap-2">
        <FieldLabel htmlFor="session-end">Конец</FieldLabel>
        <Input
          id="session-end"
          type="datetime-local"
          max={toInputValue(new Date())}
          aria-invalid={Boolean(errors.end)}
          {...register('end', {
            required: 'Укажите время окончания',
            validate: (value, values) => {
              if (!values.start) return true;
              const duration = toSeconds(values.start, value);
              if (duration <= 0) return 'Время окончания должно быть позже начала';
              if (new Date(value) > new Date()) return 'Нельзя внести сессию на будущее';
              if (duration > MAX_SESSION_SECONDS) return 'Сессия не может быть длиннее 24 часов';
              return true;
            },
          })}
        />
        <FieldError errors={[errors.end]} />
      </div>

      <textarea
        {...register('description')}
        className="resize-none rounded-lg border bg-card p-3 text-sm shadow-xs outline-none transition placeholder:text-muted-foreground focus-visible:border-brand/50 focus-visible:ring-[3px] focus-visible:ring-brand/15"
        placeholder="Над чем работали?"
        aria-label="Описание"
        rows={2}
      />

      <Controller
        control={control}
        name="taskTypeId"
        render={({ field }) => (
          <TaskTypePicker
            value={field.value}
            onChange={(selection) => field.onChange(selection ? (selection.subtypeId ?? selection.typeId) : null)}
          />
        )}
      />

      <div className="flex w-full gap-2">
        <Button type="button" size="lg" variant="outline" className="flex-1" onClick={() => navigate(-1)}>
          Отмена
        </Button>
        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="flex-1 bg-brand text-brand-foreground hover:bg-brand/90"
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
}
