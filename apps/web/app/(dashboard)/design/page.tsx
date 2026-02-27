'use client';

import { useState } from 'react';
import { Sparkles, Upload, Palette, Sofa, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DesignStudioPage() {
  const [activeTab, setActiveTab] = useState('concepts');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Design Studio</h1>
        <Button data-testid="ai-suggest-btn">
          <Sparkles className="w-4 h-4 mr-2" />
          AI Suggest
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="concepts">Concepts</TabsTrigger>
          <TabsTrigger value="moodboards">Moodboards</TabsTrigger>
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="furniture">Furniture</TabsTrigger>
        </TabsList>

        <TabsContent value="concepts" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2" data-testid="design-canvas">
              <CardHeader>
                <CardTitle>Design Canvas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Upload room photo or start from scratch
                    </p>
                    <Button variant="outline" className="mt-4">
                      Upload Image
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Design Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Room Type</label>
                  <select className="w-full mt-1 p-2 rounded-md border bg-background">
                    <option>Living Room</option>
                    <option>Bedroom</option>
                    <option>Kitchen</option>
                    <option>Bathroom</option>
                    <option>Office</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Style</label>
                  <select className="w-full mt-1 p-2 rounded-md border bg-background">
                    <option>Modern</option>
                    <option>Traditional</option>
                    <option>Minimalist</option>
                    <option>Industrial</option>
                    <option>Scandinavian</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Color Palette</label>
                  <div className="flex gap-2 mt-2">
                    {['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'].map((color) => (
                      <div
                        key={color}
                        className="w-8 h-8 rounded-full cursor-pointer border-2 border-transparent hover:border-foreground"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="moodboards">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="aspect-square cursor-pointer hover:border-primary/50">
                <CardContent className="p-4 flex flex-col items-center justify-center h-full">
                  <Palette className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm font-medium">Moodboard {i}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="materials">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Marble', 'Wood', 'Concrete', 'Fabric', 'Metal', 'Glass', 'Stone', 'Tile'].map((material) => (
              <Card key={material} className="cursor-pointer hover:border-primary/50">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-muted rounded-lg mb-2" />
                  <span className="text-sm font-medium">{material}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="furniture">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Sofa', 'Chair', 'Table', 'Bed', 'Desk', 'Lamp', 'Shelf', 'Rug'].map((item) => (
              <Card key={item} className="cursor-pointer hover:border-primary/50" data-testid="furniture-item">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <Sofa className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm font-medium">{item}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
