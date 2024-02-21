document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
    // populate form with default values
    let user = JSON.parse(localStorage.getItem('LoggedUserInfo'));

    document.getElementById('names').value=user.names;
    document.getElementById('email').value = user.email;
    document.getElementById('password').value = user.password;

    // Update user info
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const updatedNames = document.getElementById('names').value;
        const updatedEmail = document.getElementById('email').value;
        const oldPassword = document.getElementById('password').value;
        const newPassword = document.getElementById('new1-password').value;
        const comfirmNewPassword = document.getElementById('new2-password').value;

        if (user.password === oldPassword) {
            if (newPassword === comfirmNewPassword) {
                // update user
                user.names=updatedNames;
                user.email = updatedEmail;
                user.password = newPassword;

                // update session
                localStorage.setItem('LoggedUserInfo', JSON.stringify(user));
                // update user data in Users store
                let users = JSON.parse(localStorage.getItem('users'));
                const me = users.find((user) => user.email === updatedEmail)

                me.names = updatedNames;
                me.password = newPassword;
                me.email = updatedEmail;
                localStorage.setItem('users', JSON.stringify(me));
                window.location.href = './index.html';
            }else{
                document.querySelector('.comfirm-new-password-error').innerHTML = 'Password do match'
            }
        } else {
            document.querySelector('.password-error').innerHTML = 'Invalid Old Password'
        }

    });
});
