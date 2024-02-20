document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email);

        if (user && user.password === password) {
            if(user.email ==='leonndayishimiye10@gmail.com'){
                user.isLoggedIn = true;
                window.location.href = './admin/Home.html';
            }
            else{
                user.isLoggedIn = true;
                window.location.href = `./index.html?id=${user.userId}`;
            }
            localStorage.setItem('users', JSON.stringify(users));
        } else {
            alert('Invalid email or password.');
        }
    });
});
