require('dotenv').config(); // Load biến môi trường từ .env
require('./models/index');
const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const documentRoutes = require('./routes/documentRoutes');
const eventRoutes = require('./routes/eventRoutes'); // Import event routes

const app = express();

app.use(express.json());
connectDB();

app.use('/api/users', userRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/events', eventRoutes); // Add event routes

const PORT = process.env.PORT || 3000; // Lấy cổng từ .env hoặc mặc định là 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});