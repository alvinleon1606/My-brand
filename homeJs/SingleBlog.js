document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    const singleBlogCard = document.querySelector('.single-blog-card');
    const RecentCommentsDiv = document.querySelector('.blog-comments');

    try {
        const response = await fetch(`http://localhost:8080/blogs/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch blog');
        }
        const blog = await response.json();

        // Display the blog content
        singleBlogCard.innerHTML = `
            <div class="category-date">
                <div class="categ">
                    <i class="fa-solid fa-grip-lines-vertical" style="color: lightgray;"></i>
                    <p style="color: white;">${blog?.userInfo.category}</p>
                </div>
                <div class="date" style="color: lightgray;">${formatDate(new Date(blog?.userInfo.createdAt))}</div>
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
                ${blog?.userInfo.comments.length > 0 ? '' : 'No comments yet.'}
            </div>
            <div class="comment-form">
                <form action="" id='comment-form'>
                    <input type="text" hidden value=${blog?.userInfo._id} id="blogToComment">
                    <div class="comment-textarea">
                        <textarea name="comment" id="" rows="5" placeholder="Type in Comment ..." class="post-comment"></textarea>
                    </div>
                    <button type="submit">Comment</button>
                </form>
            </div>
        `;

         // when comment focused by unregistered visitor
        const Comment = document.querySelector('.post-comment');
        Comment.addEventListener('focus', () =>{
            const loggedInUserSession = JSON.parse(localStorage.getItem('LoggedUserInfo'));
            if (!loggedInUserSession) {
                sessionStorage.setItem('currentUrl', window.location.href)
                window.location.href = './Login.html'
            }
        });


        // Like a Blog
        const likeButton = document.querySelector('#likePost');
        likeButton.addEventListener('click', async () => {
            const user = JSON.parse(localStorage.getItem('LoggedUserInfo'));
            if (!user) {
                sessionStorage.setItem('currentUrl', window.location.href);
                window.location.href = './Login.html';
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/blogs/blog/like/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: user?.user.email,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to like blog');
                }

                const updatedBlog = await response.json();
                console.log("Helloooooooooooooooooooooooooooooooooooooooooooo",updatedBlog)
                document.getElementById('likeNumber').innerText = updatedBlog?.foundBlog.likes.length;
            } catch (error) {
                console.error('Error liking blog:', error);
            }
        });


        // Display existing comments
        displayComments(blog.userInfo.comments);

        // Set up event listener for submitting new comment
        const form = document.getElementById('comment-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            let user = JSON.parse(localStorage.getItem('LoggedUserInfo'));
            const comment = document.querySelector('.post-comment').value;

            // Create a new comment object
            const newComment = {
                posterNames: user?.user.secondName,
                email: user?.user.email,
                comment: comment
            };

            // Save the new comment
            try {
                const response = await fetch(`http://localhost:8080/blogs/blog/comment/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newComment)
                });

                if (!response.ok) {
                    throw new Error('Failed to add comment');
                }

                alert('Comment added successfully');
                // Refresh the comments list after adding a new comment
                const updatedBlogResponse = await fetch(`http://localhost:8080/blogs/${id}`);
                if (!updatedBlogResponse.ok) {
                    throw new Error('Failed to fetch updated blog');
                }
                const updatedBlog = await updatedBlogResponse.json();
                displayComments(updatedBlog.userInfo.comments);
            } catch (error) {
                console.error('Error adding comment:', error);
            }

            // Clear the comment input field
            document.querySelector('.post-comment').value = "";
        });

    } catch (error) {
        console.error('Error fetching blog:', error);
    }
});

const displayComments = (comments) => {
    const RecentCommentsDiv = document.querySelector('.blog-comments');
    RecentCommentsDiv.innerHTML = '';

    if (comments.length === 0) {
        RecentCommentsDiv.innerHTML = 'No comments yet.';
        return;
    }

    comments.forEach((comment) => {
        const CommentsListDiv = document.createElement('div');
        CommentsListDiv.classList.add('comments');
        CommentsListDiv.innerHTML = `
            <img src="./assets/profile.webp" alt="" class="comment-person">
            <div class="names-comment">
                <h4>${comment.posterNames}</h4>
                <p>${comment.comment}</p>
            </div>
        `;
        RecentCommentsDiv.appendChild(CommentsListDiv);
    });
};

const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};
