import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');

    let tasks;
    if (database.supabaseClient) {
      let query = database.supabaseClient.from('tasks').select('*').order('dueDate', { ascending: true });
      if (projectId) {
        query = query.eq('projectId', projectId);
      }
      const { data, error } = await query;
      if (error) throw error;
      tasks = data || [];
    } else {
      // Mock data
      tasks = [
        { id: '1', projectId: '1', title: 'Design consultation', description: 'Initial design consultation with client', status: 'completed', priority: 'high', dueDate: new Date().toISOString(), assigneeId: '1' },
        { id: '2', projectId: '1', title: 'Create floor plans', description: 'Develop initial floor plans based on client requirements', status: 'in_progress', priority: 'high', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), assigneeId: '2' },
        { id: '3', projectId: '2', title: 'Finalize material selections', description: 'Review and finalize material selections with client', status: 'todo', priority: 'medium', dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), assigneeId: '1' }
      ].filter(task => !projectId || task.projectId === projectId);
    }

    return NextResponse.json({
      success: true,
      tasks,
      count: tasks.length
    });
  } catch (error) {
    console.error('Tasks API GET error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch tasks',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      projectId,
      title,
      description,
      assigneeId,
      dueDate,
      status = 'pending',
      priority = 'medium',
      tags = []
    } = body;

    // Validate required fields
    if (!projectId || !title) {
      return NextResponse.json(
        { error: 'Project id and title are required' },
        { status: 400 }
      );
    }

    let task;
    if (database.supabaseClient) {
      const taskData = {
        projectId,
        title,
        description,
        assigneeId,
        dueDate,
        status,
        priority,
        tags
      };

      const { data, error } = await database.supabaseClient
        .from('tasks')
        .insert([taskData])
        .select()
        .single();

      if (error) throw error;
      task = data;
    } else {
      // Mock creation
      task = {
        id: `task-${Date.now()}`,
        projectId,
        title,
        description,
        assigneeId,
        dueDate,
        status,
        priority,
        tags
      };
    }

    return NextResponse.json({
      success: true,
      task,
      message: 'Task created successfully'
    });
  } catch (error) {
    console.error('Tasks API POST error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create task',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
