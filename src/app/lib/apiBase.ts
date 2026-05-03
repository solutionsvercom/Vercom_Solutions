/**
 * In development, call the Express server directly on port 5000.
 * This avoids Vite’s proxy sometimes dropping or altering `x-admin-key` and matches CORS on the API.
 * In production, use same-origin `/api` (reverse proxy).
 */
const DEV_API_ORIGIN = `http://127.0.0.1:${import.meta.env.VITE_API_PORT ?? '5000'}`;

export function apiUrl(path: string): string {
  if (!path.startsWith('/')) {
    return `${DEV_API_ORIGIN}/${path}`;
  }
  if (import.meta.env.DEV) {
    return `${DEV_API_ORIGIN}${path}`;
  }
  return path;
}
