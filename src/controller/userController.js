const express = require('express');
const router = express.Router();


router.get('/login', (req, res) => {
    res.send('hello from login controller');
});

router.get('/signup', (req, res) => {
    res.send('hello from signup controller');
});

module.exports = router;