import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { RolesEnum } from '../../types';
import { useAppSelector } from '../../store/hooks/redux';
import { IPageHeader } from './head.types';
import { InfoContainer } from '../../UI';

export function PageHeader({
  handleOpen,
  isDeleteButton = false,
  userId,
  titleText,
  handleClick,
  buttonText,
}: IPageHeader) {
  const { t } = useTranslation();
  const { role, id: authId } = useAppSelector((state) => state.authReducer);
  return (
    <Box marginBottom="25px">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography fontSize="30px" fontWeight={700} component="h1">
          {titleText}
        </Typography>
        {(role === RolesEnum.ADMIN || authId === userId) && (
          <InfoContainer>
            <Button onClick={handleClick} size="medium" variant="contained">
              <Typography>{buttonText}</Typography>
            </Button>
            {isDeleteButton && (
              <Button
                onClick={handleOpen}
                size="medium"
                variant="contained"
                color="error"
              >
                <Typography>{`${t('delete')}`}</Typography>
              </Button>
            )}
          </InfoContainer>
        )}
      </Box>
    </Box>
  );
}
