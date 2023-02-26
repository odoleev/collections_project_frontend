import { useAppSelector } from '../../store/hooks/redux';

export function useGetToken() {
  return useAppSelector((state) => state.authReducer.role);
}
