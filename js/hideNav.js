let lastScrollTop;
const navigation = document.querySelector("#navbar");
const toTop = document.querySelector("#toTop")

window.addEventListener("scroll", function () {

  let scrollTop = window.pageYoffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    navigation.style.top = "-486px";
    toTop.style.display = "block";
    toTop.style.bottom = "-100px"
  } else {
    navigation.style.top = "0";
    toTop.style.bottom = "0"
  }


  lastScrollTop = scrollTop;
});

toTop.onclick = function () {
  toTop.style.display = "none";
}

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    toTop.style.display = "block";
  } else {
    toTop.style.display = "none";
  }
}