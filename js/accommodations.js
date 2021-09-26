
const baseUrl = "https://foreverabroad.flopow.eu/wp-json/wp/v2/posts?_embed&categories=17";
const nineResults = baseUrl + "&per_page=9";

const container = document.querySelector(".container");
const postList = document.querySelector(".post_list");
const viewMore = document.querySelector("button");


async function getAccommodations(url) {
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

function createHtml(post) {

  postList.innerHTML = "";

  for (let i = 0; i < post.length; i++) {

    if (post.length < 10) {
      viewMore.style.display = "none";
    } else {
      viewMore.style.display = "block";
    }

    postList.innerHTML += `
    

  <a href="details.html?id=${post[i].id}">
                <li class="post_list-item">
                 <div class="post_overlay">
                    <h3>${post[i].title.rendered}</h3>
                    <p>${post[i].excerpt.rendered}</p>
                  </div>
                  <img
                  class="post_image"
                  src="${post[i]._embedded['wp:featuredmedia']['0'].source_url}"
                  alt=""
                />
                </li>
              </a>
  `;

  }

}

getAccommodations(nineResults);

viewMore.onclick = function () {

  const moreResults = baseUrl + "&per_page=15";
  getPosts(moreResults);
  viewMore.style.display = "none";
}