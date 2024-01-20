/**
 * @typedef {Object} BlogDto
 * @property {number} id - The ID of the blog.
 * @property {string} title - The title of the blog.
 * @property {string} content - The content of the blog.
 * @property {string} tag - The tag of the blog.
 * @property {string} category - The category of the blog.
 * @property {string} username - The username associated with the blog.
 * @property {string} date - The date when the blog was created.
 */

/**
 * @typedef {Object} PaginatedBlogDto
 * @property {string} message - A message indicating the success status.
 * @property {number} currentPage - The current page number.
 * @property {number} totalPages - The total number of pages.
 * @property {number} totalBlogs - The total number of blogs.
 * @property {number} pageSize - The number of blogs sent in the current response.
 * @property {BlogDto[]} data - An array containing the retrieved paginated blog data.
 */


/**
 * DTO (Data Transfer Object) for the paginated blog response.
 */
class PaginatedBlogDto {
    /**
     * @param {string} message - A message indicating the success status.
     * @param {number} currentPage - The current page number.
     * @param {number} totalPages - The total number of pages.
     * @param {number} totalBlogs - The total number of blogs.
     * @param {number} pageSize - The number of blogs sent in the current response.
     * @param {Array} data - An array containing the retrieved paginated blog data.
     */
    constructor(message, currentPage, totalPages, totalBlogs, pageSize, data) {
        this.message = message;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalBlogs = totalBlogs;
        this.pageSize = pageSize;
        this.data = data.map(blog => ({
            id: blog.id,
            title: blog.title,
            content: blog.content,
            tag: blog.tag,
            category: blog.category,
            username: blog.username,
            date: blog.date,
        }));
    }

    /**
     * Serializes the DTO to a plain JavaScript object.
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


/**
 * 
 * // Example usage:
    const serializedDto = paginatedBlogDtoInstance.toJSON();
    const deserializedDto = PaginatedBlogDto.fromJSON(serializedDto);
 */


module.exports = PaginatedBlogDto;