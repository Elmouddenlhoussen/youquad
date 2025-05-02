
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchAll, SearchResult } from '@/services/searchService';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Dumbbell, Bike } from 'lucide-react';

const SearchResultItem: React.FC<{ result: SearchResult }> = ({ result }) => {
  const getIcon = () => {
    switch (result.type) {
      case 'quad':
        return <Bike className="h-5 w-5 text-terracotta-500" />;
      case 'tour':
        return <Calendar className="h-5 w-5 text-terracotta-500" />;
      case 'blog':
        return <Dumbbell className="h-5 w-5 text-terracotta-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 border border-sand-200 dark:border-sand-700 rounded-lg overflow-hidden">
      <div className="w-full md:w-40 h-40">
        <img 
          src={result.image} 
          alt={result.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between p-4 flex-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {getIcon()}
            <span className="text-sm text-sand-500 dark:text-sand-400 capitalize">
              {result.type}
            </span>
          </div>
          <h3 className="text-lg font-bold mb-2">{result.title}</h3>
          <p className="text-sand-600 dark:text-sand-300 line-clamp-2 mb-4">
            {result.description}
          </p>
        </div>
        <div>
          <Button 
            asChild
            variant="outline"
            className="border-terracotta-300 text-terracotta-600 hover:bg-terracotta-50 dark:border-terracotta-700 dark:text-terracotta-400 dark:hover:bg-terracotta-900/30"
          >
            <Link to={result.url}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

const Search = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  const query = searchParams.get('q') || '';
  
  useEffect(() => {
    if (query) {
      setIsLoading(true);
      // In a real app, this might be an API call
      const searchResults = searchAll(query);
      setResults(searchResults);
      setIsLoading(false);
    } else {
      setResults([]);
    }
  }, [query]);
  
  const filteredResults = activeTab === 'all' 
    ? results 
    : results.filter(result => result.type === activeTab);
    
  const resultCount = {
    all: results.length,
    quad: results.filter(r => r.type === 'quad').length,
    tour: results.filter(r => r.type === 'tour').length,
    blog: results.filter(r => r.type === 'blog').length
  };

  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      
      <div className="mb-8">
        <SearchBar placeholder="Refine your search..." className="max-w-xl" />
        <p className="mt-2 text-sand-500 dark:text-sand-400">
          {query ? `Showing results for "${query}"` : 'Enter a search term above'}
        </p>
      </div>
      
      {query && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All ({resultCount.all})</TabsTrigger>
            <TabsTrigger value="quad">Quads ({resultCount.quad})</TabsTrigger>
            <TabsTrigger value="tour">Tours ({resultCount.tour})</TabsTrigger>
            <TabsTrigger value="blog">Blog ({resultCount.blog})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            {isLoading ? (
              <div className="flex justify-center my-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-terracotta-600"></div>
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map(result => (
                  <SearchResultItem key={`${result.type}-${result.id}`} result={result} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-sand-500 dark:text-sand-400">
                  No results found
                </h3>
                <p className="mt-1 text-sand-500 dark:text-sand-400">
                  Try adjusting your search terms
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="quad" className="mt-0">
            {/* Same layout as "all" tab but with filtered results */}
            {isLoading ? (
              <div className="flex justify-center my-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-terracotta-600"></div>
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map(result => (
                  <SearchResultItem key={`${result.type}-${result.id}`} result={result} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-sand-500 dark:text-sand-400">
                  No quad results found
                </h3>
                <p className="mt-1 text-sand-500 dark:text-sand-400">
                  Try adjusting your search terms
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="tour" className="mt-0">
            {/* Same layout as "quad" tab but for tours */}
            {isLoading ? (
              <div className="flex justify-center my-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-terracotta-600"></div>
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map(result => (
                  <SearchResultItem key={`${result.type}-${result.id}`} result={result} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-sand-500 dark:text-sand-400">
                  No tour results found
                </h3>
                <p className="mt-1 text-sand-500 dark:text-sand-400">
                  Try adjusting your search terms
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="blog" className="mt-0">
            {/* Same layout as other tabs but for blog posts */}
            {isLoading ? (
              <div className="flex justify-center my-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-terracotta-600"></div>
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="space-y-4">
                {filteredResults.map(result => (
                  <SearchResultItem key={`${result.type}-${result.id}`} result={result} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-sand-500 dark:text-sand-400">
                  No blog results found
                </h3>
                <p className="mt-1 text-sand-500 dark:text-sand-400">
                  Try adjusting your search terms
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Search;
