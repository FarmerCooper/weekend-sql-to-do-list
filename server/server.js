const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Translating request body into JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve "static assets" (html, css, client-side js)
// from the server/public folder
app.use(express.static('server/public'));

// Setup the songs router
// to respond to requests from the `/songs` URL
let toDoRouter = require('./routes/to-do.router');
app.use('/tasks', toDoRouter);


// Start express
const PORT = 5000;
app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});