import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PerformanceOverview from './components/PerformanceOverview';
import LearningJourneyMap from './components/LearningJourneyMap';
import PerformanceCharts from './components/PerformanceCharts';
import GoalTracker from './components/GoalTracker';
import RecommendationsPanel from './components/RecommendationsPanel';
import ComparativeAnalysis from './components/ComparativeAnalysis';

const ProgressAnalytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [goals, setGoals] = useState([]);
  const [timeRange, setTimeRange] = useState('month');

  // Mock data for performance overview
  const overviewData = [
    {
      id: 1,
      icon: 'BookOpen',
      iconColor: 'text-primary',
      bgColor: 'bg-primary/10',
      value: '12',
      label: 'Courses Completed',
      description: 'This month',
      trend: '+15%',
      trendIcon: 'TrendingUp',
      trendColor: 'bg-success/10 text-success',
      progress: 75,
      progressColor: 'bg-primary'
    },
    {
      id: 2,
      icon: 'Target',
      iconColor: 'text-success',
      bgColor: 'bg-success/10',
      value: '89%',
      label: 'Average Score',
      description: 'Across all assessments',
      trend: '+8%',
      trendIcon: 'TrendingUp',
      trendColor: 'bg-success/10 text-success',
      progress: 89,
      progressColor: 'bg-success'
    },
    {
      id: 3,
      icon: 'Clock',
      iconColor: 'text-accent',
      bgColor: 'bg-accent/10',
      value: '47h',
      label: 'Study Time',
      description: 'This week',
      trend: '+12%',
      trendIcon: 'TrendingUp',
      trendColor: 'bg-success/10 text-success',
      progress: 67,
      progressColor: 'bg-accent'
    },
    {
      id: 4,
      icon: 'Award',
      iconColor: 'text-warning',
      bgColor: 'bg-warning/10',
      value: '5',
      label: 'Certificates Earned',
      description: 'Total achievements',
      trend: '+2',
      trendIcon: 'Plus',
      trendColor: 'bg-success/10 text-success',
      progress: 100,
      progressColor: 'bg-warning'
    }
  ];

  // Mock data for learning journey
  const journeyData = {
    completedMilestones: 6,
    totalMilestones: 10,
    milestones: [
      {
        id: 1,
        title: 'Foundation Concepts',
        description: 'Master the basic principles and terminology',
        duration: '2 weeks',
        progress: 100,
        completed: true,
        current: false,
        badge: 'Quick Learner',
        objectives: [
          'Understand core terminology and concepts',
          'Complete introductory assessments',
          'Participate in foundation discussions'
        ],
        activities: [
          'Watch 12 video lectures',
          'Complete 5 practice quizzes',
          'Submit first assignment'
        ]
      },
      {
        id: 2,
        title: 'Intermediate Skills',
        description: 'Apply concepts to practical scenarios',
        duration: '3 weeks',
        progress: 100,
        completed: true,
        current: false,
        badge: 'Problem Solver',
        objectives: [
          'Apply theoretical knowledge practically',
          'Solve intermediate-level problems',
          'Collaborate on group projects'
        ],
        activities: [
          'Complete hands-on exercises',
          'Participate in peer reviews',
          'Submit project deliverables'
        ]
      },
      {
        id: 3,
        title: 'Advanced Applications',
        description: 'Tackle complex real-world challenges',
        duration: '4 weeks',
        progress: 65,
        completed: false,
        current: true,
        objectives: [
          'Master advanced techniques and methods',
          'Lead complex project initiatives',
          'Mentor junior learners'
        ],
        activities: [
          'Complete capstone project',
          'Present findings to peers',
          'Provide constructive feedback'
        ]
      },
      {
        id: 4,
        title: 'Specialization Track',
        description: 'Deep dive into your chosen specialty',
        duration: '6 weeks',
        progress: 0,
        completed: false,
        current: false,
        objectives: [
          'Develop specialized expertise',
          'Complete industry-specific projects',
          'Build professional portfolio'
        ],
        activities: [
          'Choose specialization path',
          'Complete advanced coursework',
          'Build portfolio projects'
        ]
      }
    ]
  };

  // Mock data for charts
  const chartData = {
    progressData: [
      { week: 'Week 1', completion: 20 },
      { week: 'Week 2', completion: 35 },
      { week: 'Week 3', completion: 45 },
      { week: 'Week 4', completion: 60 },
      { week: 'Week 5', completion: 75 },
      { week: 'Week 6', completion: 85 },
      { week: 'Week 7', completion: 92 }
    ],
    performanceData: [
      { month: 'Jan', quizScore: 78, assignmentScore: 82 },
      { month: 'Feb', quizScore: 85, assignmentScore: 88 },
      { month: 'Mar', quizScore: 89, assignmentScore: 91 },
      { month: 'Apr', quizScore: 92, assignmentScore: 89 },
      { month: 'May', quizScore: 88, assignmentScore: 94 },
      { month: 'Jun', quizScore: 95, assignmentScore: 96 }
    ],
    engagementData: [
      { day: 'Mon', studyTime: 3.5, interactions: 12 },
      { day: 'Tue', studyTime: 4.2, interactions: 18 },
      { day: 'Wed', studyTime: 2.8, interactions: 8 },
      { day: 'Thu', studyTime: 5.1, interactions: 22 },
      { day: 'Fri', studyTime: 3.9, interactions: 15 },
      { day: 'Sat', studyTime: 6.2, interactions: 28 },
      { day: 'Sun', studyTime: 4.5, interactions: 19 }
    ],
    subjectData: [
      { name: 'Programming', value: 35 },
      { name: 'Data Science', value: 25 },
      { name: 'Web Development', value: 20 },
      { name: 'Machine Learning', value: 15 },
      { name: 'Others', value: 5 }
    ]
  };

  // Mock goals data
  useEffect(() => {
    setGoals([
      {
        id: 1,
        title: 'Complete React Certification',
        description: 'Finish the advanced React course and pass the certification exam',
        targetDate: '2025-12-31',
        category: 'certification',
        progress: 75,
        status: 'active',
        createdAt: '2025-01-01',
        milestones: [
          { title: 'Complete Course Modules', completed: true },
          { title: 'Pass Practice Tests', completed: true },
          { title: 'Submit Final Project', completed: false },
          { title: 'Take Certification Exam', completed: false }
        ]
      },
      {
        id: 2,
        title: 'Master Data Structures',
        description: 'Gain proficiency in advanced data structures and algorithms',
        targetDate: '2025-11-15',
        category: 'skill',
        progress: 45,
        status: 'active',
        createdAt: '2025-09-01',
        milestones: [
          { title: 'Learn Basic Structures', completed: true },
          { title: 'Practice Problem Solving', completed: false },
          { title: 'Complete Advanced Topics', completed: false }
        ]
      },
      {
        id: 3,
        title: 'Build Portfolio Website',
        description: 'Create a professional portfolio showcasing completed projects',
        targetDate: '2025-10-30',
        category: 'project',
        progress: 90,
        status: 'at-risk',
        createdAt: '2025-08-15',
        milestones: [
          { title: 'Design Layout', completed: true },
          { title: 'Develop Frontend', completed: true },
          { title: 'Add Project Showcase', completed: true },
          { title: 'Deploy and Test', completed: false }
        ]
      }
    ]);
  }, []);

  // Mock recommendations data
  const recommendations = [
    {
      id: 1,
      title: 'Advanced JavaScript Patterns',
      description: 'Based on your React progress, this course will help you understand advanced JS concepts used in modern frameworks.',
      type: 'course',
      category: 'courses',
      priority: 'high',
      estimatedTime: '4-6 hours',
      impact: 'High',
      successRate: 92,
      actionText: 'Enroll Now',
      tags: ['JavaScript', 'Advanced', 'Patterns'],
      reasons: [
        'You scored 95% on React fundamentals',
        'Advanced JS knowledge will improve your React skills',
        'Similar learners found this course highly valuable'
      ]
    },
    {
      id: 2,
      title: 'Pomodoro Technique for Coding',
      description: 'Improve your focus and productivity during coding sessions with this proven time management method.',
      type: 'study-technique',
      category: 'study',
      priority: 'medium',
      estimatedTime: '30 minutes',
      impact: 'Medium',
      successRate: 87,
      actionText: 'Learn Technique',
      tags: ['Productivity', 'Focus', 'Time Management'],
      reasons: [
        'Your study sessions average 3.5 hours',
        'Breaking into focused intervals can improve retention',
        'Many successful developers use this technique'
      ]
    },
    {
      id: 3,
      title: 'React Testing Library Guide',
      description: 'Essential resource for writing effective tests for your React applications.',
      type: 'resource',
      category: 'resources',
      priority: 'medium',
      estimatedTime: '2-3 hours',
      impact: 'High',
      successRate: 89,
      actionText: 'Access Resource',
      tags: ['Testing', 'React', 'Quality Assurance'],
      reasons: [
        'Testing is crucial for React development',
        'You haven\'t completed testing modules yet',
        'This resource has excellent reviews from peers'
      ]
    }
  ];

  // Mock comparative analysis data
  const comparisonData = {
    peer: {
      skillsComparison: [
        { skill: 'Programming', yourScore: 85, averageScore: 72 },
        { skill: 'Problem Solving', yourScore: 78, averageScore: 75 },
        { skill: 'Communication', yourScore: 82, averageScore: 80 },
        { skill: 'Teamwork', yourScore: 88, averageScore: 78 },
        { skill: 'Creativity', yourScore: 75, averageScore: 73 },
        { skill: 'Leadership', yourScore: 70, averageScore: 68 }
      ],
      performanceComparison: [
        { metric: 'Quiz Scores', yourScore: 89, averageScore: 76 },
        { metric: 'Assignment Grades', yourScore: 92, averageScore: 81 },
        { metric: 'Participation', yourScore: 85, averageScore: 79 },
        { metric: 'Project Quality', yourScore: 88, averageScore: 77 }
      ],
      strengths: [
        'Programming skills are 18% above peer average',
        'Consistently high assignment performance',
        'Strong teamwork and collaboration abilities'
      ],
      improvements: [
        'Leadership skills could be developed further',
        'Consider taking on more challenging projects',
        'Participate more in group discussions'
      ],
      stats: {
        percentile: 78,
        improvement: 12,
        strongAreas: 4,
        totalLearners: 1247
      }
    },
    cohort: {
      skillsComparison: [
        { skill: 'Programming', yourScore: 85, averageScore: 79 },
        { skill: 'Problem Solving', yourScore: 78, averageScore: 81 },
        { skill: 'Communication', yourScore: 82, averageScore: 84 },
        { skill: 'Teamwork', yourScore: 88, averageScore: 82 },
        { skill: 'Creativity', yourScore: 75, averageScore: 77 },
        { skill: 'Leadership', yourScore: 70, averageScore: 74 }
      ],
      performanceComparison: [
        { metric: 'Quiz Scores', yourScore: 89, averageScore: 83 },
        { metric: 'Assignment Grades', yourScore: 92, averageScore: 87 },
        { metric: 'Participation', yourScore: 85, averageScore: 88 },
        { metric: 'Project Quality', yourScore: 88, averageScore: 85 }
      ],
      strengths: [
        'Excellent assignment performance within cohort',
        'Strong programming fundamentals',
        'Above-average teamwork skills'
      ],
      improvements: [
        'Increase participation in class discussions',
        'Develop communication skills further',
        'Take on leadership roles in group projects'
      ],
      stats: {
        percentile: 65,
        improvement: 8,
        strongAreas: 3,
        totalLearners: 89
      }
    },
    global: {
      skillsComparison: [
        { skill: 'Programming', yourScore: 85, averageScore: 68 },
        { skill: 'Problem Solving', yourScore: 78, averageScore: 71 },
        { skill: 'Communication', yourScore: 82, averageScore: 74 },
        { skill: 'Teamwork', yourScore: 88, averageScore: 73 },
        { skill: 'Creativity', yourScore: 75, averageScore: 69 },
        { skill: 'Leadership', yourScore: 70, averageScore: 65 }
      ],
      performanceComparison: [
        { metric: 'Quiz Scores', yourScore: 89, averageScore: 72 },
        { metric: 'Assignment Grades', yourScore: 92, averageScore: 78 },
        { metric: 'Project Quality', yourScore: 88, averageScore: 74 },
        { metric: 'Participation', yourScore: 85, averageScore: 71 }
      ],
      strengths: [
        'Programming skills significantly above global average',
        'Exceptional teamwork and collaboration',
        'Strong overall academic performance'
      ],
      improvements: [
        'Continue building on existing strengths',
        'Consider mentoring other learners',
        'Explore advanced specialization tracks'
      ],
      stats: {
        percentile: 85,
        improvement: 15,
        strongAreas: 5,
        totalLearners: 45892
      }
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'journey', label: 'Learning Journey', icon: 'Map' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' },
    { id: 'goals', label: 'Goals', icon: 'Target' },
    { id: 'recommendations', label: 'Recommendations', icon: 'Lightbulb' },
    { id: 'comparison', label: 'Comparison', icon: 'Users' }
  ];

  const timeRanges = [
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' }
  ];

  const handleAddGoal = (newGoal) => {
    setGoals(prev => [...prev, newGoal]);
  };

  const handleUpdateGoal = (goalId, updates) => {
    setGoals(prev => prev?.map(goal => 
      goal?.id === goalId ? { ...goal, ...updates } : goal
    ));
  };

  const handleExportReport = () => {
    console.log('Exporting progress report...');
    // Implementation for exporting progress report
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'} pt-16`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Progress Analytics</h1>
                <p className="text-gray-600 mt-2">
                  Comprehensive insights into your learning journey and performance metrics
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e?.target?.value)}
                  className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  {timeRanges?.map(range => (
                    <option key={range?.id} value={range?.id}>{range?.label}</option>
                  ))}
                </select>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  onClick={handleExportReport}
                >
                  Export Report
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Refresh Data
                </Button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 p-1 bg-white rounded-lg border border-gray-200">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab?.id
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span className="hidden sm:inline">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <>
                <PerformanceOverview overviewData={overviewData} />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <PerformanceCharts chartData={chartData} />
                  <RecommendationsPanel recommendations={recommendations?.slice(0, 2)} />
                </div>
              </>
            )}

            {activeTab === 'journey' && (
              <LearningJourneyMap journeyData={journeyData} />
            )}

            {activeTab === 'analytics' && (
              <PerformanceCharts chartData={chartData} />
            )}

            {activeTab === 'goals' && (
              <GoalTracker 
                goals={goals}
                onAddGoal={handleAddGoal}
                onUpdateGoal={handleUpdateGoal}
              />
            )}

            {activeTab === 'recommendations' && (
              <RecommendationsPanel recommendations={recommendations} />
            )}

            {activeTab === 'comparison' && (
              <ComparativeAnalysis comparisonData={comparisonData} />
            )}
          </div>

          {/* Quick Stats Footer */}
          <div className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Learning Streak</h3>
              <p className="text-sm text-gray-600">Keep up the great work!</p>
            </div>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">23</div>
                <div className="text-xs text-gray-600">Days Active</div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <div className="text-2xl font-bold text-success">156</div>
                <div className="text-xs text-gray-600">Lessons Completed</div>
              </div>
              <div className="w-px h-8 bg-gray-200" />
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">47</div>
                <div className="text-xs text-gray-600">Hours This Month</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgressAnalytics;