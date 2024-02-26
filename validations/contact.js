document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const namesError = document.querySelector('.names-error');
        const emailError = document.querySelector('.email-error');
        const telephoneError = document.querySelector('.telephone-error');
        const subjectError = document.querySelector('.subject-error');
        const messageError = document.querySelector('.message-error');


        // Reset error messages
        namesError.innerHTML = '';
        emailError.innerHTML = '';
        telephoneError.innerHTML = '';
        subjectError.innerHTML = '';
        messageError.innerHTML = '';

        // Retrieve form values

        const names = document.getElementById('names').value.trim();
        const email = document.getElementById('email').value.trim();
        const telephone = document.getElementById('telephone').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();


        // Regex patterns
        const namesRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
        const telephoneRegex = /^\+\d{9,15}$/;
        const subjectRegex = /^.{5,20}$/;
        const messageRegex = /^.{10,600}$/;

        // Validate Names
        if (!namesRegex.test(names)) {
            namesError.innerHTML = 'Please enter your full name (first & last name).';
            namesError.style.color = 'red';
            document.getElementById('names').style.borderColor = 'red';
        } else {
            document.getElementById('names').style.borderColor = 'green';
        }

        // Validate Email
        if (!emailRegex.test(email)) {
            emailError.innerHTML = 'Please enter a valid email address.';
            emailError.style.color = 'red';
            document.getElementById('email').style.borderColor = 'red';
        } else {
            document.getElementById('email').style.borderColor = 'green';
        }

        // Validate telephone
        if (!telephoneRegex.test(telephone)) {
            telephoneError.innerHTML = 'Telephone started by + and can be 9-15 numbers';
            telephoneError.style.color = 'red';
            document.getElementById('telephone').style.borderColor = 'red';
        } else {
            document.getElementById('telephone').style.borderColor = 'green';
        }

        // Validate message
        if (!messageRegex.test(message)) {
            messageError.style.color = 'red';
            messageError.innerHTML = 'Message can not be under 10 and axceed 600 charactors long';
            document.getElementById('message').style.borderColor = 'red';
        } else {
            document.getElementById('message').style.borderColor = 'green';
        }

     // Validate subject
     if (!subjectRegex.test(subject)) {
        subjectError.style.color = 'red';
        subjectError.innerHTML = 'subject can not be under 5 and axceed 40 charactors long';
        document.getElementById('subject').style.borderColor = 'red';
    } else {
        document.getElementById('subject').style.borderColor = 'green';
    }

        // If no errors, proceed with form submission
        if (namesError.innerHTML === '' && emailError.innerHTML === '' && messageError.innerHTML === '' && subjectError.innerHTML === '') {
            // Submit the form
            form.submit();
        }
    });

    // Add event listeners for live validation with border color changes
    document.getElementById('names').addEventListener('input', function() {
        const names = this.value.trim();
        const namesRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;

        if (!namesRegex.test(names)) {
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

    document.getElementById('message').addEventListener('input', function() {
        const message = this.value.trim();
        const messageRegex = /^.{10,40}$/;

        if (!messageRegex.test(message)) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = 'green';
        }
    });

    document.getElementById('subject').addEventListener('input', function() {
        const subject = this.value.trim();
        const subjectRegex = /^.{5,20}$/;

        if (!subjectRegex.test(subject)) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = 'green';
        }
    });

    document.getElementById('telephone').addEventListener('input', function() {
        const telephone = this.value.trim();
        const telephoneRegex = /^\+\d{9,15}$/;

        if (!telephoneRegex.test(telephone)) {
            this.style.borderColor = 'red';
        } else {
            this.style.borderColor = 'green';
        }
    });
});
