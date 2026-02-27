import { NextRequest, NextResponse } from 'next/server';

const mockActivities = [
  {
    id: '1',
    title: 'New Lead: Elena Rodriguez',
    description: 'S0_INTAKE: High-value penthouse project. Draft reply ready for review.',
    risk: 'low',
    confidence: 0.95,
    link: '/clients/elena',
    category: 'inbox',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Supplier Delay: Marble Direct',
    description: 'Project: Villa Azure. 2-week delay on Carrara slabs. 3 alternatives found.',
    risk: 'high',
    confidence: 0.88,
    link: '/suppliers/marble-direct',
    category: 'supplier',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    title: 'Payment Overdue: Casa Blanca',
    description: 'Invoice #442 is 3 days late. Auto-reminder scheduled for 09:00.',
    risk: 'medium',
    confidence: 1.0,
    link: '/projects/casa-blanca',
    category: 'finance',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: '4',
    title: 'Design Milestone: Loft 42',
    description: 'Moodboard generated for Living Room. Client sentiment: Positive.',
    risk: 'low',
    confidence: 0.92,
    link: '/design/loft-42',
    category: 'project',
    timestamp: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: '5',
    title: 'Quote Request: Villa Maria',
    description: 'New quote request for full interior design. Budget: €80k.',
    risk: 'low',
    confidence: 0.89,
    link: '/quotes/villa-maria',
    category: 'sales',
    timestamp: new Date(Date.now() - 14400000).toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');

    let activities = [...mockActivities];

    // Filter by category if specified
    if (category) {
      activities = activities.filter(a => a.category === category);
    }

    // Limit results
    activities = activities.slice(0, limit);

    return NextResponse.json({
      success: true,
      activities,
      count: activities.length
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}
