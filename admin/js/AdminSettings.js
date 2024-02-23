document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('admin-settings-form');
    // populate form with default values
    let user = JSON.parse(localStorage.getItem('LoggedUserInfo'));

    document.getElementById('names').value=user.names;
    document.getElementById('email').value = user.email;
    document.getElementById('telephone').value = user.telephone;
    document.getElementById('security').value = user.security;
    document.getElementById('about').value=user.about;
    document.getElementById('profile').value=user.profile;
    document.getElementById('proffession').value=user.proffession;

    const oldPassword =user.password;
    const newPassword = document.getElementById('new-password').value;

    // users
    let users = JSON.parse(localStorage.getItem('users')) || [];
    

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
                user.names=updatedNames;
                user.email = updatedEmail;
                user.about = about;
                user.profile = profile;
                user.proffession = proffession;
                user.introVideo= video;
                user.telephone = telephone;
                user.security =  security;
                user.password = newPassword;

                // update session
                if(users.length === 0){
                    console.log("Empty users");
                    return
                }
                console.log("Helloooooooooooooooo", users)
                const me = users.find((existing) => existing.email === user.email)
                if(!me){
                    console.log("User Not Found")
                    return
                }

                me.names = updatedNames;
                me.email = updatedEmail;
                me.about = about;
                me.introVideo = video;
                me.proffession = proffession;
                me.security = security;
                localStorage.setItem('users', JSON.stringify(users));
                window.location.href = './settings.html';
    });
});
