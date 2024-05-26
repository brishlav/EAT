const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const HealthData = require('./health-data');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3023;

// Connect to MongoDB
mongoose.connect('mongodb+srv://FYPUSERS:k1iTgwyFFzGlAkeN@fyptestdb.d7zdlnq.mongodb.net/TestAniket')
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

// Serve the detailed health page from the root directory
app.get('/detailHealth', (req, res) => {
    res.sendFile(path.join(__dirname, 'detailHealth.html'));
});

// Redirect root URL to /detailHealth
app.get('/', (req, res) => {
    res.redirect('/detailHealth');
});

// Set up static file serving
app.use(express.static('.'));

// Set up Socket.io connection
io.on('connection', (socket) => {
    console.log('New client connected');

    const changeStream = HealthData.watch();

    changeStream.on('change', (change) => {
        if (change.operationType === 'insert' || change.operationType === 'update') {
            console.log('New or updated data:', change.fullDocument);
            socket.emit('healthDataUpdate', change.fullDocument);
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        changeStream.close();
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
