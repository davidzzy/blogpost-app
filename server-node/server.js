const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const postRoutes = require('./routes/posts');

const app = express();
app.use(cors());
app.use(express.json());

// Mount the posts routes (all endpoints will be under /api/posts)
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});