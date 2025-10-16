import React from 'react';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ isOpen, filters, onFilterChange, onClearFilters }) => {
  if (!isOpen) return null;

  const contentTypes = [
    { value: 'video', label: 'Video Tutorials' },
    { value: 'document', label: 'Documents' },
    { value: 'template', label: 'Templates' },
    { value: 'guide', label: 'Study Guides' },
    { value: 'tool', label: 'Interactive Tools' },
    { value: 'assessment', label: 'Assessments' }
  ];

  const difficultyLevels = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
    { value: 'expert', label: 'Expert' }
  ];

  const subjects = [
    { value: 'programming', label: 'Programming' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'design', label: 'Design' },
    { value: 'business', label: 'Business' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'mathematics', label: 'Mathematics' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const handleContentTypeChange = (type, checked) => {
    const newTypes = checked 
      ? [...(filters?.contentTypes || []), type]
      : (filters?.contentTypes || [])?.filter(t => t !== type);
    onFilterChange({ ...filters, contentTypes: newTypes });
  };

  const handleSubjectChange = (subject, checked) => {
    const newSubjects = checked 
      ? [...(filters?.subjects || []), subject]
      : (filters?.subjects || [])?.filter(s => s !== subject);
    onFilterChange({ ...filters, subjects: newSubjects });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Icon name="Filter" size={20} />
          Filter Resources
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          iconName="RotateCcw"
          iconSize={16}
        >
          Clear All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Content Type */}
        <div>
          <CheckboxGroup label="Content Type">
            {contentTypes?.map((type) => (
              <Checkbox
                key={type?.value}
                label={type?.label}
                checked={(filters?.contentTypes || [])?.includes(type?.value)}
                onChange={(e) => handleContentTypeChange(type?.value, e?.target?.checked)}
                size="sm"
              />
            ))}
          </CheckboxGroup>
        </div>

        {/* Subject Area */}
        <div>
          <CheckboxGroup label="Subject Area">
            {subjects?.map((subject) => (
              <Checkbox
                key={subject?.value}
                label={subject?.label}
                checked={(filters?.subjects || [])?.includes(subject?.value)}
                onChange={(e) => handleSubjectChange(subject?.value, e?.target?.checked)}
                size="sm"
              />
            ))}
          </CheckboxGroup>
        </div>

        {/* Difficulty Level */}
        <div>
          <Select
            label="Difficulty Level"
            options={difficultyLevels}
            value={filters?.difficulty || ''}
            onChange={(value) => onFilterChange({ ...filters, difficulty: value })}
            placeholder="All levels"
            clearable
          />
        </div>

        {/* Sort By */}
        <div>
          <Select
            label="Sort By"
            options={sortOptions}
            value={filters?.sortBy || 'relevance'}
            onChange={(value) => onFilterChange({ ...filters, sortBy: value })}
          />
        </div>
      </div>
      {/* Additional Filters */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Checkbox
            label="Free Resources Only"
            checked={filters?.freeOnly || false}
            onChange={(e) => onFilterChange({ ...filters, freeOnly: e?.target?.checked })}
          />
          <Checkbox
            label="Downloadable"
            checked={filters?.downloadable || false}
            onChange={(e) => onFilterChange({ ...filters, downloadable: e?.target?.checked })}
          />
          <Checkbox
            label="Recently Updated"
            checked={filters?.recentlyUpdated || false}
            onChange={(e) => onFilterChange({ ...filters, recentlyUpdated: e?.target?.checked })}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;