import { useParams } from 'react-router-dom';
import React from 'react';
import { ItemLayout } from '../../modules';

export function ItemPage() {
  const { id } = useParams<string>();

  return id ? <ItemLayout itemId={id} /> : null;
}
