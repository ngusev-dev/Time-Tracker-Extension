import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Check, ChevronDown, Minus, Tag, X } from 'lucide-react';
import { TaskTypeStore } from '@/features/task-type';
import type { TTaskSubtype, TTaskType } from '@/features/task-type/types';
import { TaskTypeDot } from '@/features/task-type/TaskTypeDot';
import { TaskTypeLabel } from '@/features/task-type/TaskTypeLabel';
import { buildTypeRows } from '@/features/task-type/lib/buildTypeRows';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/shared/ui/Command';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/Popover';
import { pluralize } from '@/shared/lib/plural';
import { cn } from '@/shared/lib/utils';

type Props = {
  id?: string;
  value: string[];
  onChange: (typeIds: string[]) => void;
};

type TCheckedState = boolean | 'indeterminate';

function Checkbox({ checked }: { checked: TCheckedState }) {
  return (
    <span
      className={cn('flex size-4 shrink-0 items-center justify-center rounded-[4px] border bg-card transition', {
        'border-brand bg-brand text-brand-foreground': checked,
      })}
    >
      {checked === 'indeterminate' ? (
        <Minus className="size-3 text-current" />
      ) : (
        checked && <Check className="size-3 text-current" />
      )}
    </span>
  );
}

/** Сам тип и все его подтипы — выбираются вместе */
const familyIds = (type: TTaskType) => [type.id, ...type.children.map((child) => child.id)];

type TChip = { key: string; found: { type: TTaskType; subtype?: TTaskSubtype }; onRemove: () => void };

export const ReportTypeSelect = observer(({ id, value, onChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const { types } = TaskTypeStore;
  const selectedIds = new Set(value);
  const expandAll = search ? {} : Object.fromEntries(types.map((type) => [type.id, true]));
  const rows = buildTypeRows(types, search, expandAll);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    setSearch('');
  };

  const toggle = (typeId: string) =>
    onChange(selectedIds.has(typeId) ? value.filter((x) => x !== typeId) : [...value, typeId]);

  const typeState = (type: TTaskType): TCheckedState => {
    const selectedCount = familyIds(type).filter((x) => selectedIds.has(x)).length;
    if (!selectedCount) return false;
    return selectedCount === type.children.length + 1 ? true : 'indeterminate';
  };

  const toggleType = (type: TTaskType) => {
    const ids = familyIds(type);
    if (typeState(type) === true) {
      onChange(value.filter((x) => !ids.includes(x)));
    } else {
      onChange([...value, ...ids.filter((x) => !selectedIds.has(x))]);
    }
  };

  const chips = types.flatMap((type): TChip[] => {
    if (typeState(type) === true) return [{ key: type.id, found: { type }, onRemove: () => toggleType(type) }];

    const chosen: TChip[] = selectedIds.has(type.id)
      ? [{ key: type.id, found: { type }, onRemove: () => toggle(type.id) }]
      : [];
    for (const subtype of type.children) {
      if (selectedIds.has(subtype.id)) {
        chosen.push({ key: subtype.id, found: { type, subtype }, onRemove: () => toggle(subtype.id) });
      }
    }
    return chosen;
  });

  return (
    <div className="flex flex-col gap-2">
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <button
            id={id}
            type="button"
            className={cn(
              'relative flex h-10 w-full cursor-pointer items-center gap-2 rounded-lg border bg-card pr-9 pl-3 text-left text-sm shadow-xs transition outline-none focus-visible:border-brand/50 focus-visible:ring-[3px] focus-visible:ring-brand/15',
              { 'border-brand/50 ring-[3px] ring-brand/15': isOpen },
            )}
          >
            <Tag className="size-4 text-muted-foreground" />
            <span className={cn('flex-1 truncate', { 'text-muted-foreground': !chips.length })}>
              {chips.length
                ? `Выбрано ${chips.length} ${pluralize(chips.length, ['тип', 'типа', 'типов'])}`
                : types.length
                  ? 'Выберите типы задач'
                  : 'Типов пока нет — создайте в конфигурации'}
            </span>
            <ChevronDown
              className={cn('absolute right-3 size-4 text-muted-foreground transition-transform', {
                'rotate-180': isOpen,
              })}
            />
          </button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-(--radix-popover-trigger-width) p-0">
          <Command shouldFilter={false}>
            <CommandInput placeholder="Поиск типа…" value={search} onValueChange={setSearch} />
            <CommandList className="max-h-[min(18rem,calc(var(--radix-popover-content-available-height)-2.5rem))]">
              <CommandEmpty>Ничего не найдено</CommandEmpty>

              {rows.length > 0 && (
                <CommandGroup>
                  {rows.map((row) =>
                    row.kind === 'type' ? (
                      <CommandItem key={row.value} value={row.value} onSelect={() => toggleType(row.type)}>
                        <Checkbox checked={typeState(row.type)} />
                        <TaskTypeDot color={row.type.color} />
                        <span className="flex-1 truncate">{row.type.name}</span>
                      </CommandItem>
                    ) : (
                      <CommandItem
                        key={row.value}
                        value={row.value}
                        onSelect={() => toggle(row.subtype.id)}
                        className="pl-[1.625rem]"
                      >
                        <Checkbox checked={selectedIds.has(row.subtype.id)} />
                        <span className="h-4 w-px shrink-0" style={{ backgroundColor: row.type.color }} />
                        <span className="flex-1 truncate">{row.subtype.name}</span>
                      </CommandItem>
                    ),
                  )}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {chips.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {chips.map((chip) => (
            <li
              key={chip.key}
              className="inline-flex h-7 max-w-full items-center gap-1 rounded-full border bg-card pr-1 pl-2.5 text-xs font-medium"
            >
              <TaskTypeLabel {...chip.found} className="min-w-0" />
              <button
                type="button"
                title="Убрать из отчёта"
                onClick={chip.onRemove}
                className="inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <X className="size-3" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
