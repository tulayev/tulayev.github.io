const global = {
    currentPage: window.location.pathname,
    search: {
        term: '',
        type: '',
        page: 1,
        totalPages: 1,
        totalResults: 0,
    },
    api: {
        apiUrl: 'https://api.themoviedb.org/3/',
        apiKey: '' // paste your API key here
    }
}

async function displayPopularMovies() {
    const { results } = await fetchApiData('movie/popular')
    results.forEach(movie => {
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
                ${
                    movie.poster_path ?
                    `<img
                        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                        class="card-img-top"
                        alt="${movie.title}"
                    />` :
                    `<img
                        src="../images/no-image.jpg"
                        class="card-img-top"
                        alt="${movie.title}"
                    />`
                }
            </a>
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                    <small class="text-muted">Release: ${movie.release_date}</small>
                </p>
            </div>
        `
        document.querySelector('#popularMovies').appendChild(div)
    })
}

async function displayPopularShows() {
    const { results } = await fetchApiData('tv/popular')
    results.forEach(show => {
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
            <a href="tv-details.html?id=${show.id}">
                ${
                    show.poster_path ?
                    `<img
                        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                        class="card-img-top"
                        alt="${show.name}"
                    />` :
                    `<img
                        src="../images/no-image.jpg"
                        class="card-img-top"
                        alt="${show.name}"
                    />`
                }
            </a>
            <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">
                    <small class="text-muted">Air Date: ${show.first_air_date}</small>
                </p>
            </div>
        `
        document.querySelector('#popularShows').appendChild(div)
    })
}

async function displayMovieDetails() {
    const movieId = window.location.search.split('=').pop()
    const movie = await fetchApiData(`movie/${movieId}`)

    displayBackgroundImage('movie', movie.backdrop_path)

    const div = document.createElement('div')
    div.innerHTML = `
        <div class="details-top">
            <div>
                ${
                    movie.poster_path ?
                    `<img
                        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                        class="card-img-top"
                        alt="${movie.title}"
                    />` :
                    `<img
                        src="../images/no-image.jpg"
                        class="card-img-top"
                        alt="${movie.title}"
                    />`
                }
            </div>
            <div>
                <h2>${movie.title}</h2>
                <p>
                    <i class="fas fa-star text-primary"></i>
                    ${movie.vote_average.toFixed(1)} / 10
                </p>
                <p class="text-muted">Release Date: ${movie.release_date}</p>
                <p>${movie.overview}</p>
                <h5>Genres</h5>
                <ul class="list-group">
                    ${movie.genres.map(genre => `<li>${genre.name}</li>`).join('')}
                </ul>
                <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
            </div>
        </div>
        <div class="details-bottom">
            <h2>Movie Info</h2>
            <ul>
                <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
                <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
                <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
                <li><span class="text-secondary">Status:</span> ${movie.status}</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">
                ${movie.production_companies.map(company => `<span>${company.name}</span>`).join(', ')}
            </div>
        </div>
    `
    document.querySelector('#movieDetails').appendChild(div)
}

async function displayShowDetails() {
    const showId = window.location.search.split('=').pop()
    const show = await fetchApiData(`tv/${showId}`)

    displayBackgroundImage('tv', show.backdrop_path)

    const div = document.createElement('div')
    div.innerHTML = `
        <div class="details-top">
            <div>
                ${
                    show.poster_path ?
                    `<img
                        src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                        class="card-img-top"
                        alt="${show.name}"
                    />` :
                    `<img
                        src="../images/no-image.jpg"
                        class="card-img-top"
                        alt="${show.name}"
                    />`
                }
            </div>
            <div>
                <h2>${show.name}</h2>
                <p>
                    <i class="fas fa-star text-primary"></i>
                    ${show.vote_average.toFixed(1)} / 10
                </p>
                <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
                <p>${show.overview}</p>
                <h5>Genres</h5>
                <ul class="list-group">
                    ${show.genres.map(genre => `<li>${genre.name}</li>`).join('')}
                </ul>
                <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
            </div>
        </div>
        <div class="details-bottom">
            <h2>Show Info</h2>
            <ul>
                <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
                <li><span class="text-secondary">Last Episode to Air:</span> ${show.last_episode_to_air.name}</li>
                <li><span class="text-secondary">Status:</span> ${show.status}</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">
                ${show.production_companies.map(company => `<span>${company.name}</span>`).join(', ')}
            </div>
        </div>
    `
    document.querySelector('#showDetails').appendChild(div)
}

async function search() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)

    global.search.type = urlParams.get('type')
    global.search.term = urlParams.get('search-term')

    if (global.search.term) {
        const { results, total_pages, page, total_results } = await searchApiData()

        global.search.page = page
        global.search.totalPages = total_pages
        global.search.totalResults = total_results

        if (results.length === 0) {
            showAlert('No results found', 'error')
            return
        }

        displaySearchResults(results)
        document.querySelector('#searchTerm').value = ''
    } else {
        showAlert('Please enter a search term', 'error')
    }
}

