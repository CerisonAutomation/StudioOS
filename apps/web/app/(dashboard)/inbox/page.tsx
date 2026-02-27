'use client';

import { useState } from 'react';
import { Search, Plus, Sparkles, Archive, Star, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const messages = [
  {
    id: '1',
    from: 'Sarah Smith',
    subject: 'Re: Living Room Design Feedback',
    preview: 'Thanks for the updated designs! I love the color scheme...',
    timestamp: '10:30 AM',
    unread: true,
    category: 'client',
  },
  {
    id: '2',
    from: 'Michael Chen',
    subject: 'Material Selection Confirmation',
    preview: 'Can we schedule a call to discuss the marble options?',
    timestamp: 'Yesterday',
    unread: false,
    category: 'client',
  },
  {
    id: '3',
    from: 'Luxe Furniture Co.',
    subject: 'Quote Request - Order #1234',
    preview: 'Please find attached the updated pricing for your order...',
    timestamp: 'Yesterday',
    unread: false,
    category: 'supplier',
  },
  {
    id: '4',
    from: 'System',
    subject: 'Project Deadline Reminder',
    preview: 'The Smith Residence project deadline is in 3 days.',
    timestamp: 'Feb 25',
    unread: false,
    category: 'system',
  },
];

export default function InboxPage() {
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Inbox</h1>
        <div className="flex gap-2">
          <Button variant="outline" data-testid="ai-triage-btn">
            <Sparkles className="w-4 h-4 mr-2" />
            AI Triage
          </Button>
          <Button data-testid="compose-btn">
            <Plus className="w-4 h-4 mr-2" />
            Compose
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-10" />
          </div>

          <div className="space-y-2" data-testid="inbox-list">
            {messages.map((message) => (
              <Card
                key={message.id}
                className={`cursor-pointer transition-colors ${
                  selectedMessage === message.id ? 'border-primary' : 'hover:border-primary/50'
                } ${message.unread ? 'bg-primary/5' : ''}`}
                onClick={() => setSelectedMessage(message.id)}
                data-testid="message-item"
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{message.from}</span>
                        {message.unread && <Badge variant="default">New</Badge>}
                        <Badge variant="outline">{message.category}</Badge>
                      </div>
                      <p className="text-sm font-medium mt-1">{message.subject}</p>
                      <p className="text-sm text-muted-foreground truncate">{message.preview}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Star className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Archive className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="unread">
          <p className="text-muted-foreground">Unread messages will appear here.</p>
        </TabsContent>

        <TabsContent value="clients">
          <p className="text-muted-foreground">Client messages will appear here.</p>
        </TabsContent>

        <TabsContent value="suppliers">
          <p className="text-muted-foreground">Supplier messages will appear here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
