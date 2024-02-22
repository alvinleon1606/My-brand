// Contact Me
document.addEventListener('DOMContentLoaded', () =>{
    const crentials = document.querySelector('#for-logged-user-only');
    const loggedInUserSession = JSON.parse(localStorage.getItem('LoggedUserInfo'));
    if (loggedInUserSession) {
        crentials.style.display = 'none';
    }
    
    //Get logged In user
    let user = JSON.parse(localStorage.getItem('LoggedUserInfo'));

    const MessageStore = JSON.parse(localStorage.getItem("Messages")) || [];

    document.getElementById('contact-form').addEventListener('submit', () =>{
        const Message = document.getElementById('message').value;
        // find if user has recently sent message
        
        const recentMessageIndex = MessageStore.findIndex((recent) => recent.userEmail === user.email);
        const recentMessages = MessageStore[recentMessageIndex];

        if (recentMessageIndex !== -1) {
            
            recentMessages.message.push(Message);
        }else{
            // Message object
            const newMassege = {
                msgId: Date.now(),
                userNames: user.names,
                userEmail: user.email,
                message: [Message]
            }
            MessageStore.push(newMassege);
        }
        // save data
        localStorage.setItem("Messages", JSON.stringify(MessageStore));
        document.getElementById('message').value = ""
    })
})

 
