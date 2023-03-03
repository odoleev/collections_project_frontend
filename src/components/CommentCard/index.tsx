import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ICommentCard } from './comment-card.types';
import { Clickable, CommentWrapper } from '../../UI';
import { dateConverter } from '../../helpers/utils/dateConverter';
import {useTranslation} from "react-i18next";

export function CommentCard({
  authorId,
  author,
  text,
  createdAt,
}: ICommentCard) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <CommentWrapper>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Box display="flex" alignItems="center" gap="5px" marginBottom="10px">
            <Typography
              component="h4"
              fontWeight={600}
              margin="0"
              textAlign="left"
            >
              {t('comment.from')}
            </Typography>
            <Clickable
              onClick={() => navigate(`/personal-account/${authorId}`)}
              fontWeight={600}
            >
              {author}
            </Clickable>
          </Box>

          <Typography marginBottom="15px" component="p" textAlign="left">
            {text}
          </Typography>
          <Typography component="p" color="gray" textAlign="left">
            {dateConverter(createdAt)}
          </Typography>
        </Grid>
      </Grid>
    </CommentWrapper>
  );
}
