const mongoose = require('mongoose');
const HealthData = require('./health-data'); 
require('./db'); 
async function listenToLiveChanges() {
    const changeStream = HealthData.watch();

    changeStream.on('change', (change) => {
        if (change.operationType === 'insert' || change.operationType === 'update') {
            console.log('New or updated data:', change.fullDocument);
        }
    });

    console.log('Listening for live changes in the HealthData collection...');
}

listenToLiveChanges();
