import type { TTaskSubtype, TTaskType } from '../types';

export type TTypeRow =
  | { kind: 'type'; value: string; type: TTaskType; isExpanded: boolean }
  | { kind: 'subtype'; value: string; type: TTaskType; subtype: TTaskSubtype };

/** Ручное раскрытие/сворачивание типа: id типа -> раскрыт ли */
export type TExpandedState = Record<string, boolean>;

export const typeRowValue = (typeId: string) => `type:${typeId}`;
export const subtypeRowValue = (subtypeId: string) => `sub:${subtypeId}`;

const includes = (name: string, query: string) => name.toLowerCase().includes(query);

/**
 * Плоский список строк для дропдауна.
 * Без поиска подтипы видны только у раскрытых вручную типов.
 * При поиске тип показывается, если совпал он сам или хоть один подтип; совпавшие подтипы раскрываются сразу.
 */
export const buildTypeRows = (types: TTaskType[], search: string, expanded: TExpandedState) => {
  const query = search.trim().toLowerCase();
  const rows: TTypeRow[] = [];

  for (const type of types) {
    const matchedChildren = query ? type.children.filter((child) => includes(child.name, query)) : [];
    if (query && !includes(type.name, query) && matchedChildren.length === 0) continue;

    const override = expanded[type.id];
    const visibleChildren = override === undefined ? matchedChildren : override ? type.children : [];
    rows.push({ kind: 'type', value: typeRowValue(type.id), type, isExpanded: visibleChildren.length > 0 });

    for (const subtype of visibleChildren) {
      rows.push({ kind: 'subtype', value: subtypeRowValue(subtype.id), type, subtype });
    }
  }

  return rows;
};
