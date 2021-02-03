function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 90;
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
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
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


    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //         data.data.forEach(({
    //             img,
    //             altimg,
    //             title,
    //             descr,
    //             price
    //         }) => { // data.data потому что обращаемся именно к тем данным, которые получили
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });

    getResource('http://localhost:3000/menu') // запрос ушел, необходима обработка
        .then(data => { // получаем массив с объектами
            data.forEach(({img,altimg, title, descr, price}) => { // вытаскиваем каждое свойство из данного объекта
                new MenuCard(img,altimg, title, descr, price, '.menu .container').render(); // конструктор будет создаваться столько раз, сколько у нас объектов внутри массива, который придет с сервера
            }); // плюс добавляем класс родителя, куда мы все это помещаем
        });

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
}

module.exports = cards;