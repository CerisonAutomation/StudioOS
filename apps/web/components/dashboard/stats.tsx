import { DollarSign, FolderKanban, Users, TrendingUp } from 'lucide-react';
import { getDashboardStats } from '@/lib/data';

export async function DashboardStats() {
  const stats = await getDashboardStats();

  const items = [
    {
      name: 'Total Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      change: '+12%',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      name: 'Active Projects',
      value: stats.activeProjects.toString(),
      change: '+3',
      changeType: 'positive' as const,
      icon: FolderKanban,
    },
    {
      name: 'Total Clients',
      value: stats.totalClients.toString(),
      change: '+8%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      name: 'Conversion Rate',
      value: `${stats.conversionRate}%`,
      change: '+2.4%',
      changeType: 'positive' as const,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="metric-card">
      {items.map((item) => (
        <div
          key={item.name}
          className="bg-card border border-border rounded-lg p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{item.name}</p>
              <p className="text-2xl font-bold mt-1">{item.value}</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className={item.changeType === 'positive' ? 'text-green-500' : 'text-red-500'}>
              {item.change}
            </span>
            <span className="text-muted-foreground ml-2">from last month</span>
          </div>
        </div>
      ))}
    </div>
  );
}
