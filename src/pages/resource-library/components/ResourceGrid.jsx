import React from 'react';
import ResourceCard from './ResourceCard';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ResourceGrid = ({ 
  resources, 
  loading, 
  hasMore, 
  onLoadMore, 
  onBookmark, 
  onDownload, 
  onView,
  currentPage,
  totalPages 
}) => {
  if (loading && resources?.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)]?.map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-full" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
              <div className="flex gap-2">
                <div className="h-8 bg-gray-200 rounded flex-1" />
                <div className="h-8 bg-gray-200 rounded w-12" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (resources?.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No resources found</h3>
        <p className="text-gray-600 mb-6">
          Try adjusting your search criteria or browse our featured resources above.
        </p>
        <Button
          variant="outline"
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={16}
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {((currentPage - 1) * 12) + 1}-{Math.min(currentPage * 12, resources?.length)} of {resources?.length} resources
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">View:</span>
          <Button variant="ghost" size="sm" iconName="Grid3x3" iconSize={16} />
          <Button variant="outline" size="sm" iconName="List" iconSize={16} />
        </div>
      </div>
      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {resources?.map((resource) => (
          <ResourceCard
            key={resource?.id}
            resource={resource}
            onBookmark={onBookmark}
            onDownload={onDownload}
            onView={onView}
          />
        ))}
      </div>
      {/* Load More / Pagination */}
      {hasMore && (
        <div className="flex justify-center pt-6">
          <Button
            variant="outline"
            onClick={onLoadMore}
            loading={loading}
            iconName="ChevronDown"
            iconPosition="right"
            iconSize={16}
          >
            Load More Resources
          </Button>
        </div>
      )}
      {/* Pagination Info */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronLeft"
            iconSize={16}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <div className="flex items-center gap-2">
            {[...Array(Math.min(5, totalPages))]?.map((_, index) => {
              const pageNum = index + 1;
              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "ghost"}
                  size="sm"
                  className="w-8 h-8 p-0"
                >
                  {pageNum}
                </Button>
              );
            })}
            {totalPages > 5 && (
              <>
                <span className="text-gray-400">...</span>
                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                  {totalPages}
                </Button>
              </>
            )}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            iconName="ChevronRight"
            iconSize={16}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResourceGrid;