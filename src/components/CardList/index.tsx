import React from 'react';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Pagination,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FavoriteTwoTone } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { dateConverter } from '../../helpers/utils/dateConverter';
import { ICollectionCardList, IItemCardList } from './card-list.type';
import { Tag } from '../../UI';
import { useAppSelector } from '../../store/hooks/redux';

export function CollectionCardList({
  data,
  page,
  handlePage,
  count,
}: ICollectionCardList) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return data.totalCount.totalCount > 0 ? (
    <Box>
      <Grid
        marginBottom="30px"
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        {data.collections.map((collection) => (
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
                    {t('card.theme')}
                    <Typography component="span" fontWeight={700}>
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
                    {t('card.author')}
                    <Typography component="span" fontWeight={700}>
                      {collection.creatorUsername}
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
                    {t('card.items')}
                    <Typography component="span" fontWeight={700}>
                      {collection.itemsCount}
                    </Typography>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {page && (
        <Pagination
          page={page}
          onChange={handlePage}
          count={count}
          color="secondary"
        />
      )}
    </Box>
  ) : (
    <Box display="flex" alignItems="center">
      <Typography> {t('card.empty')}</Typography>
    </Box>
  );
}

export function ItemsCardList({
  data,
  page,
  handlePage,
  count,
}: IItemCardList) {
  const { t } = useTranslation();
  const { id } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  return data.totalCount.totalCount > 0 ? (
    <Box>
      <Grid
        marginBottom="30px"
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
      >
        {data.items.map((item) => (
          <Grid key={item._id} item xs={2} sm={4} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea onClick={() => navigate(`/item/${item._id}`)}>
                <CardHeader
                  title={item.name}
                  subheader={dateConverter(item.createdAt)}
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
                    {t('card.tags')}
                    <Typography
                      component="div"
                      display="flex"
                      gap="2px"
                      fontWeight={700}
                      color="black"
                    >
                      {item.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </Typography>
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      color="text.secondary"
                      display="flex"
                      alignItems="center"
                      gap="5px"
                    >
                      {t('card.collection')}
                      <Typography component="span" fontWeight={700}>
                        {item.collectionName}
                      </Typography>
                    </Typography>
                    <Box display="flex" alignItems="center" gap="2px">
                      <FavoriteTwoTone
                        color={
                          id
                            ? item.likesUsers.includes(id)
                              ? 'error'
                              : 'disabled'
                            : 'disabled'
                        }
                      />
                      <Typography component="span" fontWeight={500}>
                        {item.likesUsers.length}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {page && (
        <Pagination
          page={page}
          onChange={handlePage}
          count={count}
          color="secondary"
        />
      )}
    </Box>
  ) : (
    <Box display="flex" alignItems="center">
      <Typography> {t('card.no_items')}</Typography>
    </Box>
  );
}
