
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import type { Device, Alert, ComplianceItem } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // get device counts by status
    const devices = await prisma.device.findMany();
    const deviceStats = {
      total: devices?.length ?? 0,
      online: devices?.filter?.((d: Device) => d?.status === 'online')?.length ?? 0,
      warning: devices?.filter?.((d: Device) => d?.status === 'warning')?.length ?? 0,
      critical: devices?.filter?.((d: Device) => d?.status === 'critical')?.length ?? 0,
      offline: devices?.filter?.((d: Device) => d?.status === 'offline')?.length ?? 0
    };

    // get alert counts by severity
    const alerts = await prisma.alert.findMany();
    const alertStats = {
      total: alerts?.length ?? 0,
      critical: alerts?.filter?.((a: Alert) => a?.severity === 'critical')?.length ?? 0,
      high: alerts?.filter?.((a: Alert) => a?.severity === 'high')?.length ?? 0,
      medium: alerts?.filter?.((a: Alert) => a?.severity === 'medium')?.length ?? 0,
      low: alerts?.filter?.((a: Alert) => a?.severity === 'low')?.length ?? 0,
      open: alerts?.filter?.((a: Alert) => a?.status === 'open')?.length ?? 0,
      investigating: alerts?.filter?.((a: Alert) => a?.status === 'investigating')?.length ?? 0
    };

    // compliance score
    const compliance = await prisma.complianceItem.findMany();
    const complianceStats = {
      total: compliance?.length ?? 0,
      compliant: compliance?.filter?.((c: ComplianceItem) => c?.status === 'compliant')?.length ?? 0,
      partial: compliance?.filter?.((c: ComplianceItem) => c?.status === 'partial')?.length ?? 0,
      nonCompliant: compliance?.filter?.((c: ComplianceItem) => c?.status === 'non-compliant')?.length ?? 0,
      score: Math.round(((compliance?.filter?.((c: ComplianceItem) => c?.status === 'compliant')?.length ?? 0) / (compliance?.length ?? 1)) * 100)
    };

    return NextResponse.json({
      devices: deviceStats,
      alerts: alertStats,
      compliance: complianceStats
    });
  } catch (error) {
    console.error('error fetching stats:', error);
    return NextResponse.json({ error: 'failed to fetch stats' }, { status: 500 });
  }
}
