import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { IItemLayout } from './item-layout.types';
import { useAppSelector } from '../../store/hooks/redux';
import { itemsAPI } from '../../store/services/ItemsServices';
import { collectionsAPI } from '../../store/services';
import { Loader, PageContainer } from '../../UI';
import { IncorrectID } from '../../components';
import { CreateEditItemForm } from '../CreateEditItemForm';
import { ItemsDescription } from '../CreateItemLayout/ItemDescription';

export function ItemLayout({ itemId }: IItemLayout) {
  const navigate = useNavigate();
  const { id, accessToken, role } = useAppSelector(
    (state) => state.authReducer
  );
  const [isEdit, setEdit] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [string1, setString1] = useState<string | null>(null);
  const [string2, setString2] = useState<string | null>(null);
  const [string3, setString3] = useState<string | null>(null);
  const [number1, setNumber1] = useState<number | null>(null);
  const [number2, setNumber2] = useState<number | null>(null);
  const [number3, setNumber3] = useState<number | null>(null);
  const [text1, setText1] = useState<string | null>(null);
  const [text2, setText2] = useState<string | null>(null);
  const [text3, setText3] = useState<string | null>(null);
  const [boolean1, setBoolean1] = useState<boolean | null>(null);
  const [boolean2, setBoolean2] = useState<boolean | null>(null);
  const [boolean3, setBoolean3] = useState<boolean | null>(null);
  const [date1, setDate1] = useState<string | null>(null);
  const [date2, setDate2] = useState<string | null>(null);
  const [date3, setDate3] = useState<string | null>(null);

  const {
    data: itemData,
    isError: isItemError,
    isSuccess: isItemSuccess,
    isLoading: isItemLoading,
    error: isError,
  } = itemsAPI.useGetItemQuery(itemId);
  const [
    editItem,
    {
      isError: isEditError,
      isLoading: isEditLoading,
      isSuccess: isEditSuccess,
      error: editError,
    },
  ] = itemsAPI.useEditItemMutation();
  const {
    data: collectionData,
    isError: isCollError,
    isLoading: isCollLoading,
    isSuccess: isCollSuccess,
    error: collError,
  } = collectionsAPI.useGetCollectionQuery(
    isItemSuccess ? itemData.collectionId : ''
  );

  const [
    deleteItem,
    {
      isError: isDeleteError,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      error: deleteError,
    },
  ] = itemsAPI.useDeleteItemMutation();

  const handleOpenDelete = () => {
    setDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const handleEditButton = () => {
    setEdit(true);
  };

  const handleEdit = async () => {
    if (accessToken) {
      await editItem({
        body: {
          name,
          tags,
          string1,
          string2,
          string3,
          number1,
          number2,
          number3,
          text1,
          text2,
          text3,
          boolean1,
          boolean2,
          boolean3,
          date1,
          date2,
          date3,
        },
        id: itemId,
        token: accessToken,
      });
    }
  };

  const handleDelete = async () => {
    if (accessToken) {
      await deleteItem({ id: itemId, token: accessToken });
    }
  };

  useEffect(() => {
    if (isItemSuccess) {
      setName(itemData.name);
      setTags(itemData.tags);
      setString1(itemData.string1);
      setString2(itemData.string2);
      setString3(itemData.string3);
      setNumber1(itemData.number1);
      setNumber2(itemData.number2);
      setNumber3(itemData.number3);
      setText1(itemData.text1);
      setText2(itemData.text2);
      setText3(itemData.text3);
      setBoolean1(itemData.boolean1);
      setBoolean2(itemData.boolean2);
      setBoolean3(itemData.boolean3);
      setDate1(itemData.date1);
      setDate2(itemData.date2);
      setDate3(itemData.date3);
    }
  }, [isCollSuccess]);

  useEffect(() => {
    if (isEditSuccess) {
      setEdit(false);
    } else if (isEditError) console.log(editError);
  }, [isEditSuccess, isEditError]);

  useEffect(() => {
    if (isDeleteSuccess && collectionData) {
      navigate(`/personal-account/${collectionData.creatorId}`);
    } else if (isDeleteError) console.log(deleteError);
  }, [isDeleteError, isDeleteSuccess]);

  return isItemError ? (
    <PageContainer>
      <IncorrectID>No item with such id</IncorrectID>
    </PageContainer>
  ) : (
    <PageContainer>
      {!isItemLoading ? (
        isItemSuccess &&
        isCollSuccess &&
        (isEdit ? (
          <Box display="flex" flexDirection="column" gap="50px">
            <CreateEditItemForm
              isEdit
              handleCancel={handleCancel}
              name={name}
              setName={setName}
              tags={tags}
              setTags={setTags}
              string1={string1}
              setString1={setString1}
              string2={string2}
              setString2={setString2}
              string3={string3}
              setString3={setString3}
              number1={number1}
              setNumber1={setNumber1}
              number2={number2}
              setNumber2={setNumber2}
              number3={number3}
              setNumber3={setNumber3}
              text1={text1}
              setText1={setText1}
              text2={text2}
              setText2={setText2}
              text3={text3}
              setText3={setText3}
              date1={date1}
              setDate1={setDate1}
              date2={date2}
              setDate2={setDate2}
              date3={date3}
              setDate3={setDate3}
              boolean1={boolean1}
              setBoolean1={setBoolean1}
              boolean2={boolean2}
              setBoolean2={setBoolean2}
              boolean3={boolean3}
              setBoolean3={setBoolean3}
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
            <Box minWidth="280px" display="flex" justifyContent="center">
              <Button onClick={handleEdit} variant="contained">
                {isEditLoading ? <Loader /> : 'Edit Item'}
              </Button>
            </Box>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column" gap="30px">
            <ItemsDescription
              userId={id || ''}
              itemData={itemData}
              collectionData={collectionData}
              handleEditButton={handleEditButton}
              handleOpenDelete={handleOpenDelete}
              deleteOpen={deleteOpen}
              handleCloseDelete={handleCloseDelete}
              handleDelete={handleDelete}
            />
          </Box>
        ))
      ) : (
        <Loader />
      )}
    </PageContainer>
  );
}
