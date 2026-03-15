/**
 * API route access rules
 *
 * Rules:
 * - true: publicly accessible (no authentication required)
 * - "*": requires any authenticated user
 * - false: not accessible
 */
export const apiRouteRules: { [key: string]: boolean | "*" } = {
  // NextAuth
  "/api/auth/*": true,

  // Registration (public)
  "/api/register": true,

  // Protected routes — add your authenticated API routes here
  "/api/user/*": "*",
}
