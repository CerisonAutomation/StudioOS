'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Inbox, 
  FileText, 
  Users, 
  Briefcase, 
  Palette, 
  Truck, 
  BarChart3, 
  Settings, 
  ShieldCheck,
  Mic,
  MessageSquare,
  Layout,
  Megaphone,
  CreditCard,
  Box
} from 'lucide-react';
import { cn } from '@/lib/utils';

const routes = [
  { label: 'Today', icon: LayoutDashboard, href: '/' },
  { label: 'Inbox', icon: Inbox, href: '/inbox' },
  { label: 'Clients', icon: Users, href: '/clients' },
  { label: 'Projects', icon: Briefcase, href: '/projects' },
  { label: 'Design Studio', icon: Palette, href: '/design' },
  { label: 'Floorplan', icon: Layout, href: '/floorplan' },
  { label: 'Quotes', icon: FileText, href: '/quotes' },
  { label: 'Invoices', icon: CreditCard, href: '/invoices' },
  { label: 'Suppliers', icon: Truck, href: '/suppliers' },
  { label: 'Marketing', icon: Megaphone, href: '/marketing' },
  { label: 'Portal', icon: Box, href: '/portal' },
  { label: 'Analytics', icon: BarChart3, href: '/analytics' },
  { label: 'Audit', icon: ShieldCheck, href: '/audit' },
  { label: 'Chat Assistant', icon: MessageSquare, href: '/chat' },
  { label: 'Settings', icon: Settings, href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-[#151619] text-white w-64 border-r border-white/10">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tighter text-emerald-500">
          STUDIO<span className="text-white">OS</span>
        </h1>
        <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1 font-mono">
          Tanti Interior
        </p>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === route.href 
                ? "bg-white/10 text-white" 
                : "text-white/60 hover:text-white hover:bg-white/5"
            )}
          >
            <route.icon className="w-4 h-4" />
            {route.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-4">
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
          <div className="relative">
            <div className="w-8 h-8 bg-white text-[#141414] rounded-full flex items-center justify-center text-xs font-serif italic">T</div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#151619] rounded-full" />
          </div>
          <div>
            <p className="text-xs font-bold">Tanti Studio</p>
            <p className="text-[9px] font-mono uppercase opacity-40">Principal Designer</p>
          </div>
        </div>
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 transition-colors">
          <Mic className="w-4 h-4" />
          Live Voice PA
        </button>
      </div>
    </div>
  );
}
