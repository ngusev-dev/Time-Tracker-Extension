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

export type TTaskTypeDraft = {
  name: string;
  color: string;
  children: { id?: string; name: string }[];
};

export type TTaskTypeSelection = {
  typeId: string;
  subtypeId?: string;
};
