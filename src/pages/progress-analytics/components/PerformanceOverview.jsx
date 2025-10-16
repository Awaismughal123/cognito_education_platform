import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceOverview = ({ overviewData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {overviewData?.map((metric) => (
        <div key={metric?.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${metric?.bgColor}`}>
              <Icon name={metric?.icon} size={24} className={metric?.iconColor} />
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${metric?.trendColor}`}>
              <Icon name={metric?.trendIcon} size={12} className="inline mr-1" />
              {metric?.trend}
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-gray-900">{metric?.value}</h3>
            <p className="text-sm font-medium text-gray-600">{metric?.label}</p>
            <p className="text-xs text-gray-500">{metric?.description}</p>
          </div>
          
          {metric?.progress && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Progress</span>
                <span>{metric?.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${metric?.progressColor}`}
                  style={{ width: `${metric?.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PerformanceOverview;