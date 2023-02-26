import { useAppSelector } from '../../store/hooks/redux';

export function useGetRole() {
  return useAppSelector((state) => state.authReducer.role);
}
