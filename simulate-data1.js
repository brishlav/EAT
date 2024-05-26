const mongoose = require('mongoose');
const HealthData = require('./health-data'); 
require('./db'); 

function simulateDataInsertion() {
    const newData = new HealthData({
        DateTime: new Date(),  // Current date and time
        DeviceID: "device12345",  // Example Device ID
        HealthData: {
            HeartRate: Math.floor(Math.random() * 40) + 60,  // Random heart rate between 60 and 100
            OxygenLevel: Math.floor(Math.random() * 10) + 90,  // Random oxygen level between 90 and 100
            AccelerometerData: {
                Ax: (Math.random() * (0.2) - 0.1).toFixed(3),  // Random Ax between -0.1 and 0.1
                Ay: (Math.random() * (0.2) - 0.1).toFixed(3),  // Random Ay between -0.1 and 0.1
                Az: (Math.random() * (0.2) - 0.1).toFixed(3)   // Random Az between -0.1 and 0.1
            }
        }
    });

    newData.save()
        .then(doc => console.log('Simulated data inserted:', doc))
        .catch(err => console.error('Error inserting simulated data:', err));
}

setInterval(simulateDataInsertion, 5000);  // Run every 5 seconds