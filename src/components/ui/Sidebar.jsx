import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      section: 'Learning',
      items: [
        { path: '/dynamic-dashboard', label: 'Dashboard', icon: 'LayoutDashboard', description: 'Overview & progress' },
        { path: '/course-catalog', label: 'Course Catalog', icon: 'BookOpen', description: 'Browse all courses' },
        { path: '/learning-interface', label: 'Active Learning', icon: 'Play', description: 'Continue learning' },
        { path: '/progress-analytics', label: 'Progress Analytics', icon: 'TrendingUp', description: 'Track your growth' },
      ]
    },
    {
      section: 'Community',
      items: [
        { path: '/community-hub', label: 'Community Hub', icon: 'Users', description: 'Connect with peers' },
        { path: '/resource-library', label: 'Resource Library', icon: 'Library', description: 'Study materials' },
        { path: '/certification-center', label: 'Certifications', icon: 'Award', description: 'Earn credentials' },
      ]
    }
  ];

  const quickActions = [
    { label: 'New Course', icon: 'Plus', action: () => console.log('New course') },
    { label: 'Study Plan', icon: 'Calendar', action: () => console.log('Study plan') },
    { label: 'Help Center', icon: 'HelpCircle', action: () => console.log('Help') },
  ];

  const isActivePath = (path) => location?.pathname === path;
  const shouldShowExpanded = !isCollapsed || isHovered;

  return (
    <>
      <aside 
        className={`fixed left-0 top-16 bottom-0 z-40 bg-white border-r border-gray-200 transition-all duration-300 ease-out ${
          shouldShowExpanded ? 'w-64' : 'w-16'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              {shouldShowExpanded && (
                <div className="animate-fade-in">
                  <h2 className="text-sm font-semibold text-gray-900">Navigation</h2>
                  <p className="text-xs text-gray-500 mt-1">Explore your learning journey</p>
                </div>
              )}
              {onToggle && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
                  iconSize={16}
                  onClick={onToggle}
                  className={`${shouldShowExpanded ? '' : 'mx-auto'}`}
                />
              )}
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="flex-1 overflow-y-auto py-4">
            {navigationItems?.map((section, sectionIndex) => (
              <div key={section?.section} className={`${sectionIndex > 0 ? 'mt-6' : ''}`}>
                {shouldShowExpanded && (
                  <div className="px-4 mb-2 animate-fade-in">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {section?.section}
                    </h3>
                  </div>
                )}
                
                <nav className="space-y-1 px-2">
                  {section?.items?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`group flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActivePath(item?.path)
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon 
                        name={item?.icon} 
                        size={18} 
                        className={`flex-shrink-0 ${shouldShowExpanded ? 'mr-3' : 'mx-auto'}`}
                      />
                      
                      {shouldShowExpanded && (
                        <div className="animate-fade-in min-w-0 flex-1">
                          <div className="truncate">{item?.label}</div>
                          {item?.description && (
                            <div className={`text-xs mt-0.5 truncate ${
                              isActivePath(item?.path) 
                                ? 'text-white/80' :'text-gray-400 group-hover:text-gray-500'
                            }`}>
                              {item?.description}
                            </div>
                          )}
                        </div>
                      )}

                      {isActivePath(item?.path) && (
                        <div className="w-1 h-6 bg-white rounded-full ml-auto" />
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="border-t border-gray-100 p-4">
            {shouldShowExpanded && (
              <div className="mb-3 animate-fade-in">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Quick Actions
                </h3>
              </div>
            )}
            
            <div className="space-y-2">
              {quickActions?.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  iconName={action?.icon}
                  iconSize={16}
                  onClick={action?.action}
                  className={`w-full ${shouldShowExpanded ? 'justify-start' : 'justify-center px-0'}`}
                >
                  {shouldShowExpanded && (
                    <span className="animate-fade-in">{action?.label}</span>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* User Progress Summary */}
          {shouldShowExpanded && (
            <div className="border-t border-gray-100 p-4 animate-fade-in">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900">Weekly Goal</span>
                  <Icon name="Target" size={16} className="text-primary" />
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
                    style={{ width: '68%' }}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-gray-600">
                  <span>17 of 25 hours</span>
                  <span>68%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
      {/* Backdrop for mobile */}
      {shouldShowExpanded && isHovered && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-30"
          onClick={() => setIsHovered(false)}
        />
      )}
    </>
  );
};

export default Sidebar;