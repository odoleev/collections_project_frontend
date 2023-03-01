import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { ICreateCollectionLayout } from './create-collection.types';
import { Loader, PageContainer } from '../../UI';
import { collectionsAPI } from '../../store/services';
import { CollectionThemesEnum } from '../../types';
import { useAppSelector } from '../../store/hooks/redux';
import { CreateEditCollectionForm } from '../CreateEditCollectionForm';

export function CreateCollectionLayout({ userId }: ICreateCollectionLayout) {
  const { accessToken } = useAppSelector((state) => state.authReducer);
  const [createCollection, { isSuccess, isError, isLoading, error }] =
    collectionsAPI.useCreateCollectionMutation();

  const navigate = useNavigate();
  const goBackPath = `/personal-account/${userId}`;

  const handleCancel = () => {
    navigate(goBackPath);
  };

  const [name, setName] = useState<string>('');
  const [theme, setTheme] = useState<CollectionThemesEnum>(
    CollectionThemesEnum.OTHER
  );
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [description, setDescription] = useState<string>('');
  const [string1descr, setString1Descr] = useState<string | null>(null);
  const [string2descr, setString2Descr] = useState<string | null>(null);
  const [string3descr, setString3Descr] = useState<string | null>(null);
  const [number1descr, setNumber1Descr] = useState<string | null>(null);
  const [number2descr, setNumber2Descr] = useState<string | null>(null);
  const [number3descr, setNumber3Descr] = useState<string | null>(null);
  const [text1descr, setText1Descr] = useState<string | null>(null);
  const [text2descr, setText2Descr] = useState<string | null>(null);
  const [text3descr, setText3Descr] = useState<string | null>(null);
  const [boolean1descr, setBoolean1Descr] = useState<string | null>(null);
  const [boolean2descr, setBoolean2Descr] = useState<string | null>(null);
  const [boolean3descr, setBoolean3Descr] = useState<string | null>(null);
  const [date1descr, setDate1Descr] = useState<string | null>(null);
  const [date2descr, setDate2Descr] = useState<string | null>(null);
  const [date3descr, setDate3Descr] = useState<string | null>(null);

  const handleCreate = async () => {
    if (userId && accessToken) {
      await createCollection({
        body: {
          name,
          theme,
          creatorId: userId,
          description,
          imgUrl,
          string1descr,
          string2descr,
          string3descr,
          number1descr,
          number2descr,
          number3descr,
          text1descr,
          text2descr,
          text3descr,
          boolean1descr,
          boolean2descr,
          boolean3descr,
          date1descr,
          date2descr,
          date3descr,
        },
        token: accessToken,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(goBackPath);
    } else if (isError) console.log(error);
  }, [isSuccess, isError]);

  return (
    <PageContainer>
      <Box display="flex" flexDirection="column" gap="50px">
        <CreateEditCollectionForm
          handleCancel={handleCancel}
          name={name}
          setName={setName}
          theme={theme}
          setTheme={setTheme}
          imgUrl={imgUrl}
          setImgUrl={setImgUrl}
          description={description}
          setDescription={setDescription}
          string1descr={string1descr}
          setString1Descr={setString1Descr}
          string2descr={string2descr}
          setString2Descr={setString2Descr}
          string3descr={string3descr}
          setString3Descr={setString3Descr}
          number1descr={number1descr}
          setNumber1Descr={setNumber1Descr}
          number2descr={number2descr}
          setNumber2Descr={setNumber2Descr}
          number3descr={number3descr}
          setNumber3Descr={setNumber3Descr}
          text1descr={text1descr}
          setText1Descr={setText1Descr}
          text2descr={text2descr}
          setText2Descr={setText2Descr}
          text3descr={text3descr}
          setText3Descr={setText3Descr}
          date1descr={date1descr}
          setDate1Descr={setDate1Descr}
          date2descr={date2descr}
          setDate2Descr={setDate2Descr}
          date3descr={date3descr}
          setDate3Descr={setDate3Descr}
          boolean1descr={boolean1descr}
          setBoolean1Descr={setBoolean1Descr}
          boolean2descr={boolean2descr}
          setBoolean2Descr={setBoolean2Descr}
          boolean3descr={boolean3descr}
          setBoolean3Descr={setBoolean3Descr}
        />
        <Box minWidth="280px" display="flex" justifyContent="center">
          <Button onClick={handleCreate} variant="contained">
            {isLoading ? <Loader /> : 'Create collection'}
          </Button>
        </Box>
      </Box>
    </PageContainer>
  );
}
