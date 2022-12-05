export interface IBoards {
  id: string;
  _id?: string;
  title: string;
  owner: string;
  users?: string[];
}

export interface IFetchedBoards {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface ICreateBoardProps {
  title: string;
  owner: string;
  users?: string[];
}

export interface IBoardsErrorMessage {
  message: string;
}

export interface ICreateBoard {
  title: string;
  owner: string;
  users?: string[];
}
