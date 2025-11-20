
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const items = await prisma.complianceItem.findMany({
      orderBy: {
        controlId: 'asc'
      }
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('error fetching compliance items:', error);
    return NextResponse.json({ error: 'failed to fetch compliance items' }, { status: 500 });
  }
}
