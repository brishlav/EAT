const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);


const HealthData = require('./health-data');  
require('./db');  

app.use(express.static('.'));  

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

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
