import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-xs text-slate-500 mb-4" aria-label="Breadcrumb">
      <Link
        to="/"
        className="inline-flex items-center gap-1 hover:text-[#142B50] transition-colors"
      >
        <Home className="w-3.5 h-3.5" aria-hidden="true" />
        <span className="sr-only">Beranda</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400 shrink-0" aria-hidden="true" />
            {isLast || !item.href ? (
              <span className="font-semibold text-slate-800 truncate">{item.label}</span>
            ) : (
              <Link
                to={item.href}
                className="hover:text-[#142B50] transition-colors truncate"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
