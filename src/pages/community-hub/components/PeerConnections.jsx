import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PeerConnections = () => {
  const [activeTab, setActiveTab] = useState('suggested');

  const suggestedPeers = [
  {
    id: 1,
    name: "Lisa Wang",
    avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
    avatarAlt: "Professional headshot of Asian woman with long black hair in professional attire",
    title: "Full Stack Developer",
    location: "San Francisco, CA",
    commonInterests: ["React", "Node.js", "MongoDB"],
    studyStreak: 45,
    reputation: 4.8,
    mutualConnections: 3,
    isOnline: true,
    matchScore: 92
  },
  {
    id: 2,
    name: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1663720527180-4c60a78fe3b7",
    avatarAlt: "Professional headshot of Hispanic man with short dark hair in casual shirt",
    title: "Data Scientist",
    location: "New York, NY",
    commonInterests: ["Python", "Machine Learning", "Statistics"],
    studyStreak: 32,
    reputation: 4.7,
    mutualConnections: 5,
    isOnline: false,
    matchScore: 88
  },
  {
    id: 3,
    name: "Maria Garcia",
    avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    avatarAlt: "Professional headshot of blonde woman in business attire smiling confidently",
    title: "UX Designer",
    location: "Austin, TX",
    commonInterests: ["Figma", "User Research", "Design Systems"],
    studyStreak: 28,
    reputation: 4.9,
    mutualConnections: 2,
    isOnline: true,
    matchScore: 85
  },
  {
    id: 4,
    name: "Kevin Chen",
    avatar: "https://images.unsplash.com/photo-1558356811-8e77884f44d3",
    avatarAlt: "Professional headshot of Asian man with glasses and friendly smile",
    title: "DevOps Engineer",
    location: "Seattle, WA",
    commonInterests: ["Docker", "Kubernetes", "AWS"],
    studyStreak: 67,
    reputation: 4.6,
    mutualConnections: 4,
    isOnline: false,
    matchScore: 82
  }];


  const studyPartners = [
  {
    id: 5,
    name: "Sarah Chen",
    avatar: "https://images.unsplash.com/photo-1668049221607-1f2df20621cc",
    avatarAlt: "Professional headshot of Asian woman with shoulder-length black hair smiling",
    title: "Frontend Developer",
    currentProject: "React Native Mobile App",
    nextSession: "Today 3:00 PM",
    sessionsCompleted: 12,
    connectionDate: "2 weeks ago",
    status: "active"
  },
  {
    id: 6,
    name: "Alex Thompson",
    avatar: "https://images.unsplash.com/photo-1611695434398-4f4b330623e6",
    avatarAlt: "Professional headshot of young man with brown hair in casual blue shirt",
    title: "Backend Developer",
    currentProject: "API Design Patterns",
    nextSession: "Tomorrow 7:00 PM",
    sessionsCompleted: 8,
    connectionDate: "1 month ago",
    status: "active"
  },
  {
    id: 7,
    name: "Emma Davis",
    avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
    avatarAlt: "Professional headshot of Asian woman with long black hair in professional attire",
    title: "Product Manager",
    currentProject: "Agile Methodologies",
    nextSession: "Friday 2:00 PM",
    sessionsCompleted: 15,
    connectionDate: "3 weeks ago",
    status: "active"
  }];


  const mentors = [
  {
    id: 8,
    name: "Dr. Michael Rodriguez",
    avatar: "https://images.unsplash.com/photo-1663720527180-4c60a78fe3b7",
    avatarAlt: "Professional headshot of Hispanic man with short dark hair in casual shirt",
    title: "Senior Software Architect",
    company: "Tech Corp",
    experience: "15+ years",
    specialties: ["System Design", "Leadership", "Career Growth"],
    mentees: 24,
    rating: 4.9,
    responseTime: "< 2 hours",
    isAvailable: true
  },
  {
    id: 9,
    name: "Jennifer Kim",
    avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    avatarAlt: "Professional headshot of blonde woman in business attire smiling confidently",
    title: "VP of Engineering",
    company: "StartupXYZ",
    experience: "12+ years",
    specialties: ["Team Building", "Technical Strategy", "Startups"],
    mentees: 18,
    rating: 4.8,
    responseTime: "< 4 hours",
    isAvailable: false
  }];


  const tabs = [
  { id: 'suggested', label: 'Suggested Peers', icon: 'UserPlus', count: suggestedPeers?.length },
  { id: 'partners', label: 'Study Partners', icon: 'Users', count: studyPartners?.length },
  { id: 'mentors', label: 'Mentors', icon: 'GraduationCap', count: mentors?.length }];


  const getTabContent = () => {
    switch (activeTab) {
      case 'suggested':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suggestedPeers?.map((peer) =>
            <div key={peer?.id} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all duration-200">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Image
                    src={peer?.avatar}
                    alt={peer?.avatarAlt}
                    className="w-16 h-16 rounded-full object-cover" />

                    {peer?.isOnline &&
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  }
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{peer?.name}</h3>
                      <span className="text-sm font-medium text-primary">{peer?.matchScore}% match</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-1">{peer?.title}</p>
                    <p className="text-xs text-gray-500 mb-3">{peer?.location}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {peer?.commonInterests?.slice(0, 3)?.map((interest, index) =>
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs">
                          {interest}
                        </span>
                    )}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Flame" size={12} />
                        <span>{peer?.studyStreak} day streak</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} />
                        <span>{peer?.reputation}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={12} />
                        <span>{peer?.mutualConnections} mutual</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="default" size="sm" fullWidth>
                        Connect
                      </Button>
                      <Button variant="outline" size="sm" iconName="MessageSquare">
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>);


      case 'partners':
        return (
          <div className="space-y-4">
            {studyPartners?.map((partner) =>
            <div key={partner?.id} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Image
                    src={partner?.avatar}
                    alt={partner?.avatarAlt}
                    className="w-12 h-12 rounded-full object-cover" />

                    <div>
                      <h3 className="font-semibold text-gray-900">{partner?.name}</h3>
                      <p className="text-sm text-gray-600">{partner?.title}</p>
                      <p className="text-xs text-gray-500">Connected {partner?.connectionDate}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Calendar" size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">{partner?.nextSession}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="CheckCircle" size={16} className="text-green-500" />
                      <span className="text-sm text-gray-600">{partner?.sessionsCompleted} sessions</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Current Project</p>
                      <p className="text-sm text-gray-600">{partner?.currentProject}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" iconName="MessageSquare">
                        Chat
                      </Button>
                      <Button variant="default" size="sm" iconName="Video">
                        Join Session
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>);


      case 'mentors':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mentors?.map((mentor) =>
            <div key={mentor?.id} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all duration-200">
                <div className="flex items-start space-x-4">
                  <Image
                  src={mentor?.avatar}
                  alt={mentor?.avatarAlt}
                  className="w-16 h-16 rounded-full object-cover" />

                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{mentor?.name}</h3>
                      {mentor?.isAvailable ?
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Available
                        </span> :

                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Busy
                        </span>
                    }
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-1">{mentor?.title}</p>
                    <p className="text-xs text-gray-500 mb-3">{mentor?.company} • {mentor?.experience}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {mentor?.specialties?.map((specialty, index) =>
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-xs">
                          {specialty}
                        </span>
                    )}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={12} />
                        <span>{mentor?.mentees} mentees</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} />
                        <span>{mentor?.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{mentor?.responseTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="default" size="sm" fullWidth disabled={!mentor?.isAvailable}>
                        Request Mentorship
                      </Button>
                      <Button variant="outline" size="sm" iconName="Eye">
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>);


      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Peer Connections</h2>
            <p className="text-gray-600 mt-1">Connect with fellow learners and mentors</p>
          </div>
          <Button variant="outline" iconName="Search" iconPosition="left">
            Find Peers
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
              <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                {tab?.count}
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="p-6">
        {getTabContent()}
      </div>
    </div>);

};

export default PeerConnections;