async function displaySlider() {
    const { results } = await fetchApiData('movie/now_playing')
    results.forEach(movie => {
        const div = document.createElement('div')
        div.classList.add('swiper-slide')
        div.innerHTML = `
            <div class="swiper-slide">
                <a href="movie-details.html?id=${movie.id}">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path} alt="${movie.title}" />
                </a>
                <h4 class="swiper-rating">
                    <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
                </h4>
            </div>
        `
        document.querySelector('.swiper-wrapper').appendChild(div)
        initSwiper()
    })
}

async function fetchApiData(endpoint) {
    const { api } = global
    try {
        showSpinner()
        const response = await fetch(`${api.apiUrl}/${endpoint}?api_key=${api.apiKey}&language=en-US`)
        const data = await response.json()
        hideSpinner()
        return data
    }
    catch (err) {
        hideSpinner()
        console.log(err)
    }
} 

async function searchApiData() {
    const { api } = global
    try {
        showSpinner()
        const query = `${api.apiUrl}search/${global.search.type}?api_key=${api.apiKey}&language=en-US&query=${global.search.term}&page=${global.search.page}`
        const response = await fetch(query)
        const data = await response.json()
        hideSpinner()
        return data
    }
    catch (err) {
        hideSpinner()
        console.log(err)
    }
} 

function displaySearchResults(results) {
    document.querySelector('#searchResults').innerHTML = ''
    document.querySelector('#searchResultsHeading').innerHTML = ''
    document.querySelector('#pagination').innerHTML = ''

    results.forEach(result => {
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
            <a href="${global.search.type}-details.html?id=${result.id}">
                ${
                    result.poster_path ?
                    `<img
                        src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
                        class="card-img-top"
                        alt="${global.search.type === 'movie' ? result.title : result.name}"
                    />` :
                    `<img
                        src="../images/no-image.jpg"
                        class="card-img-top"
                        alt="${global.search.type === 'movie' ? result.title : result.name}"
                    />`
                }
            </a>
            <div class="card-body">
                <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
                <p class="card-text">
                    <small class="text-muted">
                        Release: ${global.search.type === 'movie' ? result.release_date : result.first_air_date}
                    </small>
                </p>
            </div>
        `
        document.querySelector('#searchResultsHeading').innerHTML = `
            <h2>
                ${results.length} of ${global.search.totalResults}
                Results for ${global.search.term}
            </h2>
        `
        document.querySelector('#searchResults').appendChild(div)
    })

    displayPagination()
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show')
}

function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show')
}

function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link')
    links.forEach(link => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active')
        }
    })
}

function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function displayBackgroundImage(type, backgroundImagePath) {
    const overlayDiv = document.createElement('div')
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundImagePath})`
    overlayDiv.style.backgroundSize = 'cover'
    overlayDiv.style.backgroundPosition = 'center'
    overlayDiv.style.backgroundRepeat = 'no-repeat'
    overlayDiv.style.height = '100vh'
    overlayDiv.style.width = '100vw'
    overlayDiv.style.position = 'absolute'
    overlayDiv.style.top = '0'
    overlayDiv.style.left = '0'
    overlayDiv.style.zIndex = '-1'
    overlayDiv.style.opacity = '0.1'

    type === 'movie' 
        ? document.querySelector('#movieDetails').appendChild(overlayDiv)
        : document.querySelector('#showDetails').appendChild(overlayDiv)
}

function showAlert(message, className) {
    const alertElement = document.createElement('div')
    alertElement.classList.add('alert', className)
    alertElement.appendChild(document.createTextNode(message))
    document.querySelector('#alert').appendChild(alertElement)

    setTimeout(() => alertElement.remove(), 3000)
}

function displayPagination() {
    const div = document.createElement('div')
    
    div.classList.add('pagination')
    div.innerHTML = `
        <button class="btn btn-primary" id="prev">Prev</button>
        <button class="btn btn-primary" id="next">Next</button>
        <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
    `
    document.querySelector('#pagination').appendChild(div)

    if (global.search.page === 1) {
        document.querySelector('#prev').disabled = true
    }

    if (global.search.page === global.search.totalPages) {
        document.querySelector('#next').disabled = true
    }

    document.querySelector('#prev').addEventListener('click', async () => {
        global.search.page--
        const { results, total_pages } = await searchApiData()
        displaySearchResults(results)
    })
    
    document.querySelector('#next').addEventListener('click', async () => {
        global.search.page++
        const { results, total_pages } = await searchApiData()
        displaySearchResults(results)
    })
}

function initSwiper() {
    new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        freeMode: true,
        loop: true, 
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        breakpoints: {
            500: {
                slidesPerView: 2
            },
            700: {
                slidesPerView: 3
            },
            1200: {
                slidesPerView: 4
            }
        }
    })
}

/*
Init App
*/
function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            displaySlider()
            displayPopularMovies()
            break
        case '/shows.html':
            displayPopularShows()
            break
        case '/movie-details.html':
            displayMovieDetails()
            break
        case '/tv-details.html':
            displayShowDetails()
            break
        case '/search.html':
            search()
            break
    }

    highlightActiveLink()
}

document.addEventListener('DOMContentLoaded', init)
