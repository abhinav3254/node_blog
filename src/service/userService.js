const client = require('../db/db-pg');

const jwt = require('jsonwebtoken');
const secretKey = 'abhinav';

/**
 * User login function.
 * 
 * This method attempts to authenticate a user based on the provided username and password.
 * Queries the database to find a user with the given username and compares the password.
 * If successful, generates a JSON Web Token (JWT) and returns a success response with the token.
 * If unsuccessful, returns a failure response.
 * 
 * @param {string} username - The username of the user trying to log in.
 * @param {string} password - The password of the user trying to log in.
 * 
 * @returns {object} - JSON object containing success status, message, and token (if login is successful).
 * 
 * @author abhinav3254
 */
async function login(username, password) {
    const query = 'SELECT * FROM users WHERE username = $1';

    try {
        const result = await client.query(query, [username]);

        if (result.rows.length === 0) {
            // No user found with the given username
            return { success: false, message: 'User not found', user: null };
        }

        const user = result.rows[0];
        const userId = user.id;

        if (user.password === password) {
            const token = generateToken(username, userId);
            return { success: true, message: 'Login successful', token: token };
        } else {
            return { success: false, message: 'Login failed' };
        }

    } catch (error) {
        return { success: false, message: 'Error in login', error: error };
    }

}



/**
 * Generates a JSON Web Token (JWT) for the provided username.
 * 
 * This function uses the provided username to create a payload for the JWT
 * and signs it using the secret key with a specified expiration time.
 * 
 * @param {string} username - The username for which the token is generated.
 * 
 * @returns {string} - The generated JWT token.
 */

function generateToken(username, userId) {
    const payload = {
        username: username,
        userid: userId
    };

    const options = {
        // Set the expiration time of the token
        expiresIn: '1h',
    };

    return jwt.sign(payload, secretKey, options);
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
