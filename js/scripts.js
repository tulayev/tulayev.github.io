window.addEventListener('DOMContentLoaded', () => {
    const burger_btn = document.querySelector('.hamburger'),
          menu = document.querySelector('.menu');
    burger_btn.addEventListener('click', () => {
        toggle(burger_btn, 'hamburger');
        toggle(menu, 'menu');
    });

    function toggle(elem, word) {
        if (elem.classList.contains(word + '_active'))
            elem.classList.remove(word + '_active')
        else
            elem.classList.add(word + '_active')
    }
});