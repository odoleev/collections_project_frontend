import React from 'react';
import { useParams } from 'react-router-dom';
import { PersonalAccountLayout } from '../../modules';

export function PersonalAccount() {
  const { id } = useParams();

  return id ? <PersonalAccountLayout userId={id} /> : null;
}
