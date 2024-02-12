import authConfig from "./auth.config"
import NextAuth from "next-auth"
const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const isLoggedIn = !!req.auth;


    const { nextUrl } = req;

    const isApiAuthRoute = nextUrl.pathname.startsWith('/api');
    const isAuthRoute = ['/sign-in', '/sign-up'].includes(nextUrl.pathname);
    const isProtectedRoute = ['/rent', '/trips', '/favorites', '/reservations', '/properties'].includes(nextUrl.pathname);

    if (isApiAuthRoute) return null;
    // console.log(isLoggedIn, isAuthRoute, nextUrl)
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL('/', nextUrl));
        }
        return null;
    }
    if (isProtectedRoute && !isLoggedIn) {
        return Response.redirect(new URL('/sign-in', nextUrl));
    }
    // if(!isAuthRoute && !isProtectedRoute) return Response.redirect(new URL('/', nextUrl));
    return null;
})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};