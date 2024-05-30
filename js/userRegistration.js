const form = document.getElementById('form');
document.addEventListener('DOMContentLoaded', function () {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const secondName = document.getElementById('secondName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('Comfirm-password').value;

        if (password !== confirmPassword) {
            document.querySelector('.confirm-password-error').innerHTML = 'Passwords do not match';
            return;
        }

        const userData = {
            firstName: firstName,
            secondName: secondName,
            email: email,
            password: password
        };

        try {
            const response = await fetch('https://leonx-ldu1-vvuz.onrender.com/users/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            
            alert('Well Registered')
            window.location.href = './Login.html'; 
        } catch (error) {
            console.error(error);
        }        
        
    });
});
