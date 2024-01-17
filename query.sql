-- creating user table in postgres database

CREATE TABLE IF NOT EXISTS "user" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT,
    phone_number VARCHAR(10),
    email VARCHAR(55),
    username VARCHAR(25),
    gender VARCHAR(6),
    password VARCHAR(15)
);