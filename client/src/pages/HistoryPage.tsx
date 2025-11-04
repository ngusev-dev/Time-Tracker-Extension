export default function HistoryPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">📜 История использования таймера</h2>
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 sticky top-0 bg-card py-2">
              <div className="text-sm font-medium text-muted-foreground">Сегодня</div>
              <span className="flex-1 h-px bg-border" />
              <div className=" items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground ">
                1 сессия
              </div>
            </div>
            <div className="space-y-2">
              <div className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="font-medium">Дмитрий Иванов</div>
                      <div className="text-sm text-muted-foreground">•</div>
                      <div className="text-sm">Планирование проекта</div>
                      <div className="text-sm text-muted-foreground">•</div>
                      <div className="text-sm text-muted-foreground">Документация</div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span>🕐</span>
                        <span>10:23 - 11:02</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>⏱️</span>
                        <span className="font-medium text-foreground">1ч 39м</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>⏸️</span>
                        <span>2 паузы</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 ">
                      Завершено
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
