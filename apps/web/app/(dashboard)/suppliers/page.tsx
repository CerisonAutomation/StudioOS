import { Search, Filter, Star, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';

const suppliers = [
  {
    id: '1',
    name: 'Luxe Furniture Co.',
    category: 'Furniture',
    rating: 4.8,
    location: 'New York, NY',
    contact: 'contact@luxefurniture.com',
    specialties: ['Sofas', 'Chairs', 'Tables'],
  },
  {
    id: '2',
    name: 'Artisan Lighting',
    category: 'Lighting',
    rating: 4.9,
    location: 'Los Angeles, CA',
    contact: 'hello@artisanlighting.com',
    specialties: ['Pendants', 'Sconces', 'Lamps'],
  },
  {
    id: '3',
    name: 'Natural Stone Works',
    category: 'Materials',
    rating: 4.7,
    location: 'Denver, CO',
    contact: 'sales@naturalstone.com',
    specialties: ['Marble', 'Granite', 'Quartz'],
  },
  {
    id: '4',
    name: 'Textile Dreams',
    category: 'Fabrics',
    rating: 4.6,
    location: 'Chicago, IL',
    contact: 'info@textiledreams.com',
    specialties: ['Upholstery', 'Curtains', 'Rugs'],
  },
];

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Suppliers</h1>
        <Button>Add Supplier</Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search suppliers..." className="pl-10" />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="suppliers-grid">
        {suppliers.map((supplier) => (
          <Card key={supplier.id} className="hover:border-primary/50 transition-colors" data-testid="supplier-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{supplier.name}</h3>
                  <p className="text-sm text-muted-foreground">{supplier.location}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{supplier.rating}</span>
                </div>
              </div>

              <Badge className="mt-3">{supplier.category}</Badge>

              <div className="mt-4 flex flex-wrap gap-2">
                {supplier.specialties.map((specialty) => (
                  <span key={specialty} className="text-xs bg-muted px-2 py-1 rounded">
                    {specialty}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-border flex gap-2">
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
