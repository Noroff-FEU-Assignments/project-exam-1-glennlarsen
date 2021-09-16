const url = "https://foreverabroad.flopow.eu/wp-json/wp/v2/posts/"
const title = document.title;
const header = document.querySelector("header");
const blog = document.querySelector("main");

const queryString = document.location.search;

console.log(queryString);

const params = new URLSearchParams(queryString);

const id = params.get("id");

const newUrl = url + id + "?_embed";

console.log(newUrl);

async function getPost() {
    try {
      const response = await fetch(newUrl);
  
      const post = await response.json();
  
    createHtml(post);
  
    } catch (error) {
      blog.innerHTML = displayError(
        "An error occured when calling the API"
      );
    }
  }

  function createHtml(post) {
      document.title = `Forever Abroad | ${post.title.rendered}`;

      header.innerHTML = `<h1>${post.title.rendered}</h1>`;
      header.style.background = `url(${post._embedded['wp:featuredmedia']['0'].source_url}) center, no-repeat`;
      header.style.backgroundSize = `cover`;

      blog.innerHTML = 
      `
      
      <section class="blog-section">
      <div class="text_content">
      ${post.content.rendered}
      </div>
    </section>
    
      `

   }
  
  getPost();