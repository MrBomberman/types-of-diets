function tabs() {
        // tabs
        const tabs = document.querySelectorAll('.tabheader__item'); // берем все кнопки
        const tabsContent = document.querySelectorAll('.tabcontent'); // берем все элементы котента
        const tabsParent = document.querySelector('.tabheader__items'); // получаем родителя всех кнопок\
    
        function hideTabContent() {
            tabsContent.forEach(item => {
                // item.style.display = 'none'; // функция занимается скрытием табов none - убирает контент
                item.classList.add('hide'); // убираем контент при помощи класса hide, добавляя его всем элементам
                item.classList.remove('show', 'fade'); // удаляем класс, который показывает контент у всех элементов
            });
    
            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active'); // убираем у всех кнопок класс активности
            });
        }
    
        function showTabContent(i = 0) { // если функция вызывается без аргумента, по умолчанию будет передаваться первый эелмент
            // tabsContent[i].style.display = 'block'; //  показывает элемент по индексу, который мы вводим block показывает элемент
            tabsContent[i].classList.add('show', 'fade'); // показываем контент при помощи класса, который добавляется конкретному элементу
            tabsContent[i].classList.remove('hide'); // удаляем класс hide у конкретного элемента
            tabs[i].classList.add('tabheader__item_active'); // добавляем активность конкретной кнопке, на которую нажали
        }
    
        hideTabContent();
        showTabContent();
    
        tabsParent.addEventListener('click', (event) => { // обязательно передаем объект события
            const target = event.target;
            // target - элемент, в который мы кликнули
            if (target && target.classList.contains('tabheader__item')) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });
}

module.exports = tabs; // просто экспортируем нашу функцию с табами