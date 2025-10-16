import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressTracker = ({ 
  currentLesson, 
  totalLessons, 
  completedLessons, 
  currentProgress, 
  estimatedTimeRemaining,
  onNavigateToLesson,
  milestones = []
}) => {
  const progressPercentage = (completedLessons / totalLessons) * 100;
  const currentLessonProgress = currentProgress || 0;

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const getNextMilestone = () => {
    return milestones?.find(milestone => 
      (completedLessons + currentLessonProgress) < milestone?.lessonNumber
    );
  };

  const nextMilestone = getNextMilestone();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Learning Progress</h2>
          <p className="text-gray-600 mt-1">Track your journey through the course</p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            {Math.round(progressPercentage)}%
          </div>
          <div className="text-sm text-gray-500">Complete</div>
        </div>
      </div>
      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Lesson {currentLesson} of {totalLessons}
          </span>
          <span className="text-sm text-gray-500">
            {completedLessons} completed
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 relative"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse-gentle rounded-full" />
          </div>
          
          {/* Current lesson progress indicator */}
          <div 
            className="absolute top-0 h-full w-1 bg-accent rounded-full"
            style={{ left: `${(currentLesson - 1) / totalLessons * 100}%` }}
          />
        </div>
      </div>
      {/* Current Lesson Progress */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Current Lesson Progress</h3>
          <span className="text-sm text-gray-500">
            {Math.round(currentLessonProgress * 100)}%
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div 
            className="h-full bg-accent rounded-full transition-all duration-300"
            style={{ width: `${currentLessonProgress * 100}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>{formatTime(estimatedTimeRemaining)} remaining</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Target" size={14} />
            <span>On track</span>
          </div>
        </div>
      </div>
      {/* Milestones */}
      {milestones?.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">Milestones</h3>
          
          <div className="space-y-3">
            {milestones?.map((milestone, index) => {
              const isCompleted = completedLessons >= milestone?.lessonNumber;
              const isCurrent = nextMilestone?.id === milestone?.id;
              
              return (
                <div
                  key={milestone?.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                    isCompleted 
                      ? 'bg-success/10 border-success/20' 
                      : isCurrent 
                        ? 'bg-primary/10 border-primary/20' :'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-success text-white' 
                      : isCurrent 
                        ? 'bg-primary text-white' :'bg-gray-300 text-gray-600'
                  }`}>
                    {isCompleted ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <Icon name={milestone?.icon} size={16} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium ${
                      isCompleted ? 'text-success' : isCurrent ? 'text-primary' : 'text-gray-700'
                    }`}>
                      {milestone?.title}
                    </h4>
                    <p className="text-sm text-gray-600">{milestone?.description}</p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Lesson {milestone?.lessonNumber}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {/* Quick Navigation */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Navigation</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigateToLesson?.(currentLesson - 1)}
            disabled={currentLesson <= 1}
            iconName="ChevronLeft"
            iconPosition="left"
            fullWidth
          >
            Previous
          </Button>
          
          <Button
            size="sm"
            onClick={() => onNavigateToLesson?.(currentLesson + 1)}
            disabled={currentLesson >= totalLessons}
            iconName="ChevronRight"
            iconPosition="right"
            fullWidth
          >
            Next
          </Button>
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            fullWidth
          >
            Restart Lesson
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="BookOpen"
            iconPosition="left"
            fullWidth
          >
            Course Overview
          </Button>
        </div>
      </div>
      {/* Achievement Badge */}
      {nextMilestone && (
        <div className="mt-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <Icon name={nextMilestone?.icon} size={20} color="white" />
            </div>
            
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">Next Milestone</h4>
              <p className="text-sm text-gray-600">{nextMilestone?.title}</p>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-medium text-primary">
                {nextMilestone?.lessonNumber - currentLesson} lessons to go
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;