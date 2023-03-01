import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { ICreateItemLayout } from './create-item.types';
import { useAppSelector } from '../../store/hooks/redux';
import { RolesEnum } from '../../types';
import { collectionsAPI } from '../../store/services';
import { Loader, PageContainer } from '../../UI';
import { CreateEditItemForm } from '../CreateEditItemForm';
import { itemsAPI } from '../../store/services/ItemsServices';

export function CreateItemLayout({ collectionId }: ICreateItemLayout) {
  const navigate = useNavigate();
  const goBackPath = `/collection/${collectionId}`;

  const {
    role,
    id: authId,
    accessToken,
  } = useAppSelector((state) => state.authReducer);
  const {
    data: collection,
    isSuccess: isCollSuccess,
    isError: isCollError,
    error: collError,
  } = collectionsAPI.useGetCollectionQuery(collectionId);
  const [
    createItem,
    {
      isSuccess: isItemSucces,
      isError: isItemError,
      isLoading: isItemLoading,
      error: itemError,
    },
  ] = itemsAPI.useCreateItemMutation();

  const handleCancel = () => {
    navigate(goBackPath);
  };

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

  const handleCreate = async () => {
    if (collectionId && accessToken) {
      await createItem({
        body: {
          name,
          tags,
          collectionId,
          text1,
          text2,
          text3,
          string1,
          string2,
          string3,
          number1,
          number2,
          number3,
          date1,
          date2,
          date3,
          boolean1,
          boolean2,
          boolean3,
        },
        token: accessToken,
      });
    }
  };

  useEffect(() => {
    if (isItemSucces) {
      navigate(goBackPath);
    } else if (isItemError) console.log(itemError);
  }, [isItemSucces, isItemError]);

  useEffect(() => {
    if (isCollSuccess) {
      if (collection.creatorId === authId || role === RolesEnum.ADMIN) {
        return;
      }
      navigate(`/personal-account/${collection.creatorId}`);
    } else {
      console.log(collError);
    }
  }, [isCollSuccess, collectionId]);
  return (
    <PageContainer>
      {isCollSuccess ? (
        <Box display="flex" flexDirection="column" gap="50px">
          <CreateEditItemForm
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
            string1descr={collection.string1descr}
            string2descr={collection.string2descr}
            string3descr={collection.string3descr}
            number1descr={collection.number1descr}
            number2descr={collection.number2descr}
            number3descr={collection.number3descr}
            text1descr={collection.text1descr}
            text2descr={collection.text2descr}
            text3descr={collection.text3descr}
            date1descr={collection.date1descr}
            date2descr={collection.date2descr}
            date3descr={collection.date3descr}
            boolean1descr={collection.boolean1descr}
            boolean2descr={collection.boolean2descr}
            boolean3descr={collection.boolean3descr}
          />
          <Box minWidth="280px" display="flex" justifyContent="center">
            <Button onClick={handleCreate} variant="contained">
              {isItemLoading ? <Loader /> : 'Create item'}
            </Button>
          </Box>
        </Box>
      ) : (
        <Typography>Server error</Typography>
      )}
    </PageContainer>
  );
}
