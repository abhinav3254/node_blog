const client = require('../db/db-pg');

/**
 * 
 * @returns json format for success or failure message
 * 
 * @author abhinav3254
 */
async function login() {
    try {
        return { success: true, message: 'Login successful', user: { username: 'ab' } };
    } catch (error) {
        throw error;
    }
}


/**
 * 
 * @returns json of success or failure message
 * 
 * @author abhinav3254
 */
async function signup(name, age, phone_number, email, username, gender, password) {
    try {
        const query = "INSERT INTO users(name, age, phone_number, email, username, gender, password) VALUES($1, $2, $3, $4, $5, $6, $7)";
        const result = await client.query(query, [name, age, phone_number, email, username, gender, password]);
        return { success: true, message: 'Signup successful', result: result.rows[0] };
    } catch (error) {
        console.error('Error in signup:', error);
        throw error; // Propagate the error
    }
}

module.exports = { login, signup };
