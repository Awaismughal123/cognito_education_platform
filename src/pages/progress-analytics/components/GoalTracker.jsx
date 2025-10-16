import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GoalTracker = ({ goals, onAddGoal, onUpdateGoal }) => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    targetDate: '',
    category: 'learning'
  });

  const handleAddGoal = () => {
    if (newGoal?.title && newGoal?.targetDate) {
      onAddGoal({
        ...newGoal,
        id: Date.now(),
        progress: 0,
        status: 'active',
        createdAt: new Date()?.toISOString()
      });
      setNewGoal({ title: '', description: '', targetDate: '', category: 'learning' });
      setShowAddGoal(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'at-risk': return 'text-warning bg-warning/10';
      case 'overdue': return 'text-error bg-error/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'learning': return 'BookOpen';
      case 'skill': return 'Target';
      case 'certification': return 'Award';
      case 'project': return 'Briefcase';
      default: return 'Flag';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Goal Tracker</h2>
          <p className="text-sm text-gray-600 mt-1">Set and track your learning objectives</p>
        </div>
        <Button
          variant="default"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowAddGoal(!showAddGoal)}
        >
          Add Goal
        </Button>
      </div>
      {/* Add Goal Form */}
      {showAddGoal && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg animate-fade-in">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Create New Goal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Goal Title"
              type="text"
              placeholder="Enter your goal"
              value={newGoal?.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e?.target?.value })}
              required
            />
            <Input
              label="Target Date"
              type="date"
              value={newGoal?.targetDate}
              onChange={(e) => setNewGoal({ ...newGoal, targetDate: e?.target?.value })}
              required
            />
          </div>
          <div className="mt-4">
            <Input
              label="Description"
              type="text"
              placeholder="Describe your goal in detail"
              value={newGoal?.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e?.target?.value })}
            />
          </div>
          <div className="flex items-center justify-end space-x-3 mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddGoal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={handleAddGoal}
            >
              Create Goal
            </Button>
          </div>
        </div>
      )}
      {/* Goals List */}
      <div className="space-y-4">
        {goals?.map((goal) => (
          <div key={goal?.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  goal?.status === 'completed' ? 'bg-success/10' : 'bg-primary/10'
                }`}>
                  <Icon 
                    name={goal?.status === 'completed' ? 'CheckCircle2' : getCategoryIcon(goal?.category)} 
                    size={20} 
                    className={goal?.status === 'completed' ? 'text-success' : 'text-primary'} 
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{goal?.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{goal?.description}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal?.status)}`}>
                {goal?.status?.charAt(0)?.toUpperCase() + goal?.status?.slice(1)}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span>{goal?.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    goal?.status === 'completed' ? 'bg-success' : 
                    goal?.status === 'at-risk' ? 'bg-warning' :
                    goal?.status === 'overdue' ? 'bg-error' : 'bg-primary'
                  }`}
                  style={{ width: `${goal?.progress}%` }}
                />
              </div>
            </div>

            {/* Goal Details */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Icon name="Calendar" size={12} className="mr-1" />
                  Due: {new Date(goal.targetDate)?.toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <Icon name="Clock" size={12} className="mr-1" />
                  {Math.ceil((new Date(goal.targetDate) - new Date()) / (1000 * 60 * 60 * 24))} days left
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className="text-primary hover:text-primary/80 transition-colors duration-200"
                  onClick={() => onUpdateGoal(goal?.id, { progress: Math.min(100, goal?.progress + 10) })}
                >
                  <Icon name="Plus" size={14} />
                </button>
                <button className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                  <Icon name="MoreHorizontal" size={14} />
                </button>
              </div>
            </div>

            {/* Milestones */}
            {goal?.milestones && goal?.milestones?.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <h4 className="text-xs font-medium text-gray-700 mb-2">Milestones</h4>
                <div className="flex flex-wrap gap-2">
                  {goal?.milestones?.map((milestone, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                        milestone?.completed 
                          ? 'bg-success/10 text-success' :'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <Icon 
                        name={milestone?.completed ? 'CheckCircle2' : 'Circle'} 
                        size={10} 
                      />
                      <span>{milestone?.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {goals?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Target" size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Goals Set Yet</h3>
          <p className="text-gray-600 mb-4">Start by setting your first learning goal to track your progress</p>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
            onClick={() => setShowAddGoal(true)}
          >
            Create Your First Goal
          </Button>
        </div>
      )}
    </div>
  );
};

export default GoalTracker;