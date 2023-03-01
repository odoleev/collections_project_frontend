import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IPersonaAccount } from './personal-account.types';
import { collectionsAPI, usersAPI } from '../../store/services';
import { Loader, PageContainer } from '../../UI';
import { CollectionCardList, IncorrectID, PageHeader } from '../../components';
import { SortAndSearch } from '../../components/SortAndSearch';
import { ISortOptions } from '../../types';

export function PersonalAccountLayout({ userId }: IPersonaAccount) {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<[string, -1 | 1]>(['createdAt', -1]);

  const handleCreateClick = () => {
    navigate(`/create-collection/${userId}`);
  };

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
      title: 'Theme (descending)',
      sort: ['theme', -1],
    },
    {
      title: 'Theme (ascending)',
      sort: ['theme', 1],
    },
    {
      title: 'Name (descending)',
      sort: ['name', -1],
    },
    {
      title: 'Name (ascending)',
      sort: ['name', 1],
    },
  ];

  const {
    data: collectionsData,
    isSuccess: isCollSuccess,
    isError: isCollectionsError,
    isLoading: isCollectionLoading,
    error: collectionsError,
  } = collectionsAPI.useGetUserCollectionsQuery({
    page: 1,
    search,
    sort,
    id: userId,
  });

  const {
    data: userData,
    isSuccess: isUserSuccess,
    isError: isUserError,
    isLoading: isUserLoading,
  } = usersAPI.useGetUserQuery(userId);
  useEffect(() => {
    if (isCollectionsError) {
      console.log(collectionsError);
    }
  }, [isCollectionsError]);
  return isUserError ? (
    <IncorrectID>No user with such id</IncorrectID>
  ) : (
    <PageContainer>
      {!isUserLoading ? (
        isUserSuccess && (
          <PageHeader
            titleText={`${userData.username} Collections`}
            buttonText="Create Collection"
            userId={userId}
            handleClick={handleCreateClick}
          />
        )
      ) : (
        <Loader />
      )}

      <SortAndSearch
        setSort={setSort}
        sort={sort}
        options={sortOptions}
        setSearch={setSearch}
      />

      {isCollSuccess ? (
        <CollectionCardList data={collectionsData} />
      ) : isCollectionLoading ? (
        <Loader />
      ) : (
        <Typography>Server Error</Typography>
      )}
    </PageContainer>
  );
}
