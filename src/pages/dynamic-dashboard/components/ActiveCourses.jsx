import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActiveCourses = ({ courses }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
        <Link to="/course-catalog">
          <Button variant="ghost" size="sm" iconName="Plus">
            Browse Courses
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses?.map((course) => (
          <div key={course?.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="relative h-32 overflow-hidden">
              <Image 
                src={course?.thumbnail} 
                alt={course?.thumbnailAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <div className="bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {course?.duration}
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                  {course?.category}
                </span>
                <div className="flex items-center text-xs text-gray-500">
                  <Icon name="Users" size={12} className="mr-1" />
                  {course?.students}
                </div>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {course?.title}
              </h3>
              
              <div className="flex items-center mb-3">
                <div className="flex items-center mr-3">
                  <Icon name="Star" size={14} className="text-accent fill-current mr-1" />
                  <span className="text-sm text-gray-600">{course?.rating}</span>
                </div>
                <div className="text-sm text-gray-500">
                  by {course?.instructor}
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium text-gray-900">{course?.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${course?.progress}%` }}
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Link to="/learning-interface" className="flex-1">
                  <Button variant="default" size="sm" fullWidth iconName="Play">
                    Continue
                  </Button>
                </Link>
                <Button variant="outline" size="sm" iconName="BookmarkPlus" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveCourses;