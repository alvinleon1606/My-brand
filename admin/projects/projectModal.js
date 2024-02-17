// Project Modal
const projectModal = document.querySelector('.project-modal');
const projectModalContent = document.querySelector('.project-modal-content');
const closeBtn = document.querySelector('.close');
const card = document.querySelectorAll('.card');

//  on page load
window.addEventListener('load', ()=>{
   projectModal.style.display = "none";
})

// all projects cards
card.forEach(eacgCard => eacgCard.addEventListener('click', ()=>{
   projectModal.style.display = "flex";
}))

// close 
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
   projectModal.style.display = "none";
 }

window.onclick = function(e) {
   if (e.target == projectModal) {
       projectModal.style.display = "none";
   }
 }