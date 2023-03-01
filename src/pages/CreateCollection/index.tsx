import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../store/hooks/redux';
import { RolesEnum } from '../../types';
import { CreateCollectionLayout } from '../../modules';

export function CreateCollection() {
  const { role, id: authId } = useAppSelector((state) => state.authReducer);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      if (id === authId || role === RolesEnum.ADMIN) {
        return;
      }
      navigate(`/personal-account/${id}`);
    }
  }, [id]);

  return id ? <CreateCollectionLayout userId={id} /> : null;
}
