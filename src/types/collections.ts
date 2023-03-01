export interface ICollection {
  _id: string;
  name: string;
  creatorUsername: string;
  description: string;
  theme: CollectionThemesEnum;
  createdAt: Date;
  creatorId: string;
  itemsCount: number;
  imgUrl: string | null;
  boolean1descr: string | null;
  boolean2descr: string | null;
  boolean3descr: string | null;
  date1descr: string | null;
  date2descr: string | null;
  date3descr: string | null;
  number1descr: string | null;
  number2descr: string | null;
  number3descr: string | null;
  string1descr: string | null;
  string2descr: string | null;
  string3descr: string | null;
  text1descr: string | null;
  text2descr: string | null;
  text3descr: string | null;
}

interface IEditCollectionBody {
  name: string;
  description: string;
  theme: CollectionThemesEnum;

  imgUrl: string | null;
  boolean1descr: string | null;
  boolean2descr: string | null;
  boolean3descr: string | null;
  date1descr: string | null;
  date2descr: string | null;
  date3descr: string | null;
  number1descr: string | null;
  number2descr: string | null;
  number3descr: string | null;
  string1descr: string | null;
  string2descr: string | null;
  string3descr: string | null;
  text1descr: string | null;
  text2descr: string | null;
  text3descr: string | null;
}

export interface ICreateCollection extends IEditCollectionBody{
  creatorId: string;
}

export interface IEditCollection {
  body: IEditCollectionBody;
  id: string;
  token: string;
}

export interface IApiCollections {
  collections: ICollection[];
  totalCount: number;
}

export enum CollectionThemesEnum {
  COINS = 'coins',
  BOOKS = 'books',
  ALCOHOL = 'alcohol',
  CARDS = 'cards',
  WEAPONS = 'weapons',
  CLOTHES = 'clothes',
  FIGURINES = 'figurines',
  MUSIC = 'music',
  ANTIQUES = 'antiques',
  OTHER = 'other',
}
