import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collectionsAPI, usersAPI } from '../../store/services';
import { dateConverter } from '../../helpers/utils/dateConverter';
import { Loader } from '../../UI';
import { useAppSelector } from '../../store/hooks/redux';
import { RolesEnum } from '../../types';

export function PersonalAccount() {
  const { role, id: authId } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { id } = useParams<string>();

  const [userId, setUserId] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState();
  const [sortBy, setSortBy] = useState();
  const { data: collectionsData, isSuccess: isCollSuccess } =
    collectionsAPI.useGetUserCollectionsQuery({
      page: 1,
      search,
      sort: [],
      limit: 9,
      id: userId,
    });

  const { data: userData, isSuccess: isUserSuccess } =
    usersAPI.useGetUserQuery(userId);

  useEffect(() => {
    if (id) setUserId(id);
  }, [id]);
  return (
    <Box padding="20px">
      <Box marginBottom="50px">
        {isUserSuccess ? (
          <Box display="flex" justifyContent="space-between">
            <Typography component="h1">
              {userData.username} Collections
            </Typography>
            {(role === RolesEnum.ADMIN || authId === userId) && (
              <Button
                onClick={() => navigate(`/create-collection/${userId}`)}
                size="medium"
                variant="contained"
              >
                <Typography>Create Collection</Typography>
              </Button>
            )}
          </Box>
        ) : (
          <Loader />
        )}
      </Box>

      <Box marginBottom="50px" display="flex" gap="15px">
        <TextField
          onChange={(event) => setSearch(event.target.value)}
          id="standard-basic"
          label="Search"
          variant="outlined"
          size="small"
        />
      </Box>

      {isCollSuccess ? (
        collectionsData.totalCount > 0 ? (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, sm: 8, md: 12 }}
          >
            {collectionsData.collections.map((collection) => (
              <Grid key={collection._id} item xs={2} sm={4} md={4}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea
                    onClick={() => navigate(`/collection/${collection._id}`)}
                  >
                    <CardHeader
                      title={collection.name}
                      subheader={dateConverter(collection.createdAt)}
                    />
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        collection.imgUrl
                          ? collection.imgUrl
                          : 'https://firebasestorage.googleapis.com/v0/b/collections-bc615.appspot.com/o/no-image.jpg?alt=media&token=c5f09dc4-4927-4b75-b5bb-3efde5fd9627'
                      }
                      alt="collection img"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="body1"
                        component="div"
                        color="text.secondary"
                        display="flex"
                        alignItems="center"
                        gap="5px"
                      >
                        Theme:
                        <Typography
                          component="span"
                          fontWeight={700}
                          color="black"
                        >
                          {collection.theme}
                        </Typography>
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        color="text.secondary"
                        display="flex"
                        alignItems="center"
                        gap="5px"
                      >
                        Created by:
                        <Typography
                          component="span"
                          fontWeight={700}
                          color="black"
                        >
                          {collection.creatorUsername}
                        </Typography>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box display="flex" alignItems="center">
            <Typography> No collections yet</Typography>
          </Box>
        )
      ) : (
        <Loader />
      )}
    </Box>
  );
}
