import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import CategorySection from './components/CategorySection';
import FeaturedResources from './components/FeaturedResources';
import ResourceGrid from './components/ResourceGrid';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ResourceLibrary = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filters, setFilters] = useState({
    contentTypes: [],
    subjects: [],
    difficulty: '',
    sortBy: 'relevance',
    freeOnly: false,
    downloadable: false,
    recentlyUpdated: false
  });
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for resources
  const mockResources = [
  {
    id: 'res-1',
    title: 'React Hooks Complete Guide',
    description: 'Master React Hooks with practical examples, custom hooks, and performance optimization techniques for modern React development.',
    thumbnail: "https://images.unsplash.com/photo-1607266424522-ccef52eb95ac",
    thumbnailAlt: 'Developer coding React application on laptop with multiple monitors showing code',
    type: 'guide',
    author: 'Alex Johnson',
    rating: 4.8,
    reviews: 342,
    downloads: 5420,
    updatedAt: '2025-10-10',
    fileSize: 2048000,
    difficulty: 'intermediate',
    isPremium: false,
    isBookmarked: false,
    downloadable: true,
    tags: ['React', 'JavaScript', 'Hooks'],
    subject: 'programming'
  },
  {
    id: 'res-2',
    title: 'Python Data Analysis Notebook',
    description: 'Comprehensive Jupyter notebook covering pandas, numpy, and matplotlib for data analysis and visualization projects.',
    thumbnail: "https://images.unsplash.com/photo-1721525746389-fac9b1f423c5",
    thumbnailAlt: 'Data scientist analyzing colorful charts and graphs on computer screen with Python code visible',
    type: 'template',
    author: 'Dr. Maria Santos',
    rating: 4.9,
    reviews: 189,
    downloads: 3210,
    updatedAt: '2025-10-08',
    fileSize: 5120000,
    difficulty: 'advanced',
    isPremium: true,
    isBookmarked: true,
    downloadable: true,
    tags: ['Python', 'Data Science', 'Pandas'],
    subject: 'data-science'
  },
  {
    id: 'res-3',
    title: 'UI Design System Template',
    description: 'Complete Figma template with components, color schemes, typography, and design tokens for building consistent interfaces.',
    thumbnail: "https://images.unsplash.com/photo-1633184815268-707ba999c8dc",
    thumbnailAlt: 'Designer working on colorful UI components and design system layouts on large monitor',
    type: 'template',
    author: 'Sarah Kim',
    rating: 4.7,
    reviews: 267,
    downloads: 4150,
    updatedAt: '2025-10-12',
    fileSize: 15360000,
    difficulty: 'intermediate',
    isPremium: false,
    isBookmarked: false,
    downloadable: true,
    tags: ['Design', 'UI/UX', 'Figma'],
    subject: 'design'
  },
  {
    id: 'res-4',
    title: 'Machine Learning Algorithms Video Series',
    description: 'Step-by-step video tutorials explaining popular ML algorithms with Python implementations and real-world examples.',
    thumbnail: "https://images.unsplash.com/photo-1670681423906-0ee3ca2da3ae",
    thumbnailAlt: 'Computer screen displaying machine learning algorithm flowchart with mathematical formulas and code',
    type: 'video',
    author: 'Prof. David Chen',
    rating: 4.9,
    reviews: 445,
    downloads: 7890,
    updatedAt: '2025-10-05',
    fileSize: 0,
    difficulty: 'advanced',
    isPremium: true,
    isBookmarked: false,
    downloadable: false,
    tags: ['Machine Learning', 'Python', 'AI'],
    subject: 'data-science'
  },
  {
    id: 'res-5',
    title: 'JavaScript ES6+ Cheat Sheet',
    description: 'Quick reference guide covering modern JavaScript features, syntax, and best practices for efficient development.',
    thumbnail: "https://images.unsplash.com/photo-1550063873-ab792950096b",
    thumbnailAlt: 'Modern JavaScript code displayed on laptop screen with colorful syntax highlighting',
    type: 'document',
    author: 'Mike Rodriguez',
    rating: 4.6,
    reviews: 523,
    downloads: 9340,
    updatedAt: '2025-10-14',
    fileSize: 512000,
    difficulty: 'beginner',
    isPremium: false,
    isBookmarked: true,
    downloadable: true,
    tags: ['JavaScript', 'ES6', 'Reference'],
    subject: 'programming'
  },
  {
    id: 'res-6',
    title: 'Business Strategy Canvas Tool',
    description: 'Interactive tool for creating business model canvases with templates, examples, and strategic planning frameworks.',
    thumbnail: "https://images.unsplash.com/photo-1710361197301-d3cd03b34561",
    thumbnailAlt: 'Business professionals analyzing strategy charts and business model canvas on whiteboard',
    type: 'tool',
    author: 'Jennifer Walsh',
    rating: 4.5,
    reviews: 156,
    downloads: 2780,
    updatedAt: '2025-10-11',
    fileSize: 0,
    difficulty: 'intermediate',
    isPremium: false,
    isBookmarked: false,
    downloadable: false,
    tags: ['Business', 'Strategy', 'Planning'],
    subject: 'business'
  },
  {
    id: 'res-7',
    title: 'Digital Marketing Assessment Quiz',
    description: 'Comprehensive quiz covering SEO, social media, content marketing, and analytics to test your digital marketing knowledge.',
    thumbnail: "https://images.unsplash.com/photo-1660732421009-469aba1c2e81",
    thumbnailAlt: 'Marketing analytics dashboard showing social media metrics and campaign performance charts',
    type: 'assessment',
    author: 'Lisa Thompson',
    rating: 4.4,
    reviews: 298,
    downloads: 1950,
    updatedAt: '2025-10-09',
    fileSize: 0,
    difficulty: 'intermediate',
    isPremium: false,
    isBookmarked: false,
    downloadable: false,
    tags: ['Marketing', 'Digital', 'Assessment'],
    subject: 'marketing'
  },
  {
    id: 'res-8',
    title: 'Calculus Problem Solving Guide',
    description: 'Detailed solutions and explanations for common calculus problems with step-by-step methodologies and practice exercises.',
    thumbnail: "https://images.unsplash.com/photo-1631047085941-a29e9730a7e6",
    thumbnailAlt: 'Mathematical equations and calculus formulas written on blackboard with graphs and diagrams',
    type: 'guide',
    author: 'Dr. Robert Kim',
    rating: 4.8,
    reviews: 234,
    downloads: 3650,
    updatedAt: '2025-10-07',
    fileSize: 3072000,
    difficulty: 'advanced',
    isPremium: true,
    isBookmarked: true,
    downloadable: true,
    tags: ['Mathematics', 'Calculus', 'Problem Solving'],
    subject: 'mathematics'
  }];


  // Filter resources based on search and filters
  const filterResources = () => {
    let filtered = [...mockResources];

    // Search filter
    if (searchQuery) {
      filtered = filtered?.filter((resource) =>
      resource?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      resource?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      resource?.tags?.some((tag) => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter((resource) => resource?.subject === selectedCategory);
    }

    // Content type filter
    if (filters?.contentTypes?.length > 0) {
      filtered = filtered?.filter((resource) => filters?.contentTypes?.includes(resource?.type));
    }

    // Subject filter
    if (filters?.subjects?.length > 0) {
      filtered = filtered?.filter((resource) => filters?.subjects?.includes(resource?.subject));
    }

    // Difficulty filter
    if (filters?.difficulty) {
      filtered = filtered?.filter((resource) => resource?.difficulty === filters?.difficulty);
    }

    // Free only filter
    if (filters?.freeOnly) {
      filtered = filtered?.filter((resource) => !resource?.isPremium);
    }

    // Downloadable filter
    if (filters?.downloadable) {
      filtered = filtered?.filter((resource) => resource?.downloadable);
    }

    // Sort resources
    switch (filters?.sortBy) {
      case 'newest':
        filtered?.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        break;
      case 'oldest':
        filtered?.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        break;
      case 'popular':
        filtered?.sort((a, b) => b?.downloads - a?.downloads);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      default:
        // Keep relevance order (default)
        break;
    }

    return filtered;
  };

  // Load resources
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      let filtered = filterResources();
      setResources(filtered);
      setLoading(false);
    }, 500);
  }, [searchQuery, selectedCategory, filters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterToggle = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      contentTypes: [],
      subjects: [],
      difficulty: '',
      sortBy: 'relevance',
      freeOnly: false,
      downloadable: false,
      recentlyUpdated: false
    });
    setSearchQuery('');
    setSelectedCategory('all');
    setIsFilterOpen(false);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleResourceSelect = (resource) => {
    console.log('Selected resource:', resource);
    // Navigate to resource detail or open modal
  };

  const handleBookmark = (resourceId, isBookmarked) => {
    setResources((prev) => prev?.map((resource) =>
    resource?.id === resourceId ?
    { ...resource, isBookmarked } :
    resource
    ));
  };

  const handleDownload = (resource) => {
    console.log('Downloading resource:', resource?.title);
    // Implement download logic
  };

  const handleView = (resource) => {
    console.log('Viewing resource:', resource?.title);
    // Navigate to resource detail page
  };

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const totalPages = Math.ceil(resources?.length / 12);
  const hasMore = currentPage < totalPages;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      <main className={`transition-all duration-300 pt-16 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Resource Library</h1>
                <p className="text-gray-600">
                  Discover comprehensive learning materials, templates, and tools to accelerate your education journey
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  iconName="Upload"
                  iconPosition="left"
                  iconSize={16}>

                  Upload Resource
                </Button>
                
                <Button
                  variant="default"
                  iconName="BookmarkPlus"
                  iconPosition="left"
                  iconSize={16}>

                  My Collections
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                    <p className="text-sm text-gray-600">Total Resources</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Icon name="Download" size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">45.2K</p>
                    <p className="text-sm text-gray-600">Downloads</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">892</p>
                    <p className="text-sm text-gray-600">Contributors</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Icon name="Star" size={20} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">4.8</p>
                    <p className="text-sm text-gray-600">Avg Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            onFilterToggle={handleFilterToggle}
            searchQuery={searchQuery}
            isFilterOpen={isFilterOpen} />


          {/* Filter Panel */}
          <FilterPanel
            isOpen={isFilterOpen}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters} />


          {/* Category Section */}
          <CategorySection
            onCategorySelect={handleCategorySelect}
            selectedCategory={selectedCategory} />


          {/* Featured Resources */}
          <FeaturedResources
            onResourceSelect={handleResourceSelect} />


          {/* Resource Grid */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedCategory === 'all' ? 'All Resources' : `${selectedCategory?.charAt(0)?.toUpperCase() + selectedCategory?.slice(1)?.replace('-', ' ')} Resources`}
              </h2>
              
              {(searchQuery || selectedCategory !== 'all' || Object.values(filters)?.some((f) => f && (Array.isArray(f) ? f?.length > 0 : f !== 'relevance'))) &&
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                iconName="X"
                iconPosition="left"
                iconSize={14}>

                  Clear All Filters
                </Button>
              }
            </div>

            <ResourceGrid
              resources={resources}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
              onBookmark={handleBookmark}
              onDownload={handleDownload}
              onView={handleView}
              currentPage={currentPage}
              totalPages={totalPages} />

          </div>
        </div>
      </main>
    </div>);

};

export default ResourceLibrary;