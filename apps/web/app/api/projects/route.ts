import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const clientId = searchParams.get('clientId');

    const projects = await database.getProjects();

    let filteredProjects = projects;
    if (status) {
      filteredProjects = filteredProjects.filter((project: any) =>
        project.status === status
      );
    }
    if (clientId) {
      filteredProjects = filteredProjects.filter((project: any) =>
        project.clientId === clientId
      );
    }

    return NextResponse.json({
      success: true,
      projects: filteredProjects,
      count: filteredProjects.length
    });
  } catch (error) {
    console.error('Projects API GET error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch projects',
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
      clientId,
      name,
      description,
      status = 'planning',
      budget,
      startDate,
      endDate
    } = body;

    // Validate required fields
    if (!clientId || !name) {
      return NextResponse.json(
        { error: 'Client id and name are required' },
        { status: 400 }
      );
    }

    // Create project using database service
    const projectData = {
      clientId,
      name,
      description,
      status,
      budget,
      startDate,
      endDate
    };

    const project = await database.createProject(projectData);

    return NextResponse.json({
      success: true,
      project,
      message: 'Project created successfully'
    });
  } catch (error) {
    console.error('Projects API POST error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create project',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
