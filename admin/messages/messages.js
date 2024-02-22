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

    Messages.map((message) =>{
        const singleCard = document.createElement('div');
        singleCard.classList.add('visitor-card');
        singleCard.innerHTML = `
            <div class="image-names">
                <div class="image">
                    <img src="../../assets/mee_1.png" alt="">
                </div>
                <div class="visitor-name">
                    <h4>${message.userNames}</h4>
                    <p>${message.message}
                    </p>
                </div>
            </div>
            <div class="action-delete">
                <button class="reply">Reply</button>
                <button class="delete">Delete</button>
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
                    <div class="single-message">
                        <p class="message-desc"> ${message.message}
                        </p>
                        <div class="time-ago">3min ago</div>
                    </div>
                </div>
            `;
            if (eachUserMessage.children.length >0) {
                eachUserMessage.innerHTML = '';
            }

            eachUserMessage.appendChild(singleCardMessages)
        })
        messageDiv.appendChild(singleCard);
    })
})
// Each-User-Message