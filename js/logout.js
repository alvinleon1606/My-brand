const form = document.querySelector('.logout-form');
const logout = document.querySelector('.Logout-menu');
form.addEventListener('submit', ()=>{
    window.location.href = "http://127.0.0.1:5500/My-brand/Login.html";
    localStorage.removeItem('LoggedUserInfo', 'isLoggedIn');
    localStorage.removeItem('isLoggedIn');
})
