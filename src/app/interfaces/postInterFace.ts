export interface IPost {
  _id: string;
  body: string;
  image: string;
  user: IUser;
  createdAt: string;
  comments: IComment[];
}

export interface IUser {
  _id: string;
  name: string;
  photo: string;
}

export interface IComment {
  _id: string;
  content: string;
  commentCreator: IUser;
  createdAt: string;
}
