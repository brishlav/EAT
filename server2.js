const express = require('express');
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const mongoose = require('mongoose');
const HealthData = require('./health-data'); 

const app = express();
const port = 3022;

// Register the JSON helper
Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

// Set up Handlebars as the view engine
app.engine('handlebars', engine({
    defaultLayout: 'main',
    handlebars: Handlebars
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Connect to MongoDB
mongoose.connect('mongodb+srv://FYPUSERS:k1iTgwyFFzGlAkeN@fyptestdb.d7zdlnq.mongodb.net/TestAniket')
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a route to display the data using async/await
app.get('/', async (req, res) => {
    try {
        const healthData = await HealthData.find({});

        // Preparing data for the chart
        const labels = healthData
            .map(item => item.healthData.heartRate.timestamp)
            .filter(timestamp => timestamp) // Remove entries without timestamps
            .map(timestamp => new Date(timestamp).toISOString()); // Convert to ISO strings
        const heartRates = healthData.map(item => item.healthData.heartRate?.value || 0);
        const oxygenLevels = healthData.map(item => item.healthData.oxygenSaturation?.value || 0);

        // Log data for debugging
        console.log({ labels, heartRates, oxygenLevels });

        // Preparing data for the table (as plain objects)
        const dataToSend = healthData.map(item => ({
            timestamp: item.healthData.heartRate.timestamp ? new Date(item.healthData.heartRate.timestamp).toISOString() : 'No Date',
            heartRate: item.healthData.heartRate?.value || 0,
            oxygenSaturation: item.healthData.oxygenSaturation?.value || 0
        }));

        res.render('healthOverview', {
            healthData: dataToSend,
            labels: JSON.stringify(labels), // Pass labels as JSON string
            heartRates: JSON.stringify(heartRates),
            oxygenLevels: JSON.stringify(oxygenLevels)
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
