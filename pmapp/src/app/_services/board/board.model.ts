export interface Board {
  _id?: string;
  title: string;
  owner: string;
  users?: string[];
}

export type BoardData = Pick<Board, 'title' | 'users'>;
