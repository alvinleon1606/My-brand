document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const singleBlogCard = document.querySelector('.single-blog-card');

    try {
        const response = await fetch(`http://localhost:8080/blogs/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch blog');
        }
        const blog = await response.json();

        singleBlogCard.innerHTML = `
            <div class="category-date">
                <div class="categ">
                    <i class="fa-solid fa-grip-lines-vertical" style="color: lightgray;"></i>
                    <p style="color: white;">${blog?.userInfo.category}</p>
                </div>
                <div class="date" style="color: lightgray;">${formatDate(new Date(blog.createdAt))}</div>
            </div>
            <img src="http://localhost:8080/${blog?.userInfo.image}" alt="">
            <div class="blog-title-and-desc">
                <div class="blog-title">
                    <h3>${blog?.userInfo.title}</h3>
                </div>
                <div class="blog-desc">
                    <p>
                        ${blog?.userInfo.desc}
                    </p>
                </div>
            </div>
            <div class="likes-comments">
                <div class="likeCounter">
                    <i class="fa-solid fa-heart" id="likePost"></i> 
                    <h3 style="color:white;" id="likeNumber">${blog?.userInfo.likes.length}</h3>
                </div>
                <p style="color:white">Comments(<h3 id="commentsNumber">${blog?.userInfo.comments.length}</h3>):</p>
            </div>
            <div class="blog-comments">
            </div>
            <div class="comment-form">
                <form action="" id='comment-form'>
                    <input type="number" hidden value=${blog?.userInfo._id} id="blogToComment">
                    <div class="comment-textarea">
                        <textarea name="comment" id="" rows="5" placeholder="Type in Comment ..." class="post-comment"></textarea>
                    </div>
                    <button type="submit">Send</button>
                </form>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching blog:', error);
    }
});

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};
