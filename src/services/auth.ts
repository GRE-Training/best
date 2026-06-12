import type { User } from '../types';

export const GOOGLE_CLIENT_ID: string = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? '';
export const GOOGLE_CONFIGURED = GOOGLE_CLIENT_ID.length > 0;

export const OAUTH_SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets.readonly',
  'https://www.googleapis.com/auth/drive.appdata',
  'profile',
  'email',
].join(' ');

export async function fetchUserInfo(accessToken: string): Promise<User> {
  const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`userinfo failed: ${res.status}`);
  const info = await res.json();
  return {
    id: info.sub,
    email: info.email ?? '',
    name: info.name ?? '',
    givenName: info.given_name ?? (info.name ?? '').split(' ')[0],
    picture: info.picture,
  };
}

export function demoUser(): User {
  return {
    id: 'demo-user',
    email: 'demo@local',
    name: 'Demo User',
    givenName: 'Demo',
    demo: true,
  };
}
