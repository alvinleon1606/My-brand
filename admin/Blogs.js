// Project Modal
const BlogModal = document.querySelector('.blog-modal');
const BlogModalContent = document.querySelector('.blog-modal-content');
const closeBtn = document.querySelector('.close');
const card = document.querySelectorAll('.card');

//  on page load
window.addEventListener('load', ()=>{
   BlogModal.style.display = "none";
})

// all projects cards
card.forEach(eacgCard => eacgCard.addEventListener('click', ()=>{
   BlogModal.style.display = "flex";
}))

// close 
var span = document.getElementsByClassName("close")[0];

span.addEventListener('click', () =>{
   BlogModal.style.display = "none";
})

window.onclick = (e) => {
   if (e.target == BlogModal) {
       BlogModal.style.display = "none";
   }
 }
