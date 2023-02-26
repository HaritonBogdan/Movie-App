const apiKey = "b2629325fde8dea821a3fa1162f96e52";
const imageUrl = "https://image.tmdb.org/t/p/w500";
const url =
  "https://api.themoviedb.org/3/search/movie?api_key=b2629325fde8dea821a3fa1162f96e52";

function generateUrl(path) {
  const url = `https://api.themoviedb.org/3${path}?api_key=b2629325fde8dea821a3fa1162f96e52`;
  return url;
}

function requestMovies(url, onComplete, onError) {
  fetch(url)
    .then((res) => res.json())
    .then(onComplete)
    .catch(onError);
}

function searchMovie(value) {
  const path = "/search/movie";
  const url = generateUrl(path) + "&query=" + value;
  requestMovies(url, renderSearchMovies, handleError);
}

function getUpcomingMovies() {
  const path = "/movie/upcoming";
  const url = generateUrl(path);
  const render = renderMovies.bind({ title: "UPCOMING MOVIES" });

  requestMovies(url, render, handleError);
}

function getTopRatedMovies() {
  const path = "/movie/top_rated";
  const url = generateUrl(path);
  const render = renderMovies.bind({ title: "TOP RATED MOVIES" });

  requestMovies(url, render, handleError);
}

function getPopularMovies() {
  const path = "/movie/popular";
  const url = generateUrl(path);
  const render = renderMovies.bind({ title: "POPULAR MOVIES" });

  requestMovies(url, render, handleError);
}

function getNowPlayingMovies() {
  const path = "/movie/now_playing";
  const url = generateUrl(path);
  const render = renderMovies.bind({ title: "NOW PLAYING" });

  requestMovies(url, render, handleError);
}
