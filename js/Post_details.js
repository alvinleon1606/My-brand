
document.addEventListener('DOMContentLoaded', () =>{
    const Comment = document.querySelector('.post-comment');
    // when comment focused by unregistered visitor
    Comment.addEventListener('focus', () =>{
        const loggedInUserSession = JSON.parse(localStorage.getItem('LoggedUserInfo'));
        if (!loggedInUserSession) {
            window.location.href = './Login.html'
        }
    }) 
})
