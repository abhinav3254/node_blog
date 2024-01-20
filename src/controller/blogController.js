const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/jwtMiddleware');
const blogService = require('../service/blogService');
const getPayloadData = require('../middleware/jwtGetPayload');

router.get('/', authenticateJWT, async (req, res) => {
    const service = await blogService.getAllTheBlogs();
    res.status(200).send({ message: 'get all the blogs', service: service });
});

router.post('/post', authenticateJWT, async (req, res) => {
    try {
        const { title, content, tag, category } = req.body;

        // Use async/await to get the username from the JWT
        const username = await new Promise((resolve, reject) => {
            getPayloadData(req, (err, decoded) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(decoded.username);
                }
            });
        });

        console.log(`Username is my: ${username}`);

        // Assuming blogService.postANewBlog is an asynchronous function
        const service = await blogService.postANewBlog(title, content, tag, category, username);

        res.status(201).send({ message: 'Want to insert a new blog', service: service });
    } catch (error) {
        console.error('Error in /post route:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

module.exports = router;