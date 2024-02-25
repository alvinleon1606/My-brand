document.addEventListener('DOMContentLoaded', ()=>{
    //get user
    const user = JSON.parse(localStorage.getItem('LoggedUserInfo'));
    if (!user || !user.isLoggedIn || user.email !=="leonndayishimiye10@gmail.com") {
      // window.location.href = "http://127.0.0.1:5500/My-brand/Login.html";
      window.location.href = "https://np-leonx.netlify.app/login";
    }
  })