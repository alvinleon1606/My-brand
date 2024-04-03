const form = document.querySelector('.logout-form');
const logout = document.querySelector('.Logout-menu');
form.addEventListener('submit', ()=>{
    window.location.href = "https://NP Leon.netlify.app/login";
    localStorage.removeItem('LoggedUserInfo', 'isLoggedIn');
    localStorage.removeItem('isLoggedIn');
})
