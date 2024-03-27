document.addEventListener('DOMContentLoaded', ()=>{
    //get user
    const userLogged = JSON.parse(localStorage.getItem('LoggedUserInfo'));
    if (!userLogged) {
      window.location.href = "http://127.0.0.1:5500/Login.html";
     // window.location.href = "https://np-leonx.netlify.app/login";
    }
  })