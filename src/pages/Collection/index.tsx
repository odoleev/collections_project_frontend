import { useParams } from 'react-router-dom';
import React from 'react';
import { CollectionLayout } from '../../modules';

export function Collection() {
  const { id } = useParams<string>();

  return id ? <CollectionLayout collectionId={id} /> : null;
}
