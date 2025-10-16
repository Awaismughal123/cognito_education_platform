import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import CourseCard from './components/CourseCard';
import FilterSidebar from './components/FilterSidebar';
import SearchHeader from './components/SearchHeader';
import CourseComparison from './components/CourseComparison';
import WishlistPanel from './components/WishlistPanel';
import CategoryTabs from './components/CategoryTabs';

const CourseCatalog = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [wishlistCourses, setWishlistCourses] = useState([]);
  const [comparisonCourses, setComparisonCourses] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    levels: [],
    durations: [],
    prices: [],
    features: [],
    languages: [],
    rating: 0
  });

  // Mock course data
  const allCourses = [
  {
    id: 1,
    title: "Complete React Developer Course 2024",
    description: "Master React from basics to advanced concepts including hooks, context, and modern patterns. Build real-world projects and deploy to production.",
    image: "https://images.unsplash.com/photo-1670057046254-3b5095eb4b66",
    imageAlt: "Modern laptop displaying React code with colorful syntax highlighting on dark background",
    category: "Web Development",
    level: "Intermediate",
    duration: 42.5,
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.8,
    reviews: 12847,
    students: 89234,
    isNew: true,
    isEnrolled: false,
    progress: undefined,
    instructor: {
      name: "Sarah Johnson",
      title: "Senior Frontend Developer",
      avatar: "https://images.unsplash.com/photo-1734991032476-bceab8383a59",
      avatarAlt: "Professional headshot of woman with shoulder-length brown hair in business attire"
    },
    features: ["Lifetime Access", "Certificate", "Mobile Access", "Coding Exercises", "Downloadable Resources", "Community Support"]
  },
  {
    id: 2,
    title: "Python for Data Science and Machine Learning",
    description: "Learn Python programming for data analysis, visualization, and machine learning. Work with pandas, numpy, matplotlib, and scikit-learn.",
    image: "https://images.unsplash.com/photo-1721525746389-fac9b1f423c5",
    imageAlt: "Python code on computer screen with data visualization charts and graphs displayed",
    category: "Data Science",
    level: "Beginner",
    duration: 38.0,
    price: 0,
    originalPrice: null,
    rating: 4.7,
    reviews: 8934,
    students: 45678,
    isNew: false,
    isEnrolled: true,
    progress: 68,
    instructor: {
      name: "Dr. Michael Chen",
      title: "Data Science Professor",
      avatar: "https://images.unsplash.com/photo-1724128195747-dd25cba7860f",
      avatarAlt: "Professional headshot of Asian man with glasses in navy blue suit"
    },
    features: ["Free Course", "Certificate", "Hands-on Projects", "Real Datasets", "Career Guidance"]
  },
  {
    id: 3,
    title: "UI/UX Design Masterclass: Figma to Prototype",
    description: "Complete guide to user interface and user experience design using Figma. Learn design thinking, wireframing, and prototyping.",
    image: "https://images.unsplash.com/photo-1648312182804-346237fbc0ea",
    imageAlt: "Designer working on UI mockups with Figma interface showing colorful app designs",
    category: "Design",
    level: "Intermediate",
    duration: 28.5,
    price: 79.99,
    originalPrice: 149.99,
    rating: 4.9,
    reviews: 6789,
    students: 23456,
    isNew: false,
    isEnrolled: false,
    progress: undefined,
    instructor: {
      name: "Emma Rodriguez",
      title: "Senior UX Designer",
      avatar: "https://images.unsplash.com/photo-1718109581971-16784ca9a38e",
      avatarAlt: "Professional headshot of Hispanic woman with long dark hair in creative workspace"
    },
    features: ["Portfolio Projects", "Design Templates", "Figma Resources", "Industry Insights", "Peer Reviews"]
  },
  {
    id: 4,
    title: "iOS App Development with Swift 5",
    description: "Build native iOS applications using Swift 5 and Xcode. Learn app architecture, UI design, and App Store deployment.",
    image: "https://images.unsplash.com/photo-1540448880868-fc8f11e2938b",
    imageAlt: "iPhone displaying mobile app interface with Xcode development environment in background",
    category: "Mobile Development",
    level: "Advanced",
    duration: 56.0,
    price: 129.99,
    originalPrice: 249.99,
    rating: 4.6,
    reviews: 4567,
    students: 12890,
    isNew: true,
    isEnrolled: false,
    progress: undefined,
    instructor: {
      name: "James Wilson",
      title: "iOS Developer",
      avatar: "https://images.unsplash.com/photo-1548778797-7d8cf3eefd24",
      avatarAlt: "Professional headshot of man with beard wearing casual button-up shirt"
    },
    features: ["Real Apps", "App Store Submission", "Swift 5", "iOS 17", "Source Code", "Mentorship"]
  },
  {
    id: 5,
    title: "Digital Marketing Strategy & Analytics",
    description: "Master digital marketing across all channels. Learn SEO, social media marketing, PPC, email marketing, and analytics.",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3",
    imageAlt: "Marketing analytics dashboard showing graphs and charts on laptop screen with coffee cup",
    category: "Marketing",
    level: "Beginner",
    duration: 32.0,
    price: 69.99,
    originalPrice: 139.99,
    rating: 4.5,
    reviews: 7890,
    students: 34567,
    isNew: false,
    isEnrolled: true,
    progress: 25,
    instructor: {
      name: "Lisa Thompson",
      title: "Digital Marketing Expert",
      avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      avatarAlt: "Professional headshot of blonde woman in business blazer with confident smile"
    },
    features: ["Marketing Tools", "Case Studies", "Templates", "Analytics Setup", "Campaign Planning"]
  },
  {
    id: 6,
    title: "Photography Fundamentals: From Beginner to Pro",
    description: "Learn photography basics including composition, lighting, camera settings, and post-processing techniques.",
    image: "https://images.unsplash.com/photo-1591370407318-b5d29aaa07cd",
    imageAlt: "Professional camera with various lenses and photography equipment on wooden surface",
    category: "Photography",
    level: "Beginner",
    duration: 24.0,
    price: 49.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviews: 3456,
    students: 15678,
    isNew: false,
    isEnrolled: false,
    progress: undefined,
    instructor: {
      name: "David Park",
      title: "Professional Photographer",
      avatar: "https://images.unsplash.com/photo-1576280314501-8dd767fb6b06",
      avatarAlt: "Professional headshot of Asian man with camera equipment in photography studio"
    },
    features: ["Photo Assignments", "Lightroom Presets", "Equipment Guide", "Portfolio Review", "Shooting Techniques"]
  },
  {
    id: 7,
    title: "Business Strategy & Leadership Excellence",
    description: "Develop strategic thinking and leadership skills for modern business challenges. Learn decision-making and team management.",
    image: "https://images.unsplash.com/photo-1716703435453-a7733d600d68",
    imageAlt: "Business team meeting in modern conference room with presentation charts on wall",
    category: "Business",
    level: "Advanced",
    duration: 45.0,
    price: 159.99,
    originalPrice: 299.99,
    rating: 4.8,
    reviews: 2345,
    students: 8901,
    isNew: true,
    isEnrolled: false,
    progress: undefined,
    instructor: {
      name: "Robert Martinez",
      title: "Business Consultant",
      avatar: "https://images.unsplash.com/photo-1723990720514-65968a7d517b",
      avatarAlt: "Professional headshot of Hispanic businessman in dark suit with confident expression"
    },
    features: ["Case Studies", "Leadership Assessment", "Strategic Templates", "Executive Coaching", "Networking"]
  },
  {
    id: 8,
    title: "Music Production with Ableton Live",
    description: "Create professional music tracks using Ableton Live. Learn mixing, mastering, and electronic music production techniques.",
    image: "https://images.unsplash.com/photo-1703117405609-7c34bc8a7c85",
    imageAlt: "Music production studio with Ableton Live software on computer screen and audio equipment",
    category: "Music",
    level: "Intermediate",
    duration: 35.0,
    price: 89.99,
    originalPrice: 179.99,
    rating: 4.6,
    reviews: 1890,
    students: 6789,
    isNew: false,
    isEnrolled: false,
    progress: undefined,
    instructor: {
      name: "Alex Turner",
      title: "Music Producer",
      avatar: "https://images.unsplash.com/photo-1585666197206-5ed972d677a9",
      avatarAlt: "Professional headshot of young man with headphones in music studio setting"
    },
    features: ["Ableton Projects", "Sample Packs", "Mixing Templates", "Mastering Guide", "Industry Contacts"]
  }];


  // Filter and sort courses
  const getFilteredCourses = () => {
    let filtered = [...allCourses];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered?.filter((course) =>
      course?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      course?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      course?.instructor?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      course?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered?.filter((course) =>
      course?.category?.toLowerCase()?.replace(/\s+/g, '-') === activeCategory
      );
    }

    // Apply filters
    if (filters?.levels?.length > 0) {
      filtered = filtered?.filter((course) =>
      filters?.levels?.includes(course?.level?.toLowerCase())
      );
    }

    if (filters?.prices?.length > 0) {
      filtered = filtered?.filter((course) => {
        if (filters?.prices?.includes('free')) return course?.price === 0;
        if (filters?.prices?.includes('0-50')) return course?.price > 0 && course?.price <= 50;
        if (filters?.prices?.includes('50-100')) return course?.price > 50 && course?.price <= 100;
        if (filters?.prices?.includes('100+')) return course?.price > 100;
        return true;
      });
    }

    if (filters?.rating > 0) {
      filtered = filtered?.filter((course) => course?.rating >= filters?.rating);
    }

    // Sort courses
    switch (sortBy) {
      case 'popularity':
        filtered?.sort((a, b) => b?.students - a?.students);
        break;
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'newest':
        filtered?.sort((a, b) => b?.isNew - a?.isNew);
        break;
      case 'price-low':
        filtered?.sort((a, b) => a?.price - b?.price);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.price - a?.price);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    return filtered;
  };

  const filteredCourses = getFilteredCourses();

  // Wishlist functions
  const handleWishlistToggle = (courseId) => {
    const course = allCourses?.find((c) => c?.id === courseId);
    if (!course) return;

    setWishlistCourses((prev) => {
      const isInWishlist = prev?.some((c) => c?.id === courseId);
      if (isInWishlist) {
        return prev?.filter((c) => c?.id !== courseId);
      } else {
        return [...prev, course];
      }
    });
  };

  const handleRemoveFromWishlist = (courseId) => {
    setWishlistCourses((prev) => prev?.filter((c) => c?.id !== courseId));
  };

  // Comparison functions
  const handleCompareToggle = (courseId) => {
    const course = allCourses?.find((c) => c?.id === courseId);
    if (!course) return;

    setComparisonCourses((prev) => {
      const isInComparison = prev?.some((c) => c?.id === courseId);
      if (isInComparison) {
        return prev?.filter((c) => c?.id !== courseId);
      } else {
        if (prev?.length >= 3) {
          // Replace oldest course if already comparing 3
          return [...prev?.slice(1), course];
        }
        return [...prev, course];
      }
    });
  };

  const handleRemoveFromComparison = (courseId) => {
    setComparisonCourses((prev) => prev?.filter((c) => c?.id !== courseId));
  };

  const handleClearComparison = () => {
    setComparisonCourses([]);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      levels: [],
      durations: [],
      prices: [],
      features: [],
      languages: [],
      rating: 0
    });
  };

  // Check if course is in wishlist or comparison
  const isInWishlist = (courseId) => wishlistCourses?.some((c) => c?.id === courseId);
  const isInComparison = (courseId) => comparisonCourses?.some((c) => c?.id === courseId);

  return (
    <>
      <Helmet>
        <title>Course Catalog - Cognito Education Platform</title>
        <meta name="description" content="Discover and enroll in thousands of courses across web development, data science, design, business, and more. Interactive course discovery with filtering, previews, and enrollment pathways." />
      </Helmet>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />


        {/* Main Content */}
        <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          
          {/* Search Header */}
          <SearchHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onToggleFilters={() => setFiltersOpen(!filtersOpen)}
            resultsCount={filteredCourses?.length}
            totalCourses={allCourses?.length} />


          {/* Category Tabs */}
          <CategoryTabs
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory} />


          <div className="flex">
            {/* Filter Sidebar */}
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
              isOpen={filtersOpen}
              onClose={() => setFiltersOpen(false)} />


            {/* Course Grid */}
            <div className="flex-1 p-4 sm:p-6 lg:p-8">
              {/* Active Filters */}
              {(Object.values(filters)?.some((f) => Array.isArray(f) ? f?.length > 0 : f > 0) || searchQuery || activeCategory !== 'all') &&
              <div className="mb-6 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">Active filters:</span>
                  
                  {searchQuery &&
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                      Search: "{searchQuery}"
                      <button
                    onClick={() => setSearchQuery('')}
                    className="ml-2 hover:text-primary/70">

                        <Icon name="X" size={14} />
                      </button>
                    </span>
                }
                  
                  {activeCategory !== 'all' &&
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary">
                      Category: {activeCategory?.replace('-', ' ')}
                      <button
                    onClick={() => setActiveCategory('all')}
                    className="ml-2 hover:text-primary/70">

                        <Icon name="X" size={14} />
                      </button>
                    </span>
                }

                  <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                    handleClearFilters();
                  }}
                  className="text-gray-500 hover:text-gray-700">

                    Clear all
                  </Button>
                </div>
              }

              {/* Course Grid/List */}
              {filteredCourses?.length === 0 ?
              <div className="text-center py-16">
                  <Icon name="Search" size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No courses found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or browse our popular categories
                  </p>
                  <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                    handleClearFilters();
                  }}>

                    Clear all filters
                  </Button>
                </div> :

              <div className={`${
              viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}`
              }>
                  {filteredCourses?.map((course) =>
                <CourseCard
                  key={course?.id}
                  course={course}
                  onWishlistToggle={handleWishlistToggle}
                  onCompare={handleCompareToggle}
                  isInWishlist={isInWishlist(course?.id)}
                  isInComparison={isInComparison(course?.id)} />

                )}
                </div>
              }

              {/* Load More Button */}
              {filteredCourses?.length > 0 &&
              <div className="text-center mt-12">
                  <Button
                  variant="outline"
                  size="lg"
                  iconName="ChevronDown"
                  iconPosition="right">

                    Load More Courses
                  </Button>
                </div>
              }
            </div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-30">
          {/* Comparison Button */}
          {comparisonCourses?.length > 0 &&
          <Button
            variant="default"
            size="lg"
            iconName="GitCompare"
            iconPosition="left"
            onClick={() => setComparisonOpen(true)}
            className="shadow-lg">

              Compare ({comparisonCourses?.length})
            </Button>
          }

          {/* Wishlist Button */}
          <Button
            variant="outline"
            size="lg"
            iconName="Heart"
            iconPosition="left"
            onClick={() => setWishlistOpen(true)}
            className={`shadow-lg ${wishlistCourses?.length > 0 ? 'bg-red-50 border-red-200 text-red-600' : ''}`}>

            Wishlist ({wishlistCourses?.length})
          </Button>
        </div>

        {/* Wishlist Panel */}
        <WishlistPanel
          courses={wishlistCourses}
          onRemoveCourse={handleRemoveFromWishlist}
          isOpen={wishlistOpen}
          onClose={() => setWishlistOpen(false)} />


        {/* Course Comparison Modal */}
        <CourseComparison
          courses={comparisonCourses}
          onRemoveCourse={handleRemoveFromComparison}
          onClearAll={handleClearComparison}
          isOpen={comparisonOpen}
          onClose={() => setComparisonOpen(false)} />

      </div>
    </>);

};

export default CourseCatalog;