/**
 * Page route access rules
 *
 * Rules:
 * - true: publicly accessible (no authentication required)
 * - "*": requires any authenticated user
 * - false: not accessible
 */
export const pageRouteRules: { [key: string]: boolean | "*" } = {
  // Public pages
  "/": true,
  "/login": true,
  "/signup": true,

  // Protected pages — add your authenticated page routes here
  "/dashboard/*": "*",
}
