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
 * Signup Function
 *
 * This function handles user signup by performing the following steps:
 *
 * 1. Validate user input for name, age, phone_number, email, username, gender, and password.
 *    - Ensure that the input values meet the required criteria, and return an error message if validation fails.
 *
 * 2. Check if the provided email, phone number, and username already exist in the database.
 *    - If any of them already exists, return an error message indicating the duplication.
 *
 * 3. Insert the user's information into the "users" table in the database.
 *    - Use parameterized queries to prevent SQL injection.
 *
 * 4. Return a success message along with the inserted user's information.
 *    - If an error occurs during the process, handle specific error codes, such as '22001'.
 *      Return an error message for invalid field values.
 *
 * @param {string} name - User's name.
 * @param {number} age - User's age.
 * @param {string} phone_number - User's phone number.
 * @param {string} email - User's email.
 * @param {string} username - User's username.
 * @param {string} gender - User's gender.
 * @param {string} password - User's password.
 *
 * @returns {object} - An object containing success status, message, and user information.
 *                   - If an error occurs, it may include specific error information.
 *
 * @throws {error} - Propagates any unhandled errors.
 * 
 * @author abhinav3254 - 17 Jan 2024
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
