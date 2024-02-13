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
    modal.style.display = "block"
})


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


//   About Me
// +++++++++++++++++ Background ++++++++++++++++

var educationInfo = document.querySelector('.education-background');
var personalInfo = document.querySelector('.expirience-background');
// Buttons
var educationBtn = document.querySelector('.education');
var personalBtn = document.querySelector('.experience');

document.querySelector('.education').addEventListener('click', function() {
    
    educationInfo.style.display = 'grid';
    educationBtn.classList.add('active');
    personalInfo.style.display = 'none';
    personalBtn.classList.remove('active');
  });

  window.onload=() =>{
    educationInfo.style.display = 'grid';
    educationBtn.classList.add('active');
    personalInfo.style.display = 'none';
    personalBtn.classList.remove('active');
  }
  
  document.querySelector('.experience').addEventListener('click', function() {
    var educationInfo = document.querySelector('.education-background');
    var personalInfo = document.querySelector('.expirience-background');
    
    educationInfo.style.display = 'none';
    educationBtn.classList.remove('active');
    personalInfo.style.display = 'grid';
    personalBtn.classList.add('active');
  });