const authCheckUrl = 'https://rest.clicksend.com/v3/account'
const username = 'raycai@hotmail.co.nz'
const apiKey = '9D54BDB7-A845-6768-CE45-24D20616F883'
const emailListId = 1451222;
const basecode = btoa(`${username}:${apiKey}`)

const modal = document.querySelector(".modal")
const dialogMessage = document.querySelector(".dialog__message_wrapper")
const messageCaption = dialogMessage.querySelector(".dialog__caption")
const messageText = dialogMessage.querySelector(".dialog__text")

const closeBtn = dialogMessage.querySelector("#close_modal")

const emailInput = document.querySelector('#email_input')
const errorMessage = document.querySelector('.main__text_error')

// const dialogVerify = document.querySelector(".dialog__verify_wrapper")
// const pinForm = document.querySelector('#pin_form');
// const pinInput = document.querySelector('#pin_input');

// let mobilePin = 0;

// function onSubmitPin() {
//     messageBox.textContent = (pinInput.value === mobilePin) ? "SUCCESS" : 'ERROR'

//     pinInput.value = ''
//     dialogVerify.classList.toggle("is-active")
//     dialogMessage.classList.toggle("is-active")
//     closeBtn.focus()
// }

// function validatePin(e) {
//     const theEvent = e || window.event;
//     let key = theEvent.keyCode || theEvent.which;
//     if (key !== 13) {
//         key = String.fromCharCode( key );
//         const regex = /[0-9]|\./;
//         if( !regex.test(key) || theEvent.target.value.length >= 4) {
//         theEvent.returnValue = false;
//         if (theEvent.preventDefault) theEvent.preventDefault();
//         }
//     }
// }

// pinForm.addEventListener('submit', e => {
//     e.preventDefault();
//     onSubmitPin();
// })
// pinInput.addEventListener('keypress', e => validatePin(e))
    // if (isEmailValid) {
    //     console.log(`sms fake-sent to email: ${emailInput.value}`)

    //     mobilePin = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
    //     console.log(mobilePin)
    //     alert(mobilePin)

    //     modal.classList.toggle("is-active")
    //     dialogVerify.classList.toggle("is-active")
    //     document.body.classList.toggle("not-scrollable")

    //     pinInput.focus()
    //     errorMessage.textContent = ''
    // }

const validateEmail = (email) => {
    const emailRegExp = /[-a-z0-9!#$%&'*+/=?^_`{|}~]+(\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.([a-z.]{2,9})$/i;
    return email.match(emailRegExp)
}

closeBtn.addEventListener('click', (e) => {
    modal.classList.remove("is-active")
    dialogMessage.classList.remove("is-active")
    document.body.classList.remove("not-scrollable")
})

const checkAuth = () => {
    const authOptions = {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Basic ${basecode}`,
        }
    }
    fetch(authCheckUrl, authOptions)
        .then(response => response.json())
        .then((result) => {
            console.log(result.response_code, 'authorized:', result.data.user_email);
        })
}
checkAuth();

document.querySelector('#sent_button').addEventListener('click', (e) => {
    e.preventDefault();

    const EmailUrl = `https://rest.clicksend.com/v3/lists/${emailListId}/contacts`
    const sendOptions = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Basic ${basecode}`,
        },
        body: JSON.stringify({
            "last_name": "Client",
            "first_name": "Test",
            "email": emailInput.value
        })
    }


    if (validateEmail(emailInput.value)) {
        errorMessage.textContent = '';
        fetch(EmailUrl, sendOptions)
        .then(response => response.json())
        .then((result) => {
            messageCaption.innerHTML = (result.http_code === 200) ? "You're on the list!" : 'Something went wrong... &#9940;';
            messageText.innerHTML = (result.http_code === 200) ? "We'll let you know when it's time to get jiggy with it &#128131" : 'Please try again later &#128257';
            document.body.classList.add("not-scrollable")
            modal.classList.add("is-active")
            dialogMessage.classList.add("is-active")
            closeBtn.focus()
        })
    } else errorMessage.textContent = 'Please enter a valid email address'
})

