// this file is only for learning purposes, 
// to better see what is going on under the hood with Authentication Sessions
// and view the JSON web token (cookie)
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const token = await getToken({ req: request })
    return NextResponse.json(token)
}