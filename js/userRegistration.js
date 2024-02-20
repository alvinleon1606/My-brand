document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const names = document.getElementById('names').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        let users = JSON.parse(localStorage.getItem('users')) || [];

        if (users.some(user => user.email === email)) {
            document.querySelector('.email-error').innerHTML = 'Email already exists';
            return;
        }
        const newUser = {
            userId: Date.now(),
            names: names,
            email: email,
            password: password,
            isLoggedIn: false
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = './Login.html';
    });
});
