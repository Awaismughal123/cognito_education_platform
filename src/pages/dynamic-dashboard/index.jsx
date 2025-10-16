import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import WelcomeHeader from './components/WelcomeHeader';
import ProgressOverview from './components/ProgressOverview';
import ActiveCourses from './components/ActiveCourses';
import RecommendedCourses from './components/RecommendedCourses';
import RecentActivity from './components/RecentActivity';
import QuickActions from './components/QuickActions';
import AchievementShowcase from './components/AchievementShowcase';

const DynamicDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock user data
  const userData = {
    name: "John Doe",
    currentStreak: 12,
    totalHours: 147,
    weeklyGoal: 25,
    completedHours: 17,
    coursesInProgress: 4,
    certificationsEarned: 6
  };

  // Mock active courses data
  const activeCourses = [
  {
    id: 1,
    title: "Advanced React Development",
    category: "Web Development",
    instructor: "Sarah Johnson",
    thumbnail: "https://images.unsplash.com/photo-1662638600507-0846616ec508",
    thumbnailAlt: "Modern computer setup with React code displayed on multiple monitors in a bright office environment",
    duration: "8h 30m",
    progress: 68,
    rating: 4.8,
    students: "2.1k"
  },
  {
    id: 2,
    title: "Data Science Fundamentals",
    category: "Data Science",
    instructor: "Dr. Michael Chen",
    thumbnail: "https://images.unsplash.com/photo-1487864484877-510ed36e1de2",
    thumbnailAlt: "Data visualization charts and graphs displayed on laptop screen with coffee cup and notebook nearby",
    duration: "12h 15m",
    progress: 34,
    rating: 4.9,
    students: "1.8k"
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    category: "Design",
    instructor: "Emma Rodriguez",
    thumbnail: "https://images.unsplash.com/photo-1553525302-7b0a445043ee",
    thumbnailAlt: "Designer workspace with sketches, color palettes, and design tools spread across a clean white desk",
    duration: "6h 45m",
    progress: 89,
    rating: 4.7,
    students: "3.2k"
  }];


  // Mock recommended courses data
  const recommendedCourses = [
  {
    id: 4,
    title: "Machine Learning with Python",
    category: "Artificial Intelligence",
    instructor: "Dr. Alex Kumar",
    thumbnail: "https://images.unsplash.com/photo-1618422168439-4b03d3a05b15",
    thumbnailAlt: "Python code for machine learning algorithms displayed on dark computer screen with neural network diagrams",
    duration: "15h 30m",
    level: "Intermediate",
    rating: 4.9,
    reviews: 1247,
    price: 89,
    description: "Master machine learning concepts and build intelligent applications using Python and popular ML libraries.",
    isNew: true
  },
  {
    id: 5,
    title: "Cloud Architecture Fundamentals",
    category: "Cloud Computing",
    instructor: "James Wilson",
    thumbnail: "https://images.unsplash.com/photo-1720926462937-68f7631f177f",
    thumbnailAlt: "Abstract cloud computing visualization with interconnected nodes and data flow patterns in blue tones",
    duration: "10h 20m",
    level: "Beginner",
    rating: 4.6,
    reviews: 892,
    price: 0,
    description: "Learn cloud computing principles and design scalable, reliable cloud-based solutions.",
    isNew: false
  },
  {
    id: 6,
    title: "Digital Marketing Strategy",
    category: "Marketing",
    instructor: "Lisa Thompson",
    thumbnail: "https://images.unsplash.com/photo-1660732421009-469aba1c2e81",
    thumbnailAlt: "Marketing analytics dashboard showing social media metrics and campaign performance on laptop screen",
    duration: "8h 15m",
    level: "Intermediate",
    rating: 4.8,
    reviews: 1563,
    price: 67,
    description: "Develop comprehensive digital marketing strategies that drive engagement and conversions.",
    isNew: false
  }];


  // Mock recent activity data
  const recentActivities = [
  {
    id: 1,
    type: "course_completed",
    title: "Course Module Completed",
    description: "Finished \'Advanced React Hooks\' in Advanced React Development",
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    points: 150,
    course: {
      title: "Advanced React Development",
      thumbnail: "https://images.unsplash.com/photo-1681511346244-20637a51146f",
      thumbnailAlt: "React development course thumbnail showing modern coding interface"
    }
  },
  {
    id: 2,
    type: "badge_earned",
    title: "Badge Earned: Quick Learner",
    description: "Completed 3 lessons in one day",
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    points: 100,
    badge: {
      image: "https://images.unsplash.com/photo-1614064500416-1c1a692bb716",
      imageAlt: "Golden badge with lightning bolt symbol representing quick learning achievement"
    }
  },
  {
    id: 3,
    type: "quiz_passed",
    title: "Quiz Passed",
    description: "Scored 92% on Data Structures Quiz",
    timestamp: new Date(Date.now() - 14400000), // 4 hours ago
    points: 75,
    course: {
      title: "Data Science Fundamentals",
      thumbnail: "https://images.unsplash.com/photo-1504868481965-a7679ed88ac1",
      thumbnailAlt: "Data science course thumbnail with charts and analytics"
    }
  },
  {
    id: 4,
    type: "discussion_posted",
    title: "Discussion Contribution",
    description: "Posted helpful answer in React Community",
    timestamp: new Date(Date.now() - 21600000), // 6 hours ago
    points: 25
  }];


  // Mock upcoming deadlines
  const upcomingDeadlines = [
  {
    id: 1,
    title: "Final Project Submission",
    course: "Advanced React Development",
    dueDate: "Oct 18",
    timeRemaining: "2 days left"
  },
  {
    id: 2,
    title: "Midterm Assessment",
    course: "Data Science Fundamentals",
    dueDate: "Oct 20",
    timeRemaining: "4 days left"
  },
  {
    id: 3,
    title: "Portfolio Review",
    course: "UI/UX Design Principles",
    dueDate: "Oct 22",
    timeRemaining: "6 days left"
  }];


  // Mock study groups
  const studyGroups = [
  {
    id: 1,
    name: "React Developers Hub",
    members: 24,
    subject: "Web Development",
    hasNewMessages: true
  },
  {
    id: 2,
    name: "Data Science Study Circle",
    members: 18,
    subject: "Data Science",
    hasNewMessages: false
  },
  {
    id: 3,
    name: "UX Design Collective",
    members: 31,
    subject: "Design",
    hasNewMessages: true
  }];


  // Mock achievement data
  const recentBadges = [
  {
    id: 1,
    name: "Quick Learner",
    image: "https://images.unsplash.com/photo-1614064500416-1c1a692bb716",
    imageAlt: "Golden badge with lightning bolt symbol for quick learning achievement",
    earnedDate: "2 hours ago",
    isNew: true
  },
  {
    id: 2,
    name: "Code Master",
    image: "https://images.unsplash.com/photo-1587869133621-46739bf34b8a",
    imageAlt: "Silver badge with code brackets symbol for programming excellence",
    earnedDate: "1 day ago",
    isNew: false
  },
  {
    id: 3,
    name: "Team Player",
    image: "https://images.unsplash.com/photo-1702047076267-6719aadd2807",
    imageAlt: "Bronze badge with team collaboration symbol for community participation",
    earnedDate: "3 days ago",
    isNew: false
  },
  {
    id: 4,
    name: "Streak Keeper",
    image: "https://images.unsplash.com/photo-1598439590252-17bc9690a47e",
    imageAlt: "Flame-themed badge representing consistent daily learning streak",
    earnedDate: "1 week ago",
    isNew: false
  }];


  const certificates = [
  {
    id: 1,
    name: "React Development Certification",
    completedDate: "Oct 10, 2024",
    score: 94,
    credentialId: "RDC-2024-001"
  },
  {
    id: 2,
    name: "Data Analysis Certificate",
    completedDate: "Sep 28, 2024",
    score: 87,
    credentialId: "DAC-2024-045"
  }];


  const learningStreak = {
    current: 12,
    nextMilestone: 30
  };

  useEffect(() => {
    document.title = "Dashboard - Cognito Education Platform";
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Header */}
          <WelcomeHeader
            userName={userData?.name}
            currentStreak={userData?.currentStreak}
            totalHours={userData?.totalHours} />


          {/* Progress Overview */}
          <ProgressOverview
            weeklyGoal={userData?.weeklyGoal}
            completedHours={userData?.completedHours}
            coursesInProgress={userData?.coursesInProgress}
            certificationsEarned={userData?.certificationsEarned} />


          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <ActiveCourses courses={activeCourses} />
              <RecommendedCourses recommendations={recommendedCourses} />
            </div>

            {/* Right Column - Sidebar Content */}
            <div className="space-y-6">
              <QuickActions
                upcomingDeadlines={upcomingDeadlines}
                studyGroups={studyGroups} />

              <AchievementShowcase
                recentBadges={recentBadges}
                certificates={certificates}
                learningStreak={learningStreak} />

            </div>
          </div>

          {/* Recent Activity - Full Width */}
          <div className="mt-6">
            <RecentActivity activities={recentActivities} />
          </div>
        </div>
      </main>
    </div>);

};

export default DynamicDashboard;