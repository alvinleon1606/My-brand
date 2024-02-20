document.addEventListener("DOMContentLoaded", () => {
    const loggedInfo = document.querySelector('.loggedUser');


    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));


    //get all users
    const users = JSON.parse(localStorage.getItem('users')) || [];

    //Find logged In user by id
    const userIndex = users.findIndex((user) =>{
        return user.userId ===id;
    })

    // if index found?
    const loggedInUser=  JSON.stringify(users[userIndex]);
    
    // save user's session
    localStorage.setItem('LoggedUserInfo', loggedInUser);


    // retrieve loggedIn session
    const loggedInUserSession= localStorage.getItem("LoggedUserInfo");
    if (loggedInUserSession) {
        loggedInfo.classList.add('loggedIn');
       document.querySelector('.login-button').style.display = 'none'
    }
})