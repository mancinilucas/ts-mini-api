export interface MatchResult {
  matched: boolean;
  params: Record<string, string>;
}

export function matchRoute(
  routePath: string,
  requestPath: string,
): MatchResult {
  const routeParts = routePath.split("/").filter(Boolean);
  const requestParts = requestPath.split("/").filter(Boolean);

  if (routeParts.length !== requestParts.length) {
    return { matched: false, params: {} };
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < routeParts.length; i++) {
    const routePart = routeParts[i];
    const requestPart = requestParts[i];

    if (routePart === undefined || requestPart === undefined) {
      return { matched: false, params: {} };
    }

    if (routePart.startsWith(":")) {
      const paramName = routePart.slice(1);
      params[paramName] = requestPart;
      continue;
    }

    if (routePart !== requestPart) {
      return { matched: false, params: {} };
    }
  }

  return { matched: true, params };
}
