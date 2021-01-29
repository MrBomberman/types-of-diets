'use strict';


const slides = document.querySelectorAll('.offer__slide');
const prev = document.querySelector('.offer__slider-prev');
const next = document.querySelector('.offer__slider-next');
const total = document.querySelector('#total');
const current = document.querySelector('#current');


let slideIndex = 1; //  индекс слайда

showSlides(slideIndex);

if (slides.length < 10){
    total.textContent = `0${slides.length}`;
} else {
    total.textContent = slides.length;
}

function showSlides(n) { 
    // задаем граничные значения слайдеру

    if (n > slides.length) { // для пролистывания вперед
        slideIndex = 1;
    }

    if (n < 1) { //  для обратного отсчета
        slideIndex = slides.length;
    }

    slides.forEach(item => item.style.display = 'none'); // скрываем все слайды

    slides[slideIndex - 1].style.display = 'block'; // плказываем текущий слайд по индексу

    if (slides.length < 10){
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });

    next.addEventListener('click', () => {
        plusSlides(1);
    });
}