const mongoose = require('mongoose');
const HealthData = require('./health-data'); 

require('./db'); 

async function retrieveData() {
    try {
        const data = await HealthData.find(); 
        console.log('Retrieved Health Data:',JSON.stringify(data, null,2));
    } catch (err) {
        console.error('Failed to retrieve data:', err);
    } finally {
        mongoose.disconnect(); 
    }
}

retrieveData();
