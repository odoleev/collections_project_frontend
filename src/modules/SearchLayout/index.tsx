import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../store/hooks/redux';
import { itemsAPI } from '../../store/services';
import { Loader, PageContainer } from '../../UI';
import { ItemsCardList, SortAndSearch } from '../../components';
import { ISortOptions } from '../../types';

export function SearchLayout() {
  const searchText = useAppSelector((state) => state.searchReducer.search);
  const navigate = useNavigate();

  const [sort, setSort] = useState<[string, -1 | 1]>(['createdAt', -1]);

  const sortOptions: ISortOptions[] = [
    {
      title: 'Creation (descending)',
      sort: ['createdAt', -1],
    },
    {
      title: 'Creation (ascending)',
      sort: ['createdAt', 1],
    },
    {
      title: 'Name (descending)',
      sort: ['name', -1],
    },
    {
      title: 'Name (ascending)',
      sort: ['name', 1],
    },
    {
      title: 'Collection name (descending)',
      sort: ['collectionName', -1],
    },
    {
      title: 'Collection name (ascending)',
      sort: ['collectionName', 1],
    },
  ];
  const { data, isError, isLoading, isSuccess, refetch } =
    itemsAPI.useGetSearchItemsQuery({
      limit: 10,
      page: 1,
      sort,
      search: searchText,
    });
  useEffect(() => {
    if (searchText === '') {
      navigate('/');
    }
    refetch();
  }, [searchText]);
  return (
    <PageContainer>
      <Box marginBottom="30px" display="flex" gap="10px">
        <Typography
          fontSize="25px"
          component="h2"
          fontWeight={500}
          color="text.secondary"
        >
          Search results:
        </Typography>
        <Typography fontSize="25px" component="h2" fontWeight={700}>
          {searchText}
        </Typography>
      </Box>

      {isError ? (
        <Typography>Something went wrong</Typography>
      ) : isLoading ? (
        <Loader />
      ) : (
        isSuccess && (
          <Box>
            <SortAndSearch
              disableSearch
              sort={sort}
              setSort={setSort}
              options={sortOptions}
            />
            <ItemsCardList data={data} />
          </Box>
        )
      )}
    </PageContainer>
  );
}
