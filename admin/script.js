// 
const humburger = document.querySelector('.toggle-icon');
const container = document.querySelector('.container');

humburger.addEventListener('click', () => {
    container.style.gridTemplateColumns = '50px 1fr';
    container.classList.toggle('active');
})

document.addEventListener('DOMContentLoaded', ()=>{
    //get user
    const userLogged = JSON.parse(localStorage.getItem('LoggedUserInfo'));
    if (!userLogged.user) {
      window.location.href = 'https://np-leonx.netlify.app/login'
    }
  })