import type { TTaskType } from './types';

/** Палитра цветов, из которой выбирается цвет типа задачи */
export const TASK_TYPE_COLORS = [
  '#6366f1',
  '#3b82f6',
  '#06b6d4',
  '#10b981',
  '#84cc16',
  '#eab308',
  '#f97316',
  '#ef4444',
  '#ec4899',
  '#a855f7',
  '#64748b',
  '#78716c',
];

/** Временные данные, пока типы задач не приходят с сервера */
export const MOCK_TASK_TYPES: TTaskType[] = [
  {
    id: 'development',
    name: 'Разработка',
    color: '#6366f1',
    children: [
      { id: 'development-frontend', name: 'Frontend' },
      { id: 'development-backend', name: 'Backend' },
      { id: 'development-bugfix', name: 'Исправление багов' },
    ],
  },
  {
    id: 'meeting',
    name: 'Встреча',
    color: '#f97316',
    children: [
      { id: 'meeting-daily', name: 'Дейли' },
      { id: 'meeting-planning', name: 'Планирование' },
      { id: 'meeting-retro', name: 'Ретро' },
    ],
  },
  { id: 'code-review', name: 'Код-ревью', color: '#10b981', children: [] },
  {
    id: 'testing',
    name: 'Тестирование',
    color: '#eab308',
    children: [
      { id: 'testing-manual', name: 'Ручное' },
      { id: 'testing-auto', name: 'Автотесты' },
    ],
  },
  { id: 'documentation', name: 'Документация', color: '#3b82f6', children: [] },
];

/** Версия в ключе меняется вместе с форматом хранимых данных */
export const TASK_TYPE_STORAGE_KEY = 'task-types-v2';
