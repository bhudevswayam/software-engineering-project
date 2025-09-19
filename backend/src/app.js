const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');
const bookingRoutes = require('./routes/bookings');
const adminRoutes = require('./routes/admin');
const businessRoutes = require('./routes/businessRoutes'); // 👈 add this
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/business', businessRoutes); 
app.use("/api/users", userRoutes);

// Health check
app.get('/health', (req, res) => res.json({ ok: true }));

// Error handler
app.use(errorHandler);

module.exports = app;
