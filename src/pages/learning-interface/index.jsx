import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import VideoPlayer from './components/VideoPlayer';
import InteractiveExercise from './components/InteractiveExercise';
import NoteTaking from './components/NoteTaking';
import ProgressTracker from './components/ProgressTracker';
import DiscussionThread from './components/DiscussionThread';
import BookmarkPanel from './components/BookmarkPanel';

const LearningInterface = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [activeTab, setActiveTab] = useState('content');
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  // Mock current user
  const currentUser = {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1723189520204-0716614de54a",
    avatarAlt: "Professional headshot of young man with brown hair wearing navy blue shirt",
    role: "student"
  };

  // Mock lesson data
  const lessonData = {
    id: 1,
    title: "Introduction to Machine Learning Fundamentals",
    description: "Learn the core concepts of machine learning including supervised learning, unsupervised learning, and neural networks through interactive examples and hands-on exercises.",
    duration: 2400, // 40 minutes
    videoUrl: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
    currentLesson: 3,
    totalLessons: 12,
    completedLessons: 2,
    currentProgress: 0.65,
    estimatedTimeRemaining: 25,
    chapters: [
    {
      id: 1,
      title: "What is Machine Learning?",
      description: "Introduction to ML concepts and applications",
      time: 0
    },
    {
      id: 2,
      title: "Types of Machine Learning",
      description: "Supervised vs Unsupervised learning",
      time: 480
    },
    {
      id: 3,
      title: "Neural Networks Basics",
      description: "Understanding artificial neural networks",
      time: 960
    },
    {
      id: 4,
      title: "Practical Applications",
      description: "Real-world ML use cases",
      time: 1440
    }],

    milestones: [
    {
      id: 1,
      title: "Fundamentals Complete",
      description: "Master the basic concepts of machine learning",
      lessonNumber: 4,
      icon: "BookOpen"
    },
    {
      id: 2,
      title: "Hands-on Practice",
      description: "Complete your first ML project",
      lessonNumber: 8,
      icon: "Code"
    },
    {
      id: 3,
      title: "Course Completion",
      description: "Graduate with full ML knowledge",
      lessonNumber: 12,
      icon: "Award"
    }]

  };

  // Mock exercise data
  const exerciseData = {
    id: 1,
    title: "Understanding Supervised Learning",
    description: "Test your knowledge of supervised learning concepts",
    type: "multiple-choice",
    instructions: "Choose the best answer for each question. You can retry if needed.",
    currentQuestion: 1,
    totalQuestions: 3,
    feedback: "Great job! You\'re mastering the fundamentals of machine learning.",
    questions: [
    {
      id: 1,
      text: "Which of the following is an example of supervised learning?",
      image: null,
      options: [
      {
        id: 'a',
        text: "Email spam detection using labeled training data",
        correct: true,
        explanation: "Correct! Spam detection uses labeled examples to learn patterns."
      },
      {
        id: 'b',
        text: "Customer segmentation without prior categories",
        correct: false,
        explanation: "This is unsupervised learning as it doesn't use labeled data."
      },
      {
        id: 'c',
        text: "Exploring data patterns without specific outcomes",
        correct: false,
        explanation: "This describes exploratory data analysis, not supervised learning."
      }]

    }]

  };

  // Mock comments data
  const commentsData = [
  {
    id: 1,
    content: "This explanation of neural networks is really clear! Could you provide more examples of activation functions?",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1560859389-c4fb2bd88016",
      avatarAlt: "Professional headshot of Asian woman with long black hair wearing white blouse"
    },
    timestamp: new Date(Date.now() - 1800000)?.toISOString(),
    videoTimestamp: 960,
    likes: 12,
    isLiked: false,
    isInstructor: false,
    replies: [
    {
      id: 2,
      content: "Great question! I'll cover ReLU, Sigmoid, and Tanh functions in the next lesson with practical examples.",
      author: {
        name: "Dr. Michael Rodriguez",
        avatar: "https://images.unsplash.com/photo-1585066047759-3438c34cf676",
        avatarAlt: "Professional headshot of Hispanic man with beard wearing dark suit jacket"
      },
      timestamp: new Date(Date.now() - 1200000)?.toISOString(),
      likes: 8,
      isLiked: true,
      isInstructor: true
    }]

  },
  {
    id: 3,
    content: "The supervised learning examples really helped me understand the concept. Looking forward to the hands-on exercises!",
    author: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1734434570358-21badf4ba1c6",
      avatarAlt: "Professional headshot of Caucasian man with short brown hair wearing blue shirt"
    },
    timestamp: new Date(Date.now() - 900000)?.toISOString(),
    videoTimestamp: 480,
    likes: 5,
    isLiked: false,
    isInstructor: false,
    replies: []
  }];


  // Mock notes data
  const notesData = [
  {
    id: 1,
    content: "Key insight: Supervised learning requires labeled training data\n\nExamples:\n- Email spam detection\n- Image classification\n- Price prediction",
    timestamp: new Date(Date.now() - 3600000)?.toISOString(),
    tags: ['Key Concept', 'Important'],
    videoTime: 480
  },
  {
    id: 2,
    content: "Question: How do we choose the right algorithm for a specific problem?\n\nNeed to research:\n- Decision trees vs neural networks\n- When to use each approach",
    timestamp: new Date(Date.now() - 1800000)?.toISOString(),
    tags: ['Question', 'Review'],
    videoTime: 960
  }];


  // Mock bookmarks data
  const bookmarksData = [
  {
    id: 1,
    title: "Neural Network Architecture Explanation",
    description: "Clear diagram showing input, hidden, and output layers",
    videoTime: 960,
    category: "Key Concept",
    timestamp: new Date(Date.now() - 2400000)?.toISOString()
  },
  {
    id: 2,
    title: "Supervised vs Unsupervised Comparison",
    description: "Side-by-side comparison with real-world examples",
    videoTime: 480,
    category: "Important",
    timestamp: new Date(Date.now() - 1800000)?.toISOString()
  }];


  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e?.target?.tagName === 'INPUT' || e?.target?.tagName === 'TEXTAREA') return;

      switch (e?.key?.toLowerCase()) {
        case ' ':
          e?.preventDefault();
          // Toggle video play/pause
          break;
        case 'n':
          if (e?.ctrlKey || e?.metaKey) {
            e?.preventDefault();
            // Create new note
          }
          break;
        case 'b':
          if (e?.ctrlKey || e?.metaKey) {
            e?.preventDefault();
            // Create new bookmark
          }
          break;
        case '?':
          setShowKeyboardShortcuts(true);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleChapterSelect = (chapter) => {
    setCurrentVideoTime(chapter?.time);
  };

  const handleExerciseComplete = (result) => {
    console.log('Exercise completed:', result);
    // Handle exercise completion
  };

  const handleNavigateToLesson = (lessonNumber) => {
    if (lessonNumber >= 1 && lessonNumber <= lessonData?.totalLessons) {
      navigate(`/learning-interface/course/${courseId}/lesson/${lessonNumber}`);
    }
  };

  const tabs = [
  { id: 'content', label: 'Content', icon: 'Play' },
  { id: 'exercise', label: 'Exercise', icon: 'Brain' },
  { id: 'discussion', label: 'Discussion', icon: 'MessageCircle' },
  { id: 'resources', label: 'Resources', icon: 'FileText' }];


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={`transition-all duration-300 pt-16 ${
      sidebarCollapsed ? 'ml-16' : 'ml-64'}`
      }>
        <div className="max-w-7xl mx-auto p-6">
          {/* Lesson Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                  <span>Course</span>
                  <Icon name="ChevronRight" size={14} />
                  <span>Lesson {lessonData?.currentLesson}</span>
                </div>
                
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {lessonData?.title}
                </h1>
                
                <p className="text-gray-600 mb-4">
                  {lessonData?.description}
                </p>
                
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={16} />
                    <span>{Math.floor(lessonData?.duration / 60)} minutes</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={16} />
                    <span>1,247 students</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={16} />
                    <span>4.8 rating</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowKeyboardShortcuts(true)}
                  iconName="Keyboard"
                  iconPosition="left">

                  Shortcuts
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left">

                  Download
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Share"
                  iconPosition="left">

                  Share
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Tab Navigation */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    {tabs?.map((tab) =>
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab?.id ?
                      'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
                      }>

                        <Icon name={tab?.icon} size={16} />
                        <span>{tab?.label}</span>
                      </button>
                    )}
                  </nav>
                </div>

                <div className="p-6">
                  {/* Video Content Tab */}
                  {activeTab === 'content' &&
                  <div className="space-y-6">
                      <VideoPlayer
                      videoUrl={lessonData?.videoUrl}
                      title={lessonData?.title}
                      duration={lessonData?.duration}
                      currentTime={currentVideoTime}
                      onTimeUpdate={setCurrentVideoTime}
                      onProgress={setCurrentVideoTime}
                      chapters={lessonData?.chapters}
                      onChapterSelect={handleChapterSelect} />

                      
                      {/* Lesson Content */}
                      <div className="prose max-w-none">
                        <h2>Learning Objectives</h2>
                        <ul>
                          <li>Understand the fundamental concepts of machine learning</li>
                          <li>Distinguish between supervised and unsupervised learning</li>
                          <li>Explore basic neural network architectures</li>
                          <li>Apply ML concepts to real-world scenarios</li>
                        </ul>
                        
                        <h2>Key Concepts</h2>
                        <p>
                          Machine learning is a subset of artificial intelligence that enables computers to learn and improve from experience without being explicitly programmed. In this lesson, we'll explore the foundational concepts that form the backbone of modern ML systems.
                        </p>
                        
                        <h3>Supervised Learning</h3>
                        <p>
                          Supervised learning algorithms learn from labeled training data to make predictions on new, unseen data. Common examples include email spam detection, image classification, and price prediction models.
                        </p>
                        
                        <h3>Unsupervised Learning</h3>
                        <p>
                          Unsupervised learning finds hidden patterns in data without labeled examples. This includes clustering customers into segments, dimensionality reduction, and anomaly detection.
                        </p>
                      </div>
                    </div>
                  }

                  {/* Exercise Tab */}
                  {activeTab === 'exercise' &&
                  <InteractiveExercise
                    exercise={exerciseData}
                    onComplete={handleExerciseComplete}
                    onNext={() => setActiveTab('discussion')} />

                  }

                  {/* Discussion Tab */}
                  {activeTab === 'discussion' &&
                  <DiscussionThread
                    lessonId={lessonData?.id}
                    videoTimestamp={currentVideoTime}
                    initialComments={commentsData}
                    currentUser={currentUser}
                    onAddComment={(comment) => console.log('New comment:', comment)} />

                  }

                  {/* Resources Tab */}
                  {activeTab === 'resources' &&
                  <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <Icon name="FileText" size={20} className="text-primary" />
                            <h3 className="font-semibold text-gray-900">Lesson Slides</h3>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">
                            Download the complete slide deck for this lesson
                          </p>
                          <Button size="sm" variant="outline" fullWidth>
                            Download PDF
                          </Button>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <Icon name="Code" size={20} className="text-primary" />
                            <h3 className="font-semibold text-gray-900">Code Examples</h3>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">
                            Python notebooks with practical examples
                          </p>
                          <Button size="sm" variant="outline" fullWidth>
                            View on GitHub
                          </Button>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <Icon name="ExternalLink" size={20} className="text-primary" />
                            <h3 className="font-semibold text-gray-900">Additional Reading</h3>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">
                            Curated articles and research papers
                          </p>
                          <Button size="sm" variant="outline" fullWidth>
                            View Links
                          </Button>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <Icon name="Video" size={20} className="text-primary" />
                            <h3 className="font-semibold text-gray-900">Supplementary Videos</h3>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">
                            Related video content and tutorials
                          </p>
                          <Button size="sm" variant="outline" fullWidth>
                            Watch Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress Tracker */}
              <ProgressTracker
                currentLesson={lessonData?.currentLesson}
                totalLessons={lessonData?.totalLessons}
                completedLessons={lessonData?.completedLessons}
                currentProgress={lessonData?.currentProgress}
                estimatedTimeRemaining={lessonData?.estimatedTimeRemaining}
                milestones={lessonData?.milestones}
                onNavigateToLesson={handleNavigateToLesson} />

            </div>
          </div>

          {/* Floating Panels */}
          <div className="fixed bottom-4 right-4 space-y-3 z-40">
            <NoteTaking
              lessonId={lessonData?.id}
              initialNotes={notesData}
              onSave={(notes) => console.log('Notes saved:', notes)} />

            
            <BookmarkPanel
              lessonId={lessonData?.id}
              initialBookmarks={bookmarksData}
              currentVideoTime={currentVideoTime}
              onSave={(bookmarks) => console.log('Bookmarks saved:', bookmarks)} />

          </div>
        </div>
      </main>
      {/* Keyboard Shortcuts Modal */}
      {showKeyboardShortcuts &&
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Keyboard Shortcuts</h2>
              <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowKeyboardShortcuts(false)}
              iconName="X"
              iconSize={16} />

            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Play/Pause video</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Space</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">New note</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Ctrl+N</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">New bookmark</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">Ctrl+B</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Show shortcuts</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-sm">?</kbd>
              </div>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default LearningInterface;