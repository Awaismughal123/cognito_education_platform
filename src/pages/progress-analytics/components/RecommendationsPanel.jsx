import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationsPanel = ({ recommendations }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [dismissedRecommendations, setDismissedRecommendations] = useState(new Set());

  const categories = [
    { id: 'all', label: 'All Recommendations', icon: 'Lightbulb' },
    { id: 'courses', label: 'Course Suggestions', icon: 'BookOpen' },
    { id: 'study', label: 'Study Techniques', icon: 'Brain' },
    { id: 'resources', label: 'Additional Resources', icon: 'Library' },
    { id: 'skills', label: 'Skill Development', icon: 'Target' }
  ];

  const getRecommendationIcon = (type) => {
    switch (type) {
      case 'course': return 'BookOpen';
      case 'study-technique': return 'Brain';
      case 'resource': return 'FileText';
      case 'skill': return 'Target';
      case 'practice': return 'Play';
      default: return 'Lightbulb';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const filteredRecommendations = recommendations?.filter(rec => {
    if (dismissedRecommendations?.has(rec?.id)) return false;
    if (activeCategory === 'all') return true;
    return rec?.category === activeCategory;
  });

  const handleDismiss = (recommendationId) => {
    setDismissedRecommendations(prev => new Set([...prev, recommendationId]));
  };

  const handleAccept = (recommendation) => {
    console.log('Accepted recommendation:', recommendation);
    // Handle recommendation acceptance logic
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">AI Recommendations</h2>
          <p className="text-sm text-gray-600 mt-1">Personalized suggestions to enhance your learning</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {filteredRecommendations?.length} Active
          </div>
          <Icon name="Sparkles" size={20} className="text-accent" />
        </div>
      </div>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-50 rounded-lg">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setActiveCategory(category?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeCategory === category?.id
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <Icon name={category?.icon} size={14} />
            <span className="hidden sm:inline">{category?.label}</span>
          </button>
        ))}
      </div>
      {/* Recommendations List */}
      <div className="space-y-4">
        {filteredRecommendations?.map((recommendation) => (
          <div 
            key={recommendation?.id} 
            className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-all duration-200 animate-fade-in"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getPriorityColor(recommendation?.priority)}`}>
                  <Icon name={getRecommendationIcon(recommendation?.type)} size={20} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-900">{recommendation?.title}</h3>
                    <div className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(recommendation?.priority)}`}>
                      {recommendation?.priority} priority
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{recommendation?.description}</p>
                </div>
              </div>
              <button
                onClick={() => handleDismiss(recommendation?.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <Icon name="X" size={16} />
              </button>
            </div>

            {/* Recommendation Details */}
            <div className="mb-4">
              <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                <span className="flex items-center">
                  <Icon name="Clock" size={12} className="mr-1" />
                  {recommendation?.estimatedTime}
                </span>
                <span className="flex items-center">
                  <Icon name="TrendingUp" size={12} className="mr-1" />
                  {recommendation?.impact} impact
                </span>
                <span className="flex items-center">
                  <Icon name="Users" size={12} className="mr-1" />
                  {recommendation?.successRate}% success rate
                </span>
              </div>
              
              {recommendation?.reasons && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Why this recommendation?</h4>
                  <ul className="space-y-1">
                    {recommendation?.reasons?.map((reason, index) => (
                      <li key={index} className="flex items-start text-xs text-gray-600">
                        <Icon name="ArrowRight" size={10} className="mr-2 mt-1 flex-shrink-0" />
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {recommendation?.tags && recommendation?.tags?.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="BookmarkPlus"
                  iconSize={14}
                >
                  Save
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={14}
                  onClick={() => handleAccept(recommendation)}
                >
                  {recommendation?.actionText || 'Get Started'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredRecommendations?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Sparkles" size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Recommendations Available</h3>
          <p className="text-gray-600 mb-4">
            {activeCategory === 'all' 
              ? "Complete more activities to receive personalized recommendations"
              : `No ${categories?.find(c => c?.id === activeCategory)?.label?.toLowerCase()} available right now`
            }
          </p>
          <Button
            variant="outline"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={() => window.location?.reload()}
          >
            Refresh Recommendations
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecommendationsPanel;