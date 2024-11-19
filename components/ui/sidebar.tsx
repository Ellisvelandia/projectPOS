'use client';

import { Home, Menu, Receipt, Settings, FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { icon: Home, label: 'HOME', href: '/' },
  { icon: Menu, label: 'MENU', href: '/menu' },
  { icon: Receipt, label: 'PAYMENT', href: '/payment' },
  { icon: FileText, label: 'REPORTS', href: '/reports' },
  { icon: Settings, label: 'SETTINGS', href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6">
      <div className="mb-8">
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text">
          POS
        </span>
      </div>
      <nav className="flex-1 flex flex-col items-center gap-4">
        {sidebarItems.map(({ icon: Icon, label, href }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "p-3 rounded-xl flex flex-col items-center gap-1 text-xs font-medium transition-colors",
              pathname === href
                ? "bg-blue-50 text-blue-600"
                : "text-gray-500 hover:bg-gray-50"
            )}
          >
            <Icon className="h-6 w-6" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto text-xs text-gray-400">v1.0</div>
    </div>
  );
}