// Messages
const singleMessage = document.querySelector('.message');
const visitorCard = document.querySelector('.visitor-card');


visitorCard.addEventListener('click', () =>{
    singleMessage.classList.toggle('active')
});
