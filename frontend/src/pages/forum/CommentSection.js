// src/components/forum/CommentSection.js
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const CommentSection = ({ comments, onAddComment, currentUser }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText('');
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-6">Comments ({comments.length})</h2>
      
      {currentUser && (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex">
            <img
              src={currentUser.profilePicture || 'https://via.placeholder.com/40'}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex-grow">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                rows="3"
                required
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
                >
                  Comment
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
      
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map(comment => (
            <div key={comment._id} className="bg-white p-5 rounded-lg shadow-sm">
              <div className="flex items-start">
                <img
                  src={comment.author.profilePicture || 'https://via.placeholder.com/40'}
                  alt={comment.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <div className="flex items-center mb-1">
                    <span className="font-medium text-gray-900 mr-2">{comment.author.name}</span>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No comments yet. Be the first to share your thoughts!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
