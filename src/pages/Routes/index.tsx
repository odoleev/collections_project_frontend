import { Navigate } from 'react-router-dom';
import { RolesEnum } from '../../types';
import { useGetRole } from '../../helpers/hooks';

export function PublicElement({ children }: { children: JSX.Element }) {
  return <div>{children}</div>;
}

export function UserElement({ children }: { children: JSX.Element }) {
  const role = useGetRole();
  if (role === RolesEnum.USER || role === RolesEnum.ADMIN) {
    return <div>{children}</div>;
  }
  return <Navigate to="/" />;
}

export function AdminElement({ children }: { children: JSX.Element }) {
  const role = useGetRole();
  if (role === RolesEnum.ADMIN) {
    return <div>{children}</div>;
  }
  return <Navigate to="/" />;
}
