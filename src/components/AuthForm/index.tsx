import { Box, FormControl, Stack, TextField } from '@mui/material';
import React from 'react';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { ValidationMessage } from '../../UI';
import { rtkErrorHandler } from '../../helpers/utils/rtkErrorHandler';
import { IForm } from './form.types';

export function AuthForm({
  buttonText,
  fields,
  isLoading,
  isError,
  error,
  schema,
  onSubmit,
}: IForm) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack
        sx={{
          justifyContent: 'center',
        }}
      >
        {fields.map((field) => (
          <FormControl key={field.name}>
            <TextField
              required
              label={field.label}
              type={field.type}
              {...register(field.name)}
            />
            {errors[field.name] && (
              <ValidationMessage type="error">
                {errors[field.name]?.message as string}
              </ValidationMessage>
            )}
          </FormControl>
        ))}
        {isError && error && (
          <ValidationMessage type="error">
            {rtkErrorHandler(error).message}
          </ValidationMessage>
        )}
        <LoadingButton
          loading={isLoading}
          type="submit"
          size="large"
          variant="contained"
        >
          {buttonText}
        </LoadingButton>
      </Stack>
    </Box>
  );
}
