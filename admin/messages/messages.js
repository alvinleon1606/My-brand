// Messages
const singleMessage = document.querySelector('.message');
const visitorCard = document.querySelector('.visitor-card');


visitorCard.addEventListener('click', () =>{
    singleMessage.classList.toggle('active')
});


document.addEventListener('DOMContentLoaded', () =>{
    const messageDiv = document.querySelector('.visitors');
    const eachUserMessage = document.getElementById('Each-User-Message');
    //Get Messages
    let Messages = JSON.parse(localStorage.getItem('Messages'));
    if (Messages.length === 0) {
        messageDiv.innerHTML = 'No Messages Available'
        return
    }
    messageDiv.innerHTML = ""
    

    const deleteUserMessage = (msgId) =>{
        let Messages = JSON.parse(localStorage.getItem('Messages'));
        let updatedMessages = Messages.filter(message => message.msgId !== msgId);
        localStorage.setItem('Messages', JSON.stringify(updatedMessages));
        displayMessages()
        
    }

    const displayMessages = () =>{
        Messages.map((message) =>{
            const singleCard = document.createElement('div');
            singleCard.classList.add('visitor-card');
            singleCard.innerHTML = `
                <div class="image-names">
                    <div class="profile-pic">
                        <p class="profile-name" style="color: red;">NL</p>
                    </div>
                    <div class="visitor-name">
                        <h4>${message.userNames}</h4>
                        <p id="msgId">${message.msgId}
                        </p>
                    </div>
                </div>
                <div class="action-delete">
                    <button class="reply" id="relpyMessage" onclick="">Reply</button>
                    <form id="delete-form"
                    <button class="delete" id="deleteMessage" data-message-id="${message.msgId}">Delete</button>
                    </form>
                </div>
            `
            singleCard.addEventListener('click', ()=>{
                const singleCardMessages = document.createElement('div');
                singleCardMessages.classList.add('single-visitors-message');
    
                // sub Messages display
                singleCardMessages.innerHTML = `
                    <div class="names-email">
                        <h4>${message.userNames}</h4>
                        <p>${message.userEmail}</p>
                    </div>
                    <div class="message">
                        ${message.message.map(msg => `
                        <div class="single-message">
                            <p class="message-desc">${msg}</p>
                            <div class="time-ago">3min ago</div>
                        </div>
                    `).join('')}
                    </div>
                `;
                if (eachUserMessage.children.length >0) {
                    eachUserMessage.innerHTML = '';
                }
    
                eachUserMessage.appendChild(singleCardMessages)
            })
            messageDiv.appendChild(singleCard);
        });
     }
     displayMessages()

document.getElementById("deleteMessage").onclick = function() {
    var messageId = this.getAttribute("data-message-id");
        deleteUserMessage(messageId);
};
})



