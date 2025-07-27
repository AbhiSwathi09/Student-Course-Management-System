document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('registerEmail');
    const passwordInput = document.getElementById('registerPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');

    const fullNameError = document.getElementById('fullNameError');
    const emailError = document.getElementById('registerEmailError');
    const passwordError = document.getElementById('registerPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const termsError = document.getElementById('termsError');

    registerForm.addEventListener('submit', function(event) {
        let isValid = true;

        // Reset errors and invalid class
        [fullNameError, emailError, passwordError, confirmPasswordError, termsError].forEach(el => el.textContent = '');
        [fullNameInput, emailInput, passwordInput, confirmPasswordInput].forEach(el => el.classList.remove('invalid'));

        // Full Name Validation
        if (fullNameInput.value.trim() === '') {
            fullNameError.textContent = 'Full Name is required.';
            fullNameInput.classList.add('invalid');
            isValid = false;
        }

        // Email Validation
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required.';
            emailInput.classList.add('invalid');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            emailInput.classList.add('invalid');
            isValid = false;
        }

        // Password Validation
        if (passwordInput.value.trim() === '') {
            passwordError.textContent = 'Password is required.';
            passwordInput.classList.add('invalid');
            isValid = false;
        } else if (passwordInput.value.trim().length < 8) { // Minimum 8 characters
            passwordError.textContent = 'Password must be at least 8 characters long.';
            passwordInput.classList.add('invalid');
            isValid = false;
        } else if (!/[A-Z]/.test(passwordInput.value.trim()) || // At least one uppercase
                   !/[a-z]/.test(passwordInput.value.trim()) || // At least one lowercase
                   !/[0-9]/.test(passwordInput.value.trim()) || // At least one number
                   !/[^A-Za-z0-9]/.test(passwordInput.value.trim())) { // At least one special character
            passwordError.textContent = 'Password must include uppercase, lowercase, number, and special character.';
            passwordInput.classList.add('invalid');
            isValid = false;
        }

        // Confirm Password Validation
        if (confirmPasswordInput.value.trim() === '') {
            confirmPasswordError.textContent = 'Please confirm your password.';
            confirmPasswordInput.classList.add('invalid');
            isValid = false;
        } else if (confirmPasswordInput.value.trim() !== passwordInput.value.trim()) {
            confirmPasswordError.textContent = 'Passwords do not match.';
            confirmPasswordInput.classList.add('invalid');
            isValid = false;
        }

        // Terms and Conditions Validation
        if (!termsCheckbox.checked) {
            termsError.textContent = 'You must agree to the Terms of Service and Privacy Policy.';
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if validation fails
        } else {
            // This alert is for demonstration purposes only.
            // In a real application, you would send this data to a server to create the account.
            alert('Registration form submitted successfully (frontend validation passed)!');
            // event.preventDefault(); // Uncomment this line if you want to prevent page reload after alert for demo
        }
    });

    // Optional: Real-time validation feedback as user types for better UX
    fullNameInput.addEventListener('input', function() {
        if (fullNameInput.value.trim() !== '') {
            fullNameError.textContent = '';
            fullNameInput.classList.remove('invalid');
        }
    });

    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
            emailError.textContent = '';
            emailInput.classList.remove('invalid');
        }
    });

    passwordInput.addEventListener('input', function() {
        const password = passwordInput.value.trim();
        // Check all password criteria
        if (password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password)) {
            passwordError.textContent = '';
            passwordInput.classList.remove('invalid');
        }
    });

    confirmPasswordInput.addEventListener('input', function() {
        if (confirmPasswordInput.value.trim() !== '' && confirmPasswordInput.value.trim() === passwordInput.value.trim()) {
            confirmPasswordError.textContent = '';
            confirmPasswordInput.classList.remove('invalid');
        }
    });

    termsCheckbox.addEventListener('change', function() {
        if (termsCheckbox.checked) {
            termsError.textContent = '';
        }
    });
});