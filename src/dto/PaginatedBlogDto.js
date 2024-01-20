/**
 * DTO (Data Transfer Object) for representing a single comment.
 */
class CommentDto {
    /**
     * @param {string} commentContent - The content of the comment.
     * @param {string} commentUsername - The username associated with the comment.
     * @param {string} commentDate - The date when the comment was created.
     */
    constructor(commentContent, commentUsername, commentDate) {
        this.commentContent = commentContent;
        this.commentUsername = commentUsername;
        this.commentDate = commentDate;
    }
}

/**
 * DTO (Data Transfer Object) for representing a single blog.
 */
class BlogDto {
    /**
     * @param {number} id - The ID of the blog.
     * @param {string} title - The title of the blog.
     * @param {string} content - The content of the blog.
     * @param {string} tag - The tag of the blog.
     * @param {string} category - The category of the blog.
     * @param {string} username - The username associated with the blog.
     * @param {string} date - The date when the blog was created.
     * @param {CommentDto[]} comments - An array containing comments associated with the blog.
     */
    constructor(id, title, content, tag, category, username, date, comments = []) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.tag = tag;
        this.category = category;
        this.username = username;
        this.date = date;
        this.comments = comments;
    }
}

/**
 * DTO (Data Transfer Object) for the paginated blog response.
 */
class PaginatedBlogDto {
    /**
     * Creates an instance of PaginatedBlogDto.
     *
     * @param {string} message - A message indicating the success status.
     * @param {number} currentPage - The current page number.
     * @param {number} totalPages - The total number of pages.
     * @param {number} totalBlogs - The total number of blogs.
     * @param {number} pageSize - The number of blogs sent in the current response.
     * @param {BlogDto[]} data - An array containing the retrieved paginated blog data.
     */
    constructor(message, currentPage, totalPages, totalBlogs, pageSize, data) {
        this.message = message;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalBlogs = totalBlogs;
        this.pageSize = pageSize;
        this.data = data.map(blog => new BlogDto(
            blog.id,
            blog.title,
            blog.content,
            blog.tag,
            blog.category,
            blog.username,
            blog.date,
            blog.comments.map(comment => new CommentDto(
                comment.commentContent,
                comment.commentUsername,
                comment.commentDate
            ))
        ));
    }

    /**
     * Serializes the DTO to a plain JavaScript object.
     *
     * @returns {Object} - The serialized object.
     */
    toJSON() {
        return {
            message: this.message,
            currentPage: this.currentPage,
            totalPages: this.totalPages,
            totalBlogs: this.totalBlogs,
            pageSize: this.pageSize,
            data: this.data,
        };
    }

    /**
     * Deserializes the DTO from a plain JavaScript object.
     *
     * @param {Object} obj - The object to deserialize.
     * @returns {PaginatedBlogDto} - The deserialized DTO.
     */
    static fromJSON(obj) {
        return new PaginatedBlogDto(
            obj.message,
            obj.currentPage,
            obj.totalPages,
            obj.totalBlogs,
            obj.pageSize,
            obj.data
        );
    }
}

module.exports = { PaginatedBlogDto, CommentDto, BlogDto };
