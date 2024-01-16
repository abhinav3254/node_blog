const express = require('express');
const router = express.Router();
const { login, signup } = require('../service/userService');

router.get('/login', async (req, res) => {
    const loginResult = await login();

    if (loginResult.success) {
        res.json({ success: true, user: loginResult.user, message: loginResult.message });
    } else {
        res.status(401).json({ success: false, message: loginResult.message });
    }
});

router.get('/signup', (req, res) => {
    const signupResult = signup();

    if (signupResult.success) {
        res.json({ success: true, message: signupResult.message });
    } else {
        res.status(400).json({ success: false, message: signupResult.message });
    }
});


module.exports = router;