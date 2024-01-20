/**
 * DTO (Data Transfer Object) for the paginated blog response.
 */
class PaginatedBlogDto {
    /**
     * @param {string} message - A message indicating the success status.
     * @param {number} currentPage - The current page number.
     * @param {number} totalPages - The total number of pages.
     * @param {Array} data - An array containing the retrieved paginated blog data.
     */
    constructor(message, currentPage, totalPages, data) {
        this.message = message;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.data = data.map(blog => ({
            id: blog.id,
            title: blog.title,
            content: blog.content,
            tag: blog.tag,
            category: blog.category,
            // Exclude user ID and keep other user-specific details
            username: blog.username,
            date: blog.date,
        }));
    }
}

module.exports = PaginatedBlogDto;