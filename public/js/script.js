var currentOffset = 0;
var count = 0;
var limit = 10;
var filterField = '';
var filterOrder = '';
var rows = {};
var colums = {};

$(function() {

    // startup
    const startupRequest$ = Rx.Observable.of('http://localhost/phalcon-post-list/index/list/?limit='+limit);

    // next page
    const $nextPageButton = $('.nextPage-button');//document.querySelector('.nextPage-button');
    const nextPage$ = Rx.Observable.fromEvent($nextPageButton, 'click');
    const nextPageRequest$ = nextPage$
        .map( ev => {

            $firstPageButton.removeClass('hidden');
            $prevPageButton.removeClass('hidden');

            currentOffset = currentOffset + limit;

            if(currentOffset + limit >= count){
                $nextPageButton.addClass('hidden');
            }

            if(currentOffset == 0){
                $firstPageButton.addClass('hidden');
                $prevPageButton.addClass('hidden');
            }
            console.log(currentOffset);
            return 'http://localhost/phalcon-post-list/index/list/?offset='+currentOffset+'&limit='+limit;
        });

    // first page
    const $firstPageButton = $('.firstPage-button');
    const firstPage$ = Rx.Observable.fromEvent($firstPageButton, 'click');
    const firstPageRequest$ = firstPage$
        .map( ev => {
            currentOffset = 0;
            $firstPageButton.addClass('hidden');
            $prevPageButton.addClass('hidden');
            if(limit < count){
                $nextPageButton.removeClass('hidden');
            }

            return 'http://localhost/phalcon-post-list/index/list/'+'?limit='+limit;
        });

    // prev page
    const $prevPageButton = $('.prevPage-button');
    const prevPage$ = Rx.Observable.fromEvent($prevPageButton, 'click');
    const prevPageRequest$ = prevPage$
        .map( ev => {
            console.log(currentOffset);
            console.log(limit);
            console.log('limit');
            currentOffset = currentOffset - limit;
            if(currentOffset === 0){
                $firstPageButton.addClass('hidden');
                $prevPageButton.addClass('hidden');
            }
            $nextPageButton.removeClass('hidden');
            return 'http://localhost/phalcon-post-list/index/list/?offset='+currentOffset+'&limit='+limit;
        });

    // delete post
    const $deletePageButton = $('.delete-button');
    const deletePage$ = Rx.Observable.fromEvent($deletePageButton, 'click');
    const deletePostRequest$ = deletePage$
        .map( ev => {
            console.log($(ev.target).data('id'));
            return 'http://localhost/phalcon-post-list/form/delete/'+$(ev.target).data('id')+'/?offset='+currentOffset+'&limit='+limit;
        });

    // hells table render start
    let response$ = startupRequest$
        .merge(nextPageRequest$)
        .merge(firstPageRequest$)
        .merge(prevPageRequest$)
            .flatMap(requestUrl =>
                Rx.Observable.fromPromise(jQuery.getJSON(requestUrl))
    );

    response$.subscribe(response => {

        count = response.count;
        if(limit < count && currentOffset == 0){
            $nextPageButton.removeClass('hidden');
        }
        columns = response.colums;
        rows = response.result;
        renderTable(columns, rows);
    });
    // hells table render end

    // add post start

    // add button
    let addButton = $('.add-button');
    addButtonStream = Rx.Observable.fromEvent(addButton, 'click');
    addButtonStream.subscribe( c => {
        $('#id').val('');
        $('#name').val('');
        $('#phone').val('');
        $('#email').val('');
        $('#message').val('');
        $('.form-container').removeClass('hidden');
        addButton.addClass('hidden');
    });

    // submit, validate
    $(".form-form").validate({
        submitHandler: function (form){
            let data = $(form).serialize();
            let id = $('#id').val();
            console.log($('#id').val());
            // $(form).clear();
            data = data+'&offset='+currentOffset+'&limit='+limit+'&filterField='+filterField+'&filterOrder='+filterOrder;
            let url = 'http://localhost/phalcon-post-list/form/add';
            if(id){
                url = 'http://localhost/phalcon-post-list/form/edit/'+id;
            }
            post(data, url);
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

    // phone mask
    $("#phone").mask('+38(099)999-99-99');

    // cancel button
    let cancelButton = $('.cancel-button');
    cancelButtonStream = Rx.Observable.fromEvent(cancelButton, 'click');
    cancelButtonStream.subscribe( c => {
        $('.form-container').addClass('hidden');
        addButton.removeClass('hidden');
    });
    // add post end

});

// function createSubscriber(tag){
//     return {
//         next(item) { console.log(`${tag}.next ${item}`); },
//         error(error){ console.log(`${tag}.error ${error.stacl || error}`); },
//         complete() {console.log(`${tag}.complete`); }
//     };
// }
// .subscribe(
//         item => { console.log(`next ${item}`) }
//     )
function post(data, url){
    $.post(url, data, function (result, xhr){
        result = JSON.parse(result);
        count = result.count;
        columns = result.colums;
        rows = result.result;
        renderTable(columns, rows);
        if(limit < count && currentOffset == 0){
            $('.nextPage-button').removeClass('hidden');
        }
    });
}
function editPost(th){
    let row = rows.filter(x => x.id == th);
    // console.log(row);
    $('#id').val(row[0].id);
    $('#name').val(row[0].name);
    $('#phone').val(row[0].phone);
    $('#email').val(row[0].email);
    $('#message').val(row[0].message);
    $('.form-container').removeClass('hidden');
    $('.add-button').addClass('hidden');
}
function deletePost(id){
    data = '&offset='+currentOffset+'&limit='+limit+'&filterField='+filterField+'&filterOrder='+filterOrder;
    $.post('http://localhost/phalcon-post-list/form/delete/'+id, data, function (result, xhr){
        result = JSON.parse(result);
        count = result.count;
        let columns = result.colums;
        let rows = result.result;
        renderTable(columns, rows);
    });
}
function renderTable(columns, rows){
    $('.table-container').html("<table class='table table-bordered' id='post-list' ><tr></tr></table>");
    for (let col of columns) {
        $('.table-container #post-list tr:last').append("<th>"+col.name+"</th>");
    }
    for (let row of rows) {
        $('.table-container #post-list').append("<tr></tr>");
        for (let col of columns){
            $('.table-container #post-list tr:last').append("<td>"+row[col.name]+"</td>");
        }
            $('.table-container #post-list tr:last').append("<td><button onClick='deletePost("+row.id+")' data-id='"+row.id+"' class='delete-button btn'>delete</button></td>");
            $('.table-container #post-list tr:last').append("<td><button onClick='editPost("+row.id+")' data-id='"+row.id+"' class='edit-button btn'>edit</button></td>");
    }
}