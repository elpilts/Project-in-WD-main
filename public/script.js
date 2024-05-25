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

  function sendData() {
      console.log("Sending data...");
      const formData = new FormData();
      formElements.forEach(input => {
          formData.append(input.name, input.value);
      });

      fetch('/signup', {
          method: 'POST',
          body: formData
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Failed to sign up');
          }
          return response.json();
      })
      .then(data => {
          console.log("Signup successful:", data);
          // Redirect to a success page or show a success message
      })
      .catch(error => {
          console.error("Error during signup:", error);
          // Handle error
      });
  }

  signUpButton.addEventListener('click', function() {
      if (passwordInput.value === repeatPasswordInput.value) {
          sendData();
      } else {
          passwordMismatchMessage.style.display = 'block';
      }
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
