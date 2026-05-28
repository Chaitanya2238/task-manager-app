const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Task Manager API (PostgreSQL) is running...');
});

const PORT = process.env.PORT || 5000;

// Connect to PostgreSQL and sync models
sequelize.sync()
  .then(() => {
    console.log('Connected to PostgreSQL and synced models');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Could not connect to PostgreSQL:', err);
  });
