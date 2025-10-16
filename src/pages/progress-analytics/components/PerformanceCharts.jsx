import React, { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceCharts = ({ chartData }) => {
  const [activeChart, setActiveChart] = useState('progress');

  const chartTabs = [
    { id: 'progress', label: 'Learning Progress', icon: 'TrendingUp' },
    { id: 'performance', label: 'Performance Trends', icon: 'BarChart3' },
    { id: 'engagement', label: 'Engagement Patterns', icon: 'Activity' },
    { id: 'subjects', label: 'Subject Distribution', icon: 'PieChart' }
  ];

  const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-900 mb-1">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-xs" style={{ color: entry?.color }}>
              {entry?.name}: {entry?.value}
              {entry?.name?.includes('Score') || entry?.name?.includes('Rate') ? '%' : ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (activeChart) {
      case 'progress':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData?.progressData}>
              <defs>
                <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="completion" 
                stroke="#2563EB" 
                strokeWidth={2}
                fill="url(#progressGradient)" 
                name="Completion Rate"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'performance':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData?.performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="quizScore" 
                stroke="#2563EB" 
                strokeWidth={2}
                dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                name="Quiz Score"
              />
              <Line 
                type="monotone" 
                dataKey="assignmentScore" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                name="Assignment Score"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'engagement':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData?.engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="studyTime" fill="#2563EB" radius={[4, 4, 0, 0]} name="Study Time (hours)" />
              <Bar dataKey="interactions" fill="#10B981" radius={[4, 4, 0, 0]} name="Interactions" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'subjects':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData?.subjectData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData?.subjectData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Performance Analytics</h2>
          <p className="text-sm text-gray-600 mt-1">Detailed insights into your learning patterns and progress</p>
        </div>
        <button className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <Icon name="Download" size={16} />
          <span>Export Report</span>
        </button>
      </div>
      {/* Chart Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-50 rounded-lg">
        {chartTabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveChart(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeChart === tab?.id
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Chart Container */}
      <div className="relative">
        {renderChart()}
      </div>
      {/* Chart Legend for Pie Chart */}
      {activeChart === 'subjects' && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {chartData?.subjectData?.map((subject, index) => (
            <div key={subject?.name} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
              />
              <span className="text-sm text-gray-600">{subject?.name}</span>
              <span className="text-sm font-medium text-gray-900">{subject?.value}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PerformanceCharts;