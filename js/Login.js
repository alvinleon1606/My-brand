const logoutButton = document.querySelector('.logout');

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('login-form-for-user').addEventListener('submit', async(e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await axios.post('http://localhost:8080/login', { email, password });
        
            if (response.status === 200) {
                const user = response.data;
                localStorage.setItem('LoggedUserInfo', JSON.stringify(user));
                localStorage.setItem('isLoggedIn', JSON.stringify(true));
                const loggedInUserSession = JSON.parse(localStorage.getItem('LoggedUserInfo'));
                const userEmail = loggedInUserSession.user.email;
                if (userEmail === 'leonndayishimiye10@gmail.com') {
                    window.location.href = './admin/Home.html';
                } else {
                    window.location.href = './index.html';
                }
            } else {
                alert('Failed to login. Please try again.');
            }
        } catch (error) {
            alert('Ckeck both Email and password.');
        }
        
    });
});
