const IMAGE_RESIZE_URL = "https://resizer.f-ck.me";

export function getProxiedImageUrl(url: string): string {
  return `${IMAGE_RESIZE_URL}/?url=${encodeURIComponent(url)}`;
}

export function isValidUrl(value: string | null): boolean {
  if (!value) return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}
