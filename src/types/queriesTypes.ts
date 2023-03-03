export interface IGetQueries {
  limit?: number;
  page?: number;
  sort: [string, number] | [];
  search: string;
}

export interface ITagsQueries {
  search?: string;
  limit?: number;
  page?: number;
  sort: [string, number] | [];
  body: string[];
}

export interface IQueriesAndId extends IGetQueries {
  id: string;
}