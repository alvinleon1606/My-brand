document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const firstNamesError = document.querySelector('.name1-error');
        const secondNamesError = document.querySelector('.name2-error');
        const emailError = document.querySelector('.email-error');
        const PasswordError = document.querySelector('.password-error');
        const ComfirmNewPasswordError = document.querySelector('.comfirm-new-password-error');

        // Reset error messages
        firstNamesError.innerHTML = '';
        secondNamesError.innerHTML = '';
        emailError.innerHTML = '';
        PasswordError.innerHTML = '';
        ComfirmNewPasswordError.innerHTML = '';

        // Retrieve form values

        const firsName = document.getElementById('firstName').value.trim();
        const secondName = document.getElementById('secondName').value.trim();
        const email = document.getElementById('email').value.trim();
        const Password = document.getElementById('password').value.trim();
        const ComfirmNewPassword = document.getElementById('new2-password').value.trim();

        // Regex patterns
        const namesRegexName1 = /^[a-zA-Z]+$/;
        const namesRegexName2 = /^[a-zA-Z]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/;

        // Validate Name 1
        if (!namesRegexName1.test(firsName)) {
            firstNamesError.innerHTML = 'Please enter your full name (first name).';
            firstNamesError.style.color = 'red';
            document.getElementById('firstName').style.borderColor = 'red';
        } else {
            document.getElementById('firstName').style.borderColor = 'green';
        }

        // Validate Name 2
        if (!namesRegexName2.test(secondName)) {
            secondNamesError.innerHTML = 'Please enter your full name ( last name).';
            secondNamesError.style.color = 'red';
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

        
        // Validate New Password
        if (!passwordRegex.test(Password)) {
            PasswordError.style.color = 'red';
            PasswordError.innerHTML = 'Please enter a valid password with at least 5 characters, containing at least one digit, one uppercase letter, one lowercase letter, and one special character. No spaces allowed.';
            document.getElementById('password').style.borderColor = 'red';
        } else {
            document.getElementById('password').style.borderColor = 'green';
        }

        // Validate comfirm New Password
        if (!passwordRegex.test(ComfirmNewPassword)) {
            ComfirmNewPasswordError.style.color = 'red';
            ComfirmNewPasswordError.innerHTML = 'Please enter a valid password with at least 5 characters, containing at least one digit, one uppercase letter, one lowercase letter, and one special character. No spaces allowed.';
            document.getElementById('new2-password').style.borderColor = 'red';
        } else {
            document.getElementById('new2-password').style.borderColor = 'green';
        }

        // Confirm Password
        if (Password !== ComfirmNewPassword) {
            ComfirmNewPasswordError.innerHTML = 'Passwords do not match. Please enter matching passwords.';
            ComfirmNewPasswordError.style.color = 'red';
            document.getElementById('new2-password').style.borderColor = 'red';
        } else {
            document.getElementById('new2-password').style.borderColor = 'green';
        }

    });

    // Add event listeners for live validation with border color changes
    document.getElementById('firstName').addEventListener('input', function() {
        const names = this.value.trim();
        const namesRegexName1 = /^[a-zA-Z]+$/;

        if (!namesRegexName1.test(names)) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = 'green';
        }
    });

    document.getElementById('secondName').addEventListener('input', function() {
        const names = this.value.trim();
        const namesRegexName1 = /^[a-zA-Z]+$/;

        if (!namesRegexName1.test(names)) {
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
     
    // New password
    document.getElementById('password').addEventListener('input', function() {
        const password = this.value.trim();
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/;

        if (!passwordRegex.test(password)) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = 'green';
        }
    });

    // Comfirm new Password
    document.getElementById('new2-password').addEventListener('input', function() {
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
        const comfirmPasswordError = document.querySelector('.confirm-password-error');

        if (password !== confirmPassword) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = 'green';
        }
    });
});
