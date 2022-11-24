export interface IBoards {
  id: string;
  title: string;
  description: string;
}

export interface IBoardsErrorMessage {
  message: string;
}

export interface ICreateBoard {
  title: string;
  description: string;
}
