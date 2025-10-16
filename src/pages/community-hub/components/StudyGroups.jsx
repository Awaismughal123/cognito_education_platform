import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StudyGroups = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const studyGroups = [
  {
    id: 1,
    name: "JavaScript Fundamentals Study Circle",
    description: "Weekly sessions covering ES6+, async programming, and modern frameworks. Perfect for beginners to intermediate learners.",
    members: 24,
    maxMembers: 30,
    category: "Programming",
    level: "Beginner",
    schedule: "Tuesdays 7:00 PM EST",
    nextSession: "Oct 17, 2025",
    isJoined: false,
    isActive: true,
    organizer: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1668049221607-1f2df20621cc",
      avatarAlt: "Professional headshot of Asian woman with shoulder-length black hair smiling",
      reputation: 4.8
    },
    tags: ["JavaScript", "ES6", "Programming", "Beginner-Friendly"],
    recentActivity: "2 hours ago"
  },
  {
    id: 2,
    name: "Data Science & Machine Learning Hub",
    description: "Advanced group focusing on Python, TensorFlow, and real-world ML projects. Collaborative learning with industry professionals.",
    members: 18,
    maxMembers: 25,
    category: "Data Science",
    level: "Advanced",
    schedule: "Saturdays 2:00 PM EST",
    nextSession: "Oct 19, 2025",
    isJoined: true,
    isActive: true,
    organizer: {
      name: "Dr. Michael Rodriguez",
      avatar: "https://images.unsplash.com/photo-1663720527180-4c60a78fe3b7",
      avatarAlt: "Professional headshot of Hispanic man with short dark hair in casual shirt",
      reputation: 4.9
    },
    tags: ["Python", "Machine Learning", "TensorFlow", "Data Analysis"],
    recentActivity: "1 hour ago"
  },
  {
    id: 3,
    name: "UX/UI Design Workshop Group",
    description: "Creative sessions on design thinking, prototyping, and user research. Share portfolios and get constructive feedback.",
    members: 16,
    maxMembers: 20,
    category: "Design",
    level: "Intermediate",
    schedule: "Thursdays 6:30 PM EST",
    nextSession: "Oct 18, 2025",
    isJoined: false,
    isActive: true,
    organizer: {
      name: "Emily Johnson",
      avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      avatarAlt: "Professional headshot of blonde woman in business attire smiling confidently",
      reputation: 4.7
    },
    tags: ["UI Design", "UX Research", "Figma", "Portfolio"],
    recentActivity: "4 hours ago"
  },
  {
    id: 4,
    name: "Digital Marketing Strategy Circle",
    description: "Learn SEO, social media marketing, and analytics. Case studies from real campaigns and hands-on practice.",
    members: 22,
    maxMembers: 28,
    category: "Marketing",
    level: "Beginner",
    schedule: "Wednesdays 8:00 PM EST",
    nextSession: "Oct 23, 2025",
    isJoined: false,
    isActive: true,
    organizer: {
      name: "David Park",
      avatar: "https://images.unsplash.com/photo-1558356811-8e77884f44d3",
      avatarAlt: "Professional headshot of Asian man with glasses and friendly smile",
      reputation: 4.6
    },
    tags: ["SEO", "Social Media", "Analytics", "Content Marketing"],
    recentActivity: "6 hours ago"
  },
  {
    id: 5,
    name: "Cybersecurity Fundamentals Group",
    description: "Explore network security, ethical hacking, and security frameworks. Hands-on labs and certification prep.",
    members: 14,
    maxMembers: 20,
    category: "Security",
    level: "Intermediate",
    schedule: "Sundays 3:00 PM EST",
    nextSession: "Oct 20, 2025",
    isJoined: true,
    isActive: true,
    organizer: {
      name: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1611695434398-4f4b330623e6",
      avatarAlt: "Professional headshot of young man with brown hair in casual blue shirt",
      reputation: 4.8
    },
    tags: ["Cybersecurity", "Ethical Hacking", "Network Security"],
    recentActivity: "3 hours ago"
  }];


  const filters = [
  { id: 'all', label: 'All Groups', count: studyGroups?.length },
  { id: 'joined', label: 'My Groups', count: studyGroups?.filter((g) => g?.isJoined)?.length },
  { id: 'programming', label: 'Programming', count: studyGroups?.filter((g) => g?.category === 'Programming')?.length },
  { id: 'design', label: 'Design', count: studyGroups?.filter((g) => g?.category === 'Design')?.length }];


  const getFilteredGroups = () => {
    switch (activeFilter) {
      case 'joined':
        return studyGroups?.filter((group) => group?.isJoined);
      case 'programming':
        return studyGroups?.filter((group) => group?.category === 'Programming');
      case 'design':
        return studyGroups?.filter((group) => group?.category === 'Design');
      default:
        return studyGroups;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Study Groups</h2>
            <p className="text-gray-600 mt-1">Join collaborative learning sessions</p>
          </div>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Create Group
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {filters?.map((filter) =>
          <button
            key={filter?.id}
            onClick={() => setActiveFilter(filter?.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeFilter === filter?.id ?
            'bg-primary text-white shadow-sm' :
            'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
            }>

              {filter?.label} ({filter?.count})
            </button>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {getFilteredGroups()?.map((group) =>
          <div key={group?.id} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all duration-200 hover:shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-semibold text-gray-900">{group?.name}</h3>
                    {group?.isJoined &&
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Icon name="Check" size={12} className="mr-1" />
                        Joined
                      </span>
                  }
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{group?.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <Image
                src={group?.organizer?.avatar}
                alt={group?.organizer?.avatarAlt}
                className="w-8 h-8 rounded-full object-cover" />

                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{group?.organizer?.name}</p>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-600">{group?.organizer?.reputation}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(group?.level)}`}>
                  {group?.level}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Icon name="Users" size={16} />
                    <span>{group?.members}/{group?.maxMembers} members</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Icon name="Clock" size={16} />
                    <span>{group?.schedule}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Icon name="Calendar" size={16} />
                    <span>Next: {group?.nextSession}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Icon name="Activity" size={16} />
                    <span>{group?.recentActivity}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {group?.tags?.slice(0, 3)?.map((tag, index) =>
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                    {tag}
                  </span>
              )}
                {group?.tags?.length > 3 &&
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                    +{group?.tags?.length - 3} more
                  </span>
              }
              </div>

              <div className="flex items-center space-x-3">
                {group?.isJoined ?
              <>
                    <Button variant="default" size="sm" iconName="MessageSquare" iconPosition="left" fullWidth>
                      Open Chat
                    </Button>
                    <Button variant="outline" size="sm" iconName="Settings">
                    </Button>
                  </> :

              <>
                    <Button variant="default" size="sm" fullWidth>
                      Join Group
                    </Button>
                    <Button variant="outline" size="sm" iconName="Eye">
                    </Button>
                  </>
              }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

};

export default StudyGroups;