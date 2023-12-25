import { NextURL } from "next/dist/server/web/next-url";
import { auth } from "./auth";

function redirectTo(path: string, nextUrl: NextURL) {
  return Response.redirect(new URL(path, nextUrl));
}

export default auth(({ auth, nextUrl }) => {
  const isLoggedIn = !!auth?.user;
  const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
  const isAuthPage = nextUrl.pathname.startsWith("/auth");

  if (isOnDashboard && !isLoggedIn) {
    return redirectTo("/auth/login", nextUrl);
  }
  if (isLoggedIn && isAuthPage) {
    return redirectTo("/dashboard", nextUrl);
  }
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
