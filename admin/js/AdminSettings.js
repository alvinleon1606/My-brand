document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('admin-settings-form');

    // populate form with default values
    const user = JSON.parse(localStorage.getItem('LoggedUserInfo'));

    // users
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userIndex = users.findIndex((me) => me.email === user.email)

    
    document.getElementById('names').value=users[userIndex].names;
    document.getElementById('email').value = users[userIndex].email;
    document.getElementById('telephone').value = users[userIndex].telephone;
    document.getElementById('security').value = users[userIndex].security;
    document.getElementById('about').value=users[userIndex].about;
    document.getElementById('proffession').value=users[userIndex].proffession;

    const newPassword = document.getElementById('new-password').value;

    // Display my Image
    const blogImage = (users[userIndex].profile).split("\\").pop();
    const profImage = document.getElementById('my-settings-profile');
    profImage.innerHTML = `
       <img src="../../assets/${blogImage}" alt="" class="my-profile">
    `
    

    // Update user info
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const updatedNames = document.getElementById('names').value;
        const updatedEmail = document.getElementById('email').value;
        const about = document.getElementById('about').value;
        const profile = document.getElementById('profile').value;
        const video = document.getElementById('intro-video').value;
        const proffession = document.getElementById('proffession').value;
        const security = document.getElementById('security').value;
        const telephone = document.getElementById('telephone').value;

                // update Admin
                users[userIndex].names=updatedNames;
                users[userIndex].email = updatedEmail;
                users[userIndex].about = about;
                users[userIndex].profile = profile;
                users[userIndex].proffession = proffession;
                users[userIndex].introVideo= video;
                users[userIndex].telephone = telephone;
                users[userIndex].security =  security;
                if (newPassword !=='') {
                    users[userIndex].password = newPassword;
                }
                users[userIndex].password = user.password;

                // update data
                localStorage.setItem('users', JSON.stringify(users));
                window.location.href = './settings.html';
    });
});
