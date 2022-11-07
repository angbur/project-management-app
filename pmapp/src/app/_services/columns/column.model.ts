export interface Column {
  _id: number;
  title: string;
  order: number;
  boardId: string;
}

export interface NewColumn {
  title: string;
  order: number;
}
