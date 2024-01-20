const client = require('../db/db-pg');


async function getAllTheBlogs() {
    try {

        return { message: 'working from service' };

    } catch (err) {
        console.log(err);
    }
}

async function postANewBlog(title, content, tag, category, userId) {
    try {
        const query = "INSERT INTO blogs (TITLE, CONTENT, TAG, CATEGORY, USER_ID, DATE) VALUES ($1, $2, $3, $4, $5, NOW())";

        await client.query(query, [title, content, tag, category, userId]);

        // console.log("New blog posted:", { title, content, tag, category, userId });
        return { message: 'blog posted' };

    } catch (err) {
        console.error("Error posting a new blog:", err.message);
        throw err; // Re-throw the error to propagate it to the caller
    }
}

module.exports = { getAllTheBlogs, postANewBlog };