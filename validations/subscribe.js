// Subscribe
const emailError = document.querySelector('.email-error');


document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.footer-subscribe');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
        // value
        const email = document.querySelector('.email-input').value.trim();
         // Validate Email
        if (!emailRegex.test(email)) {
            emailError.innerHTML = 'Please enter a valid email address.';
            emailError.style.color = 'red';
            document.querySelector('.email-input').style.borderColor = 'red';
        } else {
            document.querySelector('.email-input').style.borderColor = 'green';
        }
    })

        // live input validation
        document.querySelector('.email-input').addEventListener('input', function() {
            const email = this.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
    
            if (!emailRegex.test(email)) {
                this.style.border = '1px solid red';
            } else {
                this.style.borderColor = 'green';
            }
        });
})
