import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TagCloud } from 'react-tagcloud';
import { useNavigate } from 'react-router-dom';
import { Loader, PageContainer } from '../../UI';
import { CollectionCardList, ItemsCardList } from '../../components';
import { collectionsAPI, itemsAPI } from '../../store/services';
import { useAppDispatch } from '../../store/hooks/redux';
import { setAlert, setTag } from '../../store/reducers';

export function HomeLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [tags, setTags] = useState<Array<{ value: string; count: number }>>([]);
  const {
    data: collData,
    error: collError,
    isError: isCollError,
    isSuccess: isCollSuccess,
    isLoading: isCollLoading,
  } = collectionsAPI.useGetMostItemsCollectionQuery(null);
  const [
    getItem,
    {
      data: itemData,
      error: itemError,
      isError: isItemError,
      isSuccess: isItemSuccess,
      isLoading: isItemLoading,
    },
  ] = itemsAPI.useGetLastItemsMutation();

  const [getTags, { data: tagsData, isSuccess: isTagsSuccess }] =
    itemsAPI.useGetTagsMutation();

  useEffect(() => {
    async function getItems() {
      await getItem(null);
    }
    getItems();

    async function fetchTags() {
      await getTags(null);
    }
    fetchTags();
  }, []);

  useEffect(() => {
    if (isItemError || isCollError) {
      dispatch(
        setAlert({
          isOpen: true,
          type: 'error',
          text: 'Server error',
        })
      );
    }
  }, [isItemError, isCollError]);

  useEffect(() => {
    if (isTagsSuccess) {
      const toTags = Object.keys(tagsData).map((key) => {
        return { value: key, count: tagsData[key] };
      });
      setTags(toTags);
    }
  }, [isTagsSuccess]);
  return (
    <Box>
      {isCollError || isItemError ? (
        <PageContainer>{t('error.wrong')}</PageContainer>
      ) : isCollLoading && isItemLoading ? (
        <Loader />
      ) : (
        isCollSuccess &&
        isItemSuccess && (
          <PageContainer>
            <Box display="flex" flexDirection="column" gap="50px">
              <Box display="flex" flexDirection="column" gap="30px">
                <Typography fontSize="30px" fontWeight={700} component="h1">
                  {t('main.tags')}
                </Typography>
                <TagCloud
                  onClick={(tag: { value: string; count: number }) => {
                    dispatch(setTag({ tag: tag.value }));
                    navigate('/tags');
                  }}
                  minSize={12}
                  maxSize={50}
                  tags={tags}
                />
              </Box>
              <Box display="flex" flexDirection="column" gap="30px">
                <Typography fontSize="30px" fontWeight={700} component="h1">
                  {t('main.collections')}
                </Typography>
                <CollectionCardList data={collData} />
              </Box>

              {itemData ? (
                <Box display="flex" flexDirection="column" gap="30px">
                  <Typography fontSize="30px" fontWeight={700} component="h1">
                    {t('main.items')}
                  </Typography>
                  <ItemsCardList data={itemData} />
                </Box>
              ) : null}
            </Box>
          </PageContainer>
        )
      )}
    </Box>
  );
}
