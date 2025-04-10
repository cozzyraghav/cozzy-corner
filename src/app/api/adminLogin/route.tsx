import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { hash } = body;

  const response = NextResponse.json({ message: 'Hash received' });
  response.cookies.set('hash', hash, {
    httpOnly: true,
    // maxAge: 60 * 60 * 4,
    path: '/',
  });

  return response;
}
