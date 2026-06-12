import type { Progress } from '../types';

const DRIVE_API = 'https://www.googleapis.com/drive/v3';
const UPLOAD_API = 'https://www.googleapis.com/upload/drive/v3';

// Progress lives in the private appDataFolder — hidden from the user's
// Drive UI but readable/writable by this app.

async function findProgressFile(accessToken: string, userId: string): Promise<string | null> {
  const q = encodeURIComponent(`name='${userId}.json' and trashed=false`);
  const res = await fetch(`${DRIVE_API}/files?q=${q}&spaces=appDataFolder&fields=files(id,name)`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Drive search failed: ${res.status}`);
  const { files } = await res.json();
  return files?.length ? files[0].id : null;
}

export async function loadProgress(accessToken: string, userId: string): Promise<Progress | null> {
  const fileId = await findProgressFile(accessToken, userId);
  if (!fileId) return null;
  const res = await fetch(`${DRIVE_API}/files/${fileId}?alt=media`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) throw new Error(`Drive read failed: ${res.status}`);
  return res.json();
}

export async function saveProgress(
  accessToken: string,
  userId: string,
  progress: Progress,
): Promise<void> {
  const fileId = await findProgressFile(accessToken, userId);
  const metadata = fileId
    ? { name: `${userId}.json` }
    : { name: `${userId}.json`, parents: ['appDataFolder'] };

  const boundary = '-------gre-trainer-314159';
  const body =
    `--${boundary}\r\n` +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    `${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\n` +
    'Content-Type: application/json\r\n\r\n' +
    `${JSON.stringify(progress)}\r\n` +
    `--${boundary}--`;

  const url = fileId
    ? `${UPLOAD_API}/files/${fileId}?uploadType=multipart`
    : `${UPLOAD_API}/files?uploadType=multipart`;

  const res = await fetch(url, {
    method: fileId ? 'PATCH' : 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body,
  });
  if (!res.ok) throw new Error(`Drive save failed: ${res.status}`);
}

/** Save with up to 3 silent retries (exponential backoff). */
export async function saveProgressWithRetry(
  accessToken: string,
  userId: string,
  progress: Progress,
): Promise<boolean> {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await saveProgress(accessToken, userId, progress);
      return true;
    } catch {
      await new Promise((r) => setTimeout(r, 500 * 2 ** attempt));
    }
  }
  return false;
}
