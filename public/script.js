const deleteController = await import(`../controllers/Delete.mjs`)

//numbers
let valueDisplays = document.querySelectorAll(".num");
let interval = 4000;

valueDisplays.forEach((valueDisplay) => {
  let startValue = 0;
  let endValue = parseInt(valueDisplay.getAttribute("data-val"));
  let duration = Math.floor(interval / endValue);
  let counter = setInterval(function () {
    startValue += 1;
    valueDisplay.textContent = startValue;
    if (startValue == endValue) {
      clearInterval(counter);
    }
  }, duration);
});

// .about section
var aboutImage = document.querySelector(".about-image");
var aboutCurrentPos = 0;
var aboutImages = ["Picture1.jpg", "Picture2.jpg", "Picture3.jpg"];
function rotateAboutImage() {
  if (++aboutCurrentPos >= aboutImages.length)
    aboutCurrentPos = 0;
    aboutImage.src = aboutImages[aboutCurrentPos];
}
setInterval(rotateAboutImage, 3000);

//.partners section

var partnersCurrentPos = 0;
var partnersImages = ["barilla.png", "elite.png", "misko.png"];
var partnersTitles = ["EBEC", "BEST Course in Summer", "JobFair"];
var partnersTexts = ["Barilla", "Elite", "Misko"];
var partnersImage = document.querySelector(".partners-image");
var partnersText = document.querySelector(".partners-text");
var partnersTitle = document.querySelector(".partners-title");

function rotatePartnersImage() {
    partnersCurrentPos = (partnersCurrentPos + 1) % partnersImages.length;
    partnersImage.src = partnersImages[partnersCurrentPos];
    partnersText.textContent = partnersTexts[partnersCurrentPos];
    partnersTitle.textContent = partnersTitles[partnersCurrentPos]; 
}

setInterval(rotatePartnersImage, 3500);


///// Sign Up
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('signup-form');
  const formElements = [
      document.getElementById('name'),
      document.getElementById('surname'),
      document.getElementById('email'),
      document.getElementById('phone'),
      document.getElementById('field-of-studies'),
      document.getElementById('password'),
      document.getElementById('repeat-password')
  ];

  const signUpButton = document.getElementById('signbtn');
  const phoneInput = document.getElementById('phone');
  const passwordInput = document.getElementById('password');
  const repeatPasswordInput = document.getElementById('repeat-password');
  const passwordMismatchMessage = document.getElementById('password-mismatch');

  function validateForm() {
      console.log("Validating form...");
      const allFilled = formElements.every(input => input.value.trim() !== '');
      const phoneValid = /^\d{10}$/.test(phoneInput.value);
      const passwordsMatch = passwordInput.value === repeatPasswordInput.value;

      if (allFilled && phoneValid && passwordsMatch) {
          signUpButton.disabled = false;
          signUpButton.classList.add('signbtn-enabled');
      } else {
          signUpButton.disabled = true;
          signUpButton.classList.remove('signbtn-enabled');
      }

      passwordMismatchMessage.style.display = (!passwordsMatch && repeatPasswordInput.value.trim() !== '') ? 'block' : 'none';
  }

  phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, '').substring(0, 10); // Remove non-numeric characters and limit to 10 digits
      validateForm();
  });

  formElements.forEach(element => {
      element.addEventListener('input', validateForm);
  });

   const togglePasswordButtons = document.querySelectorAll('.toggle-password');

  togglePasswordButtons.forEach(button => {
      button.addEventListener('click', function() {
          const passwordInput = button.previousElementSibling;
          const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
          passwordInput.setAttribute('type', type);
          button.textContent = type === 'password' ? 'Show' : 'Hide';
      });
  });
});


//εκδηλώσεις
//import { compareSync } from "bcrypt";

// let a=0;
// document.addEventListener('DOMContentLoaded', function() {
//     // deleteDiv();
//     // changef();
//     // insertf();
//     // heightClass();
// });

// function heightClass(){
//     const Divs = document.querySelectorAll('.events div');
//     const allthedivs = [];
//     Divs.forEach(div => {
//         const divHeight = div.offsetHeight;
//         allthedivs.push(divHeight);
//     });
//     console.log("length:", allthedivs.length);
//     for (let i = 0; i < allthedivs.length; i++){
//         if (i%2==0){
//             console.log(i,allthedivs[i]);
//         };
//     }
// };

//Delete
function deleteDiv(){
    const del = document.querySelectorAll('.Delete');
    del.forEach(button => {
        button.addEventListener('click', function() {
            const parentDiv = button.closest('.event div');
            if (parentDiv) {
                deleteController.DeleteEvent(parentDiv);
                return parentDiv;
            //   const delEvent = parentDiv.querySelector('em').textContent;
            //   localStorage.setItem('deletedElementId', parentDiv.id); //για να διαγραφει μονιμα
            //   parentDiv.remove();
            //   const formData = new FormData();
            //   formData.append('name', eventName);
            //   //post method
            //   fetch('/events', {
            //     method: 'POST',
            //     body: formData
            //   })
            //   .then(response => {
            //       if (response.ok) {
            //           console.log('Event deleted successfully');
            //       } else {
            //           console.error('Failed to delete event');
            //       }
            //   })
            }
        });
    });
};

async function deleteEvent(button) {
  const eventName = button.closest('.event').getAttribute('data-event-name');
  try {
      const response = await fetch(`/events/${eventName}`, {
          method: 'DELETE'
      });
      if (response.ok) {
          console.log('Event deleted successfully');
          button.closest('.event').remove();
      } else {
          console.error('Failed to delete event');
      }
  } catch (error) {
      console.error('Error deleting event:', error);
  }
}