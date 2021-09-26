const baseUrl = "https://foreverabroad.flopow.eu/wp-json/wp/v2/posts?_embed";
const accUrl = baseUrl + "&categories=17";
const accommodationCarousel = document.querySelector(".carousel_track2")

async function getAccommodation(url) {
    try {
        const response = await fetch(url);

        const post = await response.json();

        console.log(post);

        createHtmlAcco(post);


    } catch (error) {
        AccommodationCarousel.innerHTML = displayError(
            "An error occured when calling the API"
        );
    }
}

getAccommodation(accUrl);

function createHtmlAcco(post) {

    accommodationCarousel.innerHTML = "";

    post.forEach(function (post) {
        accommodationCarousel.innerHTML += `
  
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

    const nextButton = document.querySelector('.carousel_button-right2');
    const prevButton = document.querySelector('.carousel_button-left2');
    const carouselContainer = document.querySelector('.carousel_track2');
    const slides = Array.from(carouselContainer.children);
    let slidesPage = Math.ceil(slides.length);
    let slide = 0;
    let movePer = 106;
    let maxMove = movePer * (slidesPage - 1);


    // Tablet view	
    let tabletView = window.matchMedia("(min-width: 750px)");
    let desktopView = window.matchMedia("(min-width: 1150px)");
    if (tabletView.matches) {
        movePer = 53;
        maxMove = movePer * (slidesPage - 2);
    }
    //desktop View
    if (desktopView.matches) {
        movePer = 34;
        maxMove = movePer * (slidesPage - 3);
    }

    let next = () => {
        slide = slide + movePer;
        if (slides == 1) { slide = 0; }
        for (const i of slides) {
            if (slide > maxMove) { slide = slide - movePer; }
            i.style.left = '-' + slide + '%';
        }

    }

    let previous = () => {
        slide = slide - movePer;
        if (slide <= 0) { slide = 0; }
        for (const i of slides) {
            if (slidesPage > 1) {
                i.style.left = '-' + slide + '%';
            }
        }
    }

    const hideShowArrows = () => {
        if (slide === 0) {
            prevButton.classList.add('is-hidden');
            nextButton.classList.remove('is-hidden');
        } else if (slide === maxMove) {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.add('is-hidden');
        } else {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.remove('is-hidden');
        }
    }

    //Next slide
    nextButton.addEventListener('click', e => {

        next();
        hideShowArrows();
    })

    //Previous slide
    prevButton.addEventListener('click', e => {

        previous();
        hideShowArrows();
    })

}