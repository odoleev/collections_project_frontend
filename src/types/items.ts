export interface IEditItem {
  name: string;
  tags: string[];
  string1: string | null;
  string2: string | null;
  string3: string | null;

  number1: number | null;
  number2: number | null;
  number3: number | null;

  text1: string | null;
  text2: string | null;
  text3: string | null;

  date1: string | null;
  date2: string | null;
  date3: string | null;

  boolean1: boolean | null;
  boolean2: boolean | null;
  boolean3: boolean | null;
}

export interface IItem extends IEditItem {
  _id: string;
  createdAt: Date;
  collectionId: string;
  creatorId: string;
  collectionName: string;
  likesUsers: string[];
}

export interface ICreateItem extends IEditItem {
  collectionId: string;
}

export interface IApiItems {
  items: IItem[];
  totalCount: number;
}
