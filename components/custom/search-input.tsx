'use client';

import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onSearch?: (value: string) => void;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "relative",
  onSearch
}: SearchInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    if (onSearch) {
      onSearch(newValue);
    }
  };

  return (
    <div className={className}>
      <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="pl-10"
      />
    </div>
  );
}
