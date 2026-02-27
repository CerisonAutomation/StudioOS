import { NextRequest, NextResponse } from 'next/server';
import { clawBotIntegration } from '@tanti/ai-orchestration';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, type, priority = 'normal', data = {} } = body;

    if (!id || !type) {
      return NextResponse.json(
        { error: 'Task id and type are required' },
        { status: 400 }
      );
    }

    // Submit task to ClawBot
    const result = await clawBotIntegration.submitTask({
      id,
      type,
      priority,
      data,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      taskId: id,
      status: 'submitted',
      message: 'Task submitted successfully',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('ClawBot task processing error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Task processing failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
