import {useNavigate, useParams} from 'react-router-dom';
import React from 'react';

export function Collection() {
  const navigate = useNavigate();
  const { id } = useParams<string>();
  return <div>Collection</div>;
}
