import {
  Controller,
  Get,
  Query,
  Res,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { format } from 'date-fns';
import type { Response } from 'express';
import { ReportQueryDto } from './dto/report-query.dto';
import { AuthGuard } from '@shared/guards/auth.guard';

// @UseGuards(AuthGuard)
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('excel')
  async createExcelReport(
    @Query() query: ReportQueryDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const buf = await this.reportService.excelReport(
      query.start,
      query.end,
      query.typeId,
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
