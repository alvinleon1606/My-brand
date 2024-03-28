document.addEventListener('DOMContentLoaded', async () => {
    const blogListContainer = document.querySelector('.blogs-list');
    const BlogCard = document.querySelector('.blogs-card');

    try {
        const response = await fetch('http://localhost:8080/blogs/all');
        if (!response.ok) {
            throw new Error('Failed to fetch blogs');
        }
        const blogs = await response.json();

        if (blogs?.data.length === 0) {
            blogListContainer.innerText = 'You do not have blogs';
            return;
        }

        blogs?.data.forEach((blog) => {
            const blogListItem = document.createElement('div');
            blogListItem.classList.add('single-blog-card');
            blogListItem.innerHTML = `
                <a href="./Post-details.html?id=${blog._id}">
                    <img src="http://localhost:8080/${blog.image}" alt="">
                </a>
                <div class="card-text-part">
                    <h3>${blog.title}- ${formatDate(new Date(blog.createdAt))}</h3>
                    <p class="blog-desc">${blog.desc}</p>
                    <div class="likes-comments">
                        <div class="likes">
                            <i class="fa-solid fa-heart"></i>
                            <p>${blog.likes.length}</p>
                        </div>
                        <div class="comments">
                            <i class="fa-solid fa-comments"></i>
                            <p>${blog.comments.length}</p>
                        </div>
                    </div>
                </div>
            `;
            BlogCard.appendChild(blogListItem);
        });
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
        blogListContainer.innerText = 'Failed to fetch blogs';
    }
});

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};
