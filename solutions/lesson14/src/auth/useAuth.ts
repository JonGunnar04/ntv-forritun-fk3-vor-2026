import { useContext } from 'react';
import { AuthContext } from './auth-context';

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth þarf að vera innan AuthProvider');
  }
  return ctx;
}
