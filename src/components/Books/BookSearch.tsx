
import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type BookSearchProps = {
  onSearch: (query: string, filters: BookFilters) => void;
};

type BookFilters = {
  department?: string;
  course?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
};

const BookSearch = ({ onSearch }: BookSearchProps) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<BookFilters>({});
  
  const departments = ['Business', 'Computer Science', 'Engineering', 'Mathematics', 'Science', 'Liberal Arts'];
  const conditions = ['New', 'Like New', 'Very Good', 'Good', 'Fair', 'Poor'];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, filters);
  };
  
  const handleFilterChange = (key: keyof BookFilters, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const resetFilters = () => {
    setFilters({});
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for books by title, author, course..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="input-field pl-10 pr-20 py-3 w-full"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-1">
            <button 
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 text-gray-500 hover:text-primary-600 transition-colors"
            >
              <Filter className="h-5 w-5" />
            </button>
            <button 
              type="submit"
              className="bg-primary hover:bg-primary-600 text-white rounded-lg p-2"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Filters */}
        {showFilters && (
          <div className="mt-3 bg-white rounded-lg shadow-lg p-4 animate-fade-in">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Filters</h3>
              <button 
                type="button"
                onClick={resetFilters}
                className="text-sm text-primary-600 hover:text-primary-800"
              >
                Reset all
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Department Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select 
                  value={filters.department || ''}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                  className="input-field py-2"
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              
              {/* Condition Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <select 
                  value={filters.condition || ''}
                  onChange={(e) => handleFilterChange('condition', e.target.value)}
                  className="input-field py-2"
                >
                  <option value="">Any Condition</option>
                  {conditions.map((condition) => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>
              
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice || ''}
                    onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                    className="input-field py-2 w-1/2"
                    min={0}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice || ''}
                    onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                    className="input-field py-2 w-1/2"
                    min={0}
                  />
                </div>
              </div>
              
              {/* Course Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                <input
                  type="text"
                  placeholder="e.g. CS101"
                  value={filters.course || ''}
                  onChange={(e) => handleFilterChange('course', e.target.value)}
                  className="input-field py-2"
                />
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button 
                type="button" 
                variant="outline"
                className="mr-2"
                onClick={() => setShowFilters(false)}
              >
                <X className="h-4 w-4 mr-1" /> Close
              </Button>
              <Button 
                type="submit"
              >
                <Search className="h-4 w-4 mr-1" /> Search
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default BookSearch;
