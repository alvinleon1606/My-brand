document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('comment-form');
    // Get logged In user
    let user = JSON.parse(localStorage.getItem('LoggedUserInfo'));
    // Get All blogs 
    let Blogs = JSON.parse(localStorage.getItem('Blogs'));
    // Recent comments comments
    const RecentCommentsDiv = document.querySelector('.blog-comments');


    const BlogId = parseInt(document.querySelector('#blogToComment').value);

    const blog = Blogs.find((blog) => blog.id === BlogId);
    // Blog to comment
    if (!blog) {
        console.log("No Blog Found")
        return;
    }

    // Display Comment Number
    const displayCommentsNumber  = () =>{
        const commentNum = document.getElementById('commentsNumber');
        commentNum.innerHTML = blog.comments.length;
    }

    // display updated comment
    const displayComments = () =>{
        
        if (blog.comments.length ===0) {
            RecentCommentsDiv.innerHTML = 'No Comment';
            return
        }
        RecentCommentsDiv.innerHTML = "";
         // get comments  .blog-comments
        blog.comments.forEach((comment) => {
            const CommentsListDiv = document.createElement('div');
            CommentsListDiv.classList.add('comments');
            CommentsListDiv.innerHTML = `
                <img src="./assets/profile.webp" alt="" class="comment-person">
                <div class="names-comment">
                    <h4>${comment.posterNames}</h4>
                    <p>${comment.comment}</p>
                    ${user && user.email === comment.posterEmail ? `<button id="dltBTN" comId="${comment.commentId}">delete</button>` : ''}
                </div>
            `;
            RecentCommentsDiv.appendChild(CommentsListDiv);
            displayCommentsNumber();
        });
    }

    // commentsNumber
    const displayLikes  = () =>{
        const likeNum = document.getElementById('likeNumber');
        likeNum.innerHTML = blog.likes.length;
    }
    displayComments();
    displayLikes();

    // Comment on blog
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const comment = document.querySelector('.post-comment').value;
 
        // create a comment
        const newComment = {
            commentId: Date.now(),
            posterNames: user.names,
            posterEmail: user.email,
            comment: comment
        }

        // save comment
        blog.comments.push(newComment);

        // save
        localStorage.setItem('Blogs', JSON.stringify(Blogs));
        document.querySelector('.post-comment').value="";
        displayComments();
    });

    // when comment focused by unregistered visitor
    const Comment = document.querySelector('.post-comment');
    Comment.addEventListener('focus', () =>{
        const loggedInUserSession = JSON.parse(localStorage.getItem('LoggedUserInfo'));
        if (!loggedInUserSession) {
            window.location.href = './Login.html'
        }
    });

    // Like a Blog
    const like = document.querySelector('#likePost').addEventListener('click', () =>{
        // Check if user Logged In
        const loggedInUserSession = JSON.parse(localStorage.getItem('LoggedUserInfo'));
        if (!loggedInUserSession) {
            window.location.href = './Login.html'
        }

        if (!blog.likes) {
            blog.likes = []
        }
        // likes objects
        const newLikes = {
            userEmail: user.email
        }
        const userLikeIndex = blog.likes.findIndex((like) => like.userEmail ===user.email)
        if(userLikeIndex === -1){
            blog.likes.push(newLikes)
        }else{
           blog.likes = blog.likes.filter((like) => like.userEmail !==user.email)
        }
        localStorage.setItem("Blogs", JSON.stringify(Blogs))
        displayLikes()
    });


    document.getElementById("dltBTN").addEventListener('click', ()=> {
        var messageId = parseInt(this.getAttribute("comId"));
        const commentToDeleteIndex = blog.comments.findIndex((cmt) => cmt.commentId === messageId);
        if (commentToDeleteIndex !== -1) {
            const commentToDelete = blog.comments[commentToDeleteIndex];
            if (user && user.email === commentToDelete.posterEmail) {
                blog.comments.splice(commentToDeleteIndex, 1);
                localStorage.setItem('Blogs', JSON.stringify(Blogs));
                displayComments();
            } else {
                console.log("You are not authorized to delete this comment.");
            }
        } else {
            console.log("Comment not found.");
        }
    });
});
