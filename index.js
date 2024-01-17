/**
 * Main index.js file
 * @author abhinav3254
 */
const express = require('express');
const PORT = 9000;
require('./src/db/db-pg');
const userController = require('./src/controller/userController');

const blogController = require('./src/controller/blogController');

const app = express();

app.use(express.json());


/**
 * to access login page
 * url :- http://localhost:9000/api/v1/user/login
 */
app.use('/api/v1/user', userController);

// this route is for blog
app.use('/api/v1/blog', blogController);


app.listen(PORT, () => {
    console.log(`APP IS UP AND LISTENING TO PORT NUMBER ${PORT}`)
});