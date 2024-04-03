document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('logoutDiv').style.display = 'none';
      const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
      if (isLoggedIn) {
          document.getElementById('logoutDiv').style.display = 'block';
          document.getElementById('loginButton').style.display = 'none';
      } else {
          document.getElementById('logoutDiv').style.display = 'none';
          document.getElementById('loginButton').style.display = 'block';
      }
  
      const submenus = document.querySelector('.sub-menu');
  
      document.querySelector('.loggedUserIcon').addEventListener('click', () => {
          submenus.classList.toggle('open');
      });
})