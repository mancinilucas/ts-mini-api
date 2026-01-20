import { URL } from "url";

export interface ParsedUrl {
  pathname: string;
  query: Record<string, string>;
}

export function parseUrl(
  rawUrl: string | undefined,
  host: string | undefined,
): ParsedUrl {
  if (!rawUrl) {
    return { pathname: "/", query: {} };
  }

  const base = host ? `http://${host}` : "http://localhost";
  const url = new URL(rawUrl, base);

  const query: Record<string, string> = {};
  for (const [key, value] of url.searchParams.entries()) {
    query[key] = value;
  }

  return {
    pathname: url.pathname,
    query,
  };
}
