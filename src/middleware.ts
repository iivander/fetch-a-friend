import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/auth";

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const session = await auth();

    // If user is logged in and tries to access `/` or `/login`, redirect to `/main`
    if (session && session.expires && new Date(session.expires) > new Date()) {
        if (pathname === "/" || pathname === "/login") {
            return NextResponse.redirect(new URL("/main", req.url));
        }
    }

    // If user is NOT logged in, protect certain routes
    if (!session || !session.expires || new Date(session.expires) < new Date()) {
        if (["/main", "/favorites"].includes(pathname)) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login", "/main", "/favorites"], // Add more protected routes if needed
};
