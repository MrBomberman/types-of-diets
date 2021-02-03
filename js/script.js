'use strict';

// const { create } = require("json-server");

document.addEventListener('DOMContentLoaded', () => {

    const tabs = require('./modules/tabs'); // указываем путь к файлу табов
    // не ставим js, так как webpack сам знает, как собирать файлы
    const modalWindow = require('./modules/modalWindow');
    const timer = require('./modules/timer');
    const slider = require('./modules/slider');
    const forms = require('./modules/forms');
    const cards = require('./modules/cards');
    const calculator = require('./modules/calculator');

    // далее просто вызываем переменные как самые обычные функции
    tabs();
    modalWindow();
    timer();
    slider();
    forms();
    cards();
    calculator();
}); // порядок подключения не важен, главное чтобы совпадало название модулей с названиями файлов, котоырй мы подключаем
// style.display - Многоцелевое свойство, которое определяет, как элемент должен быть показан в документе