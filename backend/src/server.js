const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const coffeeRoutes = require('./routes/coffeeRoutes.js')

// Middleware in json parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

app.use('/api/coffees', coffeeRoutes);

// Server listen
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});