import React, { useState } from 'react';

function PostLists({ posts, onEdit, onDelete }) {
    // State to track whether full content is shown for each post (by post id)
    const [expanded, setExpanded] = useState({});
  
    // Toggle the expanded state for a given post id
    const toggleExpand = (id) => {
      setExpanded((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    };
  
    // Helper function to truncate content if it exceeds a certain length
    const truncateContent = (content, maxLength = 100) => {
      if (!content) return '';
      return content.length <= maxLength ? content : content.substring(0, maxLength) + '...';
    };
  
    return (
      <div>
        <h2>All Posts</h2>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              marginTop: '1rem',
              borderRadius: '4px',
            }}
          >
            <h3>{post.title}</h3>
            <p style={{ lineBreak: 'anywhere' }}>{expanded[post.id] ? post.content : truncateContent(post.content)}</p>
            {post.content.length > 100 && <button onClick={() => toggleExpand(post.id)}>
              {expanded[post.id] ? 'Hide Content' : 'Show Full Content'}
            </button>}
            <div style={{ marginTop: '0.5rem' }}>
              <button onClick={() => onEdit(post)}>Edit</button>
              <button onClick={() => onDelete(post.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  

export default PostLists;
