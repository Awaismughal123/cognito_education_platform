import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseCard = ({ course, onWishlistToggle, onCompare, isInWishlist = false, isInComparison = false }) => {
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={course?.image}
          alt={course?.imageAlt}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {/* Overlay Actions */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            variant="secondary"
            size="sm"
            iconName="Play"
            iconPosition="left"
            className="bg-white/90 text-gray-900 hover:bg-white"
          >
            Preview Course
          </Button>
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={() => onWishlistToggle(course?.id)}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isInWishlist 
                ? 'bg-red-500 text-white' :'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
            }`}
          >
            <Icon name="Heart" size={16} className={isInWishlist ? 'fill-current' : ''} />
          </button>
          
          <button
            onClick={() => onCompare(course?.id)}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isInComparison 
                ? 'bg-blue-500 text-white' :'bg-white/80 text-gray-600 hover:bg-white hover:text-blue-500'
            }`}
          >
            <Icon name="GitCompare" size={16} />
          </button>
        </div>

        {/* Course Level Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course?.level)}`}>
            {course?.level}
          </span>
        </div>

        {/* New Course Badge */}
        {course?.isNew && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">
              New
            </span>
          </div>
        )}
      </div>
      {/* Course Content */}
      <div className="p-5">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-primary font-medium">{course?.category}</span>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Icon name="Clock" size={14} />
            <span>{formatDuration(course?.duration)}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors duration-200">
          <Link to={`/course/${course?.id}`}>
            {course?.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {course?.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center mb-4">
          <Image
            src={course?.instructor?.avatar}
            alt={course?.instructor?.avatarAlt}
            className="w-8 h-8 rounded-full mr-3"
          />
          <div>
            <p className="text-sm font-medium text-gray-900">{course?.instructor?.name}</p>
            <p className="text-xs text-gray-500">{course?.instructor?.title}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-gray-900">{course?.rating}</span>
              <span className="text-sm text-gray-500">({course?.reviews})</span>
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Icon name="Users" size={14} />
              <span>{course?.students?.toLocaleString()}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">{formatPrice(course?.price)}</div>
            {course?.originalPrice && course?.originalPrice > course?.price && (
              <div className="text-sm text-gray-500 line-through">${course?.originalPrice}</div>
            )}
          </div>
        </div>

        {/* Progress Bar (if enrolled) */}
        {course?.progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-900">{course?.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                style={{ width: `${course?.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {course?.isEnrolled ? (
            <Button
              variant="default"
              size="sm"
              iconName="Play"
              iconPosition="left"
              fullWidth
              asChild
            >
              <Link to="/learning-interface">Continue Learning</Link>
            </Button>
          ) : (
            <>
              <Button
                variant="default"
                size="sm"
                fullWidth
                className="flex-1"
              >
                Enroll Now
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                className="px-3"
              >
              </Button>
            </>
          )}
        </div>

        {/* Course Features */}
        <div className="flex flex-wrap gap-2 mt-3">
          {course?.features?.slice(0, 3)?.map((feature, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-600"
            >
              <Icon name="Check" size={12} className="mr-1 text-green-500" />
              {feature}
            </span>
          ))}
          {course?.features?.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 text-xs text-gray-600">
              +{course?.features?.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;