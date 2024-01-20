const { Client } = require('pg');

/**
 * Setting up database config
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
 * Function to create user table
 */
function createUserTable() {
    const query = `
  CREATE TABLE IF NOT EXISTS "users" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT,
    phone_number VARCHAR(10) UNIQUE NOT NULL,
    email VARCHAR(55) UNIQUE NOT NULL,
    username VARCHAR(25),
    gender VARCHAR(6),
    password VARCHAR(15)
  );
`;

    client.query(query, (error, result) => {
        if (error) {
            console.log(`Error creating user table: ${error}`);
        } else {
            console.log(`Created user table successfully!`);
        }
    });
}


/**
 * Function to create blog table
 */
function createBlogTable() {
    const query = `
    CREATE TABLE IF NOT EXISTS blogs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content VARCHAR(2000) NOT NULL,
        tag VARCHAR(55) NOT NULL,
        category VARCHAR(55) NOT NULL,
        user_id int NOT NULL,
        username varchar(55) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

    client.query(query, (error, result) => {
        if (error) {
            console.log(`Error creating blogs table: ${error}`);
        } else {
            console.log(`Created blogs table successfully!`);
        }
    });
}

function createCommentsTables() {
    const query = `
    CREATE TABLE IF NOT EXISTS blog_comments (
        id SERIAL PRIMARY KEY,
        username varchar(255) not null,
        blog_id int,
        date timestamp default current_timestamp
        );`;
    client.query(query, (error, result) => {
        if (error) {
            console.log(`Error creating comments table: ${error}`);
        } else {
            console.log(`Created comments table successfully!`);
        }
    });
}

/**
 * Checking whether the application is connected to the database or not
 */
client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database!');
        // Creating user table
        createUserTable();
        createBlogTable();
        createCommentsTables();
    })
    .catch((err) => {
        console.log(`Error connecting to the database: ${err}`);
    });

module.exports = client;
