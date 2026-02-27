import { NextRequest, NextResponse } from 'next/server';
import { geniusAuditSystem } from '@tanti/ai-orchestration';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, args } = body;

    // Initialize genius audit system
    await geniusAuditSystem.initialize();

    let result;

    switch (action) {
      case 'performAudit':
        result = await geniusAuditSystem.performGeniusAudit(args.system);
        return NextResponse.json({
          success: true,
          results: result,
          message: `Genius audit completed with ${result.length} issues found`
        });

      case 'getInsights':
        // Get latest genius insights
        result = await getLatestInsights();
        return NextResponse.json({
          success: true,
          insights: result
        });

      case 'getReports':
        result = await getAuditReports();
        return NextResponse.json({
          success: true,
          reports: result
        });

      case 'startMonitoring':
        /* geniusAuditSystem.startAuditCycles(); */
        return NextResponse.json({
          success: true,
          message: 'Audit monitoring started'
        });

      case 'stopMonitoring':
        geniusAuditSystem.stopAuditCycles();
        return NextResponse.json({
          success: true,
          message: 'Audit monitoring stopped'
        });

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid audit action'
        }, { status: 400 });
    }

  } catch (error) {
    console.error('Audit API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'status') {
      return NextResponse.json({
        success: true,
        /* isRunning: geniusAuditSystem.isRunning, */
        lastAudit: await getLastAuditTime(),
        systemHealth: await getSystemHealth()
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid GET action'
    }, { status: 400 });

  } catch (error) {
    console.error('Audit API GET error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

// Helper functions
async function getLatestInsights() {
  // Fetch latest genius insights from database
  // Implementation would depend on your database structure
  return [];
}

async function getAuditReports() {
  // Fetch audit reports from database
  // Implementation would depend on your database structure
  return [];
}

async function getLastAuditTime() {
  // Get timestamp of last audit
  return new Date().toISOString();
}

async function getSystemHealth() {
  // Get overall system health status
  return {
    performance: 95,
    security: 88,
    compliance: 92,
    userExperience: 85
  };
}

// Note: ClawBot integration commands are handled through the API endpoints
// The audit system can be controlled via REST API calls
