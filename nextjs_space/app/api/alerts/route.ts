
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request?.url ?? '');
    const severity = searchParams?.get?.('severity') ?? null;
    const technique = searchParams?.get?.('technique') ?? null;

    // build filter conditions
    const where: any = {};
    
    if (severity && severity !== 'all') {
      where.severity = severity;
    }
    
    if (technique && technique !== 'all') {
      where.mitreId = technique;
    }

    const alerts = await prisma.alert.findMany({
      where,
      orderBy: {
        timestamp: 'desc'
      }
    });

    return NextResponse.json(alerts);
  } catch (error) {
    console.error('error fetching alerts:', error);
    return NextResponse.json({ error: 'failed to fetch alerts' }, { status: 500 });
  }
}
