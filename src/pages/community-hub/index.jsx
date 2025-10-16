import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CommunityStats from './components/CommunityStats';
import DiscussionForums from './components/DiscussionForums';
import StudyGroups from './components/StudyGroups';
import PeerConnections from './components/PeerConnections';
import LiveActivity from './components/LiveActivity';
import CommunityEvents from './components/CommunityEvents';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CommunityHub = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const navigationSections = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'discussions', label: 'Discussions', icon: 'MessageSquare' },
    { id: 'study-groups', label: 'Study Groups', icon: 'Users' },
    { id: 'connections', label: 'Peer Connections', icon: 'UserPlus' },
    { id: 'events', label: 'Events', icon: 'Calendar' },
    { id: 'live', label: 'Live Activity', icon: 'Activity' }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <CommunityStats />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <DiscussionForums />
              </div>
              <div>
                <LiveActivity />
              </div>
            </div>
          </div>
        );
      case 'discussions':
        return <DiscussionForums />;
      case 'study-groups':
        return <StudyGroups />;
      case 'connections':
        return <PeerConnections />;
      case 'events':
        return <CommunityEvents />;
      case 'live':
        return <LiveActivity />;
      default:
        return (
          <div className="space-y-8">
            <CommunityStats />
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2">
                <DiscussionForums />
              </div>
              <div>
                <LiveActivity />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>Community Hub - Cognito Education Platform</title>
        <meta name="description" content="Connect with fellow learners, join study groups, participate in discussions, and engage in collaborative learning experiences." />
        <meta name="keywords" content="community, learning, study groups, discussions, peer connections, education" />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        
        <main className={`pt-16 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          <div className="p-6">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Community Hub</h1>
                  <p className="text-gray-600 mt-2">
                    Connect, collaborate, and learn together with fellow students and mentors
                  </p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button variant="outline" iconName="Search" iconPosition="left">
                    Search Community
                  </Button>
                  <Button variant="default" iconName="Plus" iconPosition="left">
                    Create Post
                  </Button>
                </div>
              </div>

              {/* Quick Stats Banner */}
              <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">12,847</div>
                    <div className="text-sm opacity-90">Active Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">324</div>
                    <div className="text-sm opacity-90">Study Groups</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">1,256</div>
                    <div className="text-sm opacity-90">Daily Discussions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">89%</div>
                    <div className="text-sm opacity-90">Help Success Rate</div>
                  </div>
                </div>
              </div>

              {/* Section Navigation */}
              <div className="bg-white rounded-xl border border-gray-200 p-2">
                <div className="flex flex-wrap gap-2">
                  {navigationSections?.map((section) => (
                    <button
                      key={section?.id}
                      onClick={() => setActiveSection(section?.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        activeSection === section?.id
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon name={section?.icon} size={16} />
                      <span>{section?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="animate-fade-in">
              {renderActiveSection()}
            </div>

            {/* Community Guidelines */}
            {activeSection === 'overview' && (
              <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Shield" size={24} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Community Guidelines</h3>
                    <p className="text-gray-600 mb-4">
                      Help us maintain a positive and supportive learning environment for everyone.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Icon name="Heart" size={16} className="text-red-500" />
                        <span>Be respectful and supportive</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="HelpCircle" size={16} className="text-blue-500" />
                        <span>Ask questions and help others</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Share" size={16} className="text-green-500" />
                        <span>Share knowledge and resources</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" iconName="ExternalLink">
                    Read Full Guidelines
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default CommunityHub;