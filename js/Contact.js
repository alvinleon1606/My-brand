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

    document.getElementById('contact-form').addEventListener('submit', (e) =>{
        e.preventDefault()

        // Un registered User Message
        const names = document.getElementById('names').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const telephone = document.getElementById('telephone').value;
        const Message = document.getElementById('message').value;
        // find if user has recently sent message

        if (!user) {
            const recentMessageIndex = MessageStore.findIndex((recent) => recent.userEmail === email);
            const recentMessages = MessageStore[recentMessageIndex];
            if (recentMessageIndex !== -1) {
                recentMessages.message.push(Message);
            }else{
                //
                // Un registered User Message 
                const newMassege = {
                    msgId: Date.now(),
                    userNames: names,
                    userEmail: email,
                    message: [Message],
                    subject: subject,
                    telephone: telephone,
                    read: false
                }
                MessageStore.push(newMassege);
            }
        }
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
                message: [Message],
                read: false
            }
            MessageStore.push(newMassege);
        }
        // save data
        localStorage.setItem("Messages", JSON.stringify(MessageStore));
        document.getElementById('message').value = ""
    })
})

 
