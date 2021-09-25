
const form = document.querySelector("#form-id");
const name = document.querySelector("#name");
const nameError = document.querySelector("#nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");
const formSucces = document.querySelector("#formSuccess");

function validateForm(event) {
    event.preventDefault();

    if (checkLength(name.value, 5) === true) {
        name.style.border = "1px solid green";
        nameError.style.display = "none";
    } else {
        name.style.border = "1px solid red";
        nameError.style.display = "block";
    }

    if (validateEmail(email.value) === true) {
        email.style.border = "1px solid green";
        emailError.style.display = "none";
    } else {
        email.style.border = "1px solid red";
        emailError.style.display = "block";
    }

    if (checkLength(subject.value, 15) === true) {
        subject.style.border = "1px solid green";
        subjectError.style.display = "none";
    } else {
        subject.style.border = "1px solid red";
        subjectError.style.display = "block";
    }

    if (checkLength(message.value, 25) === true) {
        message.style.border = "1px solid green";
        messageError.style.display = "none";
    } else {
        message.style.border = "1px solid red";
        messageError.style.display = "block";
    }

    if (checkLength(name.value, 5) === true && validateEmail(email.value) === true &&
        checkLength(subject.value, 15) === true && checkLength(message.value, 25) === true) {
        formSucces.style.display = "block";
        form.reset();
    } else {
        formSucces.style.display = "none";
    }


}
form.addEventListener("submit", validateForm);

function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}

//this will hide message after 6 seconds
setInterval(function () {
    formSucces.style.display = "none";
    name.style.border = "1px solid var(--grey)";
    email.style.border = "1px solid var(--grey)";
    subject.style.border = "1px solid var(--grey)";
    message.style.border = "1px solid var(--grey)";
}, 6000)




 
 
