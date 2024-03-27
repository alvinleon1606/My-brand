const logoutButton = document.querySelector('.logout');

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await axios.post('http://localhost:8080/login', { email, password });
        
            if (response.status === 200) {
                const user = response.data;
                localStorage.setItem('LoggedUserInfo', JSON.stringify(user));
                const loggedInUserSession = JSON.parse(localStorage.getItem('LoggedUserInfo'));
                const userEmail = loggedInUserSession.user.email;
                if (userEmail === 'leonndayishimiye10@gmail.com') {
                    window.location.href = './admin/Home.html';
                } else {
                    alert(loggedInUserSession.user.email)
                    window.location.href = './index.html';
                }
            } else {
                alert('Failed to login. Please try again.');
            }
            console.log(response.data)
        } catch (error) {
            console.error('Login failed', error);
            alert('An error occurred during login.');
        }
        
    });

    // Get user session from localStorage after DOMContentLoaded
    const loggedInUserSession = JSON.parse(localStorage.getItem('LoggedUserInfo'));
    if (loggedInUserSession && loggedInUserSession.user) {
        document.querySelector('.logout').style.display = 'block';
        document.querySelector('.login').style.display = 'none';
    } else {
        document.querySelector('.login').style.display = 'block';
        document.querySelector('.logout').style.display = 'none';
    }

    const submenus = document.querySelector('.sub-menu');

    document.querySelector('.loggedUserIcon').addEventListener('click', () => {
        submenus.classList.toggle('open');
    });
});
