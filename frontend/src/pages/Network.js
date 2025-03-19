import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostList from './forum/PostList';
import Pagination from './forum/Pagination';
import CreatePostForm from './forum/CreateForumPost';
import ForumHeader from './forum/ForumHeader';
import { useAuth } from '../AuthContext';
import toast from 'react-hot-toast';

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const fetchPosts = async () => {
    try {
      setLoading(true);
      let url = `/api/forum/posts?page=${currentPage}&limit=5`;
      
      const { data } = await axios.get(url);
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (err) {
      setError('Failed to load forum posts');
      toast.error('Failed to load forum posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, selectedTag]);

  const handleCreatePost = async (postData) => {
    try {
      const { data } = await axios.post('/api/forum/posts', postData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
      });
      setPosts([data, ...posts]);
      setShowCreateForm(false);
      toast.success('Post created successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create post');
    }
  };

  const handleLikePost = async (postId) => {
    if (!user) {
      toast.error('Please login to like posts');
      return;
    }
    
    try {
      const { data } = await axios.put(`/api/forum/posts/${postId}/like`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
      });
      
      setPosts(posts.map(post => 
        post._id === postId 
          ? { ...post, likes: post.likes.includes(user.id) 
              ? post.likes.filter(id => id !== user.id) 
              : [...post.likes, user.id] } 
          : post
      ));
      
      toast.success(data.liked ? 'Post liked!' : 'Post unliked!');
    } catch (err) {
      toast.error('Failed to update like');
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(post => 
    selectedTag ? post.tags.includes(selectedTag) : true
  );

  return (
    <div className="forum-container bg-gray-50 min-h-screen">
      <ForumHeader 
        onCreatePost={() => setShowCreateForm(true)} 
        onSearch={handleSearch}
        onTagSelect={handleTagSelect}
        selectedTag={selectedTag}
      />
      
      <div className="container mx-auto px-4 py-8">
        {showCreateForm && (
          <div className="mb-8">
            <CreatePostForm 
              onSubmit={handleCreatePost}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        )}
        
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 p-4 rounded-md text-red-700 mb-4">
            {error}
          </div>
        ) : filteredPosts.length > 0 ? (
          <>
            <PostList 
              posts={filteredPosts} 
              currentUser={user} 
              onLike={handleLikePost}
              onTagClick={handleTagSelect}
            />
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="bg-white p-10 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-2">No posts found</h3>
            <p className="text-gray-600 mb-4">Be the first to start a discussion!</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-200"
            >
              Create Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumPage;
