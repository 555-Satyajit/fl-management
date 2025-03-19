// ForumPostsList.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaHeart, FaRegHeart, FaComment } from 'react-icons/fa';
import { useAuth } from '../../AuthContext';

const ForumPostsList = ({ posts, loading, currentPage, totalPages, onPageChange, onLike }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-700">Farmers Forum</h2>
        <button 
          onClick={() => navigate('/farmer/forum/create')}
          className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700 transition duration-200"
        >
          <FaPlus /> New Post
        </button>
      </div>
      
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No posts yet. Be the first to share!</p>
        ) : (
          posts.map(post => (
            <div key={post._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-200">
              <div className="flex items-center mb-2">
                <img 
                  src={post.author.profilePicture || '/default-avatar.png'} 
                  alt={post.author.name} 
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <Link to={`/farmer/forum/post/${post._id}`} className="block hover:underline">
                <h3 className="text-xl font-semibold text-green-800 mb-2">{post.title}</h3>
              </Link>
              
              <p className="text-gray-700 mb-3 line-clamp-2">{post.content}</p>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between mt-4 text-gray-600">
                <button 
                  onClick={() => onLike(post._id)} 
                  className="flex items-center gap-1 hover:text-red-500 transition duration-200"
                >
                  {post.liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                  <span>{post.likes || 0}</span>
                </button>
                
                <Link to={`/farmer/forum/post/${post._id}`} className="flex items-center gap-1 hover:text-green-600 transition duration-200">
                  <FaComment />
                  <span>Comments</span>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            <button 
              onClick={() => onPageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
            >
              Previous
            </button>
            <div className="flex items-center">
              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <button 
              onClick={() => onPageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumPostsList;