import { IApiCollections, IApiItems } from '../../types';
import React from "react";

interface Pagination {
  page?: number;
  handlePage?: (event: React.ChangeEvent<unknown>, value: number) => void;
  count?: number;
}

export interface ICollectionCardList extends Pagination {
  data: IApiCollections;
}

export interface IItemCardList extends Pagination {
  data: IApiItems;
}
