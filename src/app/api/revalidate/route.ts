import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(request: NextRequest) {
  // const secret = request.nextUrl.searchParams.get('secret');

  // if (secret !== process.env.REVALIDATION_SECRET) {
  //   return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  // }

  // Revalidate only one charity details page: /charities/<id>
  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json(
      { message: 'Missing required query param: id' },
      { status: 400 },
    );
  }

  const path = `/charities/${id}`;
  revalidatePath(path, 'page');

  return NextResponse.json({
    revalidated: true,
    path,
    timestamp: new Date().toISOString(),
  });
}
