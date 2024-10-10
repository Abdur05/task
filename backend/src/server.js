'use-strict'; //this directive enforce strict mode in JS which can catches common coding error and prevents unsafe changes

const express = require('express') //importing the express framework for Node JS
const cors = require('cors');// import cors middleware allow web app to make reequest to different origin
const bodyParser = require('body-parser');//import body-parser middleware,used for parsing incoming request bodies
const http = require('http')//it allow for creating an HTTP server
const path = require('path')//it provide utilities for working with file and directory paths
const PORT = 4000;//define port
const app = express()// it is express application instance .this instance will be used to define routes and middleware

const { db } = require('../config/db')

const serverStart = () => {
    console.log(`Server is on Port ${PORT}`)
}
app.use(cors())//add cors middleware to express app.This enables cross-origin requests, allowing the server to accept requests from different origins

app.use(bodyParser.urlencoded({ extended: true }, { limit: '10200kb' }));// Configures the Express app to use body-parser for 
// parsing URL-encoded bodies. The { extended: true } option allows for rich objects and arrays to be encoded into the URL-encoded format. The { limit: '10200kb' } setting is a misplaced configuration and should be inside urlencoded, not outside.

app.use(bodyParser.json())//Configures the Express app to use body-parser for parsing JSON bodies. This allows the server to handle JSON payloads.

require('./routes')(app);//Imports and invokes a module located in the ./routes file, passing the Express app instance to it. This is typically used to define the routes for the application.

// app.use(express.static(__dirname + '/uploads'))// Serves static files from the uploads directory relative to the current directory. This is useful for serving user-uploaded files or other static assets.

// app.get('/*', (req, res) => res.sendFile(path.join(__dirname)))
//Defines a catch-all route that sends a file (typically an HTML file or a fallback) in response to any GET request that doesn't match an existing route. path.join(__dirname) indicates the current directory; typically, you'd provide a specific file like index.html

app.listen(PORT, serverStart);
