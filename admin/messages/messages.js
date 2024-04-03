// Messages
const singleMessage = document.querySelector('.message');
const visitorCard = document.querySelector('.visitor-card');

const userLog = JSON.parse(localStorage.getItem('LoggedUserInfo'));
const token = userLog?.token


visitorCard.addEventListener('click', () =>{
    singleMessage.classList.toggle('active')
});


document.addEventListener('DOMContentLoaded', async () => {
    const messageDiv = document.querySelector('.visitors');
    const eachUserMessage = document.getElementById('Each-User-Message');

    try {
        const response = await fetch('https://leonx.onrender.com/messages/all', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch messages');
        }
        const messages = await response.json();


        if (messages?.content.length === 0) {
            messageDiv.innerHTML = 'No Messages Available';
            return;
        }
        messageDiv.innerHTML = '';

        const displayMessages = () => {
            messages?.content.forEach((message) => {
                const singleCard = document.createElement('div');
                singleCard.classList.add('visitor-card');
                singleCard.innerHTML = `
                    <div class="image-names">
                        <div class="profile-pic">
                            <p class="profile-name" style="color: red;">NL</p>
                        </div>
                        <div class="visitor-name">
                            <h4>${message.names}</h4>
                            <p id="msgId">${message.read=== false? "Unread": "Read"}</p>
                        </div>
                    </div>
                    <div class="action-delete">
                        <form id="delete-form">
                            <button class="delete" id="deleteMessage" data-message-id="${message._id}">Delete</button>
                        </form>
                    </div>
                `;


            // delete card of message
            const deleteButton = singleCard.querySelector('.delete');
            deleteButton.addEventListener('click', async (e) => {
                e.stopPropagation(); // Prevent the click event from bubbling up to the parent element
    
                try {
                    const response = await fetch(`https://leonx.onrender.com/messages/delete/${message._id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                        
                    });
                    if (!response.ok) {
                        throw new Error('Failed to delete message');
                    }
    
                    // Remove the message card from the DOM
                    singleCard.remove();
                } catch (error) {
                    console.error('Failed to delete message:', error);
                }
            });
                singleCard.addEventListener('click', () => {
                    const singleCardMessages = document.createElement('div');
                    singleCardMessages.classList.add('single-visitors-message');

                    singleCardMessages.innerHTML = `
                        <div class="names-email">
                            <h4>${message.names}</h4>
                            <p>${message.email}</p>
                        </div>
                        <div class="message">
                            ${message.messages.map(msg => `
                                <div class="single-message">
                                    <p class="message-desc">${msg}</p>
                                    <div class="time-ago">3min ago</div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                    if (eachUserMessage.children.length > 0) {
                        eachUserMessage.innerHTML = '';
                    }

                    eachUserMessage.appendChild(singleCardMessages);
                });
                messageDiv.appendChild(singleCard);
            });

        };
        displayMessages();
    } catch (error) {
        console.error('Failed to fetch messages:', error);
        messageDiv.innerHTML = 'Failed to fetch messages';
    }
});




