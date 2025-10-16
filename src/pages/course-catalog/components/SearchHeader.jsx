import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchHeader = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  onToggleFilters,
  resultsCount,
  totalCourses 
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const searchRef = useRef(null);
  const sortRef = useRef(null);

  const searchSuggestions = [
    { query: 'React development', category: 'Web Development', count: 45 },
    { query: 'Python for beginners', category: 'Programming', count: 67 },
    { query: 'UI/UX design', category: 'Design', count: 34 },
    { query: 'Data science', category: 'Data Science', count: 89 },
    { query: 'Machine learning', category: 'AI/ML', count: 56 },
    { query: 'Digital marketing', category: 'Marketing', count: 23 }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: 'Target' },
    { value: 'popularity', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' }
  ];

  const recentSearches = [
    'JavaScript fundamentals',
    'Adobe Photoshop',
    'Project management',
    'Excel advanced'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef?.current && !searchRef?.current?.contains(event?.target)) {
        setShowSuggestions(false);
        setIsSearchFocused(false);
      }
      if (sortRef?.current && !sortRef?.current?.contains(event?.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion?.query);
    setShowSuggestions(false);
    setIsSearchFocused(false);
  };

  const getCurrentSortOption = () => {
    return sortOptions?.find(option => option?.value === sortBy) || sortOptions?.[0];
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        {/* Search Bar */}
        <div className="relative mb-4" ref={searchRef}>
          <div className={`relative transition-all duration-200 ${
            isSearchFocused ? 'transform scale-[1.02]' : ''
          }`}>
            <Input
              type="search"
              placeholder="Search for courses, skills, or instructors..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              onFocus={handleSearchFocus}
              className="w-full pl-12 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-primary"
            />
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <Icon name="X" size={18} />
              </button>
            )}
          </div>

          {/* Search Suggestions Dropdown */}
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
              {searchQuery ? (
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Suggested Searches</h4>
                  <div className="space-y-2">
                    {searchSuggestions?.filter(suggestion => 
                        suggestion?.query?.toLowerCase()?.includes(searchQuery?.toLowerCase())
                      )?.slice(0, 5)?.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50 text-left"
                        >
                          <div className="flex items-center">
                            <Icon name="Search" size={16} className="mr-3 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {suggestion?.query}
                              </div>
                              <div className="text-xs text-gray-500">
                                in {suggestion?.category}
                              </div>
                            </div>
                          </div>
                          <span className="text-xs text-gray-400">{suggestion?.count} courses</span>
                        </button>
                      ))
                    }
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Recent Searches</h4>
                  <div className="space-y-2">
                    {recentSearches?.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick({ query: search })}
                        className="flex items-center w-full p-2 rounded-lg hover:bg-gray-50 text-left"
                      >
                        <Icon name="Clock" size={16} className="mr-3 text-gray-400" />
                        <span className="text-sm text-gray-700">{search}</span>
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Popular Searches</h4>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Python', 'Design', 'Marketing', 'Excel']?.map((tag, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick({ query: tag })}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Left Side - Results Info & Filter Toggle */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              iconName="Filter"
              iconPosition="left"
              onClick={onToggleFilters}
              className="lg:hidden"
            >
              Filters
            </Button>
            
            <div className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">{resultsCount?.toLocaleString()}</span>
              {searchQuery ? (
                <span> results for "{searchQuery}"</span>
              ) : (
                <span> of {totalCourses?.toLocaleString()} courses</span>
              )}
            </div>
          </div>

          {/* Right Side - Sort & View Controls */}
          <div className="flex items-center space-x-3">
            {/* Sort Dropdown */}
            <div className="relative" ref={sortRef}>
              <Button
                variant="outline"
                size="sm"
                iconName={getCurrentSortOption()?.icon}
                iconPosition="left"
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="min-w-[140px] justify-between"
              >
                <span>{getCurrentSortOption()?.label}</span>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`ml-2 transition-transform duration-200 ${
                    isSortOpen ? 'rotate-180' : ''
                  }`}
                />
              </Button>

              {isSortOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {sortOptions?.map((option) => (
                    <button
                      key={option?.value}
                      onClick={() => {
                        onSortChange(option?.value);
                        setIsSortOpen(false);
                      }}
                      className={`flex items-center w-full px-4 py-2 text-sm transition-colors duration-200 ${
                        sortBy === option?.value
                          ? 'bg-primary/10 text-primary font-medium' :'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon name={option?.icon} size={16} className="mr-3" />
                      <span>{option?.label}</span>
                      {sortBy === option?.value && (
                        <Icon name="Check" size={16} className="ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid' ?'bg-white text-primary shadow-sm' :'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon name="Grid3X3" size={16} />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list' ?'bg-white text-primary shadow-sm' :'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon name="List" size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;