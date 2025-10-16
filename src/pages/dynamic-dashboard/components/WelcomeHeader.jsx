import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeHeader = ({ userName, currentStreak, totalHours }) => {
  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            {getGreeting()}, {userName}! 👋
          </h1>
          <p className="text-white/90 text-lg">
            Ready to continue your learning journey?
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Icon name="Flame" size={20} className="text-accent mr-2" />
              <span className="text-sm font-medium">Current Streak</span>
            </div>
            <div className="text-2xl font-bold">{currentStreak} days</div>
          </div>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Icon name="Clock" size={20} className="text-accent mr-2" />
              <span className="text-sm font-medium">Total Hours</span>
            </div>
            <div className="text-2xl font-bold">{totalHours}h</div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="secondary" size="sm" iconName="Play">
          Resume Learning
        </Button>
        <Button variant="outline" size="sm" iconName="Calendar" className="text-white border-white hover:bg-white hover:text-primary">
          View Schedule
        </Button>
      </div>
    </div>
  );
};

export default WelcomeHeader;