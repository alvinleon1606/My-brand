document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('footer-subscribe');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('subscribe-email').value;

        try {
            const response = await fetch('http://localhost:8080/subscribers/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });

            if (!response.ok) {
                throw new Error('Failed to subscribe');
            }

            document.querySelector('.email-error').innerHTML = 'Subscription Successful!';
        } catch (error) {
            console.error('Failed to subscribe:', error);
            document.querySelector('.email-error').innerHTML = 'Subscription Failed!';
        }
    });
});
