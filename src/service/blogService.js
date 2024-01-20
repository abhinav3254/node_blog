const client = require('../db/db-pg');


async function getAllTheBlogs() {
    try {

        return { message: 'working from service' };

    } catch (err) {
        console.log(err);
    }
}

async function postANewBlog(title, content, tag, category) {
    try {
        const query = "INSERT INTO POSTS (TITLE,CONTENT,TAG,CATEGORY,USERNAME,DATE) VALUES (?,?,?,?,?)";

        console.log(title, content, tag, category);
        return { message: 'new blog posted' };

    } catch (err) {
        console.log(err);
    }
}

module.exports = { getAllTheBlogs, postANewBlog };