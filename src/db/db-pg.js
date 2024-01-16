const { Client } = require('pg');


/**
 * setting up database config
 * @author abhinav3254
 */
const client = new Client({
    user: 'postgres',
    password: 'root3254',
    host: 'localhost',
    database: 'node',
    port: 5432,
});


/**
 * checking whether application is connected to database or not
 * 
 * @author abhinav3254
 */
client.connect().then(() => {
    console.log('Connected to PostgreSQL database!');
}).catch((err) => {
    console.log(`Error connecting to the database: ${err}`);
});

module.exports = client;