import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Pencil, Plus, Search } from 'lucide-react';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { pluralize } from '@/shared/lib/plural';
import { TaskTypeStore } from './TaskType.store';
import { TaskTypeDot } from './TaskTypeDot';
import { TaskTypeEditor } from './TaskTypeEditor';

const NEW_TYPE_ID = '__new__';

const cardClassName = 'rounded-lg border bg-card p-3 shadow-xs';

/** Список типов задач с созданием, редактированием и удалением */
export const TaskTypeManager = observer(() => {
  const [search, setSearch] = useState('');
  /** id редактируемого типа или NEW_TYPE_ID при создании; одновременно открыт только один редактор */
  const [editingId, setEditingId] = useState<string | null>(null);

  const query = search.trim().toLowerCase();
  const types = query
    ? TaskTypeStore.types.filter(
        (type) =>
          type.name.toLowerCase().includes(query) ||
          type.children.some((child) => child.name.toLowerCase().includes(query)),
      )
    : TaskTypeStore.types;

  const closeEditor = () => setEditingId(null);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Типы задач</div>
          <div className="text-xs text-muted-foreground">Доступны для выбора в таймере</div>
        </div>
        <Button
          size="sm"
          className="bg-brand text-brand-foreground hover:bg-brand/90"
          disabled={editingId === NEW_TYPE_ID}
          onClick={() => setEditingId(NEW_TYPE_ID)}
        >
          <Plus /> Добавить
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Поиск по типам и подтипам…"
          className="bg-card pl-9"
        />
      </div>

      {editingId === NEW_TYPE_ID && (
        <div className={cardClassName}>
          <TaskTypeEditor onClose={closeEditor} />
        </div>
      )}

      {types.map((type) =>
        editingId === type.id ? (
          <div key={type.id} className={cardClassName}>
            <TaskTypeEditor type={type} onClose={closeEditor} />
          </div>
        ) : (
          <div key={type.id} className={`flex flex-col gap-2 ${cardClassName}`}>
            <div className="flex items-center gap-2">
              <TaskTypeDot color={type.color} />
              <span className="flex-1 truncate text-sm font-medium">{type.name}</span>
              {type.children.length > 0 && (
                <span className="text-xs text-muted-foreground tabular-nums">
                  {type.children.length} {pluralize(type.children.length, ['подтип', 'подтипа', 'подтипов'])}
                </span>
              )}
              <Button
                size="icon-sm"
                variant="ghost"
                className="size-7 text-muted-foreground"
                onClick={() => setEditingId(type.id)}
                title="Редактировать"
              >
                <Pencil />
              </Button>
            </div>

            {type.children.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pl-4.5">
                {type.children.map((child) => (
                  <span
                    key={child.id}
                    className="rounded-md px-1.5 py-0.5 text-xs"
                    style={{ backgroundColor: `${type.color}1a`, color: type.color }}
                  >
                    {child.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        ),
      )}

      {types.length === 0 && (
        <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
          {query ? 'Ничего не найдено' : 'Типов пока нет — добавьте первый'}
        </div>
      )}
    </section>
  );
});
