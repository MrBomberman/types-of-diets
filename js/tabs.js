'use strict';

document.addEventListener('DOMContentLoaded', () => {
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

    // timer
    const deadline = '2020-12-19';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()); // здесь получим кол-во миллисекунд, разницу, которая осталась до дедлайна
        const days = Math.floor(t / (1000 * 60 * 60 * 24)); // находим кол-во дней до дедлайна, округляя число
        const hours = Math.floor((t / 1000 * 60 * 60) % 24); // общее кол-во часов делим на 24 часа и получаем остаток , 
        // которого не хватает до полных суток
        const minutes = Math.floor((t / 1000 / 60) % 60); // общее кол-во минут делим на 60 минут и получаем остаток
        const seconds = Math.floor((t / 1000) % 60);

        return { // создаем объект и возвращаем его из функции
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num; // будет добавлять ноль к числу, если оно меньше 10
        }
    }

    function setClock(selector, endtime) { // принимает селектор и время дедлайна
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');

        const timeInterval = setInterval(updateClock, 1000);

        updateClock(); // вызываем первый раз функцию заранее, чтобы не было моргания времени

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days); // получив объект с разными свойствами обращаемся к каждому свойству объекта поочередно
            // также записывая это свойство в переменную на странице
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval); // если время уже вышло, то остановить таймер
            }
        }
    }
    setClock('.timer', deadline);

    // модальное окно

    const open = document.querySelectorAll('[data-modal]'); // для обращения к атрибуту
    const close = document.querySelector('[data-close]');
    const modal = document.querySelector('.modal');


    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId); // убираем таймер появление, если кликнули раньше времени
    }

    open.forEach(item => {
        item.addEventListener('click', openModal);
    });
    // modal.style.display = 'block'; // показывате элемемент
    //         modal.classList.add('show');
    //         modal.classList.remove('hide');
    //         document.body.style.overflow = 'hidden'; // при открытии модального окна добавиться стиль, не позволяющий прокручивать страницу
    //     });
    // }); 

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    close.addEventListener('click', closeModal);
    // modal.style.display = 'none';
    // modal.classList.add('hide');
    // modal.classList.remove('show');
    // document.body.style.overflow = ''; // позволяет снова прокручивать страницу

    modal.addEventListener('click', (e) => { // обязательно следует передать событие
        if (e.target === modal) { // e.taget - то , куда кликнул пользователь, отслеживает
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) { // и если модальное окно открыто
            closeModal();
        } // отслеживает код кнопки на клавиатуре, которую мы нажимаем
    });

    const modalTimerId = setTimeout(openModal, 15000); // через 15 секунд появится модальное окно

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll); // после того, как вылезло окно после 
            // скролла, удаляем событие, которое мы повесили 
            // прокрученную часть складываем с видимой 
            // частью страницы на данный момент без прокрутки и если она больше или равна общему размеру страницы,
            // значит пользователь долистал до конца
        }
    }

    window.addEventListener('scroll', showModalByScroll); // вешаем на окно разработчик событий

    const itemsToDelete = document.querySelectorAll('.menu__item');

    itemsToDelete.forEach(item => {
        item.remove();
    });


    // class MenuCreator {
    //     constructor(img, title, description, price, ...classes) { // записываем свойства
    //         this.img = img;
    //         this.title = title;
    //         this.description = description;
    //         this.price = price;
    //         this.classes = classes; // будет передан массив классов
    //         this.transfer = 27;
    //         // this.parent = document.querySelector(parentSelector); образаемся к слектору родителя, чтобы привезать к нему элкмент
    //         this.changeToUAH(); // вызываем созданный метод для моментальной конвертации валюты
    //     }
    //     changeToUAH() {
    //         this.price = this.price * this.transfer;
    //     }
    //     createMenu() {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         const img = document.createElement('img');
    //         img.src = this.img;
    //         const title = document.createElement('h3');
    //         title.classList.add('menu__item-subtitle');
    //         const descrip = document.createElement('div');
    //         descrip.classList.add('menu__item-descr');
    //         const divide = document.createElement('div');
    //         divide.classList.add('menu__item-divider');
    //         const price = document.createElement('div');
    //         price.classList.add('menu__item-price');
    //         const cost = document.createElement('div');
    //         cost.classList.add('menu__item-cost');
    //         const total = document.createElement('div');
    //         total.classList.add('menu__item-total');
    //         const currency = document.createElement('span');
    //         element.appendChild(img);
    //         element.appendChild(title);
    //         element.appendChild(descrip);
    //         element.appendChild(divide);
    //         element.appendChild(price);
    //         price.appendChild(cost);
    //         price.appendChild(total);
    //         total.appendChild(currency);
    //         title.innerHTML = this.title;
    //         descrip.innerHTML = this.description;
    //         currency.innerHTML = this.price + ' грн/дн';
    //         cost.textContent = 'Цена';
    //         return element;
    //     }
    // }
    // const newItem = new MenuCreator('img/tabs/vegy.jpg', 'Меню Фитнес', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', '229');
    // const newItem2 = new MenuCreator('img/tabs/elite.jpg', 'Меню Премиум', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', '550');
    // const newItem3 = new MenuCreator('img/tabs/post.jpg', 'Меню Постное', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', '430');
    // console.log(newItem.createMenu());
    // document.querySelector('.menu__field > .container').appendChild(newItem.createMenu()); // потому что несколько контейнеров, поэтому такой синтаксис
    // document.querySelector('.menu__field > .container').appendChild(newItem2.createMenu());
    // document.querySelector('.menu__field > .container').appendChild(newItem3.createMenu());


    // альтернативный вариант решения задачи
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0 ) { // проверям на наличие классов, если их нет, ставим дефолтный
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => {
                    element.classList.add(className); // для передачи каких-либо классов нашему созданному элементу
                });    
            }
            element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(element); // просто в родителя добавляем наш элемент в конец
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        ".menu .container",

    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        14,
        ".menu .container",
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        21,
        ".menu .container",
        'menu__item'
    ).render();

    // Forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'Loading',
        success: 'Thank You',
        failure: 'Something went wrong'
    };
    forms.forEach((action) => {
        postData(action); // подвязываем к каждой форме функцию
    });

    function postData(form) {
        form.addEventListener('submit', (e) => { // submit срабатывает каждый раз когда мы пытаемся отрпавить какую-то форму, при нажатии энтера или нужной кнопки
            e.preventDefault(); // чтобы страница постоянно не перегружалась

            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = message.loading; // создаем новый блок на странице, куда мы выведем какое-то сообщение
            // например сообщение о загрузке, динамически создается еще один блок
            form.append(statusMessage); // просто добавляем новый блок к форме

            const request = new XMLHttpRequest(); // создаем новый пост запрос
            request.open('POST', 'server.php');  // указываем запрос и путь, на который ссылаемся
            // request.setRequestHeader('Content-type','multipart/form-data'); // указываем тип приходящего контента
            request.setRequestHeader('Content-type','application/json'); //для работы с json форматом 
            const formData = new FormData(form); // во внутрь помещаем форму, которой нужно собрать данные
            
            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value; // на основании данных formData сформировали объект для работа с json
            }); // чтобы можно было использовать конвертацию json

            const json = JSON.stringify(object); // функция превращает обычный объект в json

            request.send(json); // отпарвляем запрос json

            request.addEventListener('load', () => { // отслеживаем конечную загрузку запроса
                if (request.status === 200) { // если все в порядке
                    console.log(request.response);
                    statusMessage.textContent = message.success; // когда обработался успешно запрос, меняем на новое сообщение
                    form.reset(); // сбрасываем форму
                    setTimeout(()=>{
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                    form.reset(); // сбрасываем форму
                    setTimeout(()=>{
                        statusMessage.remove(); // чтобы лишняя инфа исчезла через какое-то время
                    }, 2000);
                }

            });
        }); 
    }
});
// style.display - Многоцелевое свойство, которое определяет, как элемент должен быть показан в документе