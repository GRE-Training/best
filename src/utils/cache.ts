const TTL_MS = 24 * 60 * 60 * 1000; // 24h problem cache, per spec

interface CacheEntry<T> {
  savedAt: number;
  data: T;
}

export function cacheSet<T>(key: string, data: T): void {
  try {
    const entry: CacheEntry<T> = { savedAt: Date.now(), data };
    localStorage.setItem(`gre-cache:${key}`, JSON.stringify(entry));
  } catch {
    // storage full or unavailable — caching is best-effort
  }
}

export function cacheGet<T>(key: string, ignoreTtl = false): T | null {
  try {
    const raw = localStorage.getItem(`gre-cache:${key}`);
    if (!raw) return null;
    const entry = JSON.parse(raw) as CacheEntry<T>;
    if (!ignoreTtl && Date.now() - entry.savedAt > TTL_MS) return null;
    return entry.data;
  } catch {
    return null;
  }
}

export function cacheClear(prefix = ''): void {
  const doomed: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(`gre-cache:${prefix}`)) doomed.push(key);
  }
  doomed.forEach((k) => localStorage.removeItem(k));
}
