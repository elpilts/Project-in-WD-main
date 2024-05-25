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
// function deleteDiv(){
//     const del = document.querySelectorAll('.Delete');
//     del.forEach(button => {
//         button.addEventListener('click', function() {
//             const parentDiv = button.closest('.event div');
//             if (parentDiv) {
//               const delEvent = parentDiv.querySelector('em').textContent;
//               localStorage.setItem('deletedElementId', parentDiv.id); //για να διαγραφει μονιμα
//               parentDiv.remove();
//               const formData = new FormData();
//               formData.append('name', eventName);
//               //post method
//               fetch('/events', {
//                 method: 'POST',
//                 body: formData
//               })
//               .then(response => {
//                   if (response.ok) {
//                       console.log('Event deleted successfully');
//                   } else {
//                       console.error('Failed to delete event');
//                   }
//               })


//             }
//         });
//     });
// };

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

async function editEvent(button) {
  const eventName = button.closest('.event').getAttribute('data-event-name');
  const newDescription = document.getElementById('description').value;
  const newPicture = document.getElementById('picture').value;
  
  try {
      const response = await fetch(`/events/edit/`, {
          method: 'POST'
      });

      if (response.ok) {
          console.log('Event edited successfully');
      } else {
          console.error('Failed to edit event');
      }
  } catch (error) {
      console.error('Error editing event:', error);
  }
}

//Insert
// function insertf(){
//     let name = sessionStorage.getItem('eventName');
//     let description = sessionStorage.getItem('eventDescription');
//     let picture = sessionStorage.getItem('eventPicture');

//     if (name&&description&&picture&&a==0){
//         const newEvent = document.createElement('div');
//         const className = name.replace(/\s+/g, '-').toLowerCase();

//         newEvent.innerHTML = `
//             <div class="${className}">
//                 <h2><em>${name}</em><button class="Edit" id="e-course">Edit</button><button class="Delete" id="d-course">Delete</button></h2>
//                 <div class="con-${className}">
//                     <p>${description}</p>
//                     <img src="${picture}" alt="Image about ${name}">
//                 </div>
//             </div>
//             <style>.con-${className}{
//                 display: flex;
//                 width: 80%;
//               }
//             //   .${className}::before{
//             //     content: "";
//             //     position: absolute;
//             //     left: 100px;
//             //     top: 40%;
//             //     width: 20px;
//             //     height: 20px;
//             //     background-color: #360f2a;
//             //     border-radius: 50%;
//               }
//             </style>
//         `;

//         const eventContainer = document.querySelector('.events');
//         eventContainer.appendChild(newEvent);
//         // deleteDiv();
//         name="";
//         description=""
//         picture="";
//     }
//     a=0;
// };

//Edit
// function changef(){
//     console.log("change a",a);
//     const ed = document.querySelectorAll('.Edit');
//     ed.forEach(button => {
//         button.addEventListener('click', function() {
//             let name = sessionStorage.getItem('eventName2');
//             let description = sessionStorage.getItem('eventDescription2');
//             let picture = sessionStorage.getItem('eventPicture2');
//             console.log(name, description, picture);
//             const parentDiv = button.closest('div'); 
//             console.log("1",name,description,picture,parentDiv);
//             if (parentDiv) {
//                 const parentClassList = parentDiv.classList;
//                 const className = parentClassList[0];
//                 const theDiv = document.querySelector(`.${className}`);
//                 if (theDiv) {
//                     const classTitle = theDiv.querySelector('h2 em');
//                     const classP = theDiv.querySelector('p');
//                     const imgElement = theDiv.querySelector('img');
//                     console.log("2",classTitle,classP,imgElement);
//                     if (imgElement) {
//                         const imgSrc = imgElement.src;
//                         const classImg = imgSrc.substring(imgSrc.lastIndexOf('/') + 1);
//                         if (name && classTitle){
//                             classTitle.innerText = name;
//                             console.log("name complete");
//                         }
//                         if(description && classP){
//                             classP.innerText = description;
//                             console.log("description complete");
//                         }
//                         if(picture && classImg){
//                             classImg.innerText = picture;
//                             console.log("picture complete");
//                         }
//                     }
//                 }
//                 a=1;
//             }
//             name="";
//             description=""
//             picture="";
//         });
//     });
// };

//Edit
// document.addEventListener('DOMContentLoaded', function() {
//   const insert = document.querySelector('.btn');
//   insert.addEventListener('click', function() {
//       const name = document.getElementById('name').value;
//       const description = document.getElementById('description').value;
//       const picture = document.getElementById('picture').value;

//       sessionStorage.setItem('eventName', name);
//       sessionStorage.setItem('eventDescription', description);
//       sessionStorage.setItem('eventPicture', picture);

//       setTimeout(() => {
//           window.location.href = 'views/EventPage.hbs';
//       }, 100);
//   });
// });

//Insert
// document.addEventListener('DOMContentLoaded', function() {
//   const insert = document.querySelector('create-btn');
//   insert.addEventListener('click', function() {
//       const name = document.getElementById('name').value;
//       const description = document.getElementById('description').value;
//       const picture = document.getElementById('picture').value;

//       sessionStorage.setItem('eventName', name);
//       sessionStorage.setItem('eventDescription', description);
//       sessionStorage.setItem('eventPicture', picture);

//       window.location.href = '/insert-event';
//   });
// });