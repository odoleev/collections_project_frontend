import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { IDeleteDialog } from './delete-dialog.types';

export function DeleteDialog({
  open,
  handleClose,
  handleConfirm,
}: IDeleteDialog) {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {t('dialog_delete')}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{t('cancel')}</Button>
        <Button onClick={handleConfirm}>{t('confirm')}</Button>
      </DialogActions>
    </Dialog>
  );
}
