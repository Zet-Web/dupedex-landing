const authCheckUrl = 'https://rest.clicksend.com/v3/account'
const username = ''
const apiKey = ''
const basecode = btoa(`${username}:${apiKey}`)

const modal = document.querySelector(".modal")
const dialogVerify = document.querySelector(".dialog__verify_wrapper")
const dialogMessage = document.querySelector(".dialog__message_wrapper")
const messageBox = dialogMessage.querySelector(".dialog__caption")

const closeBtn = dialogMessage.querySelector(".close_modal")

const phoneInput = document.querySelector('#phone_input')
const errorMessage = document.querySelector('.hero-section__text_error')

const pinForm = document.querySelector('#pin_form');
const pinInput = document.querySelector('#pin_input');

let mobilePin = 0;

function onSubmitPin() {
    messageBox.textContent = (pinInput.value === mobilePin) ? "SUCCESS" : 'ERROR'

    pinInput.value = ''
    dialogVerify.classList.toggle("is-active")
    dialogMessage.classList.toggle("is-active")
    closeBtn.focus()
}

function validatePin(e) {
    const theEvent = e || window.event;
    let key = theEvent.keyCode || theEvent.which;
    if (key !== 13) {
        key = String.fromCharCode( key );
        const regex = /[0-9]|\./;
        if( !regex.test(key) || theEvent.target.value.length >= 4) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }
}

function validatePhone(e) {
    const theEvent = e || window.event;
    let key = theEvent.keyCode || theEvent.which;
    if (key !== 13) {
        key = String.fromCharCode( key );
        const regex = /[0-9]|\+/;
        if( !regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }
}

const fakeVerifying = (phone) => {

    const phoneRegexp = /^\+{1}([0-9]{4,13})$/g
    const isPhoneValid = phone.match(phoneRegexp)

    if (isPhoneValid) {
        mobilePin = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
        console.log(mobilePin)
        alert(mobilePin)

        modal.classList.toggle("is-active")
        dialogVerify.classList.toggle("is-active")
        document.body.classList.toggle("not-scrollable")

        pinInput.focus()
        errorMessage.textContent = ''
    }
    else errorMessage.textContent = 'Please enter valid number : +64.....'
}


pinForm.addEventListener('submit', e => {
    e.preventDefault();
    onSubmitPin();
})

phoneInput.addEventListener('keypress', e => validatePhone(e))
pinInput.addEventListener('keypress', e => validatePin(e))

document.querySelectorAll('.close_modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
        modal.classList.remove("is-active")
        dialogVerify.classList.remove("is-active")
        dialogMessage.classList.remove("is-active")
        document.body.classList.remove("not-scrollable")
    })
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

    console.log(`sms fake-sent to phone number: ${phoneInput.value}`)
    fakeVerifying(phoneInput.value)

    // DONT UNCOMMENT!! OR PAY FOR SMS SENDING!!

    // const sendSMSUrl = 'https://rest.clicksend.com/v3/sms/send'
    // const sendOptions = {
    //     method: "POST",
    //     mode: "cors",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Accept": "application/json",
    //         "Authorization": `Basic ${basecode}`,
    //     },
    //     body: JSON.stringify({
    //         "messages": [
    //           {
    //             "to": `${phoneInput}`,
    //             "source": "Dupe.dex",
    //             "body": "Hello. Please verify your phone number with PIN: ####"
    //           }
    //         ]
    //       })
    // }
    // fetch(sendSMSUrl, sendOptions)
    //     .then(response => response.json())
    //     .then((result) => {
    //         return console.log(result)})
})

