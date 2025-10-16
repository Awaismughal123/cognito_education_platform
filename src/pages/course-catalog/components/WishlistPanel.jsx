import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WishlistPanel = ({ courses, onRemoveCourse, isOpen, onClose }) => {
  const formatPrice = (price) => {
    if (price === 0) return 'Free';
    return `$${price}`;
  };

  const formatDuration = (hours) => {
    if (hours < 1) return `${Math.round(hours * 60)} mins`;
    return `${hours}h`;
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}
      {/* Wishlist Panel */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Icon name="Heart" size={20} className="text-red-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              Wishlist ({courses?.length})
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {courses?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center p-6">
              <Icon name="Heart" size={48} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-600 mb-4">
                Save courses you're interested in to view them later
              </p>
              <Button
                variant="outline"
                onClick={onClose}
              >
                Browse Courses
              </Button>
            </div>
          ) : (
            <div className="p-4 space-y-4">
              {courses?.map((course) => (
                <div key={course?.id} className="bg-gray-50 rounded-lg p-4 relative group">
                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveCourse(course?.id)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200"
                  >
                    <Icon name="X" size={16} />
                  </button>

                  {/* Course Info */}
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <Image
                        src={course?.image}
                        alt={course?.imageAlt}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
                        <Link 
                          to={`/course/${course?.id}`}
                          className="hover:text-primary transition-colors duration-200"
                        >
                          {course?.title}
                        </Link>
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        {course?.instructor?.name}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Icon name="Star" size={12} className="text-yellow-400 fill-current" />
                            <span>{course?.rating}</span>
                          </div>
                          <span>•</span>
                          <span>{formatDuration(course?.duration)}</span>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            {formatPrice(course?.price)}
                          </div>
                          {course?.originalPrice && course?.originalPrice > course?.price && (
                            <div className="text-xs text-gray-500 line-through">
                              ${course?.originalPrice}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-3 flex space-x-2">
                    {course?.isEnrolled ? (
                      <Button
                        variant="default"
                        size="sm"
                        iconName="Play"
                        iconPosition="left"
                        fullWidth
                        asChild
                      >
                        <Link to="/learning-interface">Continue</Link>
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="default"
                          size="sm"
                          className="flex-1"
                        >
                          Enroll
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
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {courses?.length > 0 && (
          <div className="border-t border-gray-200 p-4 space-y-3">
            <Button
              variant="outline"
              fullWidth
              iconName="Share"
              iconPosition="left"
            >
              Share Wishlist
            </Button>
            
            <div className="text-center">
              <button
                onClick={() => courses?.forEach(course => onRemoveCourse(course?.id))}
                className="text-sm text-gray-500 hover:text-red-500 transition-colors duration-200"
              >
                Clear all items
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WishlistPanel;