import { redirect } from 'react-router';
import { getAccessToken } from '../../shared/lib/tokenStorage';

export function authLoader() {
  if (!getAccessToken()) {
    throw redirect('/login');
  }
  return null;
}
