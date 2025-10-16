import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFiltersChange, onClearFilters, isOpen, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    { id: 'web-development', label: 'Web Development', count: 156 },
    { id: 'data-science', label: 'Data Science', count: 89 },
    { id: 'mobile-development', label: 'Mobile Development', count: 67 },
    { id: 'design', label: 'Design', count: 134 },
    { id: 'business', label: 'Business', count: 98 },
    { id: 'marketing', label: 'Marketing', count: 76 },
    { id: 'photography', label: 'Photography', count: 45 },
    { id: 'music', label: 'Music', count: 32 }
  ];

  const levels = [
    { id: 'beginner', label: 'Beginner', count: 234 },
    { id: 'intermediate', label: 'Intermediate', count: 189 },
    { id: 'advanced', label: 'Advanced', count: 123 }
  ];

  const durations = [
    { id: '0-2', label: '0-2 hours', count: 87 },
    { id: '2-6', label: '2-6 hours', count: 156 },
    { id: '6-17', label: '6-17 hours', count: 234 },
    { id: '17+', label: '17+ hours', count: 89 }
  ];

  const prices = [
    { id: 'free', label: 'Free', count: 123 },
    { id: '0-50', label: '$0 - $50', count: 234 },
    { id: '50-100', label: '$50 - $100', count: 156 },
    { id: '100+', label: '$100+', count: 87 }
  ];

  const features = [
    { id: 'certificates', label: 'Certificates', count: 345 },
    { id: 'subtitles', label: 'Subtitles', count: 456 },
    { id: 'quizzes', label: 'Quizzes', count: 234 },
    { id: 'coding-exercises', label: 'Coding Exercises', count: 123 },
    { id: 'downloadable', label: 'Downloadable Resources', count: 289 },
    { id: 'lifetime-access', label: 'Lifetime Access', count: 567 }
  ];

  const languages = [
    { id: 'english', label: 'English', count: 456 },
    { id: 'spanish', label: 'Spanish', count: 123 },
    { id: 'french', label: 'French', count: 89 },
    { id: 'german', label: 'German', count: 67 },
    { id: 'chinese', label: 'Chinese', count: 45 }
  ];

  const handleFilterChange = (section, value, checked) => {
    const newFilters = { ...localFilters };
    
    if (!newFilters?.[section]) {
      newFilters[section] = [];
    }

    if (checked) {
      newFilters[section] = [...newFilters?.[section], value];
    } else {
      newFilters[section] = newFilters?.[section]?.filter(item => item !== value);
    }

    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleRatingChange = (rating) => {
    const newFilters = { ...localFilters, rating };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      categories: [],
      levels: [],
      durations: [],
      prices: [],
      features: [],
      languages: [],
      rating: 0
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const FilterSection = ({ title, items, section, icon }) => (
    <div className="mb-6">
      <div className="flex items-center mb-3">
        <Icon name={icon} size={16} className="mr-2 text-gray-600" />
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {items?.map((item) => (
          <div key={item?.id} className="flex items-center justify-between">
            <Checkbox
              label={item?.label}
              checked={localFilters?.[section]?.includes(item?.id) || false}
              onChange={(e) => handleFilterChange(section, item?.id, e?.target?.checked)}
              className="flex-1"
            />
            <span className="text-sm text-gray-400 ml-2">({item?.count})</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div className={`fixed lg:sticky top-16 left-0 h-screen lg:h-auto bg-white border-r border-gray-200 z-50 transition-transform duration-300 overflow-y-auto ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } w-80 lg:w-72`}>
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-sm"
              >
                Clear All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={onClose}
                className="lg:hidden"
              />
            </div>
          </div>
        </div>

        <div className="p-4 lg:p-6">
          {/* Search within results */}
          <div className="mb-6">
            <Input
              type="search"
              placeholder="Search courses..."
              iconName="Search"
              className="w-full"
            />
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <div className="flex items-center mb-3">
              <Icon name="Star" size={16} className="mr-2 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Rating</h3>
            </div>
            <div className="space-y-2">
              {[4.5, 4.0, 3.5, 3.0]?.map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingChange(rating)}
                  className={`flex items-center w-full p-2 rounded-lg transition-colors duration-200 ${
                    localFilters?.rating === rating 
                      ? 'bg-primary/10 text-primary' :'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={`${
                          i < Math.floor(rating) 
                            ? 'text-yellow-400 fill-current' 
                            : i < rating 
                              ? 'text-yellow-400 fill-current opacity-50' :'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium">{rating} & up</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Filter Sections */}
          <FilterSection
            title="Category"
            items={categories}
            section="categories"
            icon="FolderOpen"
          />

          <FilterSection
            title="Level"
            items={levels}
            section="levels"
            icon="TrendingUp"
          />

          <FilterSection
            title="Duration"
            items={durations}
            section="durations"
            icon="Clock"
          />

          <FilterSection
            title="Price"
            items={prices}
            section="prices"
            icon="DollarSign"
          />

          <FilterSection
            title="Features"
            items={features}
            section="features"
            icon="Award"
          />

          <FilterSection
            title="Language"
            items={languages}
            section="languages"
            icon="Globe"
          />
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;