
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const rules = await prisma.detectionRule.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(rules);
  } catch (error) {
    console.error('error fetching detection rules:', error);
    return NextResponse.json({ error: 'failed to fetch detection rules' }, { status: 500 });
  }
}
