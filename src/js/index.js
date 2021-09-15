
let arr = [
    {
        "id": "1",
        "name": "Sophia Gassner",
        "img": "http://cycyrbita.ru/avatars/media/avatars/Австрия-AT/face2.jpg",
        "geder": true
    },
    {
        "id": "2",
        "name": "Emilia Bauer",
        "img": "http://cycyrbita.ru/avatars/media/avatars/Австрия-AT/face3.jpg",
        "geder": false
    },
    {
        "id": "3",
        "name": "Valentina Eigner",
        "img": "http://cycyrbita.ru/avatars/media/avatars/Австрия-AT/face4.jpg",
        "geder": true
    },
    {
        "id": "4",
        "name": "Sophia Gassner",
        "img": "http://cycyrbita.ru/avatars/media/avatars/Австрия-AT/face5.jpg",
        "geder": false
    },
    {
        "id": "5",
        "name": "Jonas Weißmann",
        "img": "http://cycyrbita.ru/avatars/media/avatars/Австрия-AT/face6.jpg",
        "geder": true
    },
];

// модальные окна
let allModal = {
    avatars: `<div class="modal modal_avatars">
                    <div class="modal__wrap">
                        <div class="modal__close js-modal__close"></div>
                        <div class="avatars-modal">
                            <div class="avatars-modal__item"><label>
                                    <p>Меняем название</p><input type="text" name="name">
                                </label></div>
                            <div class="avatars-modal__item"><label>
                                    <p>Меняем тему</p><input type="text" name="them">
                                </label></div>
                            <div class="avatars-modal__item"><label>
                                    <p>Меняем страну</p><input type="text" name="country">
                                </label></div>
                            <div class="avatars-modal__item"><label><input type="file" name="file"></label></div>
                            <div class="avatars-modal__item">
                                <div class="avatars-modal__delete js-modal__delete"></div>
                            </div>
                            <div class="avatars-modal__item"><button class="js-editsCard">Изменить</button></div>
                        </div>
                    </div>
                </div>`,
    newCard: `<div class="modal modal_avatars">
                <div class="modal__wrap">
                    <div class="modal__close js-modal__close"></div>
                    <div class="avatars-modal">
                        <div class="avatars-modal__item"><label>
                                <p>Имя</p><input type="text" name="name">
                            </label></div>
                        <div class="avatars-modal__item"><label><input type="file" name="file"></label></div>
                        <div class="avatars-modal__item"><button class="js-newCard">Добавить</button></div>
                    </div>
                </div>
            </div>`
}

$(document).ready(function() {
    // выводим карточки
    card(arr);

    // стилизуем поля
    $('input, select, textarea').styler();

    // скрываем ипоказываем фильтр на мобилке
    $('body').on('click', '.js-filter__close', function() {
        $(this).parents('.js-filter').toggleClass('visible');
        if($('body').hasClass('overflow')) {
            $('body').removeClass('overflow')
        } else {
            $('body').addClass('overflow')
        }
    })

    // открываем модалку добавления новой карточки
    $('body').on('click', '.js-filter__btn', function() {
        $('body').append(allModal['newCard']);
        $('.modal input, .modal select, .modal textarea').styler();
        $thisId = $(this).parents('.avatars__item').attr('data-id');
        $('body').addClass('overflow');
    })

    // скрываем модалку по пустому месту
    $('body').on('click', '.modal', function(e) {
        var div = $('.modal__wrap');
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            $(this).remove();
            $('body').removeClass('overflow')
        }
    });

    // скрываем модалку
    $('body').on('click', '.js-modal__close', function() {
        $(this).parents('.modal').remove();
        $('body').addClass('overflow');
    })

    // копируем имя по клику
    $('body').on('click', '.avatars__copytext', function () {
        let $temp = $("<input>");
        $('body').append($temp);
        $temp.val($(this).parents('.avatars__item').find('.avatars__name').text()).select();
        document.execCommand("copy");
        $temp.remove();
    })

    // копируем имя по клику
    $('body').on('click', '.avatars__copyimg', function () {
        let $temp = $("<input>");
        $('body').append($temp);
        $temp.val($(this).parents('.avatars__media').find('img').attr('src')).select();
        document.execCommand("copy");
        $temp.remove();
    })

    // удаляем карточку
    $('body').on('click', '.avatars__delete', function() {
        let id = $(this).parents('.avatars__item').attr('data-id');
        let img = $(this).parents('.avatars__item').attr('data-img');
        let index = '';

        // удаляем элемент
        $(this).parents('.avatars__item').remove();

        // пробегаемся и удаляем элемент
        $.each(arr, function(i) {
            if(arr[i]['id'] == id) {
                index = i;
                return;
            }
        })
        arr.splice(index, 1);

        $.ajax({
            type: 'POST',
            url: 'remove.php',
            data: {'id': id, 'img': img},
        })
    })

    // подтверждаем добавление карточки
    $('body').on('click', '.js-newCard', function() {
        let name = '',
            img = '',
            field = $(this).parents('.avatars-modal').find('.avatars-modal__item input[type="text"]');

        // проверка полей
        checkFields(field);

        if(!$(field).hasClass('error')) {
            
            // заносим значения в переменные
            name = $(this).parents('.avatars-modal').find('.avatars-modal__item input[name="name"]').val();
            img = $(this).parents('.avatars-modal').find('.avatars-modal__item input[name="file"]')[0].files[0];

            // отправляем на сервер картику и получаем путь до нее
            let formData = new FormData();
            formData.append('name', name);
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
                    arr.push({id: data[0].id, name: data[0].name, img: data[0].img});
                }
            });

            // удаляем модалку
            $(this).parents('.modal').remove();
        }
    })
});

// HTML карточки
function card(arr) {
    let data = '';
    $.each(arr, function(i) {
        data += `
            <div class="avatars__item" data-id="${arr[i]['id']}" data-img="${arr[i]['img']}" data-name="${arr[i]['name']}">
                <div class="avatars__media">
                    <img src="${arr[i]['img']}" alt="">
                    <div class="avatars__delete"><span></span></div>
                    <div class="avatars__copytext"><span></span></div>
                    <div class="avatars__copyimg"><span></span></div>
                </div>
                <div class="avatars__name">${arr[i]['name']}</div>
            </div>`;
    })
    $('.avatars').html('');
    $('.avatars').append(data);
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
