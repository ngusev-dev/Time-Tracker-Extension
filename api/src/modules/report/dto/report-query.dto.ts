import { Transform, Type } from 'class-transformer';
import { ArrayNotEmpty, IsDate, IsUUID } from 'class-validator';

export class ReportQueryDto {
  @Type(() => Date)
  @IsDate()
  start: Date;

  @Type(() => Date)
  @IsDate()
  end: Date;

  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  typeIds: string[];
}
