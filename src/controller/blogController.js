const express = require('express');
const router = express.Router();
const authenticateJWT = require('../middleware/jwtMiddleware');
const blogService = require('../service/blogService');
const getPayloadData = require('../middleware/jwtGetPayload');


/**
 * Route to retrieve paginated blogs.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the asynchronous execution.
 */
router.get('/', authenticateJWT, async (req, res) => {
    try {
        // Level 1: Extract Pagination Parameters from Query
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        // Level 2: Retrieve Paginated Blogs from the Service
        const service = await blogService.getPaginatedBlogs(page, pageSize);

        // Level 3: Send Response
        // Sending a success response with the message, timestamp, and paginated blog data
        res.status(200).send({
            message: service.message,
            time: Date.now(),
            currentPage: service.currentPage,
            totalPages: service.totalPages,
            data: service.data
        });

    } catch (error) {
        // Level 4: Error Handling
        // Logging and sending an error response in case of failure
        console.error('Error in / route:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
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
        console.log('user details :- ' + JSON.stringify(userDetails.username));
        const username = userDetails.username;
        const userId = userDetails.userid;

        // Level 4: Calling blogService
        // Call the blogService to post a new blog with the extracted details
        const service = await blogService.postANewBlog(title, content, tag, category, userId, userDetails.username);

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