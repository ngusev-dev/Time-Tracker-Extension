import { TimerHistoryService } from '@modules/timer-history/timer-history.service';
import { Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';
@Injectable()
export class ReportService {
  constructor(private readonly timerHistoryService: TimerHistoryService) {}

  async excelReport(startPeriod: Date, endPeriod: Date, taskTypeId: string) {
    const rows = await this.timerHistoryService.getHistoryToReport(
      startPeriod,
      endPeriod,
      [taskTypeId],
    );
    const wb = new Workbook();
    const ws = wb.addWorksheet('Отчёт');
    ws.columns = [
      { header: 'Сотрудник', key: 'name', width: 28 },
      { header: 'Email', key: 'email', width: 28 },
      { header: 'Тип задачи', key: 'type', width: 20 },
      { header: 'Подтип', key: 'subtype', width: 20 },
      { header: 'Описание', key: 'description', width: 40 },
      {
        header: 'Начало',
        key: 'start',
        width: 18,
        style: { numFmt: 'dd.mm.yyyy hh:mm' },
      },
      {
        header: 'Конец',
        key: 'end',
        width: 18,
        style: { numFmt: 'dd.mm.yyyy hh:mm' },
      },
      {
        header: 'Время',
        key: 'time',
        width: 12,
        style: { numFmt: '[h]:mm:ss' },
      },
      { header: 'Сессий', key: 'sessions', width: 10 },
    ];
    ws.getRow(1).font = { bold: true };
    ws.views = [{ state: 'frozen', ySplit: 1 }];

    for (const r of rows) {
      const root = r.taskType?.parent ?? r.taskType;
      const sub = r.taskType?.parent ? r.taskType : null;

      ws.addRow({
        name: `${r.user?.lastName ?? ''} ${r.user?.firstName ?? ''}`.trim(),
        email: r.user?.email,
        type: root?.name ?? '—',
        subtype: sub?.name ?? '',
        description: r.description ?? '',
        start: r._min.startTimer,
        end: r._max.endTimer,
        time: (r._sum.totalTimeInSeconds ?? 0) / 86400,
        sessions: r._count._all,
      });
    }
    ws.getColumn('description').alignment = { wrapText: true, vertical: 'top' };

    return Buffer.from(await wb.xlsx.writeBuffer());
  }
}
