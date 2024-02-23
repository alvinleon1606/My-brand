document.addEventListener('DOMContentLoaded', ()=>{
    //get user
    const user = JSON.parse(localStorage.getItem('LoggedUserInfo'));
    if (!user || !user.isLoggedIn || user.email !=="leonndayishimiye10@gmail.com") {
      window.location.href = './Login.html'
    }
  })