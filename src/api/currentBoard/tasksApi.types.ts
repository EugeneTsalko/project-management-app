// export interface TaskResponseInterface {
//   boardId: string;
//   columnId: string;
//   description: string;
//   id: string;
//   order: number;
//   title: string;
//   userId: string;
// }

export interface TaskInterface {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}
