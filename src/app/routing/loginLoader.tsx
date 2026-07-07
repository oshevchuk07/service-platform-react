import { redirect } from 'react-router';
import { getAccessToken } from '../../shared/lib/tokenStorage';

export function loginLoader() {
  if (getAccessToken()) {
    throw redirect('/app');
  }
  return null;
}
