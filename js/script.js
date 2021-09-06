const url = "https://foreverabroad.flopow.eu/wp-json/wp/v2/posts?per_page=9";

//const productsContainer = document.querySelector(".grid_container");
//const youMayAlsoLikeContainer = document.querySelector(".grid_container2");

async function getPosts() {
  try {
    const response = await fetch(url);

    const post = await response.json();

    //createHtml(post);

    console.log(post);


  } catch (error) {
    productsContainer.innerHTML = displayError(
      "An error occured when calling the API"
    );
  }
}

getPosts();