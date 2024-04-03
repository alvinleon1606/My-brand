document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const namesError1 = document.querySelector('.name1-error');
        const namesError2 = document.querySelector('.name2-error');
        const emailError = document.querySelector('.email-error');
        const passwordError = document.querySelector('.password-error');
        const confirmPasswordError = document.querySelector('.confirm-password-error');

        // Reset error messages
        namesError1.innerHTML = '';
        namesError2.innerHTML = '';
        emailError.innerHTML = '';
        passwordError.innerHTML = '';
        confirmPasswordError.innerHTML = '';

        // Retrieve form values

        const firstName = document.getElementById('firstName').value.trim();
        const secondName= document.getElementById('secondName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPassword = document.getElementById('Comfirm-password').value.trim(); // Fixed typo in id

        // Regex patterns
        const namesRegex = /^[a-zA-Z]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/;

        // Validate Names
        if (!namesRegex.test(firstName)) {
            namesError1.innerHTML = 'Please enter your firstName  (first & last name).';
            namesError1.style.color = 'red';
            document.getElementById('firstName').style.borderColor = 'red';
        } else {
            document.getElementById('firstName').style.borderColor = 'green';
        }

        // Validate Names
        if (!namesRegex.test(secondName)) {
            namesError2.innerHTML = 'Please enter your secondName  (first & last name).';
            namesError2.style.color = 'red';
            document.getElementById('secondName').style.borderColor = 'red';
        } else {
            document.getElementById('secondName').style.borderColor = 'green';
        }

        // Validate Email
        if (!emailRegex.test(email)) {
            emailError.innerHTML = 'Please enter a valid email address.';
            emailError.style.color = 'red';
            document.getElementById('email').style.borderColor = 'red';
        } else {
            document.getElementById('email').style.borderColor = 'green';
        }

        // Validate Password
        if (!passwordRegex.test(password)) {
            passwordError.style.color = 'red';
            passwordError.innerHTML = 'Please enter a valid password with at least 5 characters, containing at least one digit, one uppercase letter, one lowercase letter, and one special character. No spaces allowed.';
            document.getElementById('password').style.borderColor = 'red';
        } else {
            document.getElementById('password').style.borderColor = 'green';
        }

        // Confirm Password
        if (password !== confirmPassword) {
            confirmPasswordError.innerHTML = 'Passwords do not match. Please enter matching passwords.';
            confirmPasswordError.style.color = 'red';
            document.getElementById('Comfirm-password').style.borderColor = 'red';
        } else {
            document.getElementById('Comfirm-password').style.borderColor = 'green';
        }

        // If no errors, proceed with form submission
        if (namesError1.innerHTML === '' && emailError.innerHTML === '' && passwordError.innerHTML === '' && confirmPasswordError.innerHTML === '') {
            // Submit the form
            form.submit();
        }
    });

    // Add event listeners for live validation with border color changes
    document.getElementById('secondName').addEventListener('input', function() {
        const secondName = this.value.trim();
        const namesRegex = /^[a-zA-Z]+$/;

        if (!namesRegex.test(secondName)) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = 'green';
        }
    });

    
    // Add event listeners for live validation with border color changes
    document.getElementById('firstName').addEventListener('input', function() {
        const firstName = this.value.trim();
        const namesRegex = /^[a-zA-Z]+$/;

        if (!namesRegex.test(firstName)) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = 'green';
        }
    });

    document.getElementById('email').addEventListener('input', function() {
        const email = this.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;

        if (!emailRegex.test(email)) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = 'green';
        }
    });

    document.getElementById('password').addEventListener('input', function() {
        const password = this.value.trim();
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/;

        if (!passwordRegex.test(password)) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = 'green';
        }
    });

    document.getElementById('Comfirm-password').addEventListener('input', function() {
        const confirmPassword = this.value.trim();
        const password = document.getElementById('password').value.trim();
        const confirmPasswordError = document.querySelector('.confirm-password-error');

        if (password !== confirmPassword) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = 'green';
        }
    });
});
