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

        // Validate name
        if (!name || name.length > 255) {
            return { success: false, message: `Invalid name` };
        }

        // Validate age
        if (age && (isNaN(age) || age < 0 || age > 150)) {
            return { success: false, message: `Invalid age` };
        }

        // Validate phone number
        if (!phone_number || phone_number.length > 10) {
            return { success: false, message: `Invalid phone number` };
        }

        // Validate email
        if (!email || email.length > 55 || !isValidEmail(email)) {
            return { success: false, message: `Invalid email` };
        }

        // Validate username
        if (!username || username.length > 25) {
            return { success: false, message: `Invalid username` };
        }

        // Validate gender
        if (gender && gender.length > 6) {
            return { success: false, message: `Invalid gender` };
        }

        // Validate password
        if (!password || password.length > 15) {
            return { success: false, message: `Invalid password` };
        }

        // checking for email if same email exists then don't let user signup
        const queryForCheckEmailAlreadyExistsOrNot = `SELECT * FROM USERS WHERE EMAIL = $1`;
        const checkEmailAlreadyExistsOrNot = await client.query(queryForCheckEmailAlreadyExistsOrNot, [email]);

        if (checkEmailAlreadyExistsOrNot.rows.length > 0) {
            // Email already exists
            return { success: false, message: 'Email already exists' };
        }

        // checking for email if same phone exists then don't let user signup
        const queryForCheckPhoneAlreadyExistsOrNot = `SELECT * FROM USERS WHERE phone_number = $1`;
        const checkPhoneAlreadyExistsOrNot = await client.query(queryForCheckPhoneAlreadyExistsOrNot, [phone_number]);

        if (checkPhoneAlreadyExistsOrNot.rows.length > 0) {
            // Email already exists
            return { success: false, message: 'Phone already exists' };
        }

        const queryForCheckUserNameAlreadyExistsOrNot = `SELECT * FROM USERS WHERE username = $1`;
        const CheckUserNameAlreadyExistsOrNot = await client.query(queryForCheckUserNameAlreadyExistsOrNot, [username]);

        if (CheckUserNameAlreadyExistsOrNot.rows.length > 0) {
            // Email already exists
            return { success: false, message: 'username already exists' };
        }

        const queryForInsert = "INSERT INTO users(name, age, phone_number, email, username, gender, password) VALUES($1, $2, $3, $4, $5, $6, $7)";
        const result = await client.query(queryForInsert, [name, age, phone_number, email, username, gender, password]);

        return { success: true, message: 'Signup successful', result: result.rows[0] };


    } catch (error) {

        if (error.code == 22001) {
            return { success: false, message: 'fields values are invalid', error: error };
        }

        throw error; // Propagate the error
    }
}

// email must contains @ symbol
function isValidEmail(email) {

    if (email.includes('@'))
        return true;
    else return false;
}

module.exports = { login, signup };
