'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function RevenueChart() {
  const data = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 },
  ];

  const maxRevenue = Math.max(...data.map((d) => d.revenue));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48 flex items-end gap-4">
          {data.map((item) => {
            const height = (item.revenue / maxRevenue) * 100;
            return (
              <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-primary/80 rounded-t-md transition-all hover:bg-primary"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-muted-foreground">{item.month}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <span>Total Revenue</span>
          <span className="font-medium text-foreground">
            ${data.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
