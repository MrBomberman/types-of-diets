function modalWindow(){
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
}

module.exports = modalWindow;