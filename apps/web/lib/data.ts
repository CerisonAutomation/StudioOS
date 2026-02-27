export async function getDashboardStats() {
  // In production, this would fetch from the database
  return {
    revenue: 125000,
    activeProjects: 12,
    totalClients: 48,
    conversionRate: 68,
  };
}

export async function getRecentActivity() {
  return [
    {
      id: '1',
      type: 'project_created',
      description: 'New project "Modern Loft Renovation" created',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      user: { name: 'Jane Designer', avatar: null },
    },
    {
      id: '2',
      type: 'client_added',
      description: 'New client "Sarah Johnson" added to system',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      user: { name: 'John Admin', avatar: null },
    },
    {
      id: '3',
      type: 'design_approved',
      description: 'Design concept approved for "Beach House Project"',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
      user: { name: 'Jane Designer', avatar: null },
    },
    {
      id: '4',
      type: 'quote_sent',
      description: 'Quote sent to "Michael Chen" for review',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      user: { name: 'John Admin', avatar: null },
    },
  ];
}

export async function getUpcomingDeadlines() {
  return [
    {
      id: '1',
      title: 'Present initial concepts to Smith Family',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      project: 'Smith Residence',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Finalize material selections for Loft Project',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
      project: 'Modern Loft Renovation',
      priority: 'medium',
    },
    {
      id: '3',
      title: 'Submit permit applications',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
      project: 'Downtown Office',
      priority: 'high',
    },
    {
      id: '4',
      title: 'Client meeting - Design review',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      project: 'Beach House Project',
      priority: 'low',
    },
  ];
}

export async function getProjects() {
  return [
    {
      id: '1',
      name: 'Smith Residence',
      client: 'Sarah Smith',
      status: 'in_progress',
      progress: 65,
      budget: 75000,
      spent: 45000,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    },
    {
      id: '2',
      name: 'Modern Loft Renovation',
      client: 'Michael Chen',
      status: 'planning',
      progress: 25,
      budget: 120000,
      spent: 15000,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
    },
    {
      id: '3',
      name: 'Beach House Project',
      client: 'Emily Davis',
      status: 'design_review',
      progress: 80,
      budget: 200000,
      spent: 120000,
      deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45).toISOString(),
    },
  ];
}

export async function getClients() {
  return [
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Smith',
      email: 'sarah.smith@email.com',
      phone: '+1 (555) 123-4567',
      company: 'Smith Family',
      projects: 1,
      totalSpent: 45000,
      status: 'active',
    },
    {
      id: '2',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@email.com',
      phone: '+1 (555) 234-5678',
      company: 'Chen Properties',
      projects: 2,
      totalSpent: 85000,
      status: 'active',
    },
    {
      id: '3',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 345-6789',
      company: null,
      projects: 1,
      totalSpent: 120000,
      status: 'active',
    },
  ];
}
