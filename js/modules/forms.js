function forms(){
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
    
    
}

module.exports = forms;