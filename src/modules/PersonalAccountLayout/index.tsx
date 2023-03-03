import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IPersonaAccount } from './personal-account.types';
import { collectionsAPI, usersAPI } from '../../store/services';
import { Loader, PageContainer } from '../../UI';
import {
  CollectionCardList,
  IncorrectID,
  PageHeader,
  SortAndSearch,
} from '../../components';
import { ISortOptions } from '../../types';
import { setAlert } from '../../store/reducers';
import { useAppDispatch } from '../../store/hooks/redux';

export function PersonalAccountLayout({ userId }: IPersonaAccount) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<[string, -1 | 1]>(['createdAt', -1]);

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCreateClick = () => {
    navigate(`/create-collection/${userId}`);
  };

  const sortOptions: ISortOptions[] = [
    {
      title: t('personal.created_desc'),
      sort: ['createdAt', -1],
    },
    {
      title: t('personal.created_asc'),
      sort: ['createdAt', 1],
    },
    {
      title: t('personal.theme_desc'),
      sort: ['theme', -1],
    },
    {
      title: t('personal.theme_asc'),
      sort: ['theme', 1],
    },
    {
      title: t('personal.name_desc'),
      sort: ['name', -1],
    },
    {
      title: t('personal.name_asc'),
      sort: ['name', 1],
    },
  ];

  const {
    data: collectionsData,
    isSuccess: isCollSuccess,
    isError: isCollectionsError,
    isLoading: isCollectionLoading,
  } = collectionsAPI.useGetUserCollectionsQuery({
    page,
    limit: 6,
    search,
    sort,
    id: userId,
  });

  const count = collectionsData
    ? Math.ceil(collectionsData.totalCount.totalCount / 6)
    : 0;

  const {
    data: userData,
    isSuccess: isUserSuccess,
    isError: isUserError,
    isLoading: isUserLoading,
  } = usersAPI.useGetUserQuery(userId);
  useEffect(() => {
    if (isCollectionsError) {
      dispatch(
        setAlert({
          isOpen: true,
          type: 'error',
          text: 'Server error',
        })
      );
    }
  }, [isCollectionsError]);
  return (
    <PageContainer>
      {isUserError || isCollectionsError ? (
        <IncorrectID>No user with such id</IncorrectID>
      ) : !isUserLoading || !isCollectionLoading ? (
        isUserSuccess &&
        isCollSuccess && (
          <Box>
            <PageHeader
              titleText={`${userData.username} ${t('personal.collections')}`}
              buttonText={t('personal.create')}
              userId={userId}
              handleClick={handleCreateClick}
            />
            <SortAndSearch
              setSort={setSort}
              sort={sort}
              options={sortOptions}
              setSearch={setSearch}
            />
            <CollectionCardList
              page={page}
              handlePage={handlePage}
              count={count}
              data={collectionsData}
            />
          </Box>
        )
      ) : (
        <Loader />
      )}
    </PageContainer>
  );
}
