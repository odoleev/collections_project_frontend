import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { itemsAPI } from '../../store/services';
import { Loader, PageContainer } from '../../UI';
import { ItemsCardList, SortAndSearch } from '../../components';
import { ISortOptions } from '../../types';
import { setAlert } from '../../store/reducers';

export function SearchLayout() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const search = useAppSelector((state) => state.searchReducer.search);
  const navigate = useNavigate();

  const [sort, setSort] = useState<[string, -1 | 1]>(['createdAt', -1]);
  const [page, setPage] = useState<number>(1);

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const sortOptions: ISortOptions[] = [
    {
      title: t('search_fulltext.created_desc'),
      sort: ['createdAt', -1],
    },
    {
      title: t('search_fulltext.created_asc'),
      sort: ['createdAt', 1],
    },
    {
      title: t('search_fulltext.name_desc'),
      sort: ['name', -1],
    },
    {
      title: t('search_fulltext.name_asc'),
      sort: ['name', 1],
    },
    {
      title: t('search_fulltext.collection_desc'),
      sort: ['collectionName', -1],
    },
    {
      title: t('search_fulltext.collection_asc'),
      sort: ['collectionName', 1],
    },
  ];
  const {
    data: searchData,
    isError: isSearchError,
    isLoading: isSearchLoading,
    isSuccess: isSearchSuccess,
    refetch,
  } = itemsAPI.useGetSearchItemsQuery({
    limit: 6,
    page,
    sort,
    search: { search },
  });

  const count = searchData
    ? Math.ceil(searchData.totalCount.totalCount / 6)
    : 0;

  useEffect(() => {
    if (search === '') {
      navigate('/');
    }
    refetch();
  }, [search]);

  useEffect(() => {
    if (search !== '') {
      if (isSearchError) {
        dispatch(
          setAlert({
            isOpen: true,
            type: 'error',
            text: 'Server error',
          })
        );
      }
    }
  }, [isSearchError]);

  return (
    <PageContainer>
      <Box marginBottom="30px" display="flex" gap="10px">
        <Typography
          fontSize="25px"
          component="h2"
          fontWeight={500}
          color="text.secondary"
        >
          {t('search_fulltext.title')}
        </Typography>
        <Typography fontSize="25px" component="h2" fontWeight={700}>
          {search}
        </Typography>
      </Box>

      {isSearchError ? (
        <Typography>{t('error.wrong')}</Typography>
      ) : isSearchLoading ? (
        <Loader />
      ) : (
        isSearchSuccess && (
          <Box>
            <SortAndSearch
              disableSearch
              sort={sort}
              setSort={setSort}
              options={sortOptions}
            />
            <ItemsCardList
              page={page}
              handlePage={handlePage}
              count={count}
              data={searchData}
            />
          </Box>
        )
      )}
    </PageContainer>
  );
}
