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
  header.style.background = `linear-gradient(rgba(0, 0, 0, 0.127),rgba(0, 0, 0, 0.4)), url(${post._embedded['wp:featuredmedia']['0'].source_url}) center, no-repeat`;
  header.style.backgroundSize = `cover`;

  let dateString = `${post.modified}`.slice(0, 10);
  let timeString = `${post.modified}`.slice(11, 16);
  let postUpdated = dateString + ", " + timeString

  blog.innerHTML =
    `
      
      <section class="blog-section">
      <div class="text_content">
      <span class="info">Author: Glenn Larsen | Updated: ${postUpdated}</span>
      <div class="line"></div>
      ${post.content.rendered}
      </div>
      <section class="comments">
          <div class="text_content">
            <p>Leave a reply for this post</p>
            <div class="form_container"> 
        <div class="form-success" id="formSucces">
                Your message has been sent! I will contact you soon.
              </div> 
        <label for="name">Name*</label>
              <input type="text" id="name" name="name" /> 
        <div class="form-error" id="nameError">
                Please enter your name (Minimum 5 characters)
              </div>
        <label for="email">Email*</label>
              <input type="email" id="email" name="email" />
        <div class="form-error" id="emailError">
                Please enter a valid email address
              </div>
         <label for="message">Message*</label>
              <textarea name="message" id="message"></textarea>
         <div class="form-error" id="messageError">
                Please enter a message (Minimum 25 characters)
              </div> 
        <button type="submit" class="cta cta-contact">Post comment</button>
            </div>
          </div>
        </section> 
    </section>
    

    <div class="modal">
    <span class="close">&times;</span>
    <img class="modal-image">
    <div class="caption"></div>
  </div>
   
  
      `

  //Image Modal//      
  const image = document.querySelectorAll("figure img");
  const modal = document.querySelector(".modal");
  const modalImage = document.querySelector(".modal-image");
  const caption = document.querySelector(".caption");
  const close = document.querySelector(".close");

  //Open modal//
  for (let i = 0; i < image.length; i++) {
    image[i].onclick = function () {
      modal.style.display = "block";
      modalImage.src = this.src;
      caption.innerHTML = this.alt;
    }
  }

  //Close Modal//
  modal.onclick = ("click", (e) => {
    if (e.target.classList.contains("modal")) {
      modal.style.display = "none";
    }
  });

  close.onclick = function () {
    modal.style.display = "none";
  }


}

getPost();



