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


    const nextButton = document.querySelector('.carousel_button-right');
    const prevButton = document.querySelector('.carousel_button-left');
    const carouselContainer = document.querySelector('.carousel_track');
    const slides = Array.from(carouselContainer.children);
    let slidesPage = Math.ceil(slides.length);
    let l = 0;
    let movePer = 105.5;
    let maxMove = movePer * (slidesPage - 1);

    // Tablet view	
    let tabletView = window.matchMedia("(min-width: 750px)");
    let desktopView = window.matchMedia("(min-width: 1150px)");
    if (tabletView.matches) {
        movePer = 52.5;
        maxMove = movePer * (slidesPage - 2);
    }
    //desktop View
    if (desktopView.matches) {
        movePer = 34;
        maxMove = movePer * (slidesPage - 3);
    }

    let next = () => {
        l = l + movePer;
        if (slides == 1) { l = 0; }
        for (const i of slides) {
            if (l > maxMove) { l = l - movePer; }
            i.style.left = '-' + l + '%';
        }

    }

    let previous = () => {
        l = l - movePer;
        if (l <= 0) { l = 0; }
        for (const i of slides) {
            if (slidesPage > 1) {
                i.style.left = '-' + l + '%';
            }
        }
    }

    const hideShowArrows = () => {
        if (l === 0) {
            prevButton.classList.add('is-hidden');
            nextButton.classList.remove('is-hidden');
        } else if (l === maxMove) {
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



