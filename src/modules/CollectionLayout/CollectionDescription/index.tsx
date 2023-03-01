import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Markdown from 'markdown-to-jsx';
import { useNavigate } from 'react-router-dom';
import { DeleteDialog, PageHeader } from '../../../components';
import { Clickable, InfoContainer, StyledCollectionImage } from '../../../UI';
import { dateConverter } from '../../../helpers/utils/dateConverter';
import { ICollectionDescription } from './collection-description.types';

export function CollectionDescription({
  handleCloseDelete,
  handleDelete,
  handleOpenDelete,
  deleteOpen,
  handleEditButton,
  collectionData,
}: ICollectionDescription) {
  const navigate = useNavigate();
  const additionalTitles = [
    { title: collectionData.string1descr, id: 1 },
    { title: collectionData.string2descr, id: 2 },
    { title: collectionData.string3descr, id: 3 },
    { title: collectionData.number1descr, id: 4 },
    { title: collectionData.number2descr, id: 5 },
    { title: collectionData.number3descr, id: 6 },
    { title: collectionData.text1descr, id: 7 },
    { title: collectionData.text2descr, id: 8 },
    { title: collectionData.text3descr, id: 9 },
    { title: collectionData.date1descr, id: 10 },
    { title: collectionData.date2descr, id: 11 },
    { title: collectionData.date3descr, id: 12 },
    { title: collectionData.boolean1descr, id: 13 },
    { title: collectionData.boolean2descr, id: 14 },
    { title: collectionData.boolean3descr, id: 15 },
  ];
  return (
    <Box display="flex" flexDirection="column" gap="25px">
      <PageHeader
        isDeleteButton
        titleText={collectionData.name}
        buttonText="Edit"
        userId={collectionData.creatorId}
        handleClick={handleEditButton}
        handleOpen={handleOpenDelete}
      />
      <DeleteDialog
        open={deleteOpen}
        handleClose={handleCloseDelete}
        handleConfirm={handleDelete}
      />
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <Box display="flex" flexDirection="column" gap="25px">
            <Box>
              <InfoContainer>
                <Typography color="text.secondary">Created:</Typography>
                <Typography fontWeight={600}>
                  {dateConverter(collectionData.createdAt)}
                </Typography>
              </InfoContainer>
              <InfoContainer>
                <Typography color="text.secondary">Theme:</Typography>
                <Typography fontWeight={600}>{collectionData.theme}</Typography>
              </InfoContainer>
              <InfoContainer>
                <Typography color="text.secondary">Items:</Typography>
                <Typography fontWeight={600}>
                  {collectionData.itemsCount}
                </Typography>
              </InfoContainer>
              <InfoContainer>
                <Typography color="text.secondary">Author:</Typography>
                <Clickable
                  onClick={() =>
                    navigate(`/personal-account/${collectionData.creatorId}`)
                  }
                  fontWeight={600}
                >
                  {collectionData.creatorUsername}
                </Clickable>
              </InfoContainer>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          {collectionData.imgUrl ? (
            <StyledCollectionImage
              src={collectionData.imgUrl}
              alt="collection image"
            />
          ) : null}
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Box flexDirection="column">
            <Typography color="text.secondary">
              Additional items options:
            </Typography>

            <Box display="flex" flexDirection="column">
              {additionalTitles.map((title) => (
                <Typography key={title.id} fontWeight={600}>
                  {title.title}
                </Typography>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box>
        <Markdown>{collectionData.description}</Markdown>
      </Box>
    </Box>
  );
}
