import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL; // Ensure API URL is set

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming auth token is stored
      const response = await axios.post(
        `${API_URL}/api/forum/posts`,
        { title, content, tags: tags.split(',').map(tag => tag.trim()) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate(`/forum/posts/${response.data._id}`); // Redirect to new post
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create a New Discussion</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          required 
        />
        <input 
          type="text" 
          placeholder="Tags (comma-separated)" 
          value={tags} 
          onChange={(e) => setTags(e.target.value)} 
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
