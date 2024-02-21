const form = document.querySelector('.logout-form');
const logout = document.querySelector('.Logout-menu');
form.addEventListener('submit', ()=>{
    localStorage.removeItem('LoggedUserInfo');
})
// logout.addEventListener('click', () =>{

// })