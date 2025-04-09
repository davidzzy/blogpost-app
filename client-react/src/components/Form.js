import React, { useState, useEffect } from 'react';

function Form({ onSubmit, onUpdate, selectedPost, setSelectedPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // If a post is selected for editing, populate form fields
  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title);
      setContent(selectedPost.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [selectedPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (selectedPost) {
      // Update existing post
      onUpdate(selectedPost.id, title, content);
    } else {
      // Create new post
      onSubmit(title, content);
    }

    // Clear form
    setTitle('');
    setContent('');
    setSelectedPost(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2>{selectedPost ? 'Edit Post' : 'Create Post'}</h2>
      <div>
        <label>Title: </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: '300px' }}
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <label style={{ verticalAlign: 'top' }}>Content: </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="4"
          cols="50"
        />
      </div>
      <button type="submit" style={{ marginTop: '1rem' }}>
        {selectedPost ? 'Update Post' : 'Add Post'}
      </button>
    </form>
  );
}

export default Form;
