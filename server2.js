const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const HealthData = require('./health-data'); 

const app = express();
const port = 3023;

// Connect to MongoDB
mongoose.connect('mongodb+srv://FYPUSERS:k1iTgwyFFzGlAkeN@fyptestdb.d7zdlnq.mongodb.net/TestAniket', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a route to fetch health data
app.get('/health-data', async (req, res) => {
    try {
        const healthData = await HealthData.find({});
        res.json(healthData);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching data');
    }
});


// Serve the detailed health page
app.get('/detailHealth', (req, res) => {
    res.sendFile(path.join(__dirname, 'detailHealth.html'));
});

// Serve static files
app.use(express.static(path.join(__dirname)));

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
