const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

// Set the port for the server
const PORT = 3001;

// Create the app
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Start server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
