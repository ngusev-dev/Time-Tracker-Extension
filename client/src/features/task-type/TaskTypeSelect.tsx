import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { Check, ChevronDown, Tag, X } from 'lucide-react';
import { TimerStore } from '@/features/timer/Timer.store';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/shared/ui/Command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/Popover';
import { cn } from '@/shared/lib/utils';
import { TaskTypeStore } from './TaskType.store';
import { TaskTypeDot } from './TaskTypeDot';
import { TaskTypeLabel } from './TaskTypeLabel';
import { buildTypeRows, subtypeRowValue, typeRowValue, type TExpandedState } from './lib/buildTypeRows';
import type { TTaskTypeSelection } from './types';

type RowActionProps = {
  title: string;
  onClick: () => void;
  className?: string;
  children: ReactNode;
};

/** Кнопка внутри строки списка, клик по которой не выбирает саму строку */
function RowAction({ title, onClick, className, children }: RowActionProps) {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      type="button"
      title={title}
      className={cn(
        '-my-1 inline-flex h-6 min-w-6 cursor-pointer items-center justify-center gap-0.5 rounded-sm px-1 text-xs text-muted-foreground transition hover:bg-background hover:text-foreground',
        className,
      )}
      onPointerDown={(e) => e.stopPropagation()}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

export const TaskTypeSelect = observer(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<TExpandedState>({});
  const [activeValue, setActiveValue] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  const { types, selected } = TaskTypeStore;

  const rows = buildTypeRows(types, search, expanded);
  const activeRow = rows.find((row) => row.value === activeValue);

  // При открытии прокручиваем список к выбранному значению
  useEffect(() => {
    if (!isOpen) return;

    const frame = requestAnimationFrame(() => {
      listRef.current?.querySelector('[cmdk-item][data-selected="true"]')?.scrollIntoView({ block: 'nearest' });
    });
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    setSearch('');

    if (open) {
      setExpanded(selected?.subtype ? { [selected.type.id]: true } : {});
      setActiveValue(
        selected
          ? selected.subtype
            ? subtypeRowValue(selected.subtype.id)
            : typeRowValue(selected.type.id)
          : (rows[0]?.value ?? ''),
      );
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setExpanded({});
    setActiveValue(buildTypeRows(types, value, {})[0]?.value ?? '');
  };

  const handleSelect = (selection: TTaskTypeSelection) => {
    TaskTypeStore.select(selection);
    handleOpenChange(false);
  };

  const setTypeExpanded = (typeId: string, isExpanded: boolean) => {
    setExpanded((prev) => ({ ...prev, [typeId]: isExpanded }));

    // Свернули родителя активного подтипа — подсветка переходит на родителя
    if (!isExpanded && activeRow?.kind === 'subtype' && activeRow.type.id === typeId) {
      setActiveValue(typeRowValue(typeId));
    }
  };

  // ← / → сворачивают и раскрывают тип под курсором
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!activeRow) return;

    if (
      e.key === 'ArrowRight' &&
      activeRow.kind === 'type' &&
      !activeRow.isExpanded &&
      activeRow.type.children.length
    ) {
      e.preventDefault();
      setTypeExpanded(activeRow.type.id, true);
    }

    if (e.key === 'ArrowLeft' && (activeRow.kind === 'subtype' || activeRow.isExpanded)) {
      e.preventDefault();
      setTypeExpanded(activeRow.type.id, false);
    }
  };

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <button
            type="button"
            disabled={!TimerStore.timerId}
            className={cn(
              'flex h-11.5 w-full cursor-pointer items-center gap-2 rounded-lg border bg-card px-3 text-left text-sm shadow-xs transition outline-none focus-visible:border-brand/50 focus-visible:ring-[3px] focus-visible:ring-brand/15 disabled:cursor-not-allowed disabled:opacity-50',
              { 'border-brand/50 ring-[3px] ring-brand/15': isOpen, 'pr-14': selected },
            )}
          >
            {selected ? (
              <TaskTypeLabel {...selected} className="flex-1" />
            ) : (
              <>
                <Tag className="size-4 text-muted-foreground" />
                <span className="flex-1 truncate text-muted-foreground">Выберите тип задачи</span>
              </>
            )}
            <ChevronDown
              className={cn('absolute right-3 size-4 text-muted-foreground transition-transform', {
                'rotate-180': isOpen,
              })}
            />
          </button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-(--radix-popover-trigger-width) p-0">
          <Command shouldFilter={false} value={activeValue} onValueChange={setActiveValue} onKeyDown={handleKeyDown}>
            <CommandInput placeholder="Поиск типа…" value={search} onValueChange={handleSearchChange} />
            {/* Список скроллится и не вылезает за границы окна расширения при большом количестве типов */}
            <CommandList
              ref={listRef}
              className="max-h-[min(24rem,calc(var(--radix-popover-content-available-height)-2.5rem))]"
            >
              <CommandEmpty>Ничего не найдено</CommandEmpty>

              {rows.length > 0 && (
                <CommandGroup>
                  {rows.map((row) =>
                    row.kind === 'type' ? (
                      <CommandItem
                        key={row.value}
                        value={row.value}
                        onSelect={() => handleSelect({ typeId: row.type.id })}
                        className="py-2"
                      >
                        <TaskTypeDot color={row.type.color} />
                        <span className="flex-1 truncate">{row.type.name}</span>
                        {selected?.type.id === row.type.id && !selected.subtype && <Check className="text-brand" />}
                        {row.type.children.length > 0 && (
                          <RowAction
                            title={row.isExpanded ? 'Свернуть' : 'Показать подтипы'}
                            className="-mr-1 tabular-nums"
                            onClick={() => setTypeExpanded(row.type.id, !row.isExpanded)}
                          >
                            {row.type.children.length}
                            <ChevronDown
                              className={cn('size-3.5 transition-transform', { 'rotate-180': row.isExpanded })}
                            />
                          </RowAction>
                        )}
                      </CommandItem>
                    ) : (
                      <CommandItem
                        key={row.value}
                        value={row.value}
                        onSelect={() => handleSelect({ typeId: row.type.id, subtypeId: row.subtype.id })}
                        className="py-2 pl-[1.625rem]"
                      >
                        <span className="h-4 w-px shrink-0" style={{ backgroundColor: row.type.color }} />
                        <span className="flex-1 truncate">{row.subtype.name}</span>
                        {selected?.subtype?.id === row.subtype.id && <Check className="text-brand" />}
                      </CommandItem>
                    ),
                  )}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selected && (
        <button
          type="button"
          title="Убрать тип"
          onClick={() => TaskTypeStore.select(null)}
          className="absolute top-1/2 right-8 inline-flex size-5 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <X className="size-3" />
        </button>
      )}
    </div>
  );
});
