const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files (like HTML)
app.use(express.static('./public'));

// Load existing subscriber data from JSON file or create a new file if it doesn't exist
let subscribers = [];

try {
  subscribers = JSON.parse(fs.readFileSync('subscribers.json', 'utf8') || '[]');
  console.log('Subscribers loaded:', subscribers);
} catch (error) {
  if (error.code === 'ENOENT') {
    console.error('Subscribers file not found. Creating new file.');
    fs.writeFileSync('subscribers.json', '[]');
  } else {
    console.error('Error reading subscribers.json:', error);
  }
}

// POST route to handle form submission
app.post('/subscribe', (req, res) => {
  console.log('Received POST request to /subscribe');
  const email = req.body.email;

  // Check if email already exists
  if (subscribers.includes(email)) {
    console.log('Email already subscribed:', email);
    return res.status(400).send('Email already subscribed.');
  }

  // Add email to subscribers list
  subscribers.push(email);
  console.log('Added email to subscribers list:', email);

  // Save updated subscribers list to JSON file
  fs.writeFile('subscribers.json', JSON.stringify(subscribers), (err) => {
    if (err) {
      console.error('Error saving subscribers.json:', err);
      return res.status(500).send('Error occurred while processing your request.');
    }
    console.log('Email saved:', email);
    res.send('Subscription successful!');
  });
});


// Handle 405 Method Not Allowed errors
app.use((req, res, next) => {
  res.setHeader('Allow', 'POST');
  res.status(405).send('Method Not Allowed');
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
  console.error('An error occurred:', err);
  res.status(500).send('Something went wrong!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
