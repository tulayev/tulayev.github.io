window.addEventListener('DOMContentLoaded', () => {

    const getResource = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json(); 
    };

    getResource('http://localhost:3000/menu')
                .then(data => createCard('.menu .container', data));

    // Dynamically generate menu cards

    function createCard(selector, data) {
        data.forEach(({img, altimg, title, descr, price}) => {
            const element = document.createElement('div');
            element.classList.add('menu__item');

            element.innerHTML =
                `<div class="menu__item">
                    <img src=${img} alt=${altimg}>
                    <h3 class="menu__item-subtitle">${title}</h3>
                    <div class="menu__item-descr">${descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${price * 27}</span> грн/день</div>
                    </div>
                </div>`;

            document.querySelector(selector).append(element);
        });

       
    }

    // Tabs

    const tabsParent = document.querySelector('.tabheader__items'),
          tabs = tabsParent.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent');

    function hideTabs() {
        tabsContent.forEach((t) => {
            t.style.display = 'none';
        });

        tabs.forEach((t) => {
            t.classList.remove('tabheader__item_active');
        });
    }

    function showTab(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabs();
    showTab();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((t, i) => {
                if (target == t) {
                    hideTabs();
                    showTab(i);
                }
            });
        }
    });
    

    // Timer

    const deadline = '2021-09-11';

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function getTimeRemaining(endtime) {
        const milliseconds = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(milliseconds / (1000 * 60 * 60 * 24)),
              hours = Math.floor((milliseconds / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((milliseconds / 1000 / 60) % 60),
              seconds = Math.floor((milliseconds / 1000) % 60);

        return {
            'milliseconds': milliseconds,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }
    
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'), 
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const timeObj = getTimeRemaining(endtime);
            days.innerHTML = getZero(timeObj.days);
            hours.innerHTML = getZero(timeObj.hours);
            minutes.innerHTML = getZero(timeObj.minutes);
            seconds.innerHTML = getZero(timeObj.seconds);

            if (timeObj.milliseconds <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);


    // Modal

    const btns = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector('.modal');

    const modalWindowTimerId = setTimeout(showModalWindow, 60000);
        
    btns.forEach(btn => {
        btn.addEventListener('click', showModalWindow);
    });

    // Close modal window when user clicks on empty area
    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            hideModalWindow();
        }
    });

    // Close modal window when esc button clicked
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
            hideModalWindow();
        }
    });

    window.addEventListener('scroll', showModalWindowByScroll);

    // Open modal window when user reached the end of the browser
    function showModalWindowByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModalWindow();
            // Open modal when the end of browser is reached only once
            window.removeEventListener('scroll', showModalWindowByScroll);
        }
    }

    function showModalWindow() {
        //mw.style.display = 'block';
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalWindowTimerId);
    }

    function hideModalWindow() {
        //mw.style.display = 'none';
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Forms

    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        bindPostData(form);
    });

    const msg = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
        });

        return await res.json(); 
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = msg.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto; 
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            /* This is an old method, now fetch method is mostly used
            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');
            request.setRequestHeader('Content-type', 'application/json');
            */

            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // formData.forEach(function (value, key) {
            //    obj[key] = value;
            // });

            /*
            request.send(JSON.stringify(obj));

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(msg.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(msg.failure);
                }
            }); */

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(msg.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(msg.failure);
            }).finally(() => {
                form.reset();
            });

        });
    }

    function showThanksModal (message) {
        const modalDialog = document.querySelector('.modal__dialog');

        modalDialog.classList.add('hide');
        showModalWindow();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            modalDialog.classList.add('show');
            modalDialog.classList.remove('hide');
            hideModalWindow();
        }, 5000);
    }

    fetch('http://localhost:3000/menu')
        .then(item => item.json())
        .then(res => console.log(res));

    // Slider

    const sliderWrapper = document.querySelector('.offer__slider'),
          sliderContainer = sliderWrapper.querySelector('.offer__slider-wrapper'),
          slidesField = sliderContainer.querySelector('.offer__slider-inner'),
          sliders = sliderWrapper.querySelectorAll('.offer__slide'),
          prevBtn = sliderWrapper.querySelector('.offer__slider-prev'),
          nextBtn = sliderWrapper.querySelector('.offer__slider-next'),
          sliderCounter = document.querySelector('.offer__slider-counter'),
          currentSlideNum = sliderCounter.querySelector('#current'),
          totalSlidesNum = sliderCounter.querySelector('#total'),
          width = window.getComputedStyle(sliderContainer).width;

    // let counter = 0;

    let slideIndex = 1;
    let offset = 0;

    if (sliders.length < 10) {
        totalSlidesNum.textContent = `0${sliders.length}`;
        currentSlideNum.textContent = `0${slideIndex}`;
    } else {
        totalSlidesNum.textContent = sliders.length;
        currentSlideNum.textContent = slideIndex;
    }

    slidesField.style.width = 100 * sliders.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    sliderContainer.style.overflow = 'hidden';
    sliders.forEach(slider => {
       slider.style.width = width;
    });

    sliderWrapper.style.position = 'relative';
    const indicators = document.createElement('ol'),
          dots = []; 
    indicators.classList.add('carousel-indicators');
    sliderWrapper.append(indicators);

    for (let i = 0; i < sliders.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        indicators.append(dot);
        dots.push(dot);
        if (i == 0) {
            dot.style.opacity = 1;
        }
    }

    nextBtn.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (sliders.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

       slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == sliders.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        helper();
    });

    prevBtn.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (sliders.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = sliders.length;
        } else {
            slideIndex--;
        }

        helper();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            helper();
        });
    });

    function helper() {
        if (sliders.length < 10) {
            currentSlideNum.textContent = `0${slideIndex}`;
        } else {
            currentSlideNum.textContent = slideIndex;
        }

        dots.forEach(d => { d.style.opacity = '.5' });
        dots[slideIndex - 1].style.opacity = 1;
    }

    // First option
    // for (let i = 1; i < sliders.length; i++) {
    //     sliders[i].classList.add('hide');
    // }
    //
    // currentSlideNum.innerHTML = `0${counter + 1}`;
    //
    // function switchSlides(n) {
    //     for (let i = 0; i < sliders.length; i++) {
    //         if (i == n) {
    //             sliders[i].classList.add('show');
    //             sliders[i].classList.remove('hide');
    //         } else {
    //             sliders[i].classList.add('hide');
    //             sliders[i].classList.remove('show');
    //         }
    //     }
    //     currentSlideNum.innerHTML = `0${n + 1}`;
    //     sliderContainer.append(sliders[n]);
    // }
    //
    // function switchToNext() {
    //     if (counter == 3) {
    //         counter = -1;
    //     }
    //     switchSlides(++counter);
    // }
    //
    // function switchToPrevious() {
    //     if (counter == 0) {
    //         counter = 4;
    //     }
    //     switchSlides(--counter);
    // }
    //
    // prevBtn.addEventListener('click', () => {
    //     switchToPrevious();
    // });
    //
    // nextBtn.addEventListener('click', () => {
    //     switchToNext();
    // });
    
});