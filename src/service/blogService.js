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


module.exports = { getPaginatedBlogs, postANewBlog };