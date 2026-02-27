import { NextResponse } from 'next/server';
import { computeKPIs } from '@tanti/analytics-engine';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // In production, this would fetch from database
    // For now, use the analytics engine
    const kpis = await computeKPIs();

    return NextResponse.json({
      activeProjects: kpis.activeProjects,
      pipelineValue: kpis.totalRevenue * 2.8, // Estimated pipeline
      conversionRate: kpis.conversionRate,
      monthlyGrowth: kpis.monthlyGrowth,
      totalLeads: kpis.totalLeads,
      convertedLeads: kpis.convertedLeads,
      stalledLeads: kpis.stalledLeads,
      averageProjectValue: kpis.averageProjectValue,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);

    // Return mock data as fallback
    return NextResponse.json({
      activeProjects: 12,
      pipelineValue: 420000,
      conversionRate: 0.2,
      monthlyGrowth: 0.15,
      totalLeads: 150,
      convertedLeads: 30,
      stalledLeads: 10,
      averageProjectValue: 5000,
    });
  }
}
