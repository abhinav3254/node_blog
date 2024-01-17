const client = require('../db/db-pg');


async function getAllTheBlogs() {
    try {

        return { message: 'working from service' };

    } catch (err) {
        console.log(err);
    }
}

async function postANewBlog() {
    try {

        return { message: 'new blog posted' };

    } catch (err) {
        console.log(err);
    }
}

module.exports = { getAllTheBlogs, postANewBlog };