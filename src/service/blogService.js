const client = require('../db/db-pg');


async function getAllTheBlogs() {
    try {

        return { message: 'working from service' };

    } catch (err) {
        console.log(err);
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
async function postANewBlog(title, content, tag, category, userId) {
    try {
        // Level 1: Building the SQL Query
        // Constructing the SQL query to insert a new blog post
        const query = "INSERT INTO blogs (TITLE, CONTENT, TAG, CATEGORY, USER_ID, DATE) VALUES ($1, $2, $3, $4, $5, NOW())";

        // Level 2: Executing the Database Query
        // Executing the query with parameterized values to prevent SQL injection
        await client.query(query, [title, content, tag, category, userId]);

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


module.exports = { getAllTheBlogs, postANewBlog };