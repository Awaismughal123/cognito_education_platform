import React from 'react';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FeaturedResources = ({ onResourceSelect }) => {
  const featuredResources = [
  {
    id: 'featured-1',
    title: 'Complete JavaScript Mastery Guide',
    description: 'Comprehensive guide covering ES6+, async programming, and modern frameworks with practical examples and exercises.',
    thumbnail: "https://images.unsplash.com/photo-1511756169000-70afffc53e2b",
    thumbnailAlt: 'Modern laptop displaying colorful JavaScript code on screen with coffee cup nearby',
    type: 'guide',
    author: 'Dr. Sarah Chen',
    rating: 4.9,
    downloads: 15420,
    isPremium: false,
    tags: ['JavaScript', 'Programming', 'Web Development'],
    gradient: 'from-blue-500 to-purple-600'
  },
  {
    id: 'featured-2',
    title: 'Data Science Toolkit Templates',
    description: 'Ready-to-use Jupyter notebooks, Python scripts, and visualization templates for common data science workflows.',
    thumbnail: "https://images.unsplash.com/photo-1574674082930-f0cf3d1cfb46",
    thumbnailAlt: 'Data visualization charts and graphs displayed on multiple computer monitors in modern office',
    type: 'template',
    author: 'Prof. Michael Rodriguez',
    rating: 4.8,
    downloads: 8930,
    isPremium: true,
    tags: ['Data Science', 'Python', 'Analytics'],
    gradient: 'from-green-500 to-teal-600'
  },
  {
    id: 'featured-3',
    title: 'UI/UX Design System Workshop',
    description: 'Interactive workshop materials for building scalable design systems with Figma components and documentation.',
    thumbnail: "https://images.unsplash.com/photo-1695712551846-4dc15433fbd4",
    thumbnailAlt: 'Designer working on colorful UI mockups and wireframes spread across desk with design tools',
    type: 'tool',
    author: 'Emma Thompson',
    rating: 4.7,
    downloads: 6750,
    isPremium: false,
    tags: ['Design', 'UI/UX', 'Figma'],
    gradient: 'from-pink-500 to-rose-600'
  }];


  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Featured Resources</h2>
          <p className="text-sm text-gray-600">Handpicked by our education experts</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Star"
          iconSize={16}>

          View All Featured
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {featuredResources?.map((resource) =>
        <div
          key={resource?.id}
          className="group cursor-pointer"
          onClick={() => onResourceSelect(resource)}>

            <div className="relative overflow-hidden rounded-lg mb-4">
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${resource?.gradient} opacity-90 z-10`} />
              
              {/* Background Image */}
              <Image
              src={resource?.thumbnail}
              alt={resource?.thumbnailAlt}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />

              
              {/* Content Overlay */}
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between text-white">
                <div>
                  {resource?.isPremium &&
                <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 mb-3">
                      <Icon name="Crown" size={12} />
                      <span className="text-xs font-medium">Premium</span>
                    </div>
                }
                  
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-yellow-200 transition-colors">
                    {resource?.title}
                  </h3>
                  
                  <p className="text-sm text-white/90 line-clamp-3 mb-4">
                    {resource?.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={14} className="fill-current" />
                      <span>{resource?.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Download" size={14} />
                      <span>{resource?.downloads?.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <Button
                  variant="secondary"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  iconSize={14}
                  className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">

                    Explore
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Resource Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Icon name="User" size={14} />
                <span>{resource?.author}</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {resource?.tags?.map((tag, index) =>
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">

                    {tag}
                  </span>
              )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

};

export default FeaturedResources;