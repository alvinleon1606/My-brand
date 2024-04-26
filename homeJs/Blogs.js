document.addEventListener('DOMContentLoaded', async () => {
    // filters..
    const technologyBtn = document.getElementById('Technology');
    const ScienceBtn = document.getElementById('Science');
    const EngineeringBtn = document.getElementById('Engineering');
    const aiBtn = document.getElementById('Ai');

    const blogListContainer = document.querySelector('.blogs-list');
    const BlogCard = document.querySelector('.blogs-card');

    let blogs = []

    try {
        const response = await fetch('https://leonx-ldu1.onrender.com/blogs/all');
        if (!response.ok) {
            throw new Error('Failed to fetch blogs');
        }
        blogs = await response.json();

        if (blogs?.data.length === 0) {
            blogListContainer.innerText = 'You do not have blogs';
            return;
        }


        const renderBlogs = (blogs) => {
            BlogCard.innerHTML = '';

            if(blogs?.data.length ===0){
                BlogCard.inn = "No Blog"
                return;
            }
            blogs?.data.forEach((blog) => {
                const blogListItem = document.createElement('div');
                blogListItem.classList.add('single-blog-card');
                blogListItem.innerHTML = `
                    <a href="./Post-details.html?id=${blog._id}">
                        <img src="https://leonx-ldu1.onrender.com/${blog.image}" alt="">
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
        }
        renderBlogs(blogs)

        searchInput.addEventListener('input', () => {
            const searchValue = searchInput.value.trim().toLowerCase();
            const filteredBlogs = blogs.data.filter(blog =>
                blog.title.toLowerCase().includes(searchValue) ||
                blog.desc.toLowerCase().includes(searchValue)
            );
            renderBlogs({ data: filteredBlogs });
        });

        technologyBtn.addEventListener('click', () => {
            const filteredBlogs = blogs.data.filter(blog =>
                blog.category === 'Technology'
            );
            renderBlogs({ data: filteredBlogs });
        });

        ScienceBtn.addEventListener('click', () => {
            const filteredBlogs = blogs.data.filter(blog =>
                blog.category === 'Science'
            );
            renderBlogs({ data: filteredBlogs });
        });
        EngineeringBtn.addEventListener('click', () => {
            const filteredBlogs = blogs.data.filter(blog =>
                blog.category === 'Engineering'
            );
            renderBlogs({ data: filteredBlogs });
        });
        aiBtn.addEventListener('click', () => {
            const filteredBlogs = blogs.data.filter(blog =>
                blog.category === 'Ai'
            );
            renderBlogs({ data: filteredBlogs });
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
