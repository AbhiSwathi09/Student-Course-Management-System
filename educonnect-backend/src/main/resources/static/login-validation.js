document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    loginForm.addEventListener('submit', function(event) {
        let isValid = true;

        // Reset errors and invalid class
        emailError.textContent = '';
        passwordError.textContent = '';
        emailInput.classList.remove('invalid');
        passwordInput.classList.remove('invalid');

        // Email validation
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required.';
            emailInput.classList.add('invalid');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            emailInput.classList.add('invalid');
            isValid = false;
        }

        // Password validation
        if (passwordInput.value.trim() === '') {
            passwordError.textContent = 'Password is required.';
            passwordInput.classList.add('invalid');
            isValid = false;
        } else if (passwordInput.value.trim().length < 6) { // Example: minimum 6 characters
            passwordError.textContent = 'Password must be at least 6 characters long.';
            passwordInput.classList.add('invalid');
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if validation fails
        } else {
            // This alert is for demonstration purposes only.
            // In a real application, you would send this data to a server for authentication.
            alert('Login form submitted successfully (frontend validation passed)!');
            // event.preventDefault(); // Uncomment this line if you want to prevent page reload after alert for demo
        }
    });

    // Optional: Real-time validation feedback as user types
    emailInput.addEventListener('input', function() {
        if (emailInput.value.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
            emailError.textContent = '';
            emailInput.classList.remove('invalid');
        }
    });

    passwordInput.addEventListener('input', function() {
        if (passwordInput.value.trim() !== '' && passwordInput.value.trim().length >= 6) {
            passwordError.textContent = '';
            passwordInput.classList.remove('invalid');
        }
    });
});