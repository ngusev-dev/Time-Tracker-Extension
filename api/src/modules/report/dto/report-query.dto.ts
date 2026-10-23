import { Type } from 'class-transformer';
import { IsDate, IsUUID } from 'class-validator';

export class ReportQueryDto {
  @Type(() => Date)
  @IsDate()
  start: Date;

  @Type(() => Date)
  @IsDate()
  end: Date;

  @IsUUID()
  typeId: string;
}
