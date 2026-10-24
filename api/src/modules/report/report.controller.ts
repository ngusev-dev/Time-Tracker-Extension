import {
  Controller,
  Get,
  Query,
  Res,
  StreamableFile,
  ValidationPipe,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { format } from 'date-fns';
import type { Response } from 'express';
import { ReportQueryDto } from './dto/report-query.dto';

import { Protected } from '@shared/decorators/protected.decorator';

@Protected('ADMIN')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('excel')
  async createExcelReport(
    @Query(new ValidationPipe({ transform: true })) query: ReportQueryDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const buf = await this.reportService.excelReport(
      query.start,
      query.end,
      query.typeIds,
    );

    const name = `report_${format(query.start, 'yyyy-MM-dd')}.xlsx`;
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${name}"`,
    });
    return new StreamableFile(buf);
  }
}
