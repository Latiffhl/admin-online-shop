import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Tentukan rute publik
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/api/public(.*)']);

export default clerkMiddleware(async (auth, request) => {
  console.log('Request URL:', request.url);

  if (!isPublicRoute(request)) {
    console.log('Protected route, authenticating...');
    await auth.protect();
  } else {
    console.log('Public route, no authentication required.');
  }
});

export const config = {
  matcher: ['/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)', '/(api|trpc)(.*)'],
};
