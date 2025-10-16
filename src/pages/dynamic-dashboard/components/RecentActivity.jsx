import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'course_completed': return 'CheckCircle';
      case 'badge_earned': return 'Award';
      case 'quiz_passed': return 'Brain';
      case 'discussion_posted': return 'MessageCircle';
      case 'resource_downloaded': return 'Download';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'course_completed': return 'text-success bg-success/10';
      case 'badge_earned': return 'text-accent bg-accent/10';
      case 'quiz_passed': return 'text-primary bg-primary/10';
      case 'discussion_posted': return 'text-secondary bg-secondary/10';
      case 'resource_downloaded': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        <Link to="/progress-analytics" className="text-sm text-primary hover:text-secondary font-medium">
          View All Activity
        </Link>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={18} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    {activity?.title}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {activity?.description}
                  </p>
                  
                  {activity?.course && (
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-6 h-6 rounded overflow-hidden">
                        <Image 
                          src={activity?.course?.thumbnail} 
                          alt={activity?.course?.thumbnailAlt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs text-gray-500">{activity?.course?.title}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{formatTimeAgo(activity?.timestamp)}</span>
                    {activity?.points && (
                      <span className="flex items-center">
                        <Icon name="Zap" size={12} className="mr-1 text-accent" />
                        +{activity?.points} XP
                      </span>
                    )}
                  </div>
                </div>
                
                {activity?.badge && (
                  <div className="ml-3 flex-shrink-0">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image 
                        src={activity?.badge?.image} 
                        alt={activity?.badge?.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100">
        <Link to="/community-hub">
          <div className="flex items-center justify-center space-x-2 text-sm text-primary hover:text-secondary font-medium transition-colors duration-200">
            <Icon name="Users" size={16} />
            <span>Join Community Discussions</span>
            <Icon name="ArrowRight" size={14} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RecentActivity;