
import { quads, tourPackages } from '@/data/quads';

// Define the types for search results
export interface SearchResult {
  id: string;
  type: 'quad' | 'tour' | 'blog';
  title: string;
  description: string;
  image: string;
  url: string;
}

// Function to search quads
const searchQuads = (query: string): SearchResult[] => {
  const lowercaseQuery = query.toLowerCase();
  
  return quads.filter(quad => 
    quad.name.toLowerCase().includes(lowercaseQuery) ||
    quad.description.toLowerCase().includes(lowercaseQuery) ||
    quad.type.toLowerCase().includes(lowercaseQuery)
  ).map(quad => ({
    id: quad.id,
    type: 'quad',
    title: quad.name,
    description: quad.description,
    image: quad.image,
    url: `/quad/${quad.id}`
  }));
};

// Function to search tours
const searchTours = (query: string): SearchResult[] => {
  const lowercaseQuery = query.toLowerCase();
  
  return tourPackages.filter(tour => 
    tour.name.toLowerCase().includes(lowercaseQuery) ||
    tour.description.toLowerCase().includes(lowercaseQuery) ||
    tour.difficulty.toLowerCase().includes(lowercaseQuery)
  ).map(tour => ({
    id: tour.id,
    type: 'tour',
    title: tour.name,
    description: tour.description,
    image: tour.image,
    url: `/booking?tourId=${tour.id}`
  }));
};

// Main search function that combines all results
export const searchAll = (query: string): SearchResult[] => {
  if (!query || query.trim() === '') {
    return [];
  }
  
  const quadResults = searchQuads(query);
  const tourResults = searchTours(query);
  
  // Combine and sort results (for now, just combining them)
  // In the future, you could implement more sophisticated ranking
  return [...quadResults, ...tourResults];
};
