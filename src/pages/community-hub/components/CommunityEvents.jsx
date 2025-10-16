import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CommunityEvents = () => {
  const [activeFilter, setActiveFilter] = useState('upcoming');

  const upcomingEvents = [
  {
    id: 1,
    title: "Annual Learning Summit 2025",
    description: "Join industry leaders and fellow learners for a day of inspiring talks, workshops, and networking opportunities.",
    date: new Date('2025-11-15'),
    time: "9:00 AM - 6:00 PM EST",
    type: "Conference",
    format: "Virtual",
    attendees: 1247,
    maxAttendees: 2000,
    price: "Free",
    organizer: {
      name: "Cognito Education",
      avatar: "https://images.unsplash.com/photo-1679403766680-9aa2b959417d",
      avatarAlt: "Cognito Education logo with modern design and blue gradient background"
    },
    speakers: [
    {
      name: "Dr. Sarah Chen",
      title: "AI Research Director",
      avatar: "https://images.unsplash.com/photo-1668049221607-1f2df20621cc",
      avatarAlt: "Professional headshot of Asian woman with shoulder-length black hair smiling"
    },
    {
      name: "Michael Rodriguez",
      title: "Tech Industry Veteran",
      avatar: "https://images.unsplash.com/photo-1663720527180-4c60a78fe3b7",
      avatarAlt: "Professional headshot of Hispanic man with short dark hair in casual shirt"
    }],

    tags: ["Conference", "AI", "Technology", "Networking"],
    isRegistered: false,
    isFeatured: true
  },
  {
    id: 2,
    title: "JavaScript Masterclass Workshop",
    description: "Deep dive into advanced JavaScript concepts with hands-on coding exercises and real-world projects.",
    date: new Date('2025-10-25'),
    time: "2:00 PM - 5:00 PM EST",
    type: "Workshop",
    format: "Virtual",
    attendees: 45,
    maxAttendees: 50,
    price: "$29",
    organizer: {
      name: "Code Academy Community",
      avatar: "https://images.unsplash.com/photo-1669023414162-5bb06bbff0ec",
      avatarAlt: "Code Academy Community logo with programming symbols and modern typography"
    },
    speakers: [
    {
      name: "Alex Thompson",
      title: "Senior Frontend Developer",
      avatar: "https://images.unsplash.com/photo-1611695434398-4f4b330623e6",
      avatarAlt: "Professional headshot of young man with brown hair in casual blue shirt"
    }],

    tags: ["JavaScript", "Workshop", "Programming", "Hands-on"],
    isRegistered: true,
    isFeatured: false
  },
  {
    id: 3,
    title: "Career Transition Panel Discussion",
    description: "Learn from professionals who successfully transitioned into tech careers from different backgrounds.",
    date: new Date('2025-10-30'),
    time: "7:00 PM - 8:30 PM EST",
    type: "Panel",
    format: "Virtual",
    attendees: 156,
    maxAttendees: 300,
    price: "Free",
    organizer: {
      name: "Tech Career Hub",
      avatar: "https://images.unsplash.com/photo-1668853907314-e93ecf0526bc",
      avatarAlt: "Tech Career Hub logo with professional networking symbols and clean design"
    },
    speakers: [
    {
      name: "Emily Johnson",
      title: "Product Manager",
      avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      avatarAlt: "Professional headshot of blonde woman in business attire smiling confidently"
    },
    {
      name: "David Park",
      title: "UX Designer",
      avatar: "https://images.unsplash.com/photo-1558356811-8e77884f44d3",
      avatarAlt: "Professional headshot of Asian man with glasses and friendly smile"
    }],

    tags: ["Career", "Panel", "Transition", "Networking"],
    isRegistered: false,
    isFeatured: false
  }];


  const pastEvents = [
  {
    id: 4,
    title: "React Hooks Deep Dive",
    description: "Comprehensive workshop covering advanced React hooks patterns and best practices.",
    date: new Date('2025-10-10'),
    time: "3:00 PM - 6:00 PM EST",
    type: "Workshop",
    format: "Virtual",
    attendees: 67,
    maxAttendees: 75,
    price: "$25",
    organizer: {
      name: "React Community",
      avatar: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      avatarAlt: "React Community logo with React symbol and modern blue design"
    },
    speakers: [
    {
      name: "Lisa Wang",
      title: "React Core Team",
      avatar: "https://images.unsplash.com/photo-1668049221564-862149a48e10",
      avatarAlt: "Professional headshot of Asian woman with long black hair in professional attire"
    }],

    tags: ["React", "Hooks", "Workshop", "Advanced"],
    isRegistered: true,
    isFeatured: false,
    recording: "Available"
  },
  {
    id: 5,
    title: "Data Science Bootcamp Graduation",
    description: "Celebration event for Data Science Bootcamp graduates with project showcases and networking.",
    date: new Date('2025-10-05'),
    time: "6:00 PM - 9:00 PM EST",
    type: "Celebration",
    format: "Hybrid",
    attendees: 234,
    maxAttendees: 250,
    price: "Free",
    organizer: {
      name: "Data Science Academy",
      avatar: "https://images.unsplash.com/photo-1674027392838-d85710a5121d",
      avatarAlt: "Data Science Academy logo with data visualization symbols and professional design"
    },
    speakers: [
    {
      name: "Dr. Michael Rodriguez",
      title: "Data Science Director",
      avatar: "https://images.unsplash.com/photo-1663720527180-4c60a78fe3b7",
      avatarAlt: "Professional headshot of Hispanic man with short dark hair in casual shirt"
    }],

    tags: ["Data Science", "Graduation", "Networking", "Showcase"],
    isRegistered: true,
    isFeatured: false,
    recording: "Available"
  }];


  const filters = [
  { id: 'upcoming', label: 'Upcoming Events', count: upcomingEvents?.length },
  { id: 'past', label: 'Past Events', count: pastEvents?.length },
  { id: 'registered', label: 'My Events', count: [...upcomingEvents, ...pastEvents]?.filter((e) => e?.isRegistered)?.length }];


  const getFilteredEvents = () => {
    switch (activeFilter) {
      case 'upcoming':
        return upcomingEvents;
      case 'past':
        return pastEvents;
      case 'registered':
        return [...upcomingEvents, ...pastEvents]?.filter((event) => event?.isRegistered);
      default:
        return upcomingEvents;
    }
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'Conference':
        return 'bg-purple-100 text-purple-800';
      case 'Workshop':
        return 'bg-blue-100 text-blue-800';
      case 'Panel':
        return 'bg-green-100 text-green-800';
      case 'Celebration':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'Virtual':
        return 'Monitor';
      case 'Hybrid':
        return 'Wifi';
      case 'In-Person':
        return 'MapPin';
      default:
        return 'Calendar';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Community Events</h2>
            <p className="text-gray-600 mt-1">Discover and join learning events</p>
          </div>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Create Event
          </Button>
        </div>

        {/* Filters */}
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {filters?.map((filter) =>
          <button
            key={filter?.id}
            onClick={() => setActiveFilter(filter?.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeFilter === filter?.id ?
            'bg-white text-gray-900 shadow-sm' :
            'text-gray-600 hover:text-gray-900'}`
            }>

              <span>{filter?.label}</span>
              <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                {filter?.count}
              </span>
            </button>
          )}
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {getFilteredEvents()?.map((event) =>
          <div key={event?.id} className={`border rounded-lg p-6 hover:border-gray-300 transition-all duration-200 ${
          event?.isFeatured ? 'border-primary bg-primary/5' : 'border-gray-200'}`
          }>
              {event?.isFeatured &&
            <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Star" size={16} className="text-primary fill-current" />
                  <span className="text-sm font-medium text-primary">Featured Event</span>
                </div>
            }

              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{event?.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEventTypeColor(event?.type)}`}>
                      {event?.type}
                    </span>
                    {event?.isRegistered &&
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Icon name="Check" size={12} className="mr-1" />
                        Registered
                      </span>
                  }
                  </div>
                  <p className="text-gray-600 mb-4">{event?.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Icon name="Calendar" size={16} />
                  <div>
                    <p className="font-medium">{formatDate(event?.date)}</p>
                    <p className="text-xs">{event?.time}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Icon name={getFormatIcon(event?.format)} size={16} />
                  <span>{event?.format}</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Icon name="Users" size={16} />
                  <span>{event?.attendees}/{event?.maxAttendees} attendees</span>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Icon name="DollarSign" size={16} />
                  <span className="font-medium">{event?.price}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Image
                  src={event?.organizer?.avatar}
                  alt={event?.organizer?.avatarAlt}
                  className="w-8 h-8 rounded-full object-cover" />

                  <div>
                    <p className="text-sm font-medium text-gray-900">Organized by {event?.organizer?.name}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {event?.speakers?.slice(0, 2)?.map((speaker, index) =>
                    <Image
                      key={index}
                      src={speaker?.avatar}
                      alt={speaker?.avatarAlt}
                      className="w-6 h-6 rounded-full object-cover border-2 border-white" />

                    )}
                      {event?.speakers?.length > 2 &&
                    <span className="text-xs text-gray-500">+{event?.speakers?.length - 2} more speakers</span>
                    }
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {event?.tags?.map((tag, index) =>
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                    {tag}
                  </span>
              )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-3">
                  {activeFilter === 'past' ?
                <>
                      {event?.recording &&
                  <Button variant="default" size="sm" iconName="Play" iconPosition="left">
                          Watch Recording
                        </Button>
                  }
                      <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
                        Download Materials
                      </Button>
                    </> :

                <>
                      {event?.isRegistered ?
                  <Button variant="default" size="sm" iconName="Calendar" iconPosition="left">
                          Add to Calendar
                        </Button> :

                  <Button variant="default" size="sm">
                          Register Now
                        </Button>
                  }
                      <Button variant="outline" size="sm" iconName="Share" iconPosition="left">
                        Share
                      </Button>
                    </>
                }
                </div>

                <Button variant="ghost" size="sm" iconName="Bookmark">
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>);

};

export default CommunityEvents;