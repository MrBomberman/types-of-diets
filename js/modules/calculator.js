function calculator(){
        // calculator

        const result = document.querySelector('.calculating__result span'); // берем класс и его внутренний спен

        let sex, height, weight, age, ratio; // создаем 5 нужных элементов
    
        if (localStorage.getItem('sex')) { // проверяем наличие в локальном хранилище ключа sex
            sex = localStorage.getItem('sex'); // обращаемся чтобы получить уже имеющиеся значение
    
        } else {
            sex = 'female'; // если в локальном хранилище пусто, задаем дефолтное значение
            localStorage.setItem('sex', 'female'); // помещаем в локальное хранилище
        }
    
        if (localStorage.getItem('ratio')) { // проверяем наличие в локальном хранилище ключа ratio
            ratio = localStorage.getItem('ratio'); // обращаемся чтобы получить уже имеющиеся значение
    
        } else {
            ratio = 1.375; // если в локальном хранилище пусто, задаем дефолтное значение
            localStorage.setItem('ratio', 1.375); // помещаем в локальное хранилище
        }
    
        function initLocalSettings(selector, activeClass){ // создаем функцию для задавания классов актиности калькулятору, взаимодействую с локальным хранилищем
            const elements = document.querySelectorAll(selector);
    
            elements.forEach(elem => {
                elem.classList.remove(activeClass);
                if (elem.getAttribute('id') === localStorage.getItem('sex')){ // сравниваем id перебираемого элемента со значением ключа в локальном хранилище
                    // если значение id будет равно значению ключа из хранилища
                    elem.classList.add(activeClass);
    
                }
                if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){ // сравниваем data атрибут перебираемого элемента со 
                    // значением ключа в локальном хранилище
                    // если значение data-ratio будет равно значению ключа из хранилища - задаем класс активности на этот элемент
                    elem.classList.add(activeClass);
                }
            });
        }
    
        initLocalSettings('#gender div','calculating__choose-item_active');
        initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    
    
        function calcTotal(){ // будем запускать каждый раз, когда выполняется какое-то изменение
            if (!sex || !height ||!weight || !age || !ratio){ // если у нас нет хотя бы одного компонента, будет хотя бы один false
                result.textContent = '____';
                return; // досрочно прерываем функцию
            }
    
            if (sex === 'female'){
                result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
            } else {
                result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
            }
            
        }
    
        calcTotal();
    
        function getStaticInformation(selector, activeClass) {
            const elements = document.querySelectorAll(selector); // внутри этого родителя будем получать все дивы
            
            elements.forEach(element => {
                element.addEventListener('click', (e) => { // задаем событие каждому элементу, на который кликнули
                    if (e.target.getAttribute('data-ratio')){ // объект события, проверяем наличие атрибута
                        ratio = +e.target.getAttribute('data-ratio'); // если атрибут есть, засовываем его значение в ratio
                        localStorage.setItem('ratio',+e.target.getAttribute('data-ratio')); // добавляем в локальное хранилище
                        // наш статус активности
                    } else { // или если кликнули не в атрибут, значит кликнули в пол человека
                        sex = e.target.getAttribute('id'); // получаем значение идентификатора
                        localStorage.setItem('sex',e.target.getAttribute('id'));
                    }
        
        
                    elements.forEach(item => {
                        item.classList.remove(activeClass);
                    });
        
                    e.target.classList.add(activeClass);  // тот объект, в который кликнули назначаем класс активности
                    calcTotal();
                });
            });
        }
            // document.querySelector(parentSelector).addEventListener('click', (e) => { // будем указывать, куда нажали в родителе
            //     if (e.target.getAttribute('data-ratio')){ // объект события, проверяем наличие атрибута
            //         ratio = +e.target.getAttribute('data-ratio'); // если атрибут есть, засовываем его значение в ratio
            //     } else { // или если кликнули не в атрибут, значит кликнули в пол человека
            //         sex = e.target.getAttribute('id'); // получаем значение идентификатора
            //     }
    
    
            //     elements.forEach(item => {
            //         item.classList.remove(activeClass);
            //     });
    
            //     e.target.classList.add(activeClass);  // тот объект, в который кликнули назначаем класс активности
            //     calcTotal();
            // });
    
    
        getStaticInformation('#gender div', 'calculating__choose-item_active'); // передаем кусок кода с полом человека
        getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active'); // часть кода с уровнем подготовки человека
    
    
        function getDynamicInformation(selector){ // берем селектор инпута, который нас интересует
            const input = document.querySelector(selector);
    
            input.addEventListener('input', ()=> { // задаем событие ввода в какой-то конкретный элемент
                
                if (input.value.match(/\D/g)){ // при помощи регулярного выражения проверяем отсутсвие цифр
                    input.style.border = '1px solid red'; // если в инпуте присутствуют цифры, необходимо раскрасить границу
                } else {
                    input.style.border = 'none'; // если пользователь исправляет, мпняем на исходную позицию
                }
                
                switch(input.getAttribute('id')) { // проверяем строку, в которую вводим, ее id
                    case 'height': // если человек вводит в графу роста(значение id = 'height')
                        height = +input.value; //  записываем в переменную роста информацию, которую ввели
                        break; // останавливаем после записи
                    case 'weight': // если вводим в графу веса(значение id = 'weight')
                        weight = +input.value; // записываем в переменную веса информацию, которую ввели
                        break;
                    case 'age': // если вводим в графу возраста(значение id ='age')
                        age = +input.value; // записываем в переменную возраста
                        break;
                    }
    
                    calcTotal();
            });
    
        }
    
        getDynamicInformation('#height');
        getDynamicInformation('#weight');
        getDynamicInformation('#age');
}

module.exports = calculator;