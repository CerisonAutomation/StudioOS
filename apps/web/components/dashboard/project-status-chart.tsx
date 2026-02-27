'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ProjectStatusChart() {
  const data = [
    { name: 'Planning', value: 3, color: '#6366f1' },
    { name: 'In Progress', value: 5, color: '#22c55e' },
    { name: 'Review', value: 2, color: '#f59e0b' },
    { name: 'Completed', value: 8, color: '#10b981' },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-8">
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              {data.reduce(
                (acc, item, index) => {
                  const startAngle = acc.offset;
                  const angle = (item.value / total) * 360;
                  const endAngle = startAngle + angle;
                  
                  const x1 = 18 + 15 * Math.cos((startAngle * Math.PI) / 180);
                  const y1 = 18 + 15 * Math.sin((startAngle * Math.PI) / 180);
                  const x2 = 18 + 15 * Math.cos((endAngle * Math.PI) / 180);
                  const y2 = 18 + 15 * Math.sin((endAngle * Math.PI) / 180);
                  
                  const largeArc = angle > 180 ? 1 : 0;
                  
                  acc.paths.push(
                    <path
                      key={item.name}
                      d={`M 18 18 L ${x1} ${y1} A 15 15 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={item.color}
                    />
                  );
                  acc.offset = endAngle;
                  return acc;
                },
                { paths: [] as React.ReactNode[], offset: 0 }
              ).paths}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold">{total}</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            {data.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
