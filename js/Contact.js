
document.addEventListener('DOMContentLoaded', () =>{
    const crentials = document.querySelector('#for-logged-user-only');
    const loggedInUserSession = JSON.parse(localStorage.getItem('LoggedUserInfo'));
    if (loggedInUserSession) {
        crentials.style.display = 'none';
    } 
})

 
