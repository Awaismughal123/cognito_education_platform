import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BookmarkPanel = ({ 
  lessonId, 
  initialBookmarks = [], 
  onSave, 
  currentVideoTime = 0 
}) => {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['Important', 'Review Later', 'Key Concept', 'Example', 'Question'];

  const addBookmark = () => {
    const newBookmark = {
      id: Date.now(),
      title: '',
      description: '',
      videoTime: currentVideoTime,
      category: 'Important',
      timestamp: new Date()?.toISOString(),
      isEditing: true
    };
    
    setBookmarks(prev => [newBookmark, ...prev]);
    setIsExpanded(true);
  };

  const updateBookmark = (bookmarkId, updates) => {
    setBookmarks(prev => prev?.map(bookmark => 
      bookmark?.id === bookmarkId ? { ...bookmark, ...updates } : bookmark
    ));
  };

  const deleteBookmark = (bookmarkId) => {
    setBookmarks(prev => prev?.filter(bookmark => bookmark?.id !== bookmarkId));
  };

  const saveBookmark = (bookmarkId) => {
    const bookmark = bookmarks?.find(b => b?.id === bookmarkId);
    if (bookmark && bookmark?.title?.trim()) {
      updateBookmark(bookmarkId, { isEditing: false });
      onSave?.(bookmarks);
    } else if (bookmark && !bookmark?.title?.trim()) {
      deleteBookmark(bookmarkId);
    }
  };

  const jumpToTime = (videoTime) => {
    // This would integrate with the video player
    console.log(`Jump to ${formatTime(videoTime)}`);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Important': 'bg-red-100 text-red-800 border-red-200',
      'Review Later': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Key Concept': 'bg-blue-100 text-blue-800 border-blue-200',
      'Example': 'bg-green-100 text-green-800 border-green-200',
      'Question': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors?.[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const filteredBookmarks = bookmarks?.filter(bookmark => {
    const matchesSearch = bookmark?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         bookmark?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || bookmark?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`bg-white border border-gray-200 rounded-lg transition-all duration-300 ${
      isExpanded ? 'fixed inset-4 z-50 shadow-2xl' : 'h-12'
    }`}>
      {/* Collapsed Header */}
      {!isExpanded && (
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-2">
            <Icon name="Bookmark" size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Bookmarks</span>
            {bookmarks?.length > 0 && (
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                {bookmarks?.length}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={addBookmark}
              iconName="Plus"
              iconSize={14}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(true)}
              iconName="Maximize2"
              iconSize={14}
            />
          </div>
        </div>
      )}
      {/* Expanded View */}
      {isExpanded && (
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Icon name="Bookmark" size={20} className="text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">Bookmarks</h2>
              <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                {bookmarks?.length}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={addBookmark}
                iconName="Plus"
                iconPosition="left"
              >
                Add Bookmark
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                iconName="Minimize2"
                iconSize={16}
              />
            </div>
          </div>

          {/* Search and Filters */}
          <div className="p-4 border-b border-gray-100 space-y-3">
            <Input
              type="search"
              placeholder="Search bookmarks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full"
            />
            
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  selectedCategory === 'all' ?'bg-primary text-white border-primary' :'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              {categories?.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary text-white border-primary' :'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Bookmarks List */}
          <div className="flex-1 overflow-y-auto p-4">
            {filteredBookmarks?.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="Bookmark" size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No bookmarks yet</h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery || selectedCategory !== 'all' ?'No bookmarks match your search criteria' :'Save important moments to revisit later'
                  }
                </p>
                {!searchQuery && selectedCategory === 'all' && (
                  <Button onClick={addBookmark} iconName="Plus" iconPosition="left">
                    Create Your First Bookmark
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBookmarks?.map(bookmark => (
                  <div
                    key={bookmark?.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    {bookmark?.isEditing ? (
                      <div className="space-y-3">
                        <Input
                          type="text"
                          placeholder="Bookmark title..."
                          value={bookmark?.title}
                          onChange={(e) => updateBookmark(bookmark?.id, { title: e?.target?.value })}
                          className="w-full"
                        />
                        
                        <textarea
                          value={bookmark?.description}
                          onChange={(e) => updateBookmark(bookmark?.id, { description: e?.target?.value })}
                          placeholder="Add a description (optional)..."
                          className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                          rows="2"
                        />
                        
                        <div className="flex items-center space-x-3">
                          <select
                            value={bookmark?.category}
                            onChange={(e) => updateBookmark(bookmark?.id, { category: e?.target?.value })}
                            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                          >
                            {categories?.map(category => (
                              <option key={category} value={category}>{category}</option>
                            ))}
                          </select>
                          
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Icon name="Play" size={14} />
                            <span>{formatTime(bookmark?.videoTime)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => saveBookmark(bookmark?.id)}
                            iconName="Check"
                            iconPosition="left"
                          >
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteBookmark(bookmark?.id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {/* Bookmark Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {bookmark?.title || 'Untitled Bookmark'}
                            </h3>
                            {bookmark?.description && (
                              <p className="text-gray-600 text-sm mb-2">{bookmark?.description}</p>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-1 ml-3">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateBookmark(bookmark?.id, { isEditing: true })}
                              iconName="Edit3"
                              iconSize={14}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteBookmark(bookmark?.id)}
                              iconName="Trash2"
                              iconSize={14}
                              className="text-error hover:text-error"
                            />
                          </div>
                        </div>

                        {/* Bookmark Meta */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-1 text-xs rounded-full border ${getCategoryColor(bookmark?.category)}`}>
                              {bookmark?.category}
                            </span>
                            
                            <button
                              onClick={() => jumpToTime(bookmark?.videoTime)}
                              className="flex items-center space-x-1 text-sm text-primary hover:underline"
                            >
                              <Icon name="Play" size={14} />
                              <span>{formatTime(bookmark?.videoTime)}</span>
                            </button>
                          </div>
                          
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(bookmark?.timestamp)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarkPanel;