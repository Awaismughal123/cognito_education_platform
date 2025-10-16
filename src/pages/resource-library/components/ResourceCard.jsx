import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ResourceCard = ({ resource, onBookmark, onDownload, onView }) => {
  const [isBookmarked, setIsBookmarked] = useState(resource?.isBookmarked || false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark(resource?.id, !isBookmarked);
  };

  const getTypeIcon = (type) => {
    const icons = {
      video: 'Play',
      document: 'FileText',
      template: 'Layout',
      guide: 'BookOpen',
      tool: 'Wrench',
      assessment: 'CheckSquare'
    };
    return icons?.[type] || 'File';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-orange-100 text-orange-800',
      expert: 'bg-red-100 text-red-800'
    };
    return colors?.[difficulty] || 'bg-gray-100 text-gray-800';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group">
      {/* Resource Thumbnail */}
      <div className="relative overflow-hidden rounded-t-lg h-48">
        <Image
          src={resource?.thumbnail}
          alt={resource?.thumbnailAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <Icon name={getTypeIcon(resource?.type)} size={14} className="text-primary" />
            <span className="text-xs font-medium text-gray-700 capitalize">{resource?.type}</span>
          </div>
        </div>

        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
        >
          <Icon 
            name={isBookmarked ? "Bookmark" : "BookmarkPlus"} 
            size={16} 
            className={isBookmarked ? "text-primary fill-current" : "text-gray-600"} 
          />
        </button>

        {/* Premium Badge */}
        {resource?.isPremium && (
          <div className="absolute bottom-3 left-3">
            <div className="bg-gradient-to-r from-accent to-warning text-white rounded-full px-2 py-1 flex items-center gap-1">
              <Icon name="Crown" size={12} />
              <span className="text-xs font-medium">Premium</span>
            </div>
          </div>
        )}
      </div>
      {/* Resource Content */}
      <div className="p-4">
        {/* Title and Description */}
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {resource?.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{resource?.description}</p>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Icon name="User" size={12} />
            {resource?.author}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Icon name="Calendar" size={12} />
            {resource?.updatedAt}
          </span>
          {resource?.fileSize && (
            <>
              <span>•</span>
              <span>{formatFileSize(resource?.fileSize)}</span>
            </>
          )}
        </div>

        {/* Tags and Difficulty */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-1">
            {resource?.tags?.slice(0, 2)?.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {resource?.tags?.length > 2 && (
              <span className="text-xs text-gray-400">+{resource?.tags?.length - 2}</span>
            )}
          </div>
          
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(resource?.difficulty)}`}>
            {resource?.difficulty}
          </span>
        </div>

        {/* Rating and Downloads */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={i < Math.floor(resource?.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-gray-600 ml-1">({resource?.reviews})</span>
          </div>
          
          <div className="flex items-center gap-1 text-gray-500">
            <Icon name="Download" size={14} />
            <span>{resource?.downloads}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => onView(resource)}
            iconName="Eye"
            iconPosition="left"
            iconSize={14}
            fullWidth
          >
            View
          </Button>
          
          {resource?.downloadable && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownload(resource)}
              iconName="Download"
              iconSize={14}
              className="flex-shrink-0"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;