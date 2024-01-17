const jwt = require('jsonwebtoken');
const secretKey = 'abhinav';


/**
 * Middleware for authenticating JSON Web Tokens (JWT).
 * 
 * This middleware is used to check the presence and validity of a JWT in the request header.
 * If a valid token is present, it decodes the token and attaches the user information to the request object.
 * If no token is provided or the token is invalid, it returns an appropriate error response.
 * 
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next function to pass control to the next middleware.
 * 
 * @returns {void} - Does not return a value but handles the request flow based on token validity.
 * 
 * @throws {object} - Returns an error response if the token is missing or invalid.
 */
function authenticateJWT(req, res, next) {
    // Extract the token from the Authorization header
    const token = req.header('Authorization');

    // Check if a token is provided in the request header
    if (!token) {
        // If no token is provided, return an unauthorized response
        return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    }

    // Verify the validity of the token using the secret key
    jwt.verify(token, secretKey, (err, user) => {
        // If an error occurs during token verification, return a forbidden response
        if (err) {
            return res.status(403).json({ success: false, message: 'Forbidden: Invalid token' });
        }

        // Attach the decoded user information to the request object
        req.user = user;

        // Move on to the next middleware in the request flow
        next();
    });
}

// Export the middleware for use in other parts of the application
module.exports = authenticateJWT;