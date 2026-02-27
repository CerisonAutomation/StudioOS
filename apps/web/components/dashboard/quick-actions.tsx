'use client';

import Link from 'next/link';
import { Plus, FileText, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function QuickActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-testid="new-project-btn">
          <Plus className="w-4 h-4 mr-2" />
          Quick Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/projects/new" className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/quotes/new" className="flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Create Quote
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/inbox/compose" className="flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            Send Message
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/calendar/new" className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Meeting
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
