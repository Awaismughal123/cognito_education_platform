import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AchievementShowcase = ({ recentBadges, certificates, learningStreak }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
        <Link to="/certification-center">
          <Button variant="ghost" size="sm" iconName="Trophy">
            View All
          </Button>
        </Link>
      </div>
      {/* Learning Streak */}
      <div className="bg-gradient-to-r from-accent/10 to-warning/10 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-accent to-warning rounded-full flex items-center justify-center">
              <Icon name="Flame" size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Learning Streak</h3>
              <p className="text-sm text-gray-600">Keep up the great work!</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{learningStreak?.current}</div>
            <div className="text-sm text-gray-500">days</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Progress to next milestone</span>
            <span className="font-medium text-gray-900">{learningStreak?.current}/{learningStreak?.nextMilestone}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-accent to-warning h-2 rounded-full transition-all duration-300"
              style={{ width: `${(learningStreak?.current / learningStreak?.nextMilestone) * 100}%` }}
            />
          </div>
        </div>
      </div>
      {/* Recent Badges */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Badges</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {recentBadges?.map((badge) => (
            <div key={badge?.id} className="text-center group cursor-pointer">
              <div className="w-16 h-16 mx-auto mb-2 relative">
                <Image 
                  src={badge?.image} 
                  alt={badge?.imageAlt}
                  className="w-full h-full object-cover rounded-full border-2 border-accent group-hover:border-primary transition-colors duration-200"
                />
                {badge?.isNew && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Sparkles" size={10} className="text-white" />
                  </div>
                )}
              </div>
              <h4 className="text-xs font-medium text-gray-900 mb-1">{badge?.name}</h4>
              <p className="text-xs text-gray-500">{badge?.earnedDate}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Certificates */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Latest Certificates</h3>
        <div className="space-y-3">
          {certificates?.map((cert) => (
            <div key={cert?.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Award" size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900">{cert?.name}</h4>
                  <p className="text-xs text-gray-500">Completed {cert?.completedDate}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">Score: {cert?.score}%</div>
                  <div className="text-xs text-gray-500">{cert?.credentialId}</div>
                </div>
                <Button variant="ghost" size="sm" iconName="Download" />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Achievement Stats */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{recentBadges?.length + 12}</div>
            <div className="text-xs text-gray-500">Total Badges</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-secondary">{certificates?.length + 3}</div>
            <div className="text-xs text-gray-500">Certificates</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent">2,450</div>
            <div className="text-xs text-gray-500">XP Points</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementShowcase;