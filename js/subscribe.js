document.addEventListener('DOMContentLoaded', () =>{
    const form = document.getElementById('footer-subscribe');
    const subScribers = JSON.parse(localStorage.getItem('Subscribers')) || []


    form.addEventListener('submit', ()=> {
        const email = document.getElementById('subscribe-email').value;

        // check if already subscribed
        const alreadySub = subScribers.find((sub) => sub.subEmail === email );
        if (alreadySub) {
            document.querySelector('.email-error').innerHTML="You Have Already Subscribed !";
        }
        else{
            //Subscribution object
            const newSubscribution = {
                subEmail: email,
                subDate : Date.now()
            }

            // save
            subScribers.push(newSubscribution);
            localStorage.setItem("Subscribers", JSON.stringify(subScribers))

             setTimeout(() =>{
                document.querySelector('.email-error').innerHTML="Subscribution Successfully !";
                document.querySelector('#comfirm-notify').style.display="block";
            }, 3000);

            setTimeout(() =>{
                document.querySelector('.email-error').innerHTML="";
                document.querySelector('#comfirm-notify').style.display="none";
            }, 6000);


        }
    })
})