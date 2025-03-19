import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { ThumbUpIcon, ArrowLeftIcon, TagIcon } from '@heroicons/react/outline';
import CommentSection from './CommentSection';
import toast from 'react-hot-toast';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/forum/posts/${id}`);
        setPost(data.post);
        setComments(data.comments);
      } catch (err) {
        setError('Failed to load post details');
        toast.error('Failed to load post details');
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  const handleAddComment = async (content) => {
    if (!user) {
      toast.error('Please login to comment');
      return;
    }

    try {
      const { data } = await axios.post(`/api/forum/posts/${id}/comments`, { content }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
      });
      setComments([...comments, data]);
      toast.success('Comment added successfully');
    } catch (err) {
      toast.error('Failed to add comment');
    }
  };

  const handleLikePost = async () => {
    if (!user) {
      toast.error('Please login to like posts');
      return;
    }

    try {
      await axios.put(`/api/forum/posts/${id}/like`, {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || sessionStorage.getItem('token')}`
        }
      });
      
      // Update the post likes
      setPost(prev => {
        const userLiked = prev.likes.includes(user.id);
        return {
          ...prev,
          likes: userLiked
            ? prev.likes.filter(likeId => likeId !== user.id)
            : [...prev.likes, user.id]
        };
      });
      
    } catch (err) {
      toast.error('Failed to update like');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-10 bg-gray-50 min-h-screen">
        <div className="bg-red-100 p-4 rounded-md text-red-700 mb-4">
          {error || 'Post not found'}
        </div>
        <button
          onClick={() => navigate('/forum')}
          className="flex items-center text-green-600 hover:text-green-700"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Forum
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link
          to="/forum"
          className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-1" />
          Back to Forum
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-6">
              <img 
                src={post.author.profilePicture || 'https://via.placeholder.com/40'}
                alt={post.author.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            
            <div className="prose max-w-none mb-6">
              {post.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4 text-gray-700">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags && post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  <TagIcon className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4">
              <button
                onClick={handleLikePost}
                className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
                  user && post.likes.includes(user.id)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <ThumbUpIcon className="h-5 w-5 mr-2" />
                {post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
              </button>
            </div>
          </div>
        </div>

        <CommentSection 
          comments={comments}
          onAddComment={handleAddComment}
          currentUser={user}
        />
      </div>
    </div>
  );
};

export default PostDetail;