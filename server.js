const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Example endpoint for chatbot
app.post('/api/chat', (req, res) => {
    const userQuery = req.body.query; // Get the user input from the request body
    const responseText = `You asked: ${userQuery}`; // Simple echo response
    res.json({ response: responseText }); // Send response back
});

// Route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the GRC Chatbot API! Use /api/chat for chatbot queries.');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
