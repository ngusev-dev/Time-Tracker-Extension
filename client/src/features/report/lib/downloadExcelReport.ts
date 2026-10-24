import { format } from 'date-fns';
import { notifyUnauthorized } from '@/shared/api/apollo.client';

export type TReportParams = {
  start: Date;
  end: Date;
  typeIds: string[];
};

export const reportFileName = (start: Date) => `report_${format(start, 'yyyy-MM-dd')}.xlsx`;

const fileNameFromHeader = (header: string | null) => header?.match(/filename="?([^";]+)"?/)?.[1];

const errorFromResponse = async (response: Response) => {
  if (response.status === 401) {
    notifyUnauthorized();
    return 'Сессия истекла, войдите снова';
  }

  try {
    const body: { message?: string | string[] } = await response.json();
    const message = Array.isArray(body.message) ? body.message[0] : body.message;
    if (message) return message;
  } catch {
    /* empty */
  }

  return `Сервер не отдал отчёт (код ${response.status})`;
};

export const downloadExcelReport = async ({ start, end, typeIds }: TReportParams) => {
  const params = new URLSearchParams({
    start: format(start, 'yyyy-MM-dd'),
    end: format(end, 'yyyy-MM-dd'),
  });
  for (const typeId of typeIds) params.append('typeIds', typeId);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/report/excel?${params}`, {
    credentials: 'include',
  });
  if (!response.ok) throw new Error(await errorFromResponse(response));

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileNameFromHeader(response.headers.get('Content-Disposition')) ?? reportFileName(start);
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
};
