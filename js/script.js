const url = "https://foreverabroad.flopow.eu/wp-json/wp/v2/posts?per_page=9&_embed";

const container = document.querySelector(".container");
const postList = document.querySelector(".post__list");
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





 function createHtml(post) {


post.forEach(function(post){
  postList.innerHTML += `

  <a href="details.html?id=${post.id}">
                <li class="post__list-item">
                 <div class="post__overlay">
                    <h3>${post.title.rendered}</h3>
                    <p>${post.excerpt.rendered}</p>
                  </div>
                  <img
                  class="post__image"
                  src="${post._embedded['wp:featuredmedia']['0'].source_url}"
                  alt=""
                />
                </li>
              </a>
 
  `;
})


 }

getPosts();

