import { siteConfig } from "@/data/siteConfig";

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

export const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term"
] as const;

export function readUtmFromUrl(searchParams: URLSearchParams): UtmParams {
  return UTM_KEYS.reduce<UtmParams>((params, key) => {
    const value = searchParams.get(key);
    if (value) {
      params[key] = value;
    }
    return params;
  }, {});
}

export function hasUtm(params: UtmParams) {
  return Object.values(params).some(Boolean);
}

export function storeUtmParams(params: UtmParams) {
  if (typeof window === "undefined" || !hasUtm(params)) return;
  window.sessionStorage.setItem(siteConfig.utmStorageKey, JSON.stringify(params));
}

export function getStoredUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};

  try {
    const value = window.sessionStorage.getItem(siteConfig.utmStorageKey);
    return value ? (JSON.parse(value) as UtmParams) : {};
  } catch {
    return {};
  }
}

export function captureUtmFromCurrentUrl() {
  if (typeof window === "undefined") return {};
  const params = readUtmFromUrl(new URLSearchParams(window.location.search));
  storeUtmParams(params);
  return hasUtm(params) ? params : getStoredUtmParams();
}

export function appendUtmToHref(href: string, params: UtmParams = getStoredUtmParams()) {
  if (!hasUtm(params)) return href;

  const isAbsolute = /^https?:\/\//.test(href);
  const base = isAbsolute ? undefined : window.location.origin;
  const url = new URL(href, base);

  UTM_KEYS.forEach((key) => {
    const value = params[key];
    if (value && !url.searchParams.has(key)) {
      url.searchParams.set(key, value);
    }
  });

  if (isAbsolute) {
    return url.toString();
  }

  return `${url.pathname}${url.search}${url.hash}`;
}

export function appendUtmToUrlServer(url: string, searchParams: URLSearchParams) {
  const destination = new URL(url);

  UTM_KEYS.forEach((key) => {
    const value = searchParams.get(key);
    if (value && !destination.searchParams.has(key)) {
      destination.searchParams.set(key, value);
    }
  });

  return destination.toString();
}
