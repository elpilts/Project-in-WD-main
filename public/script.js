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
    const formElements = [
        document.getElementById('name'),
        document.getElementById('surname'),
        document.getElementById('email'),
        document.getElementById('phone'),
        document.getElementById('field-of-studies'),
        document.getElementById('password'),
        document.getElementById('repeat-password')
    ];
  
    const signUpButton = document.getElementById('sign-up-button');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const repeatPasswordInput = document.getElementById('repeat-password');
    const passwordMismatchMessage = document.getElementById('password-mismatch');
  
    function validateForm() {
        const allFilled = formElements.every(input => input.value.trim() !== '');
        const phoneValid = /^\d{10}$/.test(phoneInput.value);
        const passwordsMatch = passwordInput.value === repeatPasswordInput.value;
        
        if (allFilled && phoneValid) {
            signUpButton.disabled = false;
            signUpButton.classList.add('btn-enabled');
        } else {
            signUpButton.disabled = true;
            signUpButton.classList.remove('btn-enabled');
        }
  
        if (!passwordsMatch && repeatPasswordInput.value.trim() !== '') {
            passwordMismatchMessage.style.display = 'block';
        } else {
            passwordMismatchMessage.style.display = 'none';
        }
    }
  
    phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, '').substring(0, 10); // Remove non-numeric characters and limit to 10 digits
        validateForm();
    });
  
    repeatPasswordInput.addEventListener('blur', validateForm);
  
    formElements.forEach(element => {
        element.addEventListener('input', validateForm);
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
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


//delete account

document.addEventListener("DOMContentLoaded", function () {
  const deleteAccountBtn = document.getElementById('deleteAccountBtn');
  const userEmail = document.getElementById('userEmail').innerText;

  deleteAccountBtn.addEventListener('click', function () {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
          // Make a DELETE request to the server to delete the account
          fetch('/delete-account', {
              method: 'DELETE',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email: userEmail })
          })
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                  alert('Your account has been successfully deleted.');
                  // Optionally, redirect to another page or update the UI
                  window.location.href = '/home';
              } else {
                  alert('There was an error deleting your account. Please try again.');
              }
          })
          .catch(error => {
              console.error('Error:', error);
              alert('There was an error deleting your account. Please try again.');
          });
      }
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