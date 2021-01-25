'use strict';

// const { create } = require("json-server");

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

    // modal.style.display = 'none';
    // modal.classList.add('hide');
    // modal.classList.remove('show');
    // document.body.style.overflow = ''; // позволяет снова прокручивать страницу

    modal.addEventListener('click', (e) => { // обязательно следует передать событие
        if (e.target === modal || e.target.getAttribute('data-close') == '') { // e.taget - то , куда кликнул пользователь, отслеживает
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
            if (this.classes.length === 0) { // проверям на наличие классов, если их нет, ставим дефолтный
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

    const getResource = async (url) => { // будем получать данные с свервера, get запрос, данные для постинга уже не нужны
        const res = await fetch(url);
        if (!res.ok) { // если пошло что-то не так
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`); // создаем объект ошибки и выкидываем
        } // помогает обнаружить ошики в операции fetch или проблемах на сайте

        return await res.json();
    };


    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => { // data.data потому что обращаемся именно к тем данным, которые получили
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            });
        });

    // getResource('http://localhost:3000/menu') // запрос ушел, необходима обработка
    //     .then(data => { // получаем массив с объектами
    //         data.forEach(({img,altimg, title, descr, price}) => { // вытаскиваем каждое свойство из данного объекта
    //             new MenuCard(img,altimg, title, descr, price, '.menu .container').render(); // конструктор будет создаваться столько раз, сколько у нас объектов внутри массива, который придет с сервера
    //         }); // плюс добавляем класс родителя, куда мы все это помещаем
    //     });
    // другой варинт решения, создание прямо на странце без обращения к классам
    // getResource('http://localhost:3000/menu')
    //     .then(data => createCard(data));

    // function createCard(data){ // данные от сервера, 
    //     data.forEach(({img,altimg, title, descr, price}) => { // деструктурируем объект на отдельные свойства
    //         const element = document.createElement('div');

    //         element.classList.add('menu__item');

    //         element.innerHTML = `
    //         <img src=${img} alt=${altimg}>
    //         <h3 class="menu__item-subtitle">${title}</h3>
    //         <div class="menu__item-descr">${descr}</div>
    //         <div class="menu__item-divider"></div>
    //         <div class="menu__item-price">
    //             <div class="menu__item-cost">Цена:</div>
    //             <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //         </div>
    //         `;

    //         document.querySelector('.menu .container').append(element);
    //     });
    // }

    // Forms
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg', // указываем путь к картинке
        success: 'Thank You',
        failure: 'Something went wrong'
    };
    forms.forEach((action) => {
        bindPostData(action); // подвязываем к каждой форме функцию
    });
    // async - внутри функции будет асинхронный код
    // await - ставим перед теми операциями которые нам необходимо дождаться
    const postData = async (url, data) => { // передаем адрес и данные для постинга
        const res = await fetch(url, { // посылаем запрос на сервер,ждем результат, что не принимать пустое поле, из-за асинхронности
            method: 'POST',
            headers: {
                'Content-type': 'application/json' // прописываем заголовок
            },
            body: data
        });

        return await res.json(); // вернем уже в формате json, ждем окнца промиса и только тогда возращает из функции
    }; // отвечает за постинг данных



    function bindPostData(form) { // отвечает за привязку постинга
        form.addEventListener('submit', (e) => { // submit срабатывает каждый раз когда мы пытаемся отрпавить какую-то форму, при нажатии энтера или нужной кнопки
            e.preventDefault(); // чтобы страница постоянно не перегружалась

            const statusMessage = document.createElement('img'); // создаем картинку загрузки
            statusMessage.src = message.loading; // создаем изображение и подставляем ему атрибут - путь к картинке
            statusMessage.style.cssText = `
                display: block;
                margin : 0 auto;
            `; // динамически добавляем несколько стилей для загрузки
            // например сообщение о загрузке, динамически создается еще один блок
            // form.append(statusMessage); // просто добавляем новый блок к форме
            form.insertAdjacentElement('afterend', statusMessage); // указываем два аргумента, 1- куда вставляем элемент, 2- то, что нам нужно вставить
            // спинер будет появляться полсе всех действий в модальном окне


            // const request = new XMLHttpRequest(); // создаем новый пост запрос
            // request.open('POST', 'server.php');  // указываем запрос и путь, на который ссылаемся
            // request.setRequestHeader('Content-type','multipart/form-data'); // указываем тип приходящего контента
            // request.setRequestHeader('Content-type','application/json'); //для работы с json форматом 
            const formData = new FormData(form); // во внутрь помещаем форму, которой нужно собрать данные

            // const object = {};
            // formData.forEach(function(value, key) {
            //     object[key] = value; // на основании данных formData сформировали объект для работа с json
            // }); // чтобы можно было использовать конвертацию json

            const json = JSON.stringify(Object.fromEntries(formData.entries())); // чтобы получить данные с формы в формате маленьких массивов
            // превращаем эти массивы в обычный объект в формат json

            postData('http://localhost:3000/requests', json) // теперь из postData вернется промис, который м обработаем
                .then(data => { // постим данные на указанный сервер в формате json
                    console.log(data); // данные - которые возвращаются из промиса, то что вернул сервер
                    showThanksModal(message.success); // когда обработался успешно запрос, меняем на новое сообщение
                    // form.reset(); // сбрасываем форму
                    statusMessage.remove(); // статус мессадж используется только для загрузки, таймаут не нужен 
                }).catch(() => {
                    showThanksModal(message.failure); //  в результате ошибки выдаст другое сообщение
                }).finally(() => {
                    form.reset();
                });


            // request.addEventListener('load', () => { // отслеживаем конечную загрузку запроса
            //     if (request.status === 200) { // если все в порядке
            //         console.log(request.response);
            //         showThanksModal(message.success); // когда обработался успешно запрос, меняем на новое сообщение
            //         form.reset(); // сбрасываем форму
            //         statusMessage.remove(); // статус мессадж используется только для загрузки, таймаут не нужен

            //     } else {
            //         showThanksModal(message.failure);
            //         form.reset(); // сбрасываем форму

            //         statusMessage.remove(); // чтобы лишняя инфа исчезла через какое-то время

            //     }

            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide'); // прячем основное модальное окно

        openModal(); // отвечает за отркытие модальных окон

        const thanksModal = document.createElement('div'); // создаем новое модальное окно для запроса
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class='modal__content'>
                <div class='modal__close' data-close>×</div>
                <div class='modal__title'>${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal(); // закрывает все модальные окна
        }, 4000); // через 4 секунды модальное окно с ответом на запрос пропадает, а обычное модальное окно с запросом снова добавляется как эелмент
    }

    //DOM API - различные методы, которые позволяют работать с элементами на странице- встроенная возможность
    // у мобильного телефона - доступ к вибрации, к камере и тд.
    // fetch API - прописываем fetch и с кобках указываем адрес, на который мы будем посылать запрос,
    // может получится классический гет запрос с данными с указанного адреса
    // fetch использует промисы
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: 'POST', // устанвливаем нужный метод(запрос)
    //     body: JSON.stringify({name : 'KIRILL'}), // объект сразу превратиться в json формат и мы его отправим при помощи fetch
    //     headers: {
    //         'Content-type' : 'application/json'
    //     }
    // })
    //     .then(response => response.json()) // получаем какой-то response- ответ, в формате json/ команда .json()
    //     // парсит ответ на нужный нам формат обычного объекта js
    //     // но эта команда возвращает промис!
    //     .then(json => console.log(json));

    fetch('http://localhost:3000/requests')
        .then(data => data.json()) // берем ответ от сервера превращая в обычный js
        .then(res => console.log(res));


    const slidePrev = document.querySelector('.offer__slider-prev');
    const slideNext = document.querySelector('.offer__slider-next');
    const slides = document.querySelectorAll('.offer__slide');
    const currentNumber = document.querySelector('#current');
    const totalNumber = document.querySelector('#total');





    function hideSlide() {
        slides.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
    }

    function showSlide(i = 0) {
        slides[i].classList.add('show', 'fade');
        slides[i].classList.remove('hide');

    }

    hideSlide();
    showSlide();

    // function indexPlus(){

    // }

    let currentSlide = 0; // какой слайд сейчас выбран
    slideNext.addEventListener('click', function () {
        hideSlide(currentSlide);
        currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;// из кол-ва слайдов вычитаем один и по невыполнению условия показываем следующий
        // либо показываем самый первый, если условие истинно
        showSlide(currentSlide);
        if (slides.length < 10){
            currentNumber.textContent = `0${currentSlide+1}`;
            totalNumber.textContent = `0${slides.length}`;
        } else {
            currentNumber.textContent = currentSlide+1;
            totalNumber.textContent = slides.length;
        }

    });

    slidePrev.addEventListener('click', function() {
        hideSlide(currentSlide);
        currentSlide = currentSlide === 0 ? 3 : currentSlide -1  ;
        showSlide(currentSlide);

        if (slides.length < 10){
            currentNumber.textContent = `0${currentSlide+1}`;
            totalNumber.textContent = `0${slides.length}`;
        } else {
            currentNumber.textContent = currentSlide+1;
            totalNumber.textContent = slides.length;
        }
    });
    



});
// style.display - Многоцелевое свойство, которое определяет, как элемент должен быть показан в документе