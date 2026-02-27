import { NextRequest, NextResponse } from 'next/server';
import { clawBotIntegration } from '@tanti/ai-orchestration';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { scope = 'full', depth = 'medium' } = body;

    // Perform system audit via ClawBot
    const result = await clawBotIntegration.submitTask({
      id: `audit-${Date.now()}`,
      type: 'system-audit',
      priority: 'high',
      data: {
        scope,
        depth,
        timestamp: new Date().toISOString()
      }
    });

    return NextResponse.json({
      success: true,
      scope,
      depth,
      result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('ClawBot system audit error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'System audit failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
