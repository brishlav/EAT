const mongoose = require('mongoose');

const healthDataSchema = new mongoose.Schema({
    healthData: {
        heartRate: {
            value: Number,
            unit: String,
            timestamp: Date
        },
        oxygenSaturation: {
            value: Number,
            unit: String,
            timestamp: Date
        },
        ouchButton: {
            frequency: Number,
            lastPressed: Date
        }
    }
});

const HealthData = mongoose.model('HealthData', healthDataSchema, 'HealthData');

module.exports = HealthData;
