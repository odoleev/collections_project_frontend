import React from 'react';
import { ISortOptions } from '../../types';

export interface ISortAndSearch {
  disableSearch?: boolean;
  setSearch?: React.Dispatch<React.SetStateAction<string>>;
  setSort: React.Dispatch<React.SetStateAction<[string, 1 | -1]>>;
  options: ISortOptions[];
  sort: [string, 1 | -1];
}
