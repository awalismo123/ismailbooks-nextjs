export type UserRole = "public" | "user" | "admin";

/**
 * Whitelist of valid app path prefixes for return navigation.
 */
const ALLOWED_PATH_PREFIXES = [
  "/dashboard",
  "/books",
  "/summaries",
  "/admin",
  "/profile",
  "/payment",
  "/about",
  "/blog",
];

/**
 * Builds a encoded return target string from a route path and optional UI state.
 */
export function buildReturnTarget(
  fromRoute: string,
  uiState?: Record<string, string | undefined>
): string {
  if (!fromRoute) return "";
  
  try {
    // Separate path from existing query string if any
    const [pathPart, queryPart] = fromRoute.split("?");
    const params = new URLSearchParams(queryPart || "");

    if (uiState) {
      Object.entries(uiState).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "") {
          params.set(key, val);
        }
      });
    }

    const queryString = params.toString();
    const fullPath = queryString ? `${pathPart}?${queryString}` : pathPart;
    return encodeURIComponent(fullPath);
  } catch {
    return encodeURIComponent(fromRoute);
  }
}

/**
 * Decodes and validates a return target parameter.
 * Ensures open-redirect prevention and role security (e.g. non-admins cannot access /admin).
 */
export function parseReturnTarget(
  returnToParam: string | null | undefined,
  userRole: UserRole = "public",
  defaultFallback: string = "/books"
): string {
  if (!returnToParam) {
    return defaultFallback;
  }

  let decoded: string;
  try {
    decoded = decodeURIComponent(returnToParam);
  } catch {
    return defaultFallback;
  }

  // Security check: Must start with a single '/' and not '//' or contain protocol scheme (prevents Open Redirects)
  if (!decoded.startsWith("/") || decoded.startsWith("//") || decoded.includes("://")) {
    return defaultFallback;
  }

  // Extract path without query parameters for validation
  const pathOnly = decoded.split("?")[0];

  // Whitelist check
  const isAllowed = ALLOWED_PATH_PREFIXES.some(
    (prefix) => pathOnly === prefix || pathOnly.startsWith(`${prefix}/`)
  );

  if (!isAllowed) {
    return defaultFallback;
  }

  // Role security check: Non-admins cannot be returned to /admin routes
  if (pathOnly.startsWith("/admin") && userRole !== "admin") {
    return userRole === "user" ? "/dashboard" : "/books";
  }

  return decoded;
}
