/** Подтип наследует цвет родительского типа */
export type TTaskSubtype = {
  id: string;
  name: string;
};

export type TTaskType = {
  id: string;
  name: string;
  color: string;
  children: TTaskSubtype[];
};

/** Выбор у задачи: тип и, если есть, его подтип */
export type TTaskTypeSelection = {
  typeId: string;
  subtypeId?: string;
};
