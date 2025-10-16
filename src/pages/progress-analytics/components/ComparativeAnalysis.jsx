import React, { useState } from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Icon from '../../../components/AppIcon';

const ComparativeAnalysis = ({ comparisonData }) => {
  const [viewMode, setViewMode] = useState('radar');
  const [comparisonType, setComparisonType] = useState('peer');

  const viewModes = [
    { id: 'radar', label: 'Skills Radar', icon: 'Radar' },
    { id: 'bar', label: 'Performance Bars', icon: 'BarChart3' }
  ];

  const comparisonTypes = [
    { id: 'peer', label: 'Peer Group', description: 'Compare with similar learners' },
    { id: 'cohort', label: 'Course Cohort', description: 'Compare with course peers' },
    { id: 'global', label: 'Global Average', description: 'Compare with all users' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-900 mb-1">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const data = comparisonData?.[comparisonType];
    
    if (viewMode === 'radar') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={data?.skillsComparison}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12, fill: '#6b7280' }} />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fontSize: 10, fill: '#6b7280' }}
            />
            <Radar
              name="You"
              dataKey="yourScore"
              stroke="#2563EB"
              fill="#2563EB"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Radar
              name={comparisonTypes?.find(t => t?.id === comparisonType)?.label}
              dataKey="averageScore"
              stroke="#10B981"
              fill="#10B981"
              fillOpacity={0.1}
              strokeWidth={2}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data?.performanceComparison}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="metric" stroke="#6b7280" fontSize={12} />
            <YAxis stroke="#6b7280" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="yourScore" fill="#2563EB" radius={[4, 4, 0, 0]} name="Your Score" />
            <Bar dataKey="averageScore" fill="#10B981" radius={[4, 4, 0, 0]} name="Average Score" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Comparative Analysis</h2>
          <p className="text-sm text-gray-600 mt-1">See how you compare with other learners</p>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={20} className="text-gray-400" />
          <span className="text-sm text-gray-600">Anonymous comparison</span>
        </div>
      </div>
      {/* Comparison Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        {comparisonTypes?.map((type) => (
          <button
            key={type?.id}
            onClick={() => setComparisonType(type?.id)}
            className={`p-3 rounded-lg border text-left transition-all duration-200 ${
              comparisonType === type?.id
                ? 'border-primary bg-primary/5 text-primary' :'border-gray-200 hover:border-gray-300 text-gray-600'
            }`}
          >
            <h3 className="font-medium text-sm">{type?.label}</h3>
            <p className="text-xs mt-1 opacity-80">{type?.description}</p>
          </button>
        ))}
      </div>
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
          {viewModes?.map((mode) => (
            <button
              key={mode?.id}
              onClick={() => setViewMode(mode?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                viewMode === mode?.id
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon name={mode?.icon} size={16} />
              <span>{mode?.label}</span>
            </button>
          ))}
        </div>
        
        <div className="text-xs text-gray-500">
          Data updated: {new Date()?.toLocaleDateString()}
        </div>
      </div>
      {/* Chart */}
      <div className="mb-6">
        {renderChart()}
      </div>
      {/* Performance Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="bg-success/5 rounded-lg p-4 border border-success/20">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="TrendingUp" size={18} className="text-success" />
            <h3 className="font-semibold text-success">Your Strengths</h3>
          </div>
          <ul className="space-y-2">
            {comparisonData?.[comparisonType]?.strengths?.map((strength, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <Icon name="CheckCircle2" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{strength}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-warning/5 rounded-lg p-4 border border-warning/20">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Target" size={18} className="text-warning" />
            <h3 className="font-semibold text-warning">Growth Opportunities</h3>
          </div>
          <ul className="space-y-2">
            {comparisonData?.[comparisonType]?.improvements?.map((improvement, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <Icon name="ArrowUp" size={14} className="text-warning mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Statistical Summary */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {comparisonData?.[comparisonType]?.stats?.percentile}%
            </div>
            <div className="text-xs text-gray-600">Percentile Rank</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              +{comparisonData?.[comparisonType]?.stats?.improvement}%
            </div>
            <div className="text-xs text-gray-600">vs Last Month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">
              {comparisonData?.[comparisonType]?.stats?.strongAreas}
            </div>
            <div className="text-xs text-gray-600">Strong Areas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">
              {comparisonData?.[comparisonType]?.stats?.totalLearners}
            </div>
            <div className="text-xs text-gray-600">Total Learners</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparativeAnalysis;