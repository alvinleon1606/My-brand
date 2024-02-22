document.addEventListener('DOMContentLoaded', () =>{
    const BlogCard = document.querySelector('.blogs-card');
    
    // fetch all blogs
    const blogs = JSON.parse(localStorage.getItem('Blogs'));
    if (blogs.length === 0) {
        BlogCard.innerHTML = 'You do not have blogs';
        return;
    }
    BlogCard.innerHTML = "";
    blogs.map((blog) =>{
    const blogImage = (blog.image).split("\\").pop();
    const blogList = document.createElement('div');
    blogList.classList.add('single-blog-card')
    blogList.innerHTML = `
            <a href="./Post-details.html?id=${blog.id}">
            <img src="./assets/${blogImage}" alt="">
            </a>
            <div class="card-text-part">
                <h3>${blog.title}- January 6, 2024</h3>
                <p class="blog-desc">${blog.description}</p>
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
    `
    BlogCard.appendChild(blogList);
    });

})