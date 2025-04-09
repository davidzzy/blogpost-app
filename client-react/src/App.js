import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostLists from './components/PostLists';
import Form from './components/Form';

function App() {
  // post and selectedpost as state variables
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  // Fetch all posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // CRUD to call backend node apis
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const createPost = async (title, content) => {
    try {
      await axios.post('http://localhost:3001/api/posts', { title, content });
      fetchPosts(); // refresh list
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const updatePost = async (id, title, content) => {
    try {
      await axios.put(`http://localhost:3001/api/posts/${id}`, { title, content });
      setSelectedPost(null);
      fetchPosts();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/posts/${id}`);
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Simple Blog</h1>
      <PostLists
        posts={posts}
        onEdit={(post) => setSelectedPost(post)}
        onDelete={deletePost}
      />
      <Form
        onSubmit={createPost}
        onUpdate={updatePost}
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
      />
    </div>
  );
}

export default App;
