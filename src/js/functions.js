
// вставляем модалку + логика закрытия и открытия
function modal(modal, open, nameModal) {
    let allModal = {
        products: '<div class="modal modal_products"><div class="modal__wrap"><div class="modal__close js-modal__close"></div><div class="products-modal"><div class="products-modal__item"><label><p>Меняем название</p><input type="text" name="name"></label></div><div class="products-modal__item"><label><p>Меняем тему</p><input type="text" name="them"></label></div><div class="products-modal__item"><label><p>Меняем страну</p><input type="text" name="country"></label></div><div class="products-modal__item"><label><input type="file" name="file"></label></div><div class="products-modal__item"><div class="products-modal__delete js-modal__delete"></div></div><div class="products-modal__item"><button class="js-products-modal__btn">Изменить</button></div></div></div></div>',
        newCard: '<div class="modal modal_products"><div class="modal__wrap"><div class="modal__close js-modal__close"></div><div class="products-modal"><div class="products-modal__item"><label><p>Название</p><input type="text" name="name"></label></div><div class="products-modal__item"><label><p>Тема</p><input type="text" name="them"></label></div><div class="products-modal__item"><label><p>Страна</p><input type="text" name="country"></label></div><div class="products-modal__item"><label><input type="file" name="file"></label></div><div class="products-modal__item"><button class="js-products-modal__btn">Изменить</button></div></div></div></div>'
    }

    // показываем модалку
    $(open).click(function() {
        $('body').append(allModal[nameModal]);
        $('.modal input, .modal select, .modal textarea').styler();
        $('body, html').css('overflow', 'hidden');
    })

    // скрываем модалку
    $('body').on('click', '.js-modal__close', function() {
        $(this).parents(modal).remove();
        $('body, html').css('overflow', 'visible');
    })

    // скрываем модалку
    $('body').on('click', '.js-modal__delete', function() {
        $(this).parents(modal).remove();
        $('body, html').css('overflow', 'visible');
    })

    // скрываем модалку по пустому месту
    $('body').on('click', modal, function(e) {
        var div = $('.modal__wrap');
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $(this).remove();
            $('body, html').css('overflow', 'visible');
        }
    });
}

// проверка на заполненность полей
function checkFields(elem) {
    $(elem).each(function() {
        if($(this).val() == '' && $(this).val() == 0) {
            $(this).addClass('error');
            $(this).removeClass('success');
        } else {
            $(this).removeClass('error');
            $(this).addClass('success');
        }
    })
}

