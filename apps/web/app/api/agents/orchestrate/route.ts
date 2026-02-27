import { NextRequest, NextResponse } from 'next/server';
import { HorusMaster } from '@tanti/core-agent';

const horus = new HorusMaster();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, context = {} } = body;
    
    if (!action) {
      return NextResponse.json(
        { error: 'Action is required' },
        { status: 400 }
      );
    }
    
    // Execute the orchestration task
    const result = await horus.orchestrateTask(action, {
      ...context,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
    });
    
    return NextResponse.json({
      success: true,
      result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in agent orchestration:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Orchestration failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
