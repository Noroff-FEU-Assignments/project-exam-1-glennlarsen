const url = "https://foreverabroad.flopow.eu/wp-json/wp/v2/posts?per_page=15&_embed";

const container = document.querySelector(".container");
const carousel = document.querySelector(".carousel__track");

async function getPosts() {
  try {
    const response = await fetch(url);

    const post = await response.json();

    createHtml(post);

    console.log(post);


  } catch (error) {
    container.innerHTML = displayError(
      "An error occured when calling the API"
    );
  }
}



getPosts();

function createHtml(post) {




};

