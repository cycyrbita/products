
let arr = [
    {
        "id": "7",
        "name": "Artrovex",
        "them": "Паразиты",
        "country": "Филиппины",
        "img": "../media/2021_08_26_18_23_36166956.png"
    },
    {
        "id": "8",
        "name": "Alcotox",
        "them": "Алкоголь",
        "country": "Мексика",
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
        "country": "Америка",
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
        "country": "Россия",
        "img": "../media/2021_08_26_18_36_46586258.jpg"
    },
    {
        "id": "13",
        "name": "Животное",
        "them": "Лень",
        "country": "Америка",
        "img": "../media/2021_08_26_18_36_46586258.jpg"
    }
];

// модальные окна
let allModal = {
    products: '<div class="modal modal_products"><div class="modal__wrap"><div class="modal__close js-modal__close"></div><div class="products-modal"><div class="products-modal__item"><label><p>Меняем название</p><input type="text" name="name"></label></div><div class="products-modal__item"><label><p>Меняем тему</p><input type="text" name="them"></label></div><div class="products-modal__item"><label><p>Меняем страну</p><input type="text" name="country"></label></div><div class="products-modal__item"><label><input type="file" name="file"></label></div><div class="products-modal__item"><div class="products-modal__delete js-modal__delete"></div></div><div class="products-modal__item"><button class="js-editsCard">Изменить</button></div></div></div></div>',
    newCard: '<div class="modal modal_products"><div class="modal__wrap"><div class="modal__close js-modal__close"></div><div class="products-modal"><div class="products-modal__item"><label><p>Название</p><input type="text" name="name"></label></div><div class="products-modal__item"><label><p>Тема</p><input type="text" name="them"></label></div><div class="products-modal__item"><label><p>Страна</p><input type="text" name="country"></label></div><div class="products-modal__item"><label><input type="file" name="file"></label></div><div class="products-modal__item"><button class="js-newCard">Добавить</button></div></div></div></div>'
}

// функция HTML карточки
function card(newArr) {
    let data = '';
    $.each(newArr, function(i) {
        data += `
            <div class="products__item" data-id="${newArr[i]['id']}">
                <div class="products__head">
                    <div class="products__head-item name">${newArr[i]['name']}</div>
                    <div class="products__head-item them">${newArr[i]['them']}</div>
                    <div class="products__head-item country">${newArr[i]['country']}</div>
                    <div class="products__head-edits js-products__head-edits"></div>
                </div>
                <div class="products__body">
                    <div class="products__media"><img src="${newArr[i]['img']}" alt=""></div>
                </div>
            </div>`;
    })
    $('.products').html('');
    $('.products').append(data);
}

// функция проверка на заполненность полей
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

// фильтр
function filter() {
    // создаем переменные
    let name = $('.filter__item select[name="name"]').val(),
        them = $('.filter__item select[name="them"]').val(),
        country = $('.filter__item select[name="country"]').val(),
        arrFilter = [];

        // пробегаемся по массиву в поисках нужного)))
        arrFilter = arr.filter(function(i) {
            return i.name == name && i.them == them && i.country == country;
        })

    // выводим карточки
    card(arrFilter);

    // при изменении полей фильтра
    $('.filter__item select').change(function() {
        // перезаписываем переменные
        let name2 = '',
            them2 = '',
            country2 = '';
        
        name = $('.filter__item select[name="name"]').val(),
        them = $('.filter__item select[name="them"]').val(),
        country = $('.filter__item select[name="country"]').val(),
        arrFilter = [];

        arrFilter = arr.filter(function(i) {
            name2 = '',
            them2 = '',
            country2 = '';

            $.each(name, function(k) {
                if(name[k] == i.name) {
                    name2 = name[k];
                    return;
                }
            })

            $.each(them, function(k) {
                if(them[k] == i.them) {
                    them2 = them[k];
                    return;
                }
            })

            $.each(country, function(k) {
                if(country[k] == i.country) {
                    country2 = country[k];
                    return;
                }
            })
            
            if(name2 == '' && them2 == '' && country2 != '') {
                console.log(1);
                return i.country == country2;
            }
            
            if(name2 != '' && them2 == '' && country2 == '') {
                console.log(2);
                return i.name == name2;
            }

            if(name2 == '' && them2 != '' && country2 == '') {
                console.log(3);
                return i.them == them2;
            }

            if(name2 != '' && them2 != '' && country2 == '') {
                console.log(4);
                return i.name == name2 && i.them == them2;
            }

            if(name2 != '' && them2 == '' && country2 != '') {
                console.log(5);
                return i.name == name2 && i.country == country2;
            }

            if(name2 == '' && them2 != '' && country2 != '') {
                console.log(6);
                return i.country == country2 && i.them == them2;
            }

            if(name2 != '' && them2 != '' && country2 != '') {
                console.log(7);
                return i.name == name2 && i.them == them2 && i.country == country2;
            }
        })

        // и снова выводим карточки
        card(arrFilter);
    })
}

