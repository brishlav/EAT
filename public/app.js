const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('healthDataUpdate', function(data) {
    console.log('Data received:', data);
    if (data.healthData) {
        updateData('heart-rate', data.healthData.heartRate, 'Heart Rate');
        updateData('oxygen-saturation', data.healthData.oxygenSaturation, 'Oxygen Saturation');
        updateData('ouch-button', data.healthData.ouchButton, 'Ouch Button');
    }
});

function updateData(elementId, data, label) {
    const element = document.getElementById(elementId);
    let content = '';

    if (data) {
        if (label === "Ouch Button") {
            // Special formatting for Ouch Button
            content = `<h2>${label}</h2><p>Frequency: ${data.frequency}</p><p>Last Pressed: ${data.lastPressed}</p>`;
        } else {
            // General formatting for other data types
            content = `<h2>${label}</h2><p>Value: ${data.value} ${data.unit || ''}, Timestamp: ${data.timestamp}</p>`;
        }
    } else {
        content = `<h2>${label}</h2><p>No data available.</p>`;
    }

    element.innerHTML = content;
}


socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
