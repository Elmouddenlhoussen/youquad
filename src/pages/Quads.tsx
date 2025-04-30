
import React, { useState } from 'react';
import { quads } from '@/data/quads';
import QuadCard from '@/components/QuadCard';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Quads = () => {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    maxPrice: 1000,
    capacity: '',
  });

  // Filter quads based on user selection
  const filteredQuads = quads.filter(quad => {
    return (
      (filters.search === '' || 
        quad.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        quad.description.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.type === '' || quad.type === filters.type) &&
      quad.price <= filters.maxPrice &&
      (filters.capacity === '' || quad.capacity.toString() === filters.capacity)
    );
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleTypeChange = (value: string) => {
    setFilters(prev => ({ ...prev, type: value }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({ ...prev, maxPrice: value[0] }));
  };

  const handleCapacityChange = (value: string) => {
    setFilters(prev => ({ ...prev, capacity: value }));
  };

  // Get unique quad types for filter
  const quadTypes = Array.from(new Set(quads.map(quad => quad.type)));
  
  // Get unique capacities for filter
  const capacities = Array.from(new Set(quads.map(quad => quad.capacity)));

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="bg-terracotta-600 py-20 px-4">
        <div className="container-custom">
          <h1 className="text-4xl font-bold text-white mb-4">Our Quad Bikes</h1>
          <p className="text-sand-100 text-xl max-w-2xl">
            Choose from our selection of high-quality quad bikes for your desert adventure.
          </p>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-bold text-sand-800 mb-6">Filters</h2>
            
            <div className="space-y-6">
              {/* Search */}
              <div>
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Search quads..."
                  value={filters.search}
                  onChange={handleSearchChange}
                  className="mt-1"
                />
              </div>
              
              {/* Type Filter */}
              <div>
                <Label htmlFor="type">Quad Type</Label>
                <Select
                  value={filters.type}
                  onValueChange={handleTypeChange}
                >
                  <SelectTrigger id="type" className="mt-1">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    {quadTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Price Filter */}
              <div>
                <Label htmlFor="price">Maximum Price (MAD)</Label>
                <div className="flex items-center justify-between mt-1">
                  <span>0</span>
                  <span>{filters.maxPrice}</span>
                </div>
                <Slider
                  id="price"
                  min={200}
                  max={1000}
                  step={50}
                  value={[filters.maxPrice]}
                  onValueChange={handlePriceChange}
                  className="mt-2"
                />
              </div>
              
              {/* Capacity Filter */}
              <div>
                <Label htmlFor="capacity">Rider Capacity</Label>
                <Select
                  value={filters.capacity}
                  onValueChange={handleCapacityChange}
                >
                  <SelectTrigger id="capacity" className="mt-1">
                    <SelectValue placeholder="Any Capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Capacity</SelectItem>
                    {capacities.map((capacity) => (
                      <SelectItem key={capacity} value={capacity.toString()}>
                        {capacity} rider{capacity > 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Quads Grid */}
          <div className="lg:col-span-3">
            {filteredQuads.length > 0 ? (
              <>
                <p className="mb-6 text-sand-600">{filteredQuads.length} quads found</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredQuads.map(quad => (
                    <QuadCard
                      key={quad.id}
                      id={quad.id}
                      name={quad.name}
                      image={quad.image}
                      price={quad.price}
                      rating={quad.rating}
                      capacity={quad.capacity}
                      type={quad.type}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-sand-800 mb-2">No quads found</h3>
                <p className="text-sand-600">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quads;
