const logoutButton = document.querySelector('.logout');
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email);

        if (user && user.password === password) {
            if(user.email ==='leonndayishimiye10@gmail.com'){
                user.isLoggedIn = true;
                localStorage.setItem('LoggedUserInfo', JSON.stringify(user));
                window.location.href = './admin/Home.html';
            }
            else{
                user.isLoggedIn = true;
                localStorage.setItem('LoggedUserInfo', JSON.stringify(user));
                //const redirectUrl = sessionStorage.getItem('currentUrl');

                //window.location.href = redirectUrl;
                window.location.href = `./index.html`;
            }
        } else {
            alert('Invalid email or password.');
        }
    });
});


    // Get user session from localStorage after DOMContentLoaded
    const loggedInUserSession = JSON.parse(localStorage.getItem('LoggedUserInfo'));
    if (loggedInUserSession && loggedInUserSession.isLoggedIn === true) {
        document.querySelector('.logout').style.display = 'block';
        document.querySelector('.login').style.display = 'none';
    } else {
        document.querySelector('.login').style.display = 'block';
        document.querySelector('.logout').style.display = 'none';
    }

    // const submenus = document.querySelector('.sub-menu')

    // document.querySelector('.loggedUserIcon').addEventListener('click', () =>{
    //     submenus.classList.toggle('open');
    // })

