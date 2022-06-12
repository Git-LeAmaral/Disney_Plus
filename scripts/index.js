const API_KEY = 'ed1296e00f76b3d21eceda4225761474'
const API_LANGUAGE = 'pt-br'
const BASE_URL_IMAGE = {
  original:'https://image.tmdb.org/t/p/original', 
  small: 'https://image.tmdb.org/t/p/w500/'
}
const LIST_MOVIES = ['508943', '330457', '150540', '527774', '638507', '508442', '420818', '420623', '49519']

const moviesList = document.getElementById('movies__list')

function getUrlMovie(movieId) {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=${API_LANGUAGE}`
}

function setMainMovie(movieId) {
  fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => { 
    const appImage = document.querySelector('.app_image img')
  
    const title = document.querySelector('.feature_movie h1')
    const description = document.querySelector('.feature_movie p')
    const info = document.querySelector('.feature_movie span')
    const rating = document.querySelector('.rating strong')
  
    const yearRelease = data.release_date.split('-')[0]
  
    title.innerHTML = data.title
    description.innerHTML = data.overview
    rating.innerHTML = data.vote_average
    info.innerHTML = yearRelease + ' - ' + data.genres[0].name + ' - Movie'
  
    const image = BASE_URL_IMAGE.original.concat(data.backdrop_path)
    appImage.setAttribute('src', image)  
  })
}

function createButtonMovie(movieId) {
  const button = document.createElement('button')
  button.setAttribute('onclick', `setMainMovie(${movieId})`)
  button.innerHTML = '<img src="/assets/icon-play-button.png" alt="Icon play button" />'
  return button
}

function createImageMovie(movieImage, movieTitle) {
  const divImageMovie = document.createElement('div')
  divImageMovie.classList.add('movie_image')
  const image = document.createElement('img')

  image.setAttribute('src', movieImage)
  image.setAttribute('alt', `Imagem do filme ${movieTitle}`)
  image.setAttribute('loading', 'lazy')

  divImageMovie.appendChild(image)

  return divImageMovie
}

function createMovie(movieId) {
  fetch(getUrlMovie(movieId)).then(response => response.json()).then(data => { 
    const movie = document.createElement('li')
    movie.classList.add('movie')

    const genre = `<span>${data.genres[0].name}</span>`
    const title = `<strong>${data.title}</strong>`
    const image = BASE_URL_IMAGE.small.concat(data.backdrop_path)

    movie.innerHTML = genre + title
    movie.appendChild(createButtonMovie(movieId))
    movie.appendChild(createImageMovie(image, data.title))
    moviesList.appendChild(movie)
  })
}

function loadListMovies() {
  LIST_MOVIES.map(createMovie)
}

loadListMovies()
// Script para inicializar os dados do filme principal
setMainMovie(LIST_MOVIES[0])