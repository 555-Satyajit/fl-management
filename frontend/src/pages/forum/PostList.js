// src/components/forum/PostList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { ThumbUpIcon, ChatIcon, TagIcon } from '@heroicons/react/outline';

const PostList = ({ posts, currentUser, onLike, onTagClick }) => {
  return (
    <div className="space-y-4">
      {posts.map(post => (
        <div key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <img 
                src={post.author.profilePicture || 'https://via.placeholder.com/40'} 
                alt={post.author.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-500">
                  {post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : 'Just now'}
                </p>
              </div>
            </div>
            
            <Link to={`/forum/posts/${post._id}`}>
              <h3 className="text-xl font-semibold mb-2 hover:text-green-600 transition duration-200">
                {post.title}
              </h3>
            </Link>
            
            <p className="text-gray-700 mb-4 line-clamp-3">
              {post.content}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags && post.tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => onTagClick(tag)}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 transition duration-200"
                >
                  <TagIcon className="h-3 w-3 mr-1" />
                  {tag}
                </button>
              ))}
            </div>
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <button
                onClick={() => onLike(post._id)}
                className={`inline-flex items-center px-3 py-1 rounded-md text-sm transition duration-200 ${
                  currentUser && post.likes.includes(currentUser.id)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ThumbUpIcon className="h-4 w-4 mr-1" />
                {post.likes.length}
              </button>
              
              <Link 
                to={`/forum/posts/${post._id}`}
                className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition duration-200"
              >
                <ChatIcon className="h-4 w-4 mr-1" />
                Discussion
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;