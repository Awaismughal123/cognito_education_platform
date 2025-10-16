import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseComparison = ({ courses, onRemoveCourse, onClearAll, isOpen, onClose }) => {
  if (!isOpen || courses?.length === 0) return null;

  const formatDuration = (hours) => {
    if (hours < 1) return `${Math.round(hours * 60)} mins`;
    return `${hours}h`;
  };

  const formatPrice = (price) => {
    if (price === 0) return 'Free';
    return `$${price}`;
  };

  const getDifficultyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const comparisonFeatures = [
    { key: 'price', label: 'Price', icon: 'DollarSign' },
    { key: 'duration', label: 'Duration', icon: 'Clock' },
    { key: 'level', label: 'Level', icon: 'TrendingUp' },
    { key: 'rating', label: 'Rating', icon: 'Star' },
    { key: 'students', label: 'Students', icon: 'Users' },
    { key: 'instructor', label: 'Instructor', icon: 'User' },
    { key: 'features', label: 'Features', icon: 'Award' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Icon name="GitCompare" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-gray-900">
              Compare Courses ({courses?.length})
            </h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClearAll}
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Course Headers */}
            <div className="flex border-b border-gray-200">
              <div className="w-48 p-4 bg-gray-50 font-medium text-gray-900 sticky left-0 z-10">
                Courses
              </div>
              {courses?.map((course) => (
                <div key={course?.id} className="flex-1 min-w-80 p-4 border-l border-gray-200">
                  <div className="relative">
                    <button
                      onClick={() => onRemoveCourse(course?.id)}
                      className="absolute top-0 right-0 p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <Icon name="X" size={16} />
                    </button>
                    
                    <div className="pr-8">
                      <Image
                        src={course?.image}
                        alt={course?.imageAlt}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {course?.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {course?.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Rows */}
            {comparisonFeatures?.map((feature) => (
              <div key={feature?.key} className="flex border-b border-gray-200">
                <div className="w-48 p-4 bg-gray-50 font-medium text-gray-900 sticky left-0 z-10">
                  <div className="flex items-center space-x-2">
                    <Icon name={feature?.icon} size={16} className="text-gray-600" />
                    <span>{feature?.label}</span>
                  </div>
                </div>
                {courses?.map((course) => (
                  <div key={course?.id} className="flex-1 min-w-80 p-4 border-l border-gray-200">
                    {feature?.key === 'price' && (
                      <div>
                        <div className="text-lg font-bold text-gray-900">
                          {formatPrice(course?.price)}
                        </div>
                        {course?.originalPrice && course?.originalPrice > course?.price && (
                          <div className="text-sm text-gray-500 line-through">
                            ${course?.originalPrice}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {feature?.key === 'duration' && (
                      <span className="text-gray-900">{formatDuration(course?.duration)}</span>
                    )}
                    
                    {feature?.key === 'level' && (
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course?.level)}`}>
                        {course?.level}
                      </span>
                    )}
                    
                    {feature?.key === 'rating' && (
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={16} className="text-yellow-400 fill-current" />
                        <span className="font-medium text-gray-900">{course?.rating}</span>
                        <span className="text-sm text-gray-500">({course?.reviews})</span>
                      </div>
                    )}
                    
                    {feature?.key === 'students' && (
                      <span className="text-gray-900">{course?.students?.toLocaleString()}</span>
                    )}
                    
                    {feature?.key === 'instructor' && (
                      <div className="flex items-center space-x-2">
                        <Image
                          src={course?.instructor?.avatar}
                          alt={course?.instructor?.avatarAlt}
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {course?.instructor?.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {course?.instructor?.title}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {feature?.key === 'features' && (
                      <div className="space-y-1">
                        {course?.features?.slice(0, 4)?.map((courseFeature, index) => (
                          <div key={index} className="flex items-center space-x-1 text-sm">
                            <Icon name="Check" size={12} className="text-green-500" />
                            <span className="text-gray-700">{courseFeature}</span>
                          </div>
                        ))}
                        {course?.features?.length > 4 && (
                          <div className="text-xs text-gray-500">
                            +{course?.features?.length - 4} more features
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}

            {/* Action Buttons */}
            <div className="flex">
              <div className="w-48 p-4 bg-gray-50 sticky left-0 z-10">
                <span className="font-medium text-gray-900">Actions</span>
              </div>
              {courses?.map((course) => (
                <div key={course?.id} className="flex-1 min-w-80 p-4 border-l border-gray-200">
                  <div className="space-y-2">
                    {course?.isEnrolled ? (
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Play"
                        iconPosition="left"
                        fullWidth
                      >
                        Continue Learning
                      </Button>
                    ) : (
                      <Button
                        variant="default"
                        size="sm"
                        fullWidth
                      >
                        Enroll Now
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                      fullWidth
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseComparison;