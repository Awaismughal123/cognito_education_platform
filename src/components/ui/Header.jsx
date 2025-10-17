import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const location = useLocation();

  const primaryNavItems = [
    { path: '/dynamic-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/course-catalog', label: 'Courses', icon: 'BookOpen' },
    { path: '/learning-interface', label: 'Learn', icon: 'Play' },
    { path: '/progress-analytics', label: 'Progress', icon: 'TrendingUp' },
  ];

  const secondaryNavItems = [
    { path: '/community-hub', label: 'Community', icon: 'Users' },
    { path: '/resource-library', label: 'Resources', icon: 'Library' },
    { path: '/certification-center', label: 'Certifications', icon: 'Award' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMoreMenuOpen(false);
  };

  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(!isMoreMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMoreMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dynamic-dashboard" className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="Brain" size={20} color="white" strokeWidth={2.5} />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              Cognito
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {primaryNavItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            ))}
            
            {/* More Menu */}
            <div className="relative">
              <button
                onClick={toggleMoreMenu}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  secondaryNavItems?.some(item => isActivePath(item?.path))
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
                <Icon 
                  name="ChevronDown" 
                  size={14} 
                  className={`transition-transform duration-200 ${isMoreMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* More Dropdown */}
              {isMoreMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-fade-in">
                  {secondaryNavItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      onClick={() => setIsMoreMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                        isActivePath(item?.path)
                          ? 'bg-primary/10 text-primary font-medium' :'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              iconName="Bell"
              iconSize={18}
              className="hidden sm:flex"
            >
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              iconName="Search"
              iconSize={18}
              className="hidden sm:flex"
            >
            </Button>

            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-warning rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-white">JD</span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">Muhammad Awais</p>
                <p className="text-xs text-gray-500">Student</p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {[...primaryNavItems, ...secondaryNavItems]?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={closeMobileMenu}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </Link>
            ))}
            
            <div className="pt-3 mt-3 border-t border-gray-200">
              <div className="flex items-center space-x-3 px-3 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Bell"
                  iconSize={18}
                  fullWidth
                >
                  Notifications
                </Button>
              </div>
              <div className="flex items-center space-x-3 px-3 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Search"
                  iconSize={18}
                  fullWidth
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
        />
      )}
      {/* Overlay for more menu */}
      {isMoreMenuOpen && (
        <div 
          className="fixed inset-0 z-10"
          onClick={() => setIsMoreMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;