import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LearningJourneyMap = ({ journeyData }) => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Learning Journey Map</h2>
          <p className="text-sm text-gray-600 mt-1">Track your progress through milestones and achievements</p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full">
            Current Path
          </button>
          <Icon name="Map" size={20} className="text-gray-400" />
        </div>
      </div>
      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gray-200" />
        <div 
          className="absolute left-6 top-8 w-0.5 bg-gradient-to-b from-primary to-secondary transition-all duration-1000"
          style={{ height: `${(journeyData?.completedMilestones / journeyData?.totalMilestones) * 100}%` }}
        />

        {/* Milestones */}
        <div className="space-y-8">
          {journeyData?.milestones?.map((milestone, index) => (
            <div key={milestone?.id} className="relative flex items-start">
              {/* Milestone Indicator */}
              <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 ${
                milestone?.completed 
                  ? 'bg-primary border-primary text-white' 
                  : milestone?.current 
                    ? 'bg-white border-primary text-primary animate-pulse' :'bg-white border-gray-200 text-gray-400'
              }`}>
                {milestone?.completed ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>

              {/* Milestone Content */}
              <div className="ml-6 flex-1">
                <div 
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedMilestone === milestone?.id 
                      ? 'border-primary bg-primary/5' :'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedMilestone(selectedMilestone === milestone?.id ? null : milestone?.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{milestone?.title}</h3>
                    <div className="flex items-center space-x-2">
                      {milestone?.completed && (
                        <div className="flex items-center text-xs text-success">
                          <Icon name="Trophy" size={14} className="mr-1" />
                          Completed
                        </div>
                      )}
                      {milestone?.current && (
                        <div className="flex items-center text-xs text-primary">
                          <Icon name="Play" size={14} className="mr-1" />
                          In Progress
                        </div>
                      )}
                      <Icon 
                        name={selectedMilestone === milestone?.id ? "ChevronUp" : "ChevronDown"} 
                        size={16} 
                        className="text-gray-400" 
                      />
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{milestone?.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <Icon name="Clock" size={12} className="mr-1" />
                        {milestone?.duration}
                      </span>
                      <span className="flex items-center">
                        <Icon name="Target" size={12} className="mr-1" />
                        {milestone?.progress}% Complete
                      </span>
                    </div>
                    {milestone?.badge && (
                      <div className="flex items-center text-xs text-accent">
                        <Icon name="Award" size={12} className="mr-1" />
                        {milestone?.badge}
                      </div>
                    )}
                  </div>

                  {/* Expanded Content */}
                  {selectedMilestone === milestone?.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Learning Objectives</h4>
                          <ul className="space-y-1">
                            {milestone?.objectives?.map((objective, idx) => (
                              <li key={idx} className="flex items-start text-xs text-gray-600">
                                <Icon name="CheckCircle2" size={12} className="mr-2 mt-0.5 text-success flex-shrink-0" />
                                {objective}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Key Activities</h4>
                          <ul className="space-y-1">
                            {milestone?.activities?.map((activity, idx) => (
                              <li key={idx} className="flex items-start text-xs text-gray-600">
                                <Icon name="Play" size={12} className="mr-2 mt-0.5 text-primary flex-shrink-0" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningJourneyMap;