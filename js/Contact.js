document.addEventListener('DOMContentLoaded', () => {
    const credentials = document.querySelector('#for-logged-user-only');
    const loggedInUserSession = JSON.parse(localStorage.getItem('LoggedUserInfo'));
    if (loggedInUserSession) {
        credentials.style.display = 'none';
    }

    let user = JSON.parse(localStorage.getItem('LoggedUserInfo'));

    // on focus to any field
    if (!user) {
        document.querySelectorAll('input, textarea').forEach((element) => {
            element.addEventListener('focus', () => {
                window.location.href = './Login.html';
            });
        });
    }

    document.getElementById('contact-form-sending').addEventListener('submit', async (e) => {
        e.preventDefault();

        const message = document.getElementById('message').value;
        const newMessage = {
            names: user?.user.firstName+" "+user?.user.secondName,
            email: user?.user.email,
            message: message
        };

        // Send the message 
        try {
            const response = await fetch('https://leonx-ldu1-vvuz.onrender.com/messages/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMessage)
            });

            if (response.ok) {
                alert("Message sent successfully")
                console.log('Message sent successfully');
                // Clear the message input
                document.getElementById('message').value = "";
            } else {
                console.error('Failed to send message');
            }
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    });
});
