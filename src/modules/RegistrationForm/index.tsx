import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { authAPI } from '../../store/services';
import { setAlert } from '../../store/reducers';
import { IFormField } from '../../types';
import { registrationSchema } from '../../helpers/schemas';
import { AuthForm } from '../../components';
import { PageContainer } from '../../UI';

interface FormInputs {
  email: string;
  username: string;
  password: string;
}

export function RegistrationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registrationFormFields: Array<IFormField> = [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
    },
    { name: 'username', type: 'text', label: 'Username' },
    {
      name: 'password',
      type: 'password',
      label: 'Password',
    },
    {
      name: 'confirmPassword',
      type: 'password',
      label: 'Confirm Password',
    },
  ];

  const [
    registration,
    {
      error: registrationError,
      isSuccess: isRegistrationSuccess,
      isLoading: isRegistrationLoading,
      isError: isRegistrationError,
    },
  ] = authAPI.useRegistrationMutation();

  const handleRegistration = async (data: FormInputs) => {
    await registration(data);
  };

  useEffect(() => {
    if (isRegistrationSuccess) {
      dispatch(
        setAlert({
          isOpen: true,
          text: 'Successfully signed up!',
          type: 'success',
        })
      );
      navigate('/login');
    }
  }, [isRegistrationSuccess]);
  return (
    <PageContainer>
      <Box
        component="section"
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <AuthForm
          buttonText="Sign up"
          onSubmit={handleRegistration}
          isLoading={isRegistrationLoading}
          isError={isRegistrationError}
          error={registrationError}
          schema={registrationSchema}
          fields={registrationFormFields}
        />
      </Box>
    </PageContainer>
  );
}
