import React from 'react';
import { Paper, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CommentWrapper } from '../../UI';

export function NoComments() {
  const { t } = useTranslation();
  return (
    <CommentWrapper sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography component="h3" fontWeight={700} fontSize="30px">
        {t('item.see_comments')}
      </Typography>
    </CommentWrapper>
  );
}
