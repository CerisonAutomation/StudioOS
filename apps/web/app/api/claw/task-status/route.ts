import { NextRequest, NextResponse } from 'next/server';
import { clawBotIntegration } from '@tanti/ai-orchestration';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const taskId = searchParams.get('taskId');

    if (!taskId) {
      return NextResponse.json(
        { error: 'Task id is required' },
        { status: 400 }
      );
    }

    // Get task status from ClawBot
    const result = await clawBotIntegration.submitTask({
      id: `status-${Date.now()}`,
      type: 'get-task-status',
      priority: 'low',
      data: {
        taskId,
        timestamp: new Date().toISOString()
      }
    });

    return NextResponse.json({
      success: true,
      taskId,
      status: result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('ClawBot task status error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to get task status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
