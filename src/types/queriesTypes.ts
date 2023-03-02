export interface IGetQueries {
  limit?: number;
  page?: number;
  sort: [string, number] | [];
  search: string;
}

export interface IQueriesAndId extends IGetQueries {
  id: string;
}