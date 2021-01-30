export interface IBoard {
  _id: string;
  name: string;
  date?: string;
}

export interface IImage {
  _id: string;
  url: string;
  boardId: string;
  tags: string[];
  date?: string;
}
export interface IBoardInfo {
  id: string;
  images: IImage[];
}
