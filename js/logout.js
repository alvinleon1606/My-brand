const form = document.querySelector('.logout-form');
const logout = document.querySelector('.Logout-menu');
form.addEventListener('submit', ()=>{
    window.location.href="./Login.html"
    localStorage.removeItem('LoggedUserInfo');
})
