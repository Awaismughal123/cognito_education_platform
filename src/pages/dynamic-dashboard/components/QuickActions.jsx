import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ upcomingDeadlines, studyGroups }) => {
  const quickActionItems = [
    {
      title: 'Browse Courses',
      description: 'Discover new learning opportunities',
      icon: 'Search',
      color: 'text-primary bg-primary/10',
      link: '/course-catalog'
    },
    {
      title: 'Join Study Group',
      description: 'Connect with fellow learners',
      icon: 'Users',
      color: 'text-secondary bg-secondary/10',
      link: '/community-hub'
    },
    {
      title: 'Access Resources',
      description: 'Download study materials',
      icon: 'Library',
      color: 'text-accent bg-accent/10',
      link: '/resource-library'
    },
    {
      title: 'View Certificates',
      description: 'Track your achievements',
      icon: 'Award',
      color: 'text-success bg-success/10',
      link: '/certification-center'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActionItems?.map((action, index) => (
            <Link key={index} to={action?.link}>
              <div className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 group">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${action?.color}`}>
                    <Icon name={action?.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors duration-200">
                      {action?.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {action?.description}
                    </p>
                  </div>
                  <Icon name="ArrowRight" size={16} className="text-gray-400 group-hover:text-primary transition-colors duration-200" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Upcoming Deadlines</h2>
          <Link to="/learning-interface" className="text-sm text-primary hover:text-secondary font-medium">
            View All
          </Link>
        </div>
        
        <div className="space-y-3">
          {upcomingDeadlines?.map((deadline) => (
            <div key={deadline?.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{deadline?.title}</p>
                  <p className="text-xs text-gray-500">{deadline?.course}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{deadline?.dueDate}</p>
                <p className="text-xs text-warning">{deadline?.timeRemaining}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Active Study Groups */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Your Study Groups</h2>
          <Link to="/community-hub" className="text-sm text-primary hover:text-secondary font-medium">
            View All
          </Link>
        </div>
        
        <div className="space-y-3">
          {studyGroups?.map((group) => (
            <div key={group?.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <Icon name="Users" size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{group?.name}</p>
                  <p className="text-xs text-gray-500">{group?.members} members • {group?.subject}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {group?.hasNewMessages && (
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                )}
                <Button variant="ghost" size="sm" iconName="MessageCircle" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;