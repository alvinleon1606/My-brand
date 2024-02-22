document.addEventListener('DOMContentLoaded', () =>{
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));

    const singleBlogCard = document.querySelector('.single-blog-card');

    //Get all blogs
    const allBlogs = JSON.parse(localStorage.getItem('Blogs'));
    //Get a blog by id
    const getSingleBlog = allBlogs.find(blog => blog.id ===id);
    if (!getSingleBlog) {
        return 'No Blog Found'
    }
    const blogImage = (getSingleBlog.image).split("\\").pop();
    singleBlogCard.innerHTML = `
        <div class="category-date">
        <div class="categ">
            <i class="fa-solid fa-grip-lines-vertical" style="color: lightgray;"></i>
            <p style="color: white;">${getSingleBlog.category}</p>
        </div>
        <div class="date" style="color: lightgray;">jun 24, 2025</div>
    </div>
    <img src="./assets/${blogImage}" alt="">
    <div class="blog-title-and-desc">
        <div class="blog-title">
            <h3>${getSingleBlog.title}</h3>
        </div>
        <div class="blog-desc">
            <p>
               ${getSingleBlog.description}
            </p>
        </div>
    </div>
    <div class="likes-comments">
      <div class="likeCounter">
      <i class="fa-solid fa-heart" id="likePost"></i> 
          <h3 style="color:white;" id="likeNumber">${getSingleBlog.likes.length}</h3>
      </div>
      <p style="color:white">Comments(<h3 id="commentsNumber">(${getSingleBlog.comments.length}):<h3/>)</p>
    </div>
    <div class="blog-comments">
    </div>
    <div class="comment-form">
        <form action="" id='comment-form'>
            <input type="number" hidden value=${getSingleBlog.id} id="blogToComment">
            <div class="comment-textarea">
                <textarea name="comment" id="" rows="5" placeholder="Type in Comment ..." class="post-comment"></textarea>
            </div>
            <button type="submit">Send</button>
        </form>
    </div>
    `
})