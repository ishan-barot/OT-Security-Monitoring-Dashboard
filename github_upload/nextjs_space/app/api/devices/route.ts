
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const devices = await prisma.device.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(devices);
  } catch (error) {
    console.error('error fetching devices:', error);
    return NextResponse.json({ error: 'failed to fetch devices' }, { status: 500 });
  }
}
