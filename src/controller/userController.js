const express = require('express');
const router = express.Router();
const { login, signup } = require('../service/userService');
const authenticateJWT = require('../middleware/jwtMiddleware')


/**
 * Route for handling user login.
 * 
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * 
 * @returns {json} - JSON response indicating success or failure.
 * 
 * @author abhinav3254
 */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const loginResult = await login(username, password);

    if (loginResult.success) {
        res.json({ success: true, message: loginResult.message, token: loginResult.token });
    } else {
        res.status(401).json({ success: false, message: loginResult.message });
    }
});



/**
 * Route for handling user signup.
 * 
 * This method routes the signup request to the service layer, which contains the business logic.
 * Validates required fields in the request body and returns JSON responses accordingly.
 * 
 * @author abhinav3254
 * 
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * 
 * @returns {json} - JSON response indicating success or failure of the signup process.
 */
router.post('/signup', async (req, res) => {

    const { name, age, phone_number, email, username, gender, password } = req.body;

    // Ensure all required fields are present in the request body
    if (!name || !age || !phone_number || !email || !username || !gender || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const signupResult = await signup(name, age, phone_number, email, username, gender, password);


    if (signupResult.success) {
        res.json({ success: true, message: signupResult.message, result: signupResult.result });
    } else {
        res.status(400).json({ success: false, message: signupResult.message });
    }
});


/**
 * Route to check if JWT authentication is working
 * This route is protected and requires a valid JWT to access it.
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
router.get('/test', authenticateJWT, (req, res) => {
    res.json({ success: true, message: 'JWT authentication is working' });
});


// exporting this module
module.exports = router;