import React, { useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Loader, PageContainer } from '../../UI';
import { CollectionCardList, ItemsCardList } from '../../components';
import { collectionsAPI } from '../../store/services';
import { itemsAPI } from '../../store/services/ItemsServices';

export function HomeLayout() {
  const {
    data: collData,
    error: collError,
    isError: isCollError,
    isSuccess: isCollSuccess,
    isLoading: isCollLoading,
  } = collectionsAPI.useGetMostItemsCollectionQuery(null);
  const [
    get,
    {
      data: itemData,
      error: itemError,
      isError: isItemError,
      isSuccess: isItemSuccess,
      isLoading: isItemLoading,
    },
  ] = itemsAPI.useGetLastItemsMutation();

  useEffect(() => {
    async function getItems() {
      await get(null);
    }
    getItems();
  }, []);
  return isCollError || isItemError ? (
    <PageContainer>Something went wrong</PageContainer>
  ) : isCollLoading && isItemLoading ? (
    <Loader />
  ) : (
    isCollSuccess &&
    isItemSuccess && (
      <PageContainer>
        <Box display="flex" flexDirection="column" gap="50px">
          <Box display="flex" flexDirection="column" gap="30px">
            <Typography fontSize="30px" fontWeight={700} component="h1">
              Collections with most Items
            </Typography>
            <CollectionCardList data={collData} />
          </Box>

          {itemData ? (
            <Box display="flex" flexDirection="column" gap="30px">
              <Typography fontSize="30px" fontWeight={700} component="h1">
                Last added items
              </Typography>
              <ItemsCardList data={itemData} />
            </Box>
          ) : null}
        </Box>
      </PageContainer>
    )
  );
}
