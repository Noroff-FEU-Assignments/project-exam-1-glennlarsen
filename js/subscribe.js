const buttonSubscribe = document.querySelector(".cta-subscribe");
const formSuccess = document.querySelector("#subscribe-success");
const buttonFooter = document.querySelector(".cta-footer_subscribe");
const formSuccessFooter = document.querySelector("#subscribe-success_footer");


buttonFooter.onclick = function () {
    formSuccessFooter.style.display = "block";
}

//this will hide message after 4 seconds
setInterval(function () {
    formSuccessFooter.style.display = "none";
}, 4000)

buttonSubscribe.onclick = function () {
    formSuccess.style.display = "block";
}

//this will hide message after 4 seconds
setInterval(function () {
    formSuccess.style.display = "none";
}, 4000)





