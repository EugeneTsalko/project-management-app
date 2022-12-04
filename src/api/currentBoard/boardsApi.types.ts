export interface BoardInterface {
  _id: string;
  title: string;
  description: string;
  columns: ColumnInterface[];
}

export interface ColumnInterface {
  _id: string;
  title: string;
  order: number;
  tasks: TaskInterface[];
}

export interface TaskInterface {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  files: FileInterface[];
}
export interface FileInterface {
  filename: string;
  fileSize: number;
}
