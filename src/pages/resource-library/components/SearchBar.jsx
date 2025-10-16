import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ onSearch, onFilterToggle, searchQuery, isFilterOpen }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery || '');

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(localQuery);
  };

  const handleInputChange = (e) => {
    setLocalQuery(e?.target?.value);
    // Real-time search for better UX
    if (e?.target?.value?.length > 2 || e?.target?.value?.length === 0) {
      onSearch(e?.target?.value);
    }
  };

  const clearSearch = () => {
    setLocalQuery('');
    onSearch('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Input
            type="search"
            placeholder="Search resources, guides, templates..."
            value={localQuery}
            onChange={handleInputChange}
            className="pr-20"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {localQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icon name="X" size={16} />
              </button>
            )}
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              iconName="Search"
              iconSize={16}
              className="p-1"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            type="button"
            variant={isFilterOpen ? "default" : "outline"}
            onClick={onFilterToggle}
            iconName="Filter"
            iconPosition="left"
            iconSize={16}
          >
            Filters
          </Button>
          
          <Button
            variant="outline"
            iconName="BookmarkPlus"
            iconSize={16}
            className="hidden sm:flex"
          >
            My Collections
          </Button>
        </div>
      </form>
      {/* Quick Search Suggestions */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-sm text-gray-600">Popular searches:</span>
        {['JavaScript', 'Data Science', 'UI/UX Design', 'Python', 'Machine Learning']?.map((term) => (
          <button
            key={term}
            onClick={() => {
              setLocalQuery(term);
              onSearch(term);
            }}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full transition-colors"
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;