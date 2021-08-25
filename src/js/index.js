
$(document).ready(function() {
    let dbCard = [];
    $('.aside').on('click', '.aside__close', function() {
        $(this).parents('.aside').toggleClass('visible');
    })

    $('.products').on('click', '.products__close', function() {
        $(this).parents('.products__item').remove();
    })

    $('body').on('click', '.modal__close', function() {
        $(this).parents('.modal').remove();
    })

    $('.aside__newCard').click(function() {
        $('body').append(`
            <div class="modal">
                <form class="modal__wrap">
                    <div class="modal__close"></div>
                    <div class="modal__title">Новая упаковка</div>
                    <div class="modal__body">
                        <label class="modal__field">
                            <span>Название:</span>
                            <input type="text" name="name">
                        </label>
                        <label class="modal__field">
                            <span>Тема:</span>
                            <input type="text" name="them">
                        </label>
                        <label class="modal__field">
                            <span>Страна:</span>
                            <input type="text" name="country">
                        </label>
                        <label class="modal__field">
                            <input type="file" name="file">
                        </label>
                    </div>
                    <div class="modal__footer">
                        <button class="modal__btn" type="submit">Добавить</button>
                    </div>
                </form>
            </div>
        `)
    })
    
});