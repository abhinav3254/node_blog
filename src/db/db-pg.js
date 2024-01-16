const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    password: 'root3254',
    host: 'localhost',
    database: 'node',
    port: 5432,
});

client.connect().then(() => {
    console.log('Connected to PostgreSQL database!');
}).catch((err) => {
    console.log(`Error connecting to the database: ${err}`);
});

module.exports = client;