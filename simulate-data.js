const mongoose = require('mongoose');
const HealthData = require('./health-data'); 
require('./db'); 
function simulateDataInsertion() {
    const newData = new HealthData({
        healthData: {
            heartRate: {
                value: Math.floor(Math.random() * 40) + 60, 
                unit: "bpm",
                timestamp: new Date()
            },
            oxygenSaturation: {
                value: Math.floor(Math.random() * 10) + 90, 
                unit: "%",
                timestamp: new Date()
            },
            ouchButton: {
                frequency: Math.floor(Math.random() * 5), 
                lastPressed: new Date()
            }
        }
    });

    newData.save()
        .then(doc => console.log('Simulated data inserted:', doc))
        .catch(err => console.error('Error inserting simulated data:', err));
}

setInterval(simulateDataInsertion, 5000);
