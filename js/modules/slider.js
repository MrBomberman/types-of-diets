function slider(){
        // slider
        const slidePrev = document.querySelector('.offer__slider-prev');
        const slideNext = document.querySelector('.offer__slider-next');
        const slides = document.querySelectorAll('.offer__slide');
        const currentNumber = document.querySelector('#current');
        const totalNumber = document.querySelector('#total');
    
    
        function hideSlides() {
            slides.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });
        }
    
        let currentSlide = 0; // какой слайд сейчас выбран
    
        function showSlide(i = 0) {
            slides[i].classList.add('show', 'fade');
            slides[i].classList.remove('hide');
    
            if (slides.length < 10){
                currentNumber.textContent = `0${currentSlide+1}`;
                totalNumber.textContent = `0${slides.length}`;
            } else {
                currentNumber.textContent = currentSlide+1;
                totalNumber.textContent = slides.length;
            }
    
        }
    
        hideSlides();
        showSlide();
    
    
        // let currentSlide = 0; // какой слайд сейчас выбран
        slideNext.addEventListener('click', function () {
            hideSlides();
            currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;// из кол-ва слайдов вычитаем один и по невыполнению условия показываем следующий
            // либо показываем самый первый, если условие истинно
            showSlide(currentSlide);
    
            dots.forEach(dot => dot.style.opacity = '.5'); // изначально у всех кнопок 50% прозрачности
            dots[currentSlide].style.opacity = 1; // текущая кнопка выделяется более четко, чем остальные
        });
    
        slidePrev.addEventListener('click', function() {
            hideSlides();
            currentSlide = currentSlide === 0 ? 3 : currentSlide -1  ;
            showSlide(currentSlide);
    
            dots.forEach(dot => dot.style.opacity = '.5'); // изначально у всех кнопок 50% прозрачности
            dots[currentSlide].style.opacity = 1; // текущая кнопка выделяется более четко, чем остальные
        });

        // points 
        const offerSlider = document.querySelector('.offer__slider');

        offerSlider.style.position = 'relative'; // все элементы внутри салйдера будут нормально отображаться
    
        const carousel = document.createElement('ol'); // создаем упорядоченный список
        
        const dots = [];
         // создаем массив для всех кнопок, для указания класса активности
    
        carousel.classList.add('carousel-indicators');
    
        offerSlider.append(carousel);
    
        for (let i = 0; i < slides.length; i ++){ // создаем определенное кол-во точек
            const dot = document.createElement('li'); // list item
            dot.setAttribute('data-slide-to', i + 1); // устанавливаем определенный атрибут
            // каждой точке устанавливается атрибут data-slide-to и устанавливаем нумерацию, начиная с 1
            dot.classList.add('dot');
            
            
            if (i == 0){
                dot.style.opacity = 1; // непрозрачная кнопка
            }
    
            carousel.append(dot);
            dots.push(dot); // помещаем кнопку в наш массив
        }
    
        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to'); // тот элемени, на который нажали, проверяем атрибут
                
                currentSlide = slideTo-1; // текущий слайд становится тем, на которую кнопку мы нажали
                // -1 так как индексы начинаютс я с 0 , а не с 1
                hideSlides();
                showSlide(currentSlide);
                dots.forEach(dot => dot.style.opacity = '.5'); // изначально у всех кнопок 50% прозрачности
                dots[currentSlide].style.opacity = 1; // текущая кнопка выделяется более четко, чем остальные
            });
        });
}

module.exports = slider;