$(document).ready(function() {
    $('input, select, textarea').styler();
    
    // выводим карточки
    filter();

    // открываем модалку редактирования карточки
    $('body').on('click', '.js-products__head-edits', function() {
        $('body').append(allModal['products']);
        $('.modal input, .modal select, .modal textarea').styler();
        $('.modal').attr('data-id', $(this).parents('.products__item').attr('data-id')); 
    })

    // открываем модалку добавления новой карточки
    $('body').on('click', '.js-filter__btn', function() {
        $('body').append(allModal['newCard']);
        $('.modal input, .modal select, .modal textarea').styler();
        $thisId = $(this).parents('.products__item').attr('data-id');
    })

    // скрываем модалку редактирования карточки
    $('body').on('click', '.js-modal__close', function() {
        $(this).parents('.modal').remove();
    })

    // скрываем модалку по пустому месту
    $('body').on('click', '.modal', function(e) {
        var div = $('.modal__wrap');
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $(this).remove();
            $('body, html').css('overflow', 'visible');
        }
    });

    // подтверждаем изменение карточки
    $('body').on('click', '.js-editsCard', function() {
        let name = '',
            them = '',
            country = '',
            img = '',
            id = $(this).parents('.modal').attr('data-id'),
            field = $(this).parents('.products-modal').find('.products-modal__item input[type="text"]');

        // проверка полей
        checkFields(field);

        if(!$(field).hasClass('error')) {
            // заносим значения в переменные
            name = $(this).parents('.products-modal').find('.products-modal__item input[name="name"]').val();
            them = $(this).parents('.products-modal').find('.products-modal__item input[name="them"]').val();
            country = $(this).parents('.products-modal').find('.products-modal__item input[name="country"]').val();
            img = $(this).parents('.products-modal').find('.products-modal__item input[name="file"]')[0].files[0];

            // отправляем на сервер картику и получаем путь до нее
            let formData = new FormData();
            formData.append('img', img);
            $.ajax({
                type: 'POST',
                url: 'edit.php',
                data: formData,
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    img = data;
                }
            });

            // проставляем новые значения
            $('.products__item[data-id="'+id+'"]').find('.products__head-item.name').text(name);
            $('.products__item[data-id="'+id+'"]').find('.products__head-item.them').text(them);
            $('.products__item[data-id="'+id+'"]').find('.products__head-item.country').text(country);
            $('.products__item[data-id="'+id+'"]').addClass('edits');

            $.each(arr, function(i) {
                if(arr[i]['id'] == id) {
                    arr[i].name = name;
                    arr[i].them = them;
                    arr[i].country = country;
                    arr[i].img = img;
                    return;
                }
            })

            // удаляем модалку
            $(this).parents('.modal').remove();
        }
    })

    // подтверждаем добавление карточки
    $('body').on('click', '.js-newCard', function() {
        let name = '',
            them = '',
            country = '',
            img = '',
            id = $(this).parents('.modal').attr('data-id'),
            field = $(this).parents('.products-modal').find('.products-modal__item input[type="text"]');

        // проверка полей
        checkFields(field);

        if(!$(field).hasClass('error')) {
            // заносим значения в переменные
            name = $(this).parents('.products-modal').find('.products-modal__item input[name="name"]').val();
            them = $(this).parents('.products-modal').find('.products-modal__item input[name="them"]').val();
            country = $(this).parents('.products-modal').find('.products-modal__item input[name="country"]').val();
            img = $(this).parents('.products-modal').find('.products-modal__item input[name="file"]')[0].files[0];

            // отправляем на сервер картику и получаем путь до нее
            let formData = new FormData();
            formData.append('img', img);
            $.ajax({
                type: 'POST',
                url: 'add.php',
                data: formData,
                dataType: 'json',
                cache: false,
                contentType: false,
                processData: false,
                success: function(data) {
                    img = data;
                }
            });

            // проставляем новые значения
            $('.products__item[data-id="'+id+'"]').find('.products__head-item.name').text(name);
            $('.products__item[data-id="'+id+'"]').find('.products__head-item.them').text(them);
            $('.products__item[data-id="'+id+'"]').find('.products__head-item.country').text(country);
            $('.products__item[data-id="'+id+'"]').addClass('edits');

            $.each(arr, function(i) {
                if(arr[i]['id'] == id) {
                    arr[i].name = name;
                    arr[i].them = them;
                    arr[i].country = country;
                    arr[i].img = img;
                    return;
                }
            })

            // удаляем модалку
            $(this).parents('.modal').remove();
        }
    })

    // удаляем карточку
    $('body').on('click', '.js-modal__delete', function() {
        let id = $(this).parents('.modal').attr('data-id');
        let index = '';

        // удаляем элемент
        $('.products__item[data-id="'+id+'"]').remove();

        // удаляем модалку
        $(this).parents('.modal').remove();

        // пробегаемся по циклу и удаляем элемент
        $.each(arr, function(i) {
            if(arr[i]['id'] == id) {
                index = i;
                return;
            }
        })
        arr.splice(index, 1);
    })
});