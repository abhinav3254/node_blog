const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/jwtMiddleware')


router.get('/', authenticateJWT, async (req, res) => {
    res.status(200).send({ message: 'get all the blogs' });
});

module.exports = router;