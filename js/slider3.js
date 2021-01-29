'use strict';

const slides = document.querySelectorAll('.offer__slide');
const prev = document.querySelector('.offer__slider-prev');
const next = document.querySelector('.offer__slider-next');
const total = document.querySelector('#total');
const current = document.querySelector('#current');
const slidesWrapper = document.querySelector('.offer__slider-wrapper');
const slidesField = document.querySelector('.offer__slider-inner'); // занимает большое кол-во пространства в одну строчку
const width = window.getComputedStyle(slidesWrapper).width; // получаем ширину нашей обертки слайдов


let slideIndex = 1; // индекс слайда
let offset = 0; // насколько далеко мы уже отступили

if (slides.length < 10){
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
} else {
    current.textContent = slideIndex;
    total.textContent = slides.length;
}

slidesField.style.width = 100 * slides.length + '%'; // задаем стили полю для слайдов в зависимости от кол-ва слайдов
slidesField.style.display = 'flex'; // чтобы поставить слайды в ряд
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden'; // скрываем все элементы, которые не попадют в область видимости


slides.forEach(slide => {
    slide.style.width = width; // знаем, что слайды одинаковой ширины и поместятся в наше поле для слайдов
}); // берем все слайды, которые есть на странице, перебираем и каждому устанавливаем ширину, которая нас интересует

// const numberOfPx = +width.replace(/\D/g, '');

next.addEventListener('click', () => {
    if (offset == deleteNotDigits(width) * (slides.length -1)){ //'500px' // все не числа меняем на пустую строку(отрезаем)
        offset = 0; // если отступ равен ширине одного слайда, умноженного на кол-во слайдов -1, то мы будем возвращать 
        // offset в начальное положение
    } else {
        offset += deleteNotDigits(width); // как только нажимаем кнопку, добавляется ширина еще одного слайда
        // таким образом смещая текущий на следующий слайд
    }

    slidesField.style.transform = `translateX(-${offset}px)`; // трансформуруем элемент по оси x\
    
    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
});

prev.addEventListener('click', () => {
    if (offset == 0){ // проверяем первый слайд, когда offset == 0, поэтому мы будем задавать новое значение, равное положения последнего слайда
        // когда мы долистаем до начала
        offset = deleteNotDigits(width) * (slides.length -1);
    } else {
        offset -= deleteNotDigits(width)  ; // как только нажимаем кнопку, отнимаем значение ширины  одного слайда
        // таким образом смещая текущий на предыдущий слайд
    }

    slidesField.style.transform = `translateX(-${offset}px)`; // трансформуруем элемент по оси x

    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }
    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
});

function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
}