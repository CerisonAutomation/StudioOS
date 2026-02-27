import { format } from 'date-fns';
import { getUpcomingDeadlines } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export async function UpcomingDeadlines() {
  const deadlines = await getUpcomingDeadlines();

  return (
    <Card data-testid="upcoming-deadlines">
      <CardHeader>
        <CardTitle>Upcoming Deadlines</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {deadlines.map((deadline) => (
            <div key={deadline.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{deadline.title}</p>
                  <Badge variant={deadline.priority === 'high' ? 'destructive' : deadline.priority === 'medium' ? 'default' : 'secondary'}>
                    {deadline.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {deadline.project} • {format(new Date(deadline.date), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
