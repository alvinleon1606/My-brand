document.addEventListener('DOMContentLoaded', ()=>{
    //get user
    const userLogged = JSON.parse(localStorage.getItem('LoggedUserInfo'));
    if (!userLogged) {
     window.location.href = "https://npleon.netlify.app/login";
    }
  })