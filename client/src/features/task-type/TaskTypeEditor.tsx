import { useState } from 'react';
import { Check, Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { cn } from '@/shared/lib/utils';
import { TASK_TYPE_COLORS } from './constants';
import { TaskTypeStore } from './TaskType.store';
import type { TTaskType } from './types';

type TaskTypeEditorProps = {
  type?: TTaskType;
  onClose: () => void;
};

type TDraftChild = { key: string; id?: string; name: string };

export function TaskTypeEditor({ type, onClose }: TaskTypeEditorProps) {
  const [name, setName] = useState(type?.name ?? '');
  const [color, setColor] = useState(type?.color ?? TaskTypeStore.nextColor);
  const [children, setChildren] = useState<TDraftChild[]>(
    () => type?.children.map((child) => ({ ...child, key: child.id })) ?? [],
  );
  const [addedChildKey, setAddedChildKey] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const canSave = name.trim().length > 0 && !isSaving;

  const finish = async (request: Promise<boolean>) => {
    setIsSaving(true);
    const isOk = await request;
    setIsSaving(false);
    if (isOk) onClose();
  };

  const handleSave = () => {
    if (canSave) finish(TaskTypeStore.save(type, { name, color, children }));
  };

  const addChild = () => {
    const child = { key: crypto.randomUUID(), name: '' };
    setChildren((prev) => [...prev, child]);
    setAddedChildKey(child.key);
  };

  const renameChild = (key: string, childName: string) =>
    setChildren((prev) => prev.map((child) => (child.key === key ? { ...child, name: childName } : child)));

  const removeChild = (key: string) => setChildren((prev) => prev.filter((child) => child.key !== key));

  const handleRemove = () => {
    if (!type || !confirm(`Удалить тип «${type.name}»? Он пропадёт и у задач, где был выбран.`)) return;

    finish(TaskTypeStore.remove(type.id));
  };

  return (
    <div className="flex flex-col gap-3">
      <Input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleSave();
          if (e.key === 'Escape') onClose();
        }}
        placeholder="Название типа"
        className="h-8"
      />

      <div className="grid grid-cols-10 gap-3">
        {TASK_TYPE_COLORS.map((paletteColor) => (
          <button
            key={paletteColor}
            type="button"
            onClick={() => setColor(paletteColor)}
            className={cn(
              'flex aspect-square cursor-pointer items-center justify-center rounded-full transition hover:scale-110',
              { 'ring-2 ring-offset-2 ring-offset-card': color === paletteColor },
            )}
            style={{ backgroundColor: paletteColor, ['--tw-ring-color' as string]: paletteColor }}
            title={paletteColor}
          >
            {color === paletteColor && <Check className="size-3.5 text-white" />}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">Подтипы</span>

        {children.map((child) => (
          <div key={child.key} className="flex items-center gap-1">
            <span className="h-4 w-px shrink-0" style={{ backgroundColor: color }} />
            <Input
              autoFocus={child.key === addedChildKey}
              value={child.name}
              onChange={(e) => renameChild(child.key, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addChild();
              }}
              placeholder="Название подтипа"
              className="h-7 text-sm"
            />
            <Button
              size="icon-sm"
              variant="ghost"
              className="size-7 text-muted-foreground"
              onClick={() => removeChild(child.key)}
              title="Удалить подтип"
            >
              <X />
            </Button>
          </div>
        ))}

        <Button size="sm" variant="ghost" className="h-7 justify-start px-2 text-muted-foreground" onClick={addChild}>
          <Plus /> Добавить подтип
        </Button>
      </div>

      <div className="flex gap-2">
        {type && (
          <Button
            size="sm"
            variant="ghost"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            disabled={isSaving}
            onClick={handleRemove}
          >
            <Trash2 /> Удалить
          </Button>
        )}
        <Button size="sm" variant="outline" className="ml-auto" onClick={onClose}>
          Отмена
        </Button>
        <Button
          size="sm"
          className="bg-brand text-brand-foreground hover:bg-brand/90"
          disabled={!canSave}
          onClick={handleSave}
        >
          {type ? 'Сохранить' : 'Создать'}
        </Button>
      </div>
    </div>
  );
}
