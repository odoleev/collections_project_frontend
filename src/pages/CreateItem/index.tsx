import React from 'react';
import { useParams } from 'react-router-dom';
import { CreateItemLayout } from '../../modules';

export function CreateItem() {
  const { id } = useParams();

  return id ? <CreateItemLayout collectionId={id} /> : null;
}
