const express = require('express');
const router = express.Router();
const { login, signup } = require('../service/userService');


/**
 * 
 * route for login of user
 * 
 * this method is just for routing to service layer
 * and all the logics are in userService file
 * 
 * @author abhinav3254
 */
router.get('/login', async (req, res) => {
    const loginResult = await login();

    if (loginResult.success) {
        res.json({ success: true, user: loginResult.user, message: loginResult.message });
    } else {
        res.status(401).json({ success: false, message: loginResult.message });
    }
});


/**
 * 
 * route for signup
 * 
 * this method is just for routing to service layer
 * and all the logics are in userService file
 * 
 * @author abhinav3254
 */
router.get('/signup', (req, res) => {
    const signupResult = signup();

    if (signupResult.success) {
        res.json({ success: true, message: signupResult.message });
    } else {
        res.status(400).json({ success: false, message: signupResult.message });
    }
});



// exporting this module
module.exports = router;