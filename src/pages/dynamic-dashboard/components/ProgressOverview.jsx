import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const ProgressOverview = ({ weeklyGoal, completedHours, coursesInProgress, certificationsEarned }) => {
  const progressPercentage = Math.round((completedHours / weeklyGoal) * 100);
  
  const stats = [
    {
      label: 'Courses in Progress',
      value: coursesInProgress,
      icon: 'BookOpen',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Hours This Week',
      value: `${completedHours}/${weeklyGoal}`,
      icon: 'Clock',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Certifications Earned',
      value: certificationsEarned,
      icon: 'Award',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Weekly Progress',
      value: `${progressPercentage}%`,
      icon: 'TrendingUp',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Progress Overview</h2>
        <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats?.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center mx-auto mb-3`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat?.value}</div>
            <div className="text-sm text-gray-500">{stat?.label}</div>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Weekly Learning Goal</span>
          <span className="text-sm text-gray-500">{completedHours} of {weeklyGoal} hours</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-gray-500">
          {progressPercentage >= 100 ? 'Goal achieved! 🎉' : `${weeklyGoal - completedHours} hours remaining`}
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;