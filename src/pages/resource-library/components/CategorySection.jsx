import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategorySection = ({ onCategorySelect, selectedCategory }) => {
  const categories = [
    {
      id: 'all',
      name: 'All Resources',
      icon: 'Grid3x3',
      count: 1247,
      color: 'bg-gray-100 text-gray-700',
      description: 'Browse all available resources'
    },
    {
      id: 'programming',
      name: 'Programming',
      icon: 'Code',
      count: 342,
      color: 'bg-blue-100 text-blue-700',
      description: 'Code tutorials, documentation, and tools'
    },
    {
      id: 'data-science',
      name: 'Data Science',
      icon: 'BarChart3',
      count: 198,
      color: 'bg-green-100 text-green-700',
      description: 'Analytics, ML, and data visualization'
    },
    {
      id: 'design',
      name: 'Design',
      icon: 'Palette',
      count: 156,
      color: 'bg-purple-100 text-purple-700',
      description: 'UI/UX, graphics, and design principles'
    },
    {
      id: 'business',
      name: 'Business',
      icon: 'Briefcase',
      count: 234,
      color: 'bg-orange-100 text-orange-700',
      description: 'Strategy, management, and entrepreneurship'
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: 'Megaphone',
      count: 187,
      color: 'bg-pink-100 text-pink-700',
      description: 'Digital marketing and growth strategies'
    },
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: 'Calculator',
      count: 130,
      color: 'bg-indigo-100 text-indigo-700',
      description: 'Mathematical concepts and problem solving'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Browse by Category</h2>
        <Button
          variant="ghost"
          size="sm"
          iconName="Grid3x3"
          iconSize={16}
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategorySelect(category?.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left group hover:shadow-md ${
              selectedCategory === category?.id
                ? 'border-primary bg-primary/5' :'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category?.color} group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={category?.icon} size={20} />
              </div>
              <span className="text-sm font-medium text-gray-600">{category?.count}</span>
            </div>
            
            <h3 className={`font-semibold mb-1 transition-colors ${
              selectedCategory === category?.id ? 'text-primary' : 'text-gray-900 group-hover:text-primary'
            }`}>
              {category?.name}
            </h3>
            
            <p className="text-sm text-gray-600 line-clamp-2">{category?.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;