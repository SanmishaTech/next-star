'use client';

import { ChevronUp, ChevronDown } from 'lucide-react';

export interface SortableHeaderProps<T> {
  field: keyof T;
  children: React.ReactNode;
  sortField: keyof T | null;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof T) => void;
  className?: string;
}

export function SortableHeader<T>({
  field,
  children,
  sortField,
  sortDirection,
  onSort,
  className = "px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
}: SortableHeaderProps<T>) {
  const isActive = sortField === field;

  return (
    <th 
      className={className}
      onClick={() => onSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        <div className="flex flex-col">
          <ChevronUp className={`h-3 w-3 ${isActive && sortDirection === 'asc' ? 'text-blue-600' : 'text-gray-400'}`} />
          <ChevronDown className={`h-3 w-3 -mt-1 ${isActive && sortDirection === 'desc' ? 'text-blue-600' : 'text-gray-400'}`} />
        </div>
      </div>
    </th>
  );
}
