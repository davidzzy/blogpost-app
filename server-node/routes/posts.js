const express = require('express');
const router = express.Router();
const db = require('../db'); 
// Import the DB instance

// GET all posts
router.get('/', (req, res) => {
  db.all('SELECT * FROM posts ORDER BY id DESC', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json(rows);
  });
});

// GET a single post by id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Post not found' });
    }
    return res.json(row);
  });
});

// CREATE a new post
router.post('/', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  db.run(
    'INSERT INTO posts (title, content) VALUES (?, ?)',
    [title, content],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      // "this.lastID" gives the inserted record's ID
      return res.status(201).json({ id: this.lastID, title, content });
    }
  );
});

// UPDATE an existing post
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  db.run(
    'UPDATE posts SET title = ?, content = ? WHERE id = ?',
    [title, content, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json({ message: 'Post updated successfully' });
    }
  );
});

// DELETE a post
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM posts WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.json({ message: 'Post deleted successfully' });
  });
});

module.exports = router;