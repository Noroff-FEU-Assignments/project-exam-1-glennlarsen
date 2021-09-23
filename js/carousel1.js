const baseUrl = "https://foreverabroad.flopow.eu/wp-json/wp/v2/posts?_embed";
const featuredUrl = baseUrl + "&categories=3";
const carousel = document.querySelector(".carousel_track");

async function getPosts(url) {
    try {
        const response = await fetch(url);

        const post = await response.json();

        createHtml(post);


    } catch (error) {
        carousel.innerHTML = displayError(
            "An error occured when calling the API"
        );
    }
}

getPosts(featuredUrl);

function createHtml(post) {

    carousel.innerHTML = "";

    post.forEach(function (post) {
        carousel.innerHTML += `
  
    <a href="details.html?id=${post.id}" class="carousel_slide current-slide">
    <div class="slide_overlay">
    <h3>${post.title.rendered}</h3>
    <p>${post.excerpt.rendered}</p>
  </div>
  <img
    class="carousel_image"
    src="${post._embedded['wp:featuredmedia']['0'].source_url}"
    alt=""
  />
                </a>        
    `;
    })


const carouselContainer = document.querySelector('.carousel_track');
const slides = Array.from(carouselContainer.children);
const nextButton = document.querySelector('.carousel_button-right');
const prevButton = document.querySelector('.carousel_button-left');


console.log(slides);

const slideWidth = slides[0].getBoundingClientRect().width;

console.log(slideWidth);

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px'
}


slides.forEach(setSlidePosition);

const moveToSlide = (carouselContainer, currentSlide, targetSlide) => {
    carouselContainer.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}


const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}


//Move slide to previous
prevButton.addEventListener('click', e => {
    const currentSlide = carouselContainer.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(carouselContainer, currentSlide, prevSlide);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
});


//Move slide to next
nextButton.addEventListener('click', e => {
    const currentSlide = carouselContainer.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(carouselContainer, currentSlide, nextSlide);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
})


}



