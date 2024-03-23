import { global } from './global.js'

export async function fetchApiData(endpoint) {
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

export async function searchApiData() {
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

export function showSpinner() {
    document.querySelector('.spinner').classList.add('show')
}

export function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show')
}

export function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link')
    links.forEach(link => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active')
        }
    })
}

export function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function setBackgroundImage(type, backgroundImagePath) {
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

export function showAlert(message, className) {
    const alertElement = document.createElement('div')
    alertElement.classList.add('alert', className)
    alertElement.appendChild(document.createTextNode(message))
    document.querySelector('#alert').appendChild(alertElement)

    setTimeout(() => alertElement.remove(), 3000)
}

export function initSwiper() {
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
