
$(document).ready(function() {
    // вставляем карточки
    cards(arr);

    // показываем и скрываем фильтр
    $('.js-filter__close').click(function() {
        $('.js-filter').toggleClass('visible');
    })

    // стилизуем поля(select и input)
    $('input, select').styler();
    
    // показываем модальное окно
    modal('.modal', '.js-products__head-edits', 'products');
    modal('.modal', '.js-filter__btn', 'newCard');

    // проверяем на наличие пустых полей
    checkFields('.products-modal__item input');
});