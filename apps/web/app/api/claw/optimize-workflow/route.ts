import { NextRequest, NextResponse } from 'next/server';
import { clawBotIntegration } from '@tanti/ai-orchestration';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workflow, optimizationGoals = ['efficiency', 'cost'] } = body;

    if (!workflow) {
      return NextResponse.json(
        { error: 'Workflow definition is required' },
        { status: 400 }
      );
    }

    // Optimize workflow via ClawBot
    const result = await clawBotIntegration.submitTask({
      id: `workflow-${Date.now()}`,
      type: 'optimize-workflow',
      priority: 'medium',
      data: {
        workflow,
        optimizationGoals,
        timestamp: new Date().toISOString()
      }
    });

    return NextResponse.json({
      success: true,
      workflow,
      optimizationGoals,
      result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('ClawBot workflow optimization error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Workflow optimization failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
