import React, { useRef, useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const scrollContainerRef = useRef(null);

  const categories = [
    { id: 'all', label: 'All Courses', icon: 'Grid3X3', count: 1247 },
    { id: 'web-development', label: 'Web Development', icon: 'Code', count: 234 },
    { id: 'data-science', label: 'Data Science', icon: 'BarChart3', count: 156 },
    { id: 'mobile-development', label: 'Mobile Development', icon: 'Smartphone', count: 89 },
    { id: 'design', label: 'Design', icon: 'Palette', count: 167 },
    { id: 'business', label: 'Business', icon: 'Briefcase', count: 123 },
    { id: 'marketing', label: 'Marketing', icon: 'Megaphone', count: 98 },
    { id: 'photography', label: 'Photography', icon: 'Camera', count: 67 },
    { id: 'music', label: 'Music', icon: 'Music', count: 45 },
    { id: 'language', label: 'Languages', icon: 'Globe', count: 78 },
    { id: 'health', label: 'Health & Fitness', icon: 'Heart', count: 56 },
    { id: 'personal-development', label: 'Personal Development', icon: 'User', count: 89 }
  ];

  const checkScrollButtons = () => {
    if (scrollContainerRef?.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef?.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef?.current) {
      const scrollAmount = 200;
      const newScrollLeft = scrollContainerRef?.current?.scrollLeft + 
        (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainerRef?.current?.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-32 z-20">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="relative">
          {/* Left Scroll Button */}
          {showLeftArrow && (
            <Button
              variant="ghost"
              size="sm"
              iconName="ChevronLeft"
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md"
            />
          )}

          {/* Categories Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-2 overflow-x-auto scrollbar-hide scroll-smooth px-8"
            onScroll={checkScrollButtons}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => onCategoryChange(category?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === category?.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon name={category?.icon} size={16} />
                <span>{category?.label}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeCategory === category?.id
                    ? 'bg-white/20 text-white' :'bg-gray-100 text-gray-600'
                }`}>
                  {category?.count}
                </span>
              </button>
            ))}
          </div>

          {/* Right Scroll Button */}
          {showRightArrow && (
            <Button
              variant="ghost"
              size="sm"
              iconName="ChevronRight"
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;