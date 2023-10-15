/*
* DropDown
*/
const dropdownButton = document.querySelector('#dropdownButton')
const dropdownMenu = document.querySelector('.services__dropdown')

dropdownButton.addEventListener('click', () => {
    dropdownMenu.classList.toggle('uk-hidden')
})

window.addEventListener('click', e => {
    if (!e.target.matches('#dropdownButton') && !dropdownMenu.classList.contains('uk-hidden')) 
        dropdownMenu.classList.add('uk-hidden')
})
/*
* Slider
*/
const slideshowElement = document.querySelector('.testimonial__slideshow')
const tickerSpeed = 1
let flickity = null
let isPaused = false

if (slideshowElement) {
    const update = () => {
        if (isPaused) 
            return
    
        if (flickity.slides) {
            flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth
            flickity.selectedIndex = flickity.dragEndRestingSelect()
            flickity.updateSelectedSlide()
            flickity.settle(flickity.x)
        }
    
        window.requestAnimationFrame(update)
    }
    
    const pause = () => {
        isPaused = true
    }
    
    const play = () => {
        if (isPaused) {
            isPaused = false
            window.requestAnimationFrame(update)
        }
    }
    
    flickity = new Flickity(slideshowElement, {
        autoPlay: false,
        prevNextButtons: true,
        pageDots: false,
        draggable: true,
        wrapAround: true,
        selectedAttraction: 0.015,
        friction: 0.25
    })
    flickity.x = 0
    
    
    slideshowElement.addEventListener('mouseenter', pause, false)
    slideshowElement.addEventListener('focusin', pause, false)
    slideshowElement.addEventListener('mouseleave', play, false)
    slideshowElement.addEventListener('focusout', play, false)
    
    flickity.on('dragStart', () => {
        isPaused = true
    })
    
    update()
}
