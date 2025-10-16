import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DiscussionThread = ({ 
  lessonId, 
  videoTimestamp, 
  initialComments = [], 
  onAddComment,
  currentUser 
}) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');

  const handleAddComment = () => {
    if (!newComment?.trim()) return;

    const comment = {
      id: Date.now(),
      content: newComment,
      author: currentUser,
      timestamp: new Date()?.toISOString(),
      videoTimestamp,
      likes: 0,
      replies: [],
      isLiked: false,
      isInstructor: currentUser?.role === 'instructor'
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
    onAddComment?.(comment);
  };

  const handleAddReply = (parentId) => {
    if (!replyText?.trim()) return;

    const reply = {
      id: Date.now(),
      content: replyText,
      author: currentUser,
      timestamp: new Date()?.toISOString(),
      likes: 0,
      isLiked: false,
      isInstructor: currentUser?.role === 'instructor'
    };

    setComments(prev => prev?.map(comment => 
      comment?.id === parentId 
        ? { ...comment, replies: [...comment?.replies, reply] }
        : comment
    ));

    setReplyText('');
    setReplyingTo(null);
  };

  const toggleLike = (commentId, isReply = false, parentId = null) => {
    setComments(prev => prev?.map(comment => {
      if (isReply && comment?.id === parentId) {
        return {
          ...comment,
          replies: comment?.replies?.map(reply => 
            reply?.id === commentId 
              ? { 
                  ...reply, 
                  isLiked: !reply?.isLiked,
                  likes: reply?.isLiked ? reply?.likes - 1 : reply?.likes + 1
                }
              : reply
          )
        };
      } else if (!isReply && comment?.id === commentId) {
        return {
          ...comment,
          isLiked: !comment?.isLiked,
          likes: comment?.isLiked ? comment?.likes - 1 : comment?.likes + 1
        };
      }
      return comment;
    }));
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date?.toLocaleDateString();
  };

  const formatVideoTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const sortedComments = [...comments]?.sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.timestamp) - new Date(b.timestamp);
      case 'popular':
        return b?.likes - a?.likes;
      default: // newest
        return new Date(b.timestamp) - new Date(a.timestamp);
    }
  });

  const filteredComments = sortedComments?.filter(comment => {
    switch (filterBy) {
      case 'instructor':
        return comment?.isInstructor;
      case 'questions':
        return comment?.content?.includes('?');
      default: // all
        return true;
    }
  });

  const CommentComponent = ({ comment, isReply = false, parentId = null }) => (
    <div className={`${isReply ? 'ml-12' : ''}`}>
      <div className="flex space-x-3">
        <Image
          src={comment?.author?.avatar}
          alt={comment?.author?.avatarAlt}
          className="w-8 h-8 rounded-full flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-gray-900">{comment?.author?.name}</span>
            {comment?.isInstructor && (
              <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                Instructor
              </span>
            )}
            <span className="text-sm text-gray-500">{formatTimestamp(comment?.timestamp)}</span>
            {comment?.videoTimestamp && (
              <button className="text-sm text-primary hover:underline flex items-center space-x-1">
                <Icon name="Play" size={12} />
                <span>{formatVideoTime(comment?.videoTimestamp)}</span>
              </button>
            )}
          </div>
          
          <p className="text-gray-900 mb-2 whitespace-pre-wrap">{comment?.content}</p>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={() => toggleLike(comment?.id, isReply, parentId)}
              className={`flex items-center space-x-1 text-sm transition-colors ${
                comment?.isLiked ? 'text-primary' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon name={comment?.isLiked ? "Heart" : "Heart"} size={14} />
              <span>{comment?.likes}</span>
            </button>
            
            {!isReply && (
              <button
                onClick={() => setReplyingTo(replyingTo === comment?.id ? null : comment?.id)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Reply
              </button>
            )}
            
            <button className="text-sm text-gray-500 hover:text-gray-700">
              Report
            </button>
          </div>
          
          {/* Reply Form */}
          {replyingTo === comment?.id && (
            <div className="mt-3 space-y-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e?.target?.value)}
                placeholder="Write a reply..."
                className="w-full p-3 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                rows="3"
              />
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  onClick={() => handleAddReply(comment?.id)}
                  disabled={!replyText?.trim()}
                >
                  Reply
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyText('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          {/* Replies */}
          {comment?.replies && comment?.replies?.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment?.replies?.map(reply => (
                <CommentComponent
                  key={reply?.id}
                  comment={reply}
                  isReply={true}
                  parentId={comment?.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Discussion</h2>
          <p className="text-gray-600 mt-1">
            {comments?.length} comment{comments?.length !== 1 ? 's' : ''}
            {videoTimestamp && ` at ${formatVideoTime(videoTimestamp)}`}
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="popular">Most liked</option>
          </select>
          
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e?.target?.value)}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
          >
            <option value="all">All comments</option>
            <option value="instructor">Instructor only</option>
            <option value="questions">Questions</option>
          </select>
        </div>
      </div>
      {/* Add Comment Form */}
      <div className="mb-6">
        <div className="flex space-x-3">
          <Image
            src={currentUser?.avatar}
            alt={currentUser?.avatarAlt}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e?.target?.value)}
              placeholder="Ask a question or share your thoughts..."
              className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
              rows="3"
            />
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Icon name="Info" size={14} />
                <span>Be respectful and constructive</span>
              </div>
              
              <Button
                onClick={handleAddComment}
                disabled={!newComment?.trim()}
                iconName="Send"
                iconPosition="right"
              >
                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Comments List */}
      <div className="space-y-6">
        {filteredComments?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MessageCircle" size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No comments yet</h3>
            <p className="text-gray-500">
              {filterBy !== 'all' ?'No comments match your filter criteria' :'Be the first to start the discussion!'
              }
            </p>
          </div>
        ) : (
          filteredComments?.map(comment => (
            <CommentComponent key={comment?.id} comment={comment} />
          ))
        )}
      </div>
    </div>
  );
};

export default DiscussionThread;