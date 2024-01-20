const client = require('../db/db-pg');
const PaginatedBlogDto = require('../dto/PaginatedBlogDto')



/**
 * Retrieves paginated blogs from the database.
 *
 * @param {number} page - The page number.
 * @param {number} pageSize - The number of blogs to retrieve per page.
 * @returns {Promise<PaginatedBlogDto>} - A promise resolving to a PaginatedBlogDto object.
 */
async function getPaginatedBlogs(page, pageSize) {
    try {
        // Level 1: Calculate Offset
        const offset = (page - 1) * pageSize;

        // Level 2: Building the SQL Query with Pagination
        // Constructing the SQL query to retrieve paginated blogs
        const query = "SELECT * FROM blogs ORDER BY id LIMIT $1 OFFSET $2";

        // Level 3: Executing the Database Query
        // Executing the query to retrieve paginated blogs
        const result = await client.query(query, [pageSize, offset]);

        // Level 4: Calculate Total Pages and Total Blogs
        const totalBlogs = result.rowCount;
        const totalPages = Math.ceil(totalBlogs / pageSize);

        // Level 5: Success Response
        // Returning a PaginatedBlogDto object with totalBlogs and pageSize information
        return new PaginatedBlogDto('success', page, totalPages, totalBlogs, pageSize, result.rows);

    } catch (err) {
        // Level 6: Error Handling
        // Logging and re-throwing any errors that occur during the process
        console.error("Error retrieving paginated blogs:", err.message);
        throw err; // Re-throw the error to propagate it to the caller
    }
}




/**
 * Inserts a new blog post into the database.
 *
 * @param {string} title - The title of the blog post.
 * @param {string} content - The content of the blog post.
 * @param {string} tag - The tag associated with the blog post.
 * @param {string} category - The category of the blog post.
 * @param {string} userId - The user ID associated with the blog post.
 * @returns {Promise<{message: string}>} - A promise resolving to an object with a success message.
 */
async function postANewBlog(title, content, tag, category, userId, username) {
    try {
        // Level 1: Building the SQL Query
        // Constructing the SQL query to insert a new blog post
        const query = "INSERT INTO blogs (TITLE, CONTENT, TAG, CATEGORY, USER_ID,username, DATE) VALUES ($1, $2, $3, $4, $5, $6, NOW())";

        // Level 2: Executing the Database Query
        // Executing the query with parameterized values to prevent SQL injection
        await client.query(query, [title, content, tag, category, userId, username]);

        // Level 3: Logging
        // Logging the details of the newly posted blog
        // console.log("New blog posted:", { title, content, tag, category, userId });

        // Level 4: Success Message
        // Returning a success message indicating that a new blog has been posted
        return { message: 'New blog posted' };

    } catch (err) {
        // Level 5: Error Handling
        // Logging and re-throwing any errors that occur during the process
        console.error("Error posting a new blog:", err.message);
        throw err; // Re-throw the error to propagate it to the caller
    }
}





/**
 * Adds a new comment to a blog post.
 *
 * @param {string} comment - The content of the comment.
 * @param {number} blog_id - The ID of the blog post.
 * @param {string} username - The username of the commenter.
 * @returns {Object} - An object containing the statusCode and a corresponding message.
 */
async function addNewComment(comment, blog_id, username) {
    try {
        // Check if the post exists
        const isPostThereQuery = "SELECT * FROM blogs WHERE id = $1";
        const isPostThereAnswer = await client.query(isPostThereQuery, [blog_id]);

        if (isPostThereAnswer.rows.length > 0) {
            // If the post exists, insert the new comment
            const insertCommentQuery = "INSERT INTO blog_comments(comment_content, username, blog_id, date) VALUES ($1, $2, $3, NOW())";
            const result = await client.query(insertCommentQuery, [comment, username, blog_id]);

            // Return success status code and message
            return { statusCode: 201, message: 'Comment added successfully' };
        } else {
            // If the post does not exist, return a not found status code and message
            return { statusCode: 404, message: 'Post not found' };
        }
    } catch (err) {
        // Handle specific error cases and return appropriate status code and message
        if (err.code === '23505') {
            // Unique constraint violation (duplicate comment)
            return { statusCode: 409, message: 'Duplicate comment. Comment already exists.' };
        } else {
            // Return internal server error status code and message for other errors
            console.error('Error in adding a new comment:', err.message);
            return { statusCode: 500, message: 'Internal Server Error' };
        }
    }
}


module.exports = { getPaginatedBlogs, postANewBlog, addNewComment };