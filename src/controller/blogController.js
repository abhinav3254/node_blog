const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/jwtMiddleware');
const blogService = require('../service/blogService');
const getPayloadData = require('../middleware/jwtGetPayload');

router.get('/', authenticateJWT, async (req, res) => {
    const service = await blogService.getAllTheBlogs();
    res.status(200).send({ message: 'get all the blogs', service: service });
});


/**
 * Handles the POST request to create a new blog.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the asynchronous execution.
 */
router.post('/post', authenticateJWT, async (req, res) => {
    try {
        // Level 1: Extracting Information
        // Extracting relevant information from the request body
        const { title, content, tag, category } = req.body;

        // Level 2: Getting User Details
        // Use async/await to get the user details from the JWT
        const userDetails = await new Promise((resolve, reject) => {
            getPayloadData(req, (err, decoded) => {
                if (err) {
                    // If an error occurs during JWT verification, reject the promise with the error
                    reject(err);
                } else {
                    // Resolve the promise with the decoded user details
                    resolve(decoded);
                }
            });
        });

        // Level 3: Extracting User Information
        // Extracting username and userId from the decoded user details
        const username = userDetails.username;
        const userId = userDetails.userid;

        // Level 4: Calling blogService
        // Call the blogService to post a new blog with the extracted details
        const service = await blogService.postANewBlog(title, content, tag, category, userId);

        // Level 5: Success Response
        // Sending a success response with the message from the blogService
        res.status(201).send({ message: service.message });
    } catch (error) {
        // Level 6: Error Handling
        // Handling errors that occur during the process
        console.error('Error in /post route:', error.message);

        // Sending an error response with a generic message for internal server errors
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


module.exports = router;