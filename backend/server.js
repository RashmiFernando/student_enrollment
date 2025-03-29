const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// MongoDB connection
const db = mongoose.connection;
db.on('error', (error) => console.error('MongoDB connection error:', error));
db.once('open', () => console.log('Connected to Database')); 

// Start server
const PORT = process.env.PORT || 5000;
if (require.main === module) {
    const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Routes
const studentRoutes = require('./routes/studentRoute');
app.use('/student/', studentRoutes);

const examRoutes = require('./routes/examRoute');
app.use('/exam/', examRoutes);

const enrollmentRoutes = require('./routes/enrollmentRoute');
app.use('/enrollment/', enrollmentRoutes);


const courseRoutes = require('./routes/courseRoute');
app.use('/course/', courseRoutes);

module.exports = app;