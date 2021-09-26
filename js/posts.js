
const baseUrl = "https://foreverabroad.flopow.eu/wp-json/wp/v2/posts?_embed&categories=2";
const nineResults = baseUrl + "&per_page=9";

const container = document.querySelector(".container");
const postList = document.querySelector(".post_list");
const viewMore = document.querySelector(".view-more");
const searchButton = document.querySelector(".search-button");


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
                <li class="post_list-item">
                 <div class="post_overlay">
                    <h3>${post.title.rendered}</h3>
                    <p>${post.excerpt.rendered}</p>
                  </div>
                  <img
                  class="post_image"
                  src="${post._embedded['wp:featuredmedia']['0'].source_url}"
                  alt=""
                />
                </li>
              </a>
            
  `;
  })


}

getPosts(nineResults);

setTimeout(function () {
  viewMore.style.visibility = "visible";
}, 500);

viewMore.onclick = function () {
  const noResults = document.querySelector(".no-results");
  const moreResults = baseUrl + "&per_page=15";
  getPosts(moreResults);
  viewMore.style.display = "none";
  noResults.style.display = "none";
}

searchButton.onclick = function () {
  const searchInput = document.querySelector("#search-input").value;
  const newUrl = baseUrl + `&search=${searchInput}`;
  getPosts(newUrl);
  viewMore.style.display = "block";
  viewMore.innerHTML = "View All";
}



