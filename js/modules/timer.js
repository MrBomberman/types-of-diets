function timer(){
    // timer
    const deadline = '2021-12-19';

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
}

module.exports = timer;