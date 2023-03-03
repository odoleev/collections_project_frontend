import React from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FavoriteTwoTone } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { DeleteDialog, PageHeader } from '../../../components';
import { IItemsDescription } from './items-description.types';
import { BigTag, Clickable, InfoContainer } from '../../../UI';
import { dateConverter } from '../../../helpers/utils/dateConverter';
import { OptionalDescription } from './OptionalDescription';
import { itemsAPI } from '../../../store/services';
import { useAppSelector } from '../../../store/hooks/redux';

export function ItemsDescription({
  itemData,
  collectionData,
  handleOpenDelete,
  deleteOpen,
  handleEditButton,
  handleCloseDelete,
  handleDelete,
  userId,
}: IItemsDescription) {
  const { t } = useTranslation();
  const { id, accessToken } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [like] = itemsAPI.useLikeItemMutation();
  const handleLike = async () => {
    if (id && accessToken)
      await like({
        body: { userId: id, itemId: itemData._id },
        token: accessToken,
      });
  };
  return (
    <Box display="flex" flexDirection="column" gap="10px">
      <PageHeader
        isDeleteButton
        titleText={itemData.name}
        buttonText={t('edit')}
        userId={collectionData.creatorId}
        handleClick={handleEditButton}
        handleOpen={handleOpenDelete}
      />
      <DeleteDialog
        open={deleteOpen}
        handleClose={handleCloseDelete}
        handleConfirm={handleDelete}
      />

      <Box display="flex" alignItems="center" gap="2px">
        <Tooltip title={t('item.like')}>
          <IconButton onClick={handleLike} disabled={!userId}>
            <FavoriteTwoTone
              color={
                userId
                  ? itemData.likesUsers.includes(userId)
                    ? 'error'
                    : 'disabled'
                  : 'disabled'
              }
            />
          </IconButton>
        </Tooltip>

        <Typography component="span" fontWeight={500}>
          {itemData.likesUsers.length}
        </Typography>
      </Box>

      <InfoContainer>
        <Typography color="text.secondary">{t('item.created')}</Typography>
        <Typography fontWeight={600}>
          {dateConverter(itemData.createdAt)}
        </Typography>
      </InfoContainer>
      <InfoContainer>
        <Typography
          component="div"
          color="text.secondary"
          display="flex"
          alignItems="center"
          gap="5px"
        >
          {t('item.tags')}
          <Typography
            component="div"
            display="flex"
            gap="10px"
            fontWeight={700}
            color="black"
          >
            {itemData.tags.map((tag) => (
              <BigTag key={tag}>{tag}</BigTag>
            ))}
          </Typography>
        </Typography>
      </InfoContainer>
      <InfoContainer>
        <Typography color="text.secondary">{t('item.collection')}</Typography>
        <Clickable
          onClick={() => navigate(`/collection/${itemData.collectionId}`)}
          fontWeight={600}
        >
          {itemData.collectionName}
        </Clickable>
      </InfoContainer>
      <OptionalDescription
        string1={itemData.string1}
        string2={itemData.string2}
        string3={itemData.string2}
        number1={itemData.number1}
        number2={itemData.number2}
        number3={itemData.number3}
        text1={itemData.text1}
        text2={itemData.text2}
        text3={itemData.text3}
        date1={itemData.date1}
        date2={itemData.date2}
        date3={itemData.date3}
        boolean1={itemData.boolean1}
        boolean2={itemData.boolean2}
        boolean3={itemData.boolean3}
        string1descr={collectionData.string1descr}
        string2descr={collectionData.string2descr}
        string3descr={collectionData.string3descr}
        number1descr={collectionData.number1descr}
        number2descr={collectionData.number2descr}
        number3descr={collectionData.number3descr}
        text1descr={collectionData.text1descr}
        text2descr={collectionData.text2descr}
        text3descr={collectionData.text3descr}
        date1descr={collectionData.date1descr}
        date2descr={collectionData.date2descr}
        date3descr={collectionData.date3descr}
        boolean1descr={collectionData.boolean1descr}
        boolean2descr={collectionData.boolean2descr}
        boolean3descr={collectionData.boolean3descr}
      />
    </Box>
  );
}
