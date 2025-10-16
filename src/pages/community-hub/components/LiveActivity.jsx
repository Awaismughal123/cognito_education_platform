import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LiveActivity = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const liveActivities = [
  {
    id: 1,
    type: "study_session",
    title: "JavaScript Debugging Workshop",
    participants: 12,
    maxParticipants: 15,
    startTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    duration: 90,
    host: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1668049221607-1f2df20621cc",
      avatarAlt: "Professional headshot of Asian woman with shoulder-length black hair smiling"
    },
    tags: ["JavaScript", "Debugging", "Live Coding"],
    isJoined: false
  },
  {
    id: 2,
    type: "discussion",
    title: "Career Transition Q&A",
    participants: 8,
    maxParticipants: 20,
    startTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    duration: 60,
    host: {
      name: "Dr. Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1663720527180-4c60a78fe3b7",
      avatarAlt: "Professional headshot of Hispanic man with short dark hair in casual shirt"
    },
    tags: ["Career", "Q&A", "Professional Development"],
    isJoined: true
  },
  {
    id: 3,
    type: "collaboration",
    title: "Open Source Project Collaboration",
    participants: 6,
    maxParticipants: 10,
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    duration: 120,
    host: {
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1611695434398-4f4b330623e6",
      avatarAlt: "Professional headshot of young man with brown hair in casual blue shirt"
    },
    tags: ["Open Source", "Collaboration", "Git"],
    isJoined: false
  }];


  const recentActivities = [
  {
    id: 1,
    type: "achievement",
    user: "Emily Johnson",
    avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    avatarAlt: "Professional headshot of blonde woman in business attire smiling confidently",
    action: "completed the React Fundamentals course",
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    icon: "Award",
    color: "text-yellow-600"
  },
  {
    id: 2,
    type: "discussion",
    user: "David Park",
    avatar: "https://images.unsplash.com/photo-1558356811-8e77884f44d3",
    avatarAlt: "Professional headshot of Asian man with glasses and friendly smile",
    action: "started a new discussion about \'Best practices for API design'",
    timestamp: new Date(Date.now() - 32 * 60 * 1000), // 32 minutes ago
    icon: "MessageSquare",
    color: "text-blue-600"
  },
  {
    id: 3,
    type: "join",
    user: "Lisa Wang",
    avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
    avatarAlt: "Professional headshot of Asian woman with long black hair in professional attire",
    action: "joined the Data Science Study Group",
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    icon: "UserPlus",
    color: "text-green-600"
  },
  {
    id: 4,
    type: "milestone",
    user: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1663720527180-4c60a78fe3b7",
    avatarAlt: "Professional headshot of Hispanic man with short dark hair in casual shirt",
    action: "reached a 50-day study streak",
    timestamp: new Date(Date.now() - 67 * 60 * 1000), // 67 minutes ago
    icon: "Flame",
    color: "text-orange-600"
  },
  {
    id: 5,
    type: "help",
    user: "Maria Garcia",
    avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    avatarAlt: "Professional headshot of blonde woman in business attire smiling confidently",
    action: "answered 5 questions in the JavaScript forum",
    timestamp: new Date(Date.now() - 89 * 60 * 1000), // 89 minutes ago
    icon: "HelpCircle",
    color: "text-purple-600"
  }];


  const formatTimeUntil = (date) => {
    const now = new Date();
    const diff = date?.getTime() - now?.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`;
    }
    return `${minutes}m`;
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diff = now?.getTime() - date?.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}h ago`;
    }
    return `${minutes}m ago`;
  };

  const getActivityTypeIcon = (type) => {
    switch (type) {
      case 'study_session':
        return 'BookOpen';
      case 'discussion':
        return 'MessageCircle';
      case 'collaboration':
        return 'Users';
      default:
        return 'Activity';
    }
  };

  const getActivityTypeColor = (type) => {
    switch (type) {
      case 'study_session':
        return 'text-blue-600 bg-blue-50';
      case 'discussion':
        return 'text-green-600 bg-green-50';
      case 'collaboration':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Live Sessions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h2 className="text-xl font-bold text-gray-900">Live Sessions</h2>
            </div>
            <Button variant="outline" iconName="Calendar" iconPosition="left">
              Schedule Session
            </Button>
          </div>
          <p className="text-gray-600 mt-1">Join ongoing and upcoming live learning sessions</p>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {liveActivities?.map((activity) =>
            <div key={activity?.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getActivityTypeColor(activity?.type)}`}>
                      <Icon name={getActivityTypeIcon(activity?.type)} size={20} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{activity?.title}</h3>
                        {activity?.isJoined &&
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Joined
                          </span>
                      }
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Image
                          src={activity?.host?.avatar}
                          alt={activity?.host?.avatarAlt}
                          className="w-5 h-5 rounded-full object-cover" />

                          <span>{activity?.host?.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Users" size={16} />
                          <span>{activity?.participants}/{activity?.maxParticipants}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={16} />
                          <span>{activity?.duration} min</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {activity?.tags?.map((tag, index) =>
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                            {tag}
                          </span>
                      )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right ml-4">
                    <div className="text-sm font-medium text-gray-900 mb-1">
                      Starts in {formatTimeUntil(activity?.startTime)}
                    </div>
                    <div className="text-xs text-gray-500 mb-3">
                      {activity?.startTime?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    
                    {activity?.isJoined ?
                  <Button variant="default" size="sm" iconName="Video" iconPosition="left">
                        Join Now
                      </Button> :

                  <Button variant="outline" size="sm">
                        Join Session
                      </Button>
                  }
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Recent Activity Feed */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <p className="text-gray-600 mt-1">Stay updated with community happenings</p>
            </div>
            <Button variant="ghost" iconName="RefreshCw" iconPosition="left">
              Refresh
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {recentActivities?.map((activity) =>
            <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Image
                src={activity?.avatar}
                alt={activity?.avatarAlt}
                className="w-10 h-10 rounded-full object-cover flex-shrink-0" />

                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">{activity?.user}</span>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${activity?.color?.replace('text-', 'bg-')?.replace('-600', '-100')}`}>
                      <Icon name={activity?.icon} size={12} className={activity?.color} />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{activity?.action}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(activity?.timestamp)}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 text-center">
            <Button variant="outline" iconName="MoreHorizontal" iconPosition="left">
              Load More Activity
            </Button>
          </div>
        </div>
      </div>
    </div>);

};

export default LiveActivity;