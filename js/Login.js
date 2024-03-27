const logoutButton = document.querySelector('.logout');

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('login-form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await axios.post('http://localhost:5500/login', { email, password });
        
            if (response.status === 200) {
                const user = response.data.loggedUser;
                console.log(user)
                localStorage.setItem('LoggedUserInfo', JSON.stringify(user));
                if (user.email === 'leonndayishimiye10@gmail.com' && user.role === "admin") {
                    window.location.href = './admin/Home.html';
                } else {
                    alert(response.data)
                    window.location.href = './index.html';
                }
            } else {
                // Handle other status codes
                alert('Failed to login. Please try again.');
            }
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Login failed', error);
            alert('An error occurred during login.');
        }
        
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

    const submenus = document.querySelector('.sub-menu');

    document.querySelector('.loggedUserIcon').addEventListener('click', () => {
        submenus.classList.toggle('open');
    });
});
