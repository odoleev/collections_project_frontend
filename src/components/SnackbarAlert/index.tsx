import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { setAlert } from '../../store/reducers/alertSlice';

export function SnackbarAlert() {
  const { isOpen, text, type } = useAppSelector((state) => state.alertReducer);
  const dispatch = useAppDispatch();
  const vertical = 'top';
  const horizontal = 'center';
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setAlert({ isOpen: false, type: undefined, text: '' }));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      key={vertical + horizontal}
      open={isOpen}
      autoHideDuration={1000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  );
}
