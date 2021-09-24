
const baseUrl = "https://foreverabroad.flopow.eu/wp-json/wp/v2/posts?_embed&categories=2";
const nineResults = baseUrl + "&per_page=9";

const container = document.querySelector(".container");
const postList = document.querySelector(".post__list");
const viewMore = document.querySelector("button");


async function getPosts(url) {
  try {
    const response = await fetch(url);

    const post = await response.json();

    createHtml(post);

  } catch (error) {
    container.innerHTML = displayError(
      "An error occured when calling the API"
    );
  }
}



function createHtml(posts) {

  postList.innerHTML = "";

  posts.forEach(function (post) {

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

getPosts(nineResults);

setTimeout(function(){
  viewMore.style.visibility = "visible";
  },500);

viewMore.onclick = function () {

  const moreResults = baseUrl + "&per_page=15";
  getPosts(moreResults);
  viewMore.style.display = "none";
}



