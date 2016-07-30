$(function() {
    let requestStream = Rx.Observable.just('http://localhost/phalcon-post-list/index/list/');
    let responseStream = requestStream
            .flatMap(requestUrl =>
                Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
    );
    responseStream.subscribe(response => {

        let columns = response.colums;
        let rows = response.result;
        $('.table-container').html("<table class='table table-bordered' id='post-list' ><tr></tr></table>");
        for (let col of columns) {
            $('.table-container #post-list tr:last').append("<th>"+col.name+"</th>");
        }
        for (let row of rows) {
            $('.table-container #post-list').append("<tr></tr>");
            for (let col of columns){
                $('.table-container #post-list tr:last').append("<td>"+row[col.name]+"</td>");
            }
        }
    });

    // next page
    let nextPageButton = $('.nextPage-button');//document.querySelector('.nextPage-button');
    nextPageStream = Rx.Observable.fromEvent(nextPageButton, 'click');
    nextPageStream.subscribe(
        c => console.log('click')
    );

    // add
    let addButton = $('.add-button');
    addButtonStream = Rx.Observable.fromEvent(addButton, 'click');
    addButtonStream.subscribe( c => {
        $('.form-container').removeClass('hidden');
        addButton.addClass('hidden');
    });

    // submit, validate
    $(".form-form").validate({
        submitHandler: function (form){
            console.log($(form).serialize());
            // Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
            // или отправка через ajax
            $.post('http://localhost/phalcon-post-list/form/add', $(form).serialize(), function (result, xhr){
                if(xhr === 'success'){
                    // evil begin
                    $('.table-container #post-list tr').eq(1).before(result);
                    $('.table-container #post-list tr:last').remove();
                    // evil end
                }
            });
        },
        rules: {
            name: {
                required: true,
                minlength: 4
            },
            phone: {
                required: true,
                minlength: 17
            },
            email: {
                required: true,
                email: true
                // minlength: 5
            },
            message: {
                required: true,
                maxlength: 200
            }
        },
        messages: {
            name: {
                required: "Пожалуйста введите имя",
                minlength: "Имя должно быть не короче 4 символов"
            },
            phone: {
                required: "Пожалуйста введите номер телефона",
                minlength: " Пожалуйста введите коректный номер телефона"
            },
            email: {
                required: "Пожалуйста введите емейл",
                email: "Пожалуйста введите коректный емейл"
                // minlength: ""
            },
            message: {
                required: "Пожалуйста введите сообщение",
                maxlength: "Сообщение должно быть не длиннее 200 символов"
            }
        }
    });
    $("#phone").mask('+38(099)999-99-99');
    // let submitButton = $('.submit-button');
    // submitButtonStream = Rx.Observable.fromEvent(submitButton, 'click');
    // submitButtonStream.subscribe( c => {
    //     $('.form-container').addClass('hidden');
    //     addButton.removeClass('hidden');
    // });

    // cancel
    let cancelButton = $('.cancel-button');
    cancelButtonStream = Rx.Observable.fromEvent(cancelButton, 'click');
    cancelButtonStream.subscribe( c => {
        $('.form-container').addClass('hidden');
        addButton.removeClass('hidden');
    });
});
