import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ResourceLibrary from './pages/resource-library';
import DynamicDashboard from './pages/dynamic-dashboard';
import LearningInterface from './pages/learning-interface';
import CourseCatalog from './pages/course-catalog';
import ProgressAnalytics from './pages/progress-analytics';
import CommunityHub from './pages/community-hub';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DynamicDashboard />} />
        <Route path="/resource-library" element={<ResourceLibrary />} />
        <Route path="/dynamic-dashboard" element={<DynamicDashboard />} />
        <Route path="/learning-interface" element={<LearningInterface />} />
        <Route path="/course-catalog" element={<CourseCatalog />} />
        <Route path="/progress-analytics" element={<ProgressAnalytics />} />
        <Route path="/community-hub" element={<CommunityHub />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
