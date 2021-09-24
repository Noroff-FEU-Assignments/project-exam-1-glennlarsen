let lastScrollTop;
const navigation = document.querySelector("#navbar");

window.addEventListener("scroll", function(){

    let scrollTop = window.pageYoffset || document.documentElement.scrollTop;

    if(scrollTop > lastScrollTop) {
        navigation.style.top = "-486px";
    } else {
        navigation.style.top = "0";
    }

    lastScrollTop = scrollTop;
});