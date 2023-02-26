const buttonElement = document.querySelector("#search");
const inputElement = document.querySelector("#input-value");
const movieSeachable = document.querySelector("#movies-searchable");
const movieContainer = document.querySelector("#movies-container");
const h1 = document.querySelector("h1");

function movieSection(movies) {
  const section = document.createElement("section");
  section.classList = "section";

  movies.map((movie) => {
    if (movie.poster_path) {
      const img = document.createElement("img");
      img.src = imageUrl + movie.poster_path;
      img.setAttribute("data-movie-id", movie.id);

      section.appendChild(img);
    }
  });
  return section;
}

function createMovieContainer(movies, title = "") {
  const movieElement = document.createElement("div");
  movieElement.setAttribute("class", "movie");

  const header = document.createElement("h2");
  header.innerHTML = title;

  const content = document.createElement("div");
  content.classList = "content";

  const contentClose = `<p id="content-close">X</p>`;

  content.innerHTML = contentClose;

  const section = movieSection(movies);

  movieElement.appendChild(header);
  movieElement.appendChild(section);
  movieElement.appendChild(content);
  return movieElement;
}

function renderSearchMovies(data) {
  movieSeachable.innerHTML = "";
  const movies = data.results;
  const movieBlock = createMovieContainer(movies);
  movieSeachable.appendChild(movieBlock);
  console.log(data);
}

function renderMovies(data) {
  const movies = data.results;
  const movieBlock = createMovieContainer(movies, this.title);
  movieContainer.appendChild(movieBlock);
  console.log(data);
}

function handleError(error) {
  console.log("error:", error);
}

buttonElement.addEventListener("click", function (e) {
  e.preventDefault();
  const value = inputElement.value;
  searchMovie(value);

  inputElement.value = "";
});

function createIframe(video) {
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${video.key}`;
  iframe.width = 450;
  iframe.height = 250;
  iframe.allowFullscreen = true;
  return iframe;
}

function createVideoTemplate(data, content) {
  content.innerHTML = `<p id="content-close">X</p>`;
  const videos = data.results;
  const length = videos.length > 3 ? 3 : videos.length;
  const iframeContainer = document.createElement("div");

  for (let i = 0; i < length; i++) {
    const video = videos[i];
    const iframe = createIframe(video);
    iframeContainer.appendChild(iframe);
    content.appendChild(iframeContainer);
  }
}

function createOverview(data, content) {
  const overview = data.overview;
  const overviewContainer = document.createElement("p");
  overviewContainer.classList = "overview";
  overviewContainer.innerText = overview;
  content.appendChild(overviewContainer);
}

function createRating(data, content) {
  const rating = data.vote_average;
  const ratingContainer = document.createElement("p");
  ratingContainer.classList = "rating";
  ratingContainer.innerText = "RATING: " + rating;
  content.appendChild(ratingContainer);
}

document.addEventListener("click", function (e) {
  const target = e.target;

  if (target.tagName.toLowerCase() === "img") {
    console.log(e);
    const movieId = target.dataset.movieId;
    const section = e.target.parentElement;
    const content = section.nextElementSibling;
    content.classList.add("content-display");

    const pathVideo = `/movie/${movieId}/videos`;
    const urlVideo = generateUrl(pathVideo);
    fetch(urlVideo)
      .then((res) => res.json())
      .then((data) => createVideoTemplate(data, content))
      .catch((error) => {
        console.log(error);
      });

    const pathOverview = `/movie/${movieId}`;
    const urlOverview = generateUrl(pathOverview);
    fetch(urlOverview)
      .then((res) => res.json())
      .then((data) => createOverview(data, content))
      .catch((error) => {
        console.log(error);
      });

    const pathRating = `/movie/${movieId}`;
    const urlRating = generateUrl(pathRating);
    fetch(urlRating)
      .then((res) => res.json())
      .then((data) => createRating(data, content))
      .catch((error) => {
        console.log(error);
      });
  }

  if (target.id === "content-close") {
    const content = target.parentElement;
    content.classList.remove("content-display");
  }
});

inputElement.addEventListener("input", function (e) {
  if (inputElement.value) {
    h1.innerText = `MOVIES ABOUT ${inputElement.value.toUpperCase()}!`;
  } else {
    inputElement.value = "";
    h1.innerText = "WHAT MOVIE DO YOU WANNA WATCH TODAY?";
  }
});

searchMovie("jurassic");
getNowPlayingMovies();
getUpcomingMovies();
getTopRatedMovies();
getPopularMovies();
