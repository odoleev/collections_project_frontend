import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks/redux';
import { authAPI } from '../../store/services';
import { setUser, setAlert } from '../../store/reducers';
import { loginSchema } from '../../helpers/schemas';
import { IFormField } from '../../types';
import { AuthForm } from '../../components';

interface FormInputs {
  email: string;
  password: string;
}

export function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginFormFields: Array<IFormField> = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
    },
  ];

  const [
    login,
    {
      data: loginData,
      error: loginError,
      isSuccess: isLoginSuccess,
      isLoading: isLoginLoading,
      isError: isLoginError,
    },
  ] = authAPI.useLoginMutation();

  const handleLogin = async (data: FormInputs) => {
    await login(data);
  };

  useEffect(() => {
    if (isLoginSuccess && loginData) {
      if (loginData.banStatus) {
        dispatch(
          setAlert({
            isOpen: true,
            type: 'error',
            text: 'This user is banned!',
          })
        );
        return;
      }
      dispatch(
        setUser({
          username: loginData.username,
          role: loginData.role,
          accessToken: loginData.tokens.accessToken,
          refreshToken: loginData.tokens.refreshToken,
          banStatus: loginData.banStatus,
          id: loginData.id,
        })
      );
      navigate('/personal-account');
    }
  }, [isLoginSuccess]);

  return (
    <Box
      component="section"
      justifyContent="center"
      alignItems="center"
      display="flex"
    >
      <AuthForm
        buttonText="Sign in"
        fields={loginFormFields}
        schema={loginSchema}
        error={loginError}
        isError={isLoginError}
        isLoading={isLoginLoading}
        onSubmit={handleLogin}
      />
    </Box>
  );
}
