
let arr = [
    {
        "id": "7",
        "name": "Artrovex",
        "them": "Паразиты",
        "country": "Филлипины",
        "img": "../media/2021_08_26_18_23_36166956.png"
    },
    {
        "id": "8",
        "name": "Alcotox",
        "them": "Алкоголь",
        "country": "ЕС",
        "img": "../media/2021_08_26_18_23_43184607.png"
    },
    {
        "id": "9",
        "name": "Cardiol",
        "them": "Варикоз",
        "country": "Мексика",
        "img": "../media/2021_08_26_18_25_06793606.png"
    },
    {
        "id": "10",
        "name": "Iconskin",
        "them": "Курение",
        "country": "Россия",
        "img": "../media/2021_08_26_18_26_55527795.png"
    },
    {
        "id": "11",
        "name": "Смайлик",
        "them": "Ржач",
        "country": "На весь мир",
        "img": "../media/2021_08_26_18_28_02338005.png"
    },
    {
        "id": "12",
        "name": "Removio",
        "them": "Цистит",
        "country": "Мексика",
        "img": "../media/2021_08_26_18_28_59113896.png"
    },
    {
        "id": "13",
        "name": "Животное",
        "them": "Лень",
        "country": "Гламур",
        "img": "../media/2021_08_26_18_36_46586258.jpg"
    }
];

// вставляем карточки на сайт
function cards(arr) {
    let htmlCard = '';
    $.each(arr, function(i) {
        htmlCard += `<div class="products__item" data-id="${arr[i]['id']}">
                        <div class="products__head">
                            <div class="products__head-item name">${arr[i]['name']}</div>
                            <div class="products__head-item them">${arr[i]['them']}</div>
                            <div class="products__head-item country">${arr[i]['country']}</div>
                            <div class="products__head-edits js-products__head-edits"></div>
                        </div>
                        <div class="products__body">
                            <div class="products__media"><img src="${arr[i]['img']}" alt=""></div>
                        </div>
                    </div>`;
    })

    $('.products').append(htmlCard);
}

// вставляем модалку + логика закрытия и открытия
function modal(modal, open, nameModal) {
    let allModal = {
        products: '<div class="modal modal_products"><div class="modal__wrap"><div class="modal__close js-modal__close"></div><div class="products-modal"><div class="products-modal__item"><label><p>Меняем название</p><input type="text" name="name"></label></div><div class="products-modal__item"><label><p>Меняем тему</p><input type="text" name="them"></label></div><div class="products-modal__item"><label><p>Меняем страну</p><input type="text" name="country"></label></div><div class="products-modal__item"><label><input type="file" name="file"></label></div><div class="products-modal__item"><div class="products-modal__delete js-modal__delete"></div></div><div class="products-modal__item"><button class="js-editsCard">Изменить</button></div></div></div></div>',
        newCard: '<div class="modal modal_products"><div class="modal__wrap"><div class="modal__close js-modal__close"></div><div class="products-modal"><div class="products-modal__item"><label><p>Название</p><input type="text" name="name"></label></div><div class="products-modal__item"><label><p>Тема</p><input type="text" name="them"></label></div><div class="products-modal__item"><label><p>Страна</p><input type="text" name="country"></label></div><div class="products-modal__item"><label><input type="file" name="file"></label></div><div class="products-modal__item"><button class="js-newCard">Изменить</button></div></div></div></div>'
    }

    // текущий id
    let $thisId = '';

    // показываем модалку
    $(open).click(function() {
        $('body').append(allModal[nameModal]);
        $('.modal input, .modal select, .modal textarea').styler();
        $('body, html').css('overflow', 'hidden');
        $thisId = $(this).parents('.products__item').attr('data-id');
    })

    $('body').on('click', '.js-modal__delete', function() {
        $('.products__item[data-id="'+ $thisId +'"]').remove();
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
        $(this).parents()
    })

    // скрываем модалку по пустому месту
    $('body').on('click', modal, function(e) {
        var div = $('.modal__wrap');
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $(this).remove();
            $('body, html').css('overflow', 'visible');
        }
    });

    // редактируем карточку
    $('body').on('click', '.js-editsCard', function() {
        let name = '',
            them = '',
            country = '';
        let field = $(this).parents('.products-modal').find('.products-modal__item input[type="text"]');
        checkFields(field);
        if(!$(field).hasClass('error')) {
            name = $(this).parents('.products-modal').find('.products-modal__item input[name="name"]').val();
            them = $(this).parents('.products-modal').find('.products-modal__item input[name="them"]').val();
            country = $(this).parents('.products-modal').find('.products-modal__item input[name="country"]').val();
            console.log(name, them, country);
        }
    })
}
