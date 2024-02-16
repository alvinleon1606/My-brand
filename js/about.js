//   About Me
// +++++++++++++++++ Background ++++++++++++++++

var educationInfo = document.querySelector('.education-background');
var personalInfo = document.querySelector('.expirience-background');
// Buttons
var educationBtn = document.querySelector('.education');
var personalBtn = document.querySelector('.experience');

document.querySelector('.education').addEventListener('click', () => {
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
  
  document.querySelector('.experience').addEventListener('click', () => {
    var educationInfo = document.querySelector('.education-background');
    var personalInfo = document.querySelector('.expirience-background');
    
    educationInfo.style.display = 'none';
    educationBtn.classList.remove('active');
    personalInfo.style.display = 'grid';
    personalBtn.classList.add('active');
  });