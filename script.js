// Menus 
const humbergerBtn = document.querySelector('.humburger');
const menus = document.querySelector('.nav-menu');


humbergerBtn.addEventListener("click", () => {
    humbergerBtn.classList.toggle('active');
    menus.classList.toggle('active');
})

// Hero section

const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const videoPlayIcon = document.querySelector('.video-play-icon');


videoPlayIcon.addEventListener('click', () =>{
    modal.style.display = "block";
});

// close 
var span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
  }

window.onclick = function(e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  }

// ++++++++++++++++++++++++ Services +++++++++++++++++++++++++++
  // Services variables
  const prevBtn = document.querySelector('.fa-circle-chevron-left');
  const nextBtn = document.querySelector('.fa-circle-chevron-right');
  const cardsContainer = document.querySelector('.cards');

  prevBtn.addEventListener("click", () => {
    cardsContainer.scrollLeft -= 900;
  })

  nextBtn.addEventListener("click", () => {
    cardsContainer.scrollLeft += 900;
  })


