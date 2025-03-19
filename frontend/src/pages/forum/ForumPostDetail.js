import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../../AuthContext';
import toast from 'react-hot-toast';
import farmer from "./ForumPostsList"

const ForumPostDetail = ({ onLike }) => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPostDetails();
  }, [id]);

  const fetchPostDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/forum/posts/${id}`);
      setPost(response.data.post);
      setComments(response.data.comments);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching post details:', error);
      toast.error('Failed to load post details');
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      const response = await onLike(id);
      setPost(prev => ({ ...prev, likes: response.likes, liked: response.liked }));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    try {
      setSubmitting(true);
      const response = await axios.post(`/api/forum/posts/${id}/comments`, { content: newComment });
      setComments([...comments, response.data]);
      setNewComment('');
      toast.success('Comment added successfully!');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!post) {
    return <div className="text-center py-8">Post not found</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Link to="/farmer/forum" className="flex items-center text-green-600 hover:text-green-700 mb-6">
        <FaArrowLeft className="mr-2" /> Back to Forum
      </Link>
      
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <img 
            src={post.author.profilePicture || '/default-avatar.png'} 
            alt={post.author.name} 
            className="w-12 h-12 rounded-full mr-3 object-cover"
          />
          <div>
            <p className="font-medium">{post.author.name}</p>
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleDateString()} at {new Date(post.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-green-800 mb-4">{post.title}</h1>
        
        <div className="prose max-w-none mb-4">
          <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
        </div>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-2 text-gray-600 mt-4">
          <button onClick={handleLike} className="flex items-center gap-1 hover:text-red-500 transition duration-200">
            {post.liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            <span>{post.likes || 0} likes</span>
          </button>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-xl font-semibold mb-4">Comments ({comments.length})</h2>
        
        <div className="mb-6">
          <form onSubmit={handleSubmitComment}>
            <div className="mb-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Add a comment..."
                rows="3"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting || !newComment.trim()}
                className={`px-4 py-2 rounded-md ${
                  submitting || !newComment.trim() 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="border-b border-gray-100 pb-4">
                <div className="flex items-center mb-2">
                  <img 
                    src={comment.author.profilePicture || '/default-avatar.png'} 
                    alt={comment.author.name} 
                    className="w-8 h-8 rounded-full mr-2 object-cover"
                  />
                  <div>
                    <p className="font-medium">{comment.author.name}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()} at {new Date(comment.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 ml-10 whitespace-pre-line">{comment.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ForumPostDetail;