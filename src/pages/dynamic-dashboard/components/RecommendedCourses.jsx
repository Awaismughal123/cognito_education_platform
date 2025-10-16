import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendedCourses = ({ recommendations }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Recommended for You</h2>
          <p className="text-sm text-gray-500 mt-1">Based on your learning history and goals</p>
        </div>
        <Link to="/course-catalog">
          <Button variant="ghost" size="sm" iconName="ArrowRight">
            View All
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations?.map((course) => (
          <div key={course?.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 group">
            <div className="relative h-40 overflow-hidden">
              <Image 
                src={course?.thumbnail} 
                alt={course?.thumbnailAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2">
                <div className="bg-accent text-white text-xs font-medium px-2 py-1 rounded">
                  {course?.level}
                </div>
              </div>
              {course?.isNew && (
                <div className="absolute top-2 right-2">
                  <div className="bg-success text-white text-xs font-medium px-2 py-1 rounded">
                    New
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded">
                  {course?.category}
                </span>
                <div className="text-xs text-gray-500">{course?.duration}</div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {course?.title}
              </h3>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {course?.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Icon name="Star" size={14} className="text-accent fill-current mr-1" />
                  <span className="text-sm text-gray-600 mr-2">{course?.rating}</span>
                  <span className="text-xs text-gray-500">({course?.reviews})</span>
                </div>
                <div className="text-sm font-semibold text-gray-900">
                  {course?.price === 0 ? 'Free' : `$${course?.price}`}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  by {course?.instructor}
                </div>
                <Button variant="outline" size="sm" iconName="Plus">
                  Enroll
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses;