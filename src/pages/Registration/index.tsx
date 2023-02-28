import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistrationForm } from '../../modules';
import { useAppSelector } from '../../store/hooks/redux';

export function Registration() {
  const { username } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (username) {
      navigate('/');
    }
  }, [username]);
  return <RegistrationForm />;
}
