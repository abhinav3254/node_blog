const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/jwtMiddleware');
const blogService = require('../service/blogService');

router.get('/', authenticateJWT, async (req, res) => {
    const service = await blogService.getAllTheBlogs();
    res.status(200).send({ message: 'get all the blogs', service: service });
});


router.post('/post', authenticateJWT, async (req, res) => {
    const service = await blogService.postANewBlog();
    res.status(201).send({ message: 'want to insert a new blog', service: service });
});

module.exports = router;