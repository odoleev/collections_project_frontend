import React, {useEffect, useRef, useState} from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ICollectionLayout } from './collection-layout.types';
import { collectionsAPI, itemsAPI } from '../../store/services';
import { Loader, PageContainer } from '../../UI';
import { IncorrectID, ItemsCardList, SortAndSearch } from '../../components';
import { CreateEditCollectionForm } from '../CreateEditCollectionForm';
import { CollectionThemesEnum, ISortOptions, RolesEnum } from '../../types';
import { useAppSelector } from '../../store/hooks/redux';
import { CollectionDescription } from './CollectionDescription';

export function CollectionLayout({ collectionId }: ICollectionLayout) {
  const navigate = useNavigate();
  const { id, accessToken, role } = useAppSelector(
    (state) => state.authReducer
  );
  const lastElement = useRef();
  const [isEdit, setEdit] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [sort, setSort] = useState<[string, -1 | 1]>(['createdAt', -1]);

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
      title: 'Name (descending)',
      sort: ['name', -1],
    },
    {
      title: 'Name (ascending)',
      sort: ['name', 1],
    },
  ];

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

  const handleAddItem = () => {
    navigate(`/create-item/${collectionId}`);
  };

  const {
    data: itemsData,
    isSuccess: isItemsSuccess,
    isError: isItemsError,
    isLoading: isItemsLoading,
    error: collectionsError,
  } = itemsAPI.useGetCollectionItemsQuery({
    search,
    sort,
    id: collectionId,
  });

  const {
    data: collectionData,
    isError: isCollError,
    isLoading: isCollLoading,
    isSuccess: isCollSuccess,
    error: collError,
  } = collectionsAPI.useGetCollectionQuery(collectionId);

  const [
    editCollection,
    {
      isError: isEditError,
      isLoading: isEditLoading,
      isSuccess: isEditSuccess,
      error: editError,
    },
  ] = collectionsAPI.useEditCollectionMutation();

  const [
    deleteCollection,
    {
      isError: isDeleteError,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      error: deleteError,
    },
  ] = collectionsAPI.useDeleteCollectionMutation();

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

  const handleEdit = async () => {
    if (accessToken) {
      await editCollection({
        body: {
          name,
          theme,
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
        id: collectionId,
        token: accessToken,
      });
    }
  };

  const handleDelete = async () => {
    if (accessToken) {
      await deleteCollection({ id: collectionId, token: accessToken });
    }
  };

  useEffect(() => {
    if (isCollSuccess && collectionData) {
      setName(collectionData.name);
      setTheme(collectionData.theme);
      setImgUrl(collectionData.imgUrl);
      setDescription(collectionData.description);
      setString1Descr(collectionData.string1descr);
      setString2Descr(collectionData.string2descr);
      setString3Descr(collectionData.string3descr);
      setNumber1Descr(collectionData.number1descr);
      setNumber2Descr(collectionData.number2descr);
      setNumber3Descr(collectionData.number3descr);
      setText1Descr(collectionData.text1descr);
      setText2Descr(collectionData.text2descr);
      setText3Descr(collectionData.text3descr);
      setBoolean1Descr(collectionData.boolean1descr);
      setBoolean2Descr(collectionData.boolean2descr);
      setBoolean3Descr(collectionData.boolean3descr);
      setDate1Descr(collectionData.date1descr);
      setDate2Descr(collectionData.date2descr);
      setDate3Descr(collectionData.date3descr);
    }
  }, [isCollSuccess]);

  useEffect(() => {
    if (isEditSuccess) {
      setEdit(false);
    } else if (isEditError) console.log(editError);
  }, [isEditSuccess, isEditError]);

  useEffect(() => {
    if (isItemsError) {
      console.log(collectionsError);
    }
  }, [isItemsError]);

  useEffect(() => {
    if (isDeleteSuccess && collectionData) {
      navigate(`/personal-account/${collectionData.creatorId}`);
    } else if (isDeleteError) console.log(deleteError);
  }, [isDeleteError, isDeleteSuccess]);

  return isCollError || !collectionData ? (
    <PageContainer>
      <IncorrectID>No Collection with such id</IncorrectID>
    </PageContainer>
  ) : (
    <PageContainer>
      {!isCollLoading ? (
        isCollSuccess && collectionData ? (
          isEdit ? (
            <Box display="flex" flexDirection="column" gap="50px">
              <CreateEditCollectionForm
                isEdit
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
                <Button onClick={handleEdit} variant="contained">
                  {isEditLoading ? <Loader /> : 'Edit collection'}
                </Button>
              </Box>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap="30px">
              <CollectionDescription
                collectionData={collectionData}
                handleEditButton={handleEditButton}
                handleOpenDelete={handleOpenDelete}
                deleteOpen={deleteOpen}
                handleCloseDelete={handleCloseDelete}
                handleDelete={handleDelete}
              />
              <Box>
                <Box
                  alignItems="start"
                  display="flex"
                  justifyContent="space-between"
                >
                  <SortAndSearch
                    setSearch={setSearch}
                    setSort={setSort}
                    options={sortOptions}
                    sort={sort}
                  />
                  {(collectionData.creatorId === id ||
                    role === RolesEnum.ADMIN) && (
                    <Button
                      onClick={handleAddItem}
                      size="small"
                      variant="contained"
                    >
                      <Typography>Add item</Typography>
                    </Button>
                  )}
                </Box>

                {isItemsSuccess ? (
                  <ItemsCardList data={itemsData} />
                ) : isItemsLoading ? (
                  <Loader />
                ) : (
                  <Typography>Server Error</Typography>
                )}
              </Box>
            </Box>
          )
        ) : (
          <IncorrectID>No Collection with such id</IncorrectID>
        )
      ) : (
        <Loader />
      )}
    </PageContainer>
  );
}
