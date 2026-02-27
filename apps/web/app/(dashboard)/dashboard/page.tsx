import { Suspense } from 'react';
import { DashboardStats } from '@/components/dashboard/stats';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { UpcomingDeadlines } from '@/components/dashboard/upcoming-deadlines';
import { ProjectStatusChart } from '@/components/dashboard/project-status-chart';
import { RevenueChart } from '@/components/dashboard/revenue-chart';
import { QuickActions } from '@/components/dashboard/quick-actions';

export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <QuickActions />
      </div>

      <Suspense fallback={<StatsSkeleton />}>
        <DashboardStats />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<ChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<ChartSkeleton />}>
          <ProjectStatusChart />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<ListSkeleton />}>
          <RecentActivity />
        </Suspense>
        <Suspense fallback={<ListSkeleton />}>
          <UpcomingDeadlines />
        </Suspense>
      </div>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
      ))}
    </div>
  );
}

function ChartSkeleton() {
  return <div className="h-80 bg-muted rounded-lg animate-pulse" />;
}

function ListSkeleton() {
  return <div className="h-96 bg-muted rounded-lg animate-pulse" />;
}
