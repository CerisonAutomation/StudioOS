'use client';

import { useState } from 'react';
import { Grid3X3, Box, Save, Download, Undo, Redo } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function FloorplanPage() {
  const [view, setView] = useState<'2d' | '3d'>('2d');

  const tools = [
    { name: 'Wall', icon: Grid3X3 },
    { name: 'Room', icon: Box },
    { name: 'Door', icon: Box },
    { name: 'Window', icon: Box },
    { name: 'Furniture', icon: Box },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Floorplan Editor</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Undo className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Redo className="w-4 h-4" />
          </Button>
          <Button variant="outline" data-testid="save-btn">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" data-testid="export-btn">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Canvas</CardTitle>
            <Tabs value={view} onValueChange={(v) => setView(v as '2d' | '3d')}>
              <TabsList>
                <TabsTrigger value="2d" data-testid="view-2d-btn">2D</TabsTrigger>
                <TabsTrigger value="3d" data-testid="view-3d-btn">3D</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div 
              className="aspect-[4/3] bg-muted rounded-lg relative overflow-hidden"
              data-testid={view === '2d' ? '2d-editor' : '3d-viewer'}
            >
              {view === '2d' ? (
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    linear-gradient(to right, #333 1px, transparent 1px),
                    linear-gradient(to bottom, #333 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-muted-foreground">2D Floorplan Editor</p>
                    <p className="text-sm text-muted-foreground">Click and drag to draw walls</p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-sky-100 to-sky-50 dark:from-sky-900 dark:to-sky-950">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <Box className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">3D Room Viewer</p>
                    <p className="text-sm text-muted-foreground">Drag to rotate, scroll to zoom</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tools.map((tool) => (
                <Button
                  key={tool.name}
                  variant="outline"
                  className="w-full justify-start"
                  data-testid={`${tool.name.toLowerCase()}-tool`}
                >
                  <tool.icon className="w-4 h-4 mr-2" />
                  {tool.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
