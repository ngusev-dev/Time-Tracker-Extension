import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { format, isSameDay, isValid, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Download, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { cn } from '@/shared/lib/utils';
import { downloadExcelReport } from './lib/downloadExcelReport';
import { currentQuarter, PERIOD_PRESETS, type TPeriod } from './lib/periodPresets';
import { ReportTypeSelect } from './ReportTypeSelect';

const toInputValue = (date: Date) => format(date, 'yyyy-MM-dd');

const labelClassName = 'text-xs font-medium text-muted-foreground';

export const ReportExport = observer(() => {
  const [period, setPeriod] = useState<TPeriod>(() => currentQuarter(new Date()));
  const [typeIds, setTypeIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isPeriodValid = period.start <= period.end;
  const activePresetId = PERIOD_PRESETS.find((preset) => {
    const presetPeriod = preset.get(new Date());
    return isSameDay(presetPeriod.start, period.start) && isSameDay(presetPeriod.end, period.end);
  })?.id;

  const setDate = (key: keyof TPeriod, value: string) => {
    const date = parseISO(value);
    if (isValid(date)) setPeriod((prev) => ({ ...prev, [key]: date }));
  };

  const handleDownload = async () => {
    if (!typeIds.length || !isPeriodValid) return;

    setIsLoading(true);
    try {
      await downloadExcelReport({ ...period, typeIds });
      toast.success('Отчёт скачан', { id: 'report-success', duration: 2000 });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Не удалось скачать отчёт', { id: 'report-error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-2">
          <span className={labelClassName}>Период</span>
          {isPeriodValid && (
            <span className="text-xs text-muted-foreground tabular-nums">
              {format(period.start, 'd MMM', { locale: ru })} – {format(period.end, 'd MMM yyyy', { locale: ru })}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {PERIOD_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              aria-pressed={activePresetId === preset.id}
              onClick={() => setPeriod(preset.get(new Date()))}
              className={cn(
                'h-7 cursor-pointer rounded-full border bg-card px-3 text-xs font-medium text-muted-foreground transition outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-brand/15',
                { 'border-brand/40 bg-brand-soft text-brand hover:text-brand': activePresetId === preset.id },
              )}
            >
              {preset.title}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <label className="flex flex-col gap-1">
            <span className="sr-only">Начало периода</span>
            <Input
              type="date"
              value={toInputValue(period.start)}
              onChange={(e) => setDate('start', e.target.value)}
              aria-invalid={!isPeriodValid}
              className="bg-card tabular-nums"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="sr-only">Конец периода</span>
            <Input
              type="date"
              value={toInputValue(period.end)}
              onChange={(e) => setDate('end', e.target.value)}
              aria-invalid={!isPeriodValid}
              className="bg-card tabular-nums"
            />
          </label>
        </div>
        {!isPeriodValid && (
          <p role="alert" className="text-xs text-destructive">
            Дата начала позже даты конца — поменяйте их местами
          </p>
        )}
      </section>

      <section className="flex flex-col gap-2">
        <label htmlFor="report-type" className={labelClassName}>
          Типы задач
        </label>
        <ReportTypeSelect id="report-type" value={typeIds} onChange={setTypeIds} />
      </section>

      <Button
        className="bg-brand text-brand-foreground hover:bg-brand/90"
        disabled={!typeIds.length ||!isPeriodValid || isLoading}
        onClick={handleDownload}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : <Download />}
        {isLoading ? 'Готовим файл…' : 'Скачать отчёт'}
      </Button>
    </div>
  );
});
