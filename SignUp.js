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
