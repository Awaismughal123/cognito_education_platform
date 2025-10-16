import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NoteTaking = ({ lessonId, onSave, initialNotes = [] }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeNote, setActiveNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const textareaRef = useRef(null);

  const availableTags = ['Important', 'Question', 'Review', 'Key Concept', 'Example', 'Formula'];

  useEffect(() => {
    if (activeNote && textareaRef?.current) {
      textareaRef?.current?.focus();
    }
  }, [activeNote]);

  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      content: '',
      timestamp: new Date()?.toISOString(),
      tags: [],
      videoTime: 0, // This would come from video player
      isEditing: true
    };
    
    setNotes(prev => [newNote, ...prev]);
    setActiveNote(newNote?.id);
    setIsExpanded(true);
  };

  const updateNote = (noteId, updates) => {
    setNotes(prev => prev?.map(note => 
      note?.id === noteId ? { ...note, ...updates } : note
    ));
  };

  const deleteNote = (noteId) => {
    setNotes(prev => prev?.filter(note => note?.id !== noteId));
    if (activeNote === noteId) {
      setActiveNote(null);
    }
  };

  const saveNote = (noteId) => {
    const note = notes?.find(n => n?.id === noteId);
    if (note && note?.content?.trim()) {
      updateNote(noteId, { isEditing: false });
      onSave?.(notes);
    } else if (note && !note?.content?.trim()) {
      deleteNote(noteId);
    }
    setActiveNote(null);
  };

  const toggleTag = (noteId, tag) => {
    const note = notes?.find(n => n?.id === noteId);
    const currentTags = note?.tags || [];
    const newTags = currentTags?.includes(tag) 
      ? currentTags?.filter(t => t !== tag)
      : [...currentTags, tag];
    
    updateNote(noteId, { tags: newTags });
  };

  const filteredNotes = notes?.filter(note => {
    const matchesSearch = note?.content?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesTags = selectedTags?.length === 0 || 
      selectedTags?.some(tag => (note?.tags || [])?.includes(tag));
    return matchesSearch && matchesTags;
  });

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatVideoTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg transition-all duration-300 ${
      isExpanded ? 'fixed inset-4 z-50 shadow-2xl' : 'h-12'
    }`}>
      {/* Collapsed Header */}
      {!isExpanded && (
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-2">
            <Icon name="FileText" size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Notes</span>
            {notes?.length > 0 && (
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                {notes?.length}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={createNewNote}
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
              <Icon name="FileText" size={20} className="text-gray-700" />
              <h2 className="text-lg font-semibold text-gray-900">My Notes</h2>
              <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                {notes?.length} notes
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={createNewNote}
                iconName="Plus"
                iconPosition="left"
              >
                New Note
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
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e?.target?.value)}
              className="w-full"
            />
            
            <div className="flex flex-wrap gap-2">
              {availableTags?.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTags(prev => 
                    prev?.includes(tag) 
                      ? prev?.filter(t => t !== tag)
                      : [...prev, tag]
                  )}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    selectedTags?.includes(tag)
                      ? 'bg-primary text-white border-primary' :'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Notes List */}
          <div className="flex-1 overflow-y-auto p-4">
            {filteredNotes?.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="FileText" size={48} className="text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery || selectedTags?.length > 0 
                    ? 'No notes match your search criteria' :'Start taking notes to capture important insights'
                  }
                </p>
                {!searchQuery && selectedTags?.length === 0 && (
                  <Button onClick={createNewNote} iconName="Plus" iconPosition="left">
                    Create Your First Note
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredNotes?.map(note => (
                  <div
                    key={note?.id}
                    className={`border border-gray-200 rounded-lg p-4 transition-all ${
                      activeNote === note?.id ? 'ring-2 ring-primary/20 border-primary/30' : ''
                    }`}
                  >
                    {/* Note Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Icon name="Clock" size={14} />
                        <span>{formatTimestamp(note?.timestamp)}</span>
                        {note?.videoTime > 0 && (
                          <>
                            <span>•</span>
                            <Icon name="Play" size={14} />
                            <span>{formatVideoTime(note?.videoTime)}</span>
                          </>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveNote(activeNote === note?.id ? null : note?.id)}
                          iconName="Edit3"
                          iconSize={14}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNote(note?.id)}
                          iconName="Trash2"
                          iconSize={14}
                          className="text-error hover:text-error"
                        />
                      </div>
                    </div>

                    {/* Note Content */}
                    {activeNote === note?.id ? (
                      <div className="space-y-3">
                        <textarea
                          ref={textareaRef}
                          value={note?.content}
                          onChange={(e) => updateNote(note?.id, { content: e?.target?.value })}
                          placeholder="Write your note here..."
                          className="w-full h-32 p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                        />
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {availableTags?.map(tag => (
                            <button
                              key={tag}
                              onClick={() => toggleTag(note?.id, tag)}
                              className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                                (note?.tags || [])?.includes(tag)
                                  ? 'bg-primary text-white border-primary' :'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => saveNote(note?.id)}
                            iconName="Check"
                            iconPosition="left"
                          >
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActiveNote(null)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-900 whitespace-pre-wrap mb-3">
                          {note?.content || 'Empty note'}
                        </p>
                        
                        {note?.tags && note?.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {note?.tags?.map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
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

export default NoteTaking;