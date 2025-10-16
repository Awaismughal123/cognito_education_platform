import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DiscussionForums = () => {
  const [activeTab, setActiveTab] = useState('trending');

  const forumCategories = [
  {
    id: 1,
    name: "General Discussion",
    description: "Open discussions about learning and education",
    topics: 1247,
    posts: 8934,
    icon: "MessageCircle",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    id: 2,
    name: "Course Help",
    description: "Get help with specific courses and assignments",
    topics: 892,
    posts: 5621,
    icon: "BookOpen",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    id: 3,
    name: "Study Tips",
    description: "Share and discover effective study strategies",
    topics: 634,
    posts: 3847,
    icon: "Lightbulb",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  },
  {
    id: 4,
    name: "Career Guidance",
    description: "Professional development and career advice",
    topics: 456,
    posts: 2193,
    icon: "Briefcase",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }];


  const trendingDiscussions = [
  {
    id: 1,
    title: "Best practices for online learning during busy schedules",
    author: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1668049221607-1f2df20621cc",
    avatarAlt: "Professional headshot of Asian woman with shoulder-length black hair smiling",
    category: "Study Tips",
    replies: 23,
    likes: 45,
    timeAgo: "2 hours ago",
    isHot: true
  },
  {
    id: 2,
    title: "JavaScript fundamentals - Common mistakes to avoid",
    author: "Michael Rodriguez",
    avatar: "https://images.unsplash.com/photo-1663720527180-4c60a78fe3b7",
    avatarAlt: "Professional headshot of Hispanic man with short dark hair in casual shirt",
    category: "Course Help",
    replies: 18,
    likes: 32,
    timeAgo: "4 hours ago",
    isHot: false
  },
  {
    id: 3,
    title: "How to transition from student to professional developer",
    author: "Emily Johnson",
    avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    avatarAlt: "Professional headshot of blonde woman in business attire smiling confidently",
    category: "Career Guidance",
    replies: 31,
    likes: 67,
    timeAgo: "6 hours ago",
    isHot: true
  },
  {
    id: 4,
    title: "Group study techniques that actually work",
    author: "David Park",
    avatar: "https://images.unsplash.com/photo-1558356811-8e77884f44d3",
    avatarAlt: "Professional headshot of Asian man with glasses and friendly smile",
    category: "Study Tips",
    replies: 15,
    likes: 28,
    timeAgo: "8 hours ago",
    isHot: false
  }];


  const recentDiscussions = [
  {
    id: 5,
    title: "Need help with React hooks - useEffect not working as expected",
    author: "Alex Thompson",
    avatar: "https://images.unsplash.com/photo-1611695434398-4f4b330623e6",
    avatarAlt: "Professional headshot of young man with brown hair in casual blue shirt",
    category: "Course Help",
    replies: 7,
    likes: 12,
    timeAgo: "30 minutes ago",
    isHot: false
  },
  {
    id: 6,
    title: "Best resources for learning data structures and algorithms",
    author: "Lisa Wang",
    avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
    avatarAlt: "Professional headshot of Asian woman with long black hair in professional attire",
    category: "General Discussion",
    replies: 12,
    likes: 19,
    timeAgo: "1 hour ago",
    isHot: false
  }];


  const tabs = [
  { id: 'trending', label: 'Trending', icon: 'TrendingUp' },
  { id: 'recent', label: 'Recent', icon: 'Clock' },
  { id: 'categories', label: 'Categories', icon: 'Grid3X3' }];


  const getDiscussions = () => {
    switch (activeTab) {
      case 'trending':
        return trendingDiscussions;
      case 'recent':
        return recentDiscussions;
      default:
        return trendingDiscussions;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Discussion Forums</h2>
            <p className="text-gray-600 mt-1">Join conversations and share knowledge</p>
          </div>
          <Button variant="default" iconName="Plus" iconPosition="left">
            New Discussion
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {tabs?.map((tab) =>
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === tab?.id ?
            'bg-white text-gray-900 shadow-sm' :
            'text-gray-600 hover:text-gray-900'}`
            }>

              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          )}
        </div>
      </div>
      <div className="p-6">
        {activeTab === 'categories' ?
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forumCategories?.map((category) =>
          <div key={category?.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors duration-200 cursor-pointer">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 ${category?.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon name={category?.icon} size={20} className={category?.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{category?.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{category?.description}</p>
                    <div className="flex items-center space-x-4 mt-3 text-xs text-gray-500">
                      <span>{category?.topics} topics</span>
                      <span>{category?.posts} posts</span>
                    </div>
                  </div>
                </div>
              </div>
          )}
          </div> :

        <div className="space-y-4">
            {getDiscussions()?.map((discussion) =>
          <div key={discussion?.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors duration-200 cursor-pointer">
                <div className="flex items-start space-x-3">
                  <Image
                src={discussion?.avatar}
                alt={discussion?.avatarAlt}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900 hover:text-primary transition-colors duration-200">
                            {discussion?.title}
                          </h3>
                          {discussion?.isHot &&
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              <Icon name="Flame" size={12} className="mr-1" />
                              Hot
                            </span>
                      }
                        </div>
                        <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600">
                          <span>by {discussion?.author}</span>
                          <span>•</span>
                          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{discussion?.category}</span>
                          <span>•</span>
                          <span>{discussion?.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-3">
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Icon name="MessageSquare" size={16} />
                        <span>{discussion?.replies} replies</span>
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Icon name="Heart" size={16} />
                        <span>{discussion?.likes} likes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          )}
          </div>
        }
      </div>
    </div>);

};

export default DiscussionForums;