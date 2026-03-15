import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { pageRouteRules } from "./config/routeRules/pageRoutes"
import { apiRouteRules } from "./config/routeRules/apiRoutes"
import { getToken } from "next-auth/jwt"

interface RouteRules {
  [key: string]: boolean | string
}

function getApplicableRules(path: string): RouteRules {
  if (path.startsWith("/api/")) return apiRouteRules
  else return pageRouteRules
}

function matchRoute(path: string, routes: RouteRules): string | undefined {
  if (path in routes) return path

  const matchingWildcard = Object.keys(routes).find(
    (rule) => rule.endsWith("/*") && path.startsWith(rule.replace("/*", "")),
  )

  return matchingWildcard
}

function isAccessAllowed(rule: boolean | string, isAuthenticated: boolean): boolean {
  if (rule === true) return true
  else if (rule === "*") return isAuthenticated
  return false
}

function shouldAuthorize(request: NextRequest, isAuthenticated: boolean): boolean {
  const path = request.nextUrl.pathname

  // exclude static assets
  if (path.includes(".")) return true

  const routes = getApplicableRules(path)
  const matchedRoute = matchRoute(path, routes)

  if (matchedRoute) return isAccessAllowed(routes[matchedRoute], isAuthenticated)

  // deny by default if no rule matches
  return false
}

export async function proxy(request: NextRequest) {
  const nextauthToken = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  if (nextauthToken) {
    if (!shouldAuthorize(request, true)) return NextResponse.redirect(`${request.nextUrl.origin}/`)
    else return NextResponse.next()
  } else {
    const isAuthorized = shouldAuthorize(request, false)
    if (isAuthorized) return NextResponse.next()
    else return NextResponse.redirect(`${request.nextUrl.origin}/`)
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|_vercel|[\\w-]+\\.\\w+).*)"],
}
