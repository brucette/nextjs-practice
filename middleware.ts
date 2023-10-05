//import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";

// how it would look if you code it yourself
// we don't need to code it however, as already comes with next-auth:

// export function middleware(request: NextRequest) {
//     return NextResponse.redirect(new URL('/new-page', request.url))
// }

export const config = {
    // *: zero or more parameters
    // +: one or more
    // ?: zero or none
    matcher: ['/dashboard/:path*']
} 