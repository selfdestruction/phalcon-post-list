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

    // submit
    $(".form-form").validate({
        submitHandler: function (form){
            console.log('submit');
            // или отправка через ajax
            //$.post(form.action, $(form).serialize(), function (result, xhr){
            //    // форма отправлена успешно
            //});
        },
        rules: {
            name: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            name: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 2 characters"
            }
        }

        /* опции валидации */
    });
    let submitButton = $('.submit-button');
    submitButtonStream = Rx.Observable.fromEvent(submitButton, 'click');
    submitButtonStream.subscribe( c => {
        $('.form-container').addClass('hidden');
        addButton.removeClass('hidden');
    });

    // cancel
    let cancelButton = $('.cancel-button');
    cancelButtonStream = Rx.Observable.fromEvent(cancelButton, 'click');
    cancelButtonStream.subscribe( c => {
        $('.form-container').addClass('hidden');
        addButton.removeClass('hidden');
    });
});
