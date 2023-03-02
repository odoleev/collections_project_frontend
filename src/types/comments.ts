export interface IComment {
  _id: string;
  author: string;
  authorId: string;
  text: string;
  createdAt: Date;
  itemId: string;
}

export interface ICreateComment {
  author: string;
  authorId: string;
  text: string;
  itemId: string;
}
