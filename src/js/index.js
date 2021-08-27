
$(document).ready(function() {
    // показываем и скрываем фильтр
    $('.js-filter__close').click(function() {
        $('.js-filter').toggleClass('visible');
    })

    // стилизуем поля(select и input)
    $('input, select').styler();
    
    // показываем модальное окно
    modal('.modal', '.js-products__head-edits', 'products', '.js-modal__close');
    modal('.modal', '.js-filter__btn', 'newCard', '.js-modal__close');
});