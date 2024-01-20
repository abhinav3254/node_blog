const jwt = require('jsonwebtoken');
const secretKey = 'abhinav';

/**
 * Function to get payload data from a JWT present in the request header.
 * 
 * @param {object} req - Express request object.
 * @param {function} callback - Callback function to handle the result of JWT verification.
 * 
 * @returns {void} - Calls the provided callback with the result.
 */
function getPayloadData(req, callback) {
    // Extract the token from the Authorization header
    const token = req.header('Authorization');

    // Check if a token is provided in the request header
    if (!token) {
        const err = new Error('Unauthorized: No token provided');
        console.error(err.message);
        return callback(err, null);
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('JWT verification failed:', err.message);
        } else {
            // The payload is available in the `decoded` object
            // console.log('Decoded JWT payload:', decoded);

            // You can access specific claims from the payload
            // console.log('User ID:', decoded.userid);
            // console.log('Username:', decoded.username);

            // Call the provided callback with the result
            callback(null, { userid: decoded.userid, username: decoded.username });
        }
    });
}

// Export the function for use in other parts of the application
module.exports = getPayloadData;
