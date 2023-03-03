import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { ISortOptions } from '../../types';
import { itemsAPI } from '../../store/services';
import { setAlert } from '../../store/reducers';
import { Loader, PageContainer } from '../../UI';
import { ItemsCardList, SortAndSearch } from '../../components';

export function TagsLayout() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { tag } = useAppSelector((state) => state.searchReducer);
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
  const [
    getItems,
    {
      data: tagData,
      isError: isTagError,
      isLoading: isTagLoading,
      isSuccess: isTagSuccess,
    },
  ] = itemsAPI.useFindByTagsMutation();

  const count = tagData ? Math.ceil(tagData.totalCount.totalCount / 6) : 0;

  useEffect(() => {
    if (tag === '') {
      navigate('/');
    }
  }, [tag]);

  useEffect(() => {
    if (tag !== '') {
      if (isTagError) {
        dispatch(
          setAlert({
            isOpen: true,
            type: 'error',
            text: 'Server error',
          })
        );
      }
    }
  }, [isTagError]);

  useEffect(() => {
    async function fetchTags() {
      await getItems({ page, body: [tag], sort, limit: 6 });
    }

    fetchTags();
  }, [page, sort]);

  useEffect(() => {
    async function fetchTags() {
      await getItems({ page, body: [tag], sort, limit: 6 });
    }

    fetchTags();
  }, []);
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
          {tag}
        </Typography>
      </Box>
      {isTagError ? (
        <Typography>{t('error.wrong')}</Typography>
      ) : isTagLoading ? (
        <Loader />
      ) : (
        isTagSuccess &&
        tagData && (
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
              data={tagData}
            />
          </Box>
        )
      )}
    </PageContainer>
  );
}
