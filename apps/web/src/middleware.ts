import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
    "/",
    "/auth(.*)",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/__clerk(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();

    // Logged-in user visiting home → dashboard
    if (req.nextUrl.pathname === "/" && userId) {
        return Response.redirect(new URL("/dashboard", req.url));
    }

    // Protect everything except public routes
    if (!isPublicRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
        "/__clerk/(.*)",
    ],
};
