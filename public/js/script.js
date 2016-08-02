// app stage vars
var currentOffset = 0;
var count = 0;
var limit = 10;
var filterField = '';
var filterOrder = false;
var rows = {};
var colums = {};
var path = window.location.href;

$(function() {

    // startup
    const startupRequest$ = Rx.Observable.of( path + 'index/list/?limit=' + limit );

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
            // console.log(currentOffset);
            return path + 'index/list/?offset='+currentOffset+'&limit='+limit;
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

            return path + 'index/list/'+'?limit='+limit;
        });

    // prev page
    const $prevPageButton = $('.prevPage-button');
    const prevPage$ = Rx.Observable.fromEvent($prevPageButton, 'click');
    const prevPageRequest$ = prevPage$
        .map( ev => {
            // console.log(currentOffset);
            // console.log(limit);
            // console.log('limit');
            currentOffset = currentOffset - limit;
            if(currentOffset === 0){
                $firstPageButton.addClass('hidden');
                $prevPageButton.addClass('hidden');
            }
            $nextPageButton.removeClass('hidden');
            return path + 'index/list/?offset='+currentOffset+'&limit='+limit;
        });

    // delete post
    const $deletePageButton = $('.delete-button');
    const deletePage$ = Rx.Observable.fromEvent($deletePageButton, 'click');
    const deletePostRequest$ = deletePage$
        .map( ev => {
            // console.log($(ev.target).data('id'));
            return path + 'form/delete/'+$(ev.target).data('id')+'/?offset='+currentOffset+'&limit='+limit;
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
            data = data+'&offset='+currentOffset+'&limit='+limit+'&filterField='+filterField+'&filterOrder='+filterOrder;
            let url = path + 'form/add';
            if(id){
                url = path + 'form/edit/'+id;
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

function rowFilter(f){
    filterField = f;
    console.log(filterOrder);
    filterOrder = !filterOrder;
    console.log(filterOrder);
    data = '?offset='+currentOffset+'&limit='+limit+'&filterField='+f+'&filterOrder='+filterOrder;
    console.log(data);
    $.get(path + 'index/list/' + data, function(result){
        // console.log(result);
        result = JSON.parse(result);
        columns = result.colums;
        rows = result.result;
        renderTable(columns, rows);
    });
}

function post(data, url){
    $.post(url, data, function (result, xhr){
        result = JSON.parse(result);
        count = result.count;
        columns = result.colums;
        rows = result.result;
        renderTable(columns, rows);
        $('.form-container').addClass('hidden');
        $('.add-button').removeClass('hidden');
        if(limit < count && currentOffset == 0){
            $('.nextPage-button').removeClass('hidden');
        }
    });
}

function editPost(th){
    let row = rows.filter(x => x.id == th);
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
    $.post(path + 'form/delete/'+id, data, function (result, xhr){
        result = JSON.parse(result);
        count = result.count;
        columns = result.colums;
        rows = result.result;
        if(count <= limit){
            $('.nextPage-button').addClass('hidden');
        }
        renderTable(columns, rows);
    });
}

function renderTable(columns, rows){
    if(rows.length != 0){
        $('.table-container').html("<table class='table table-bordered' id='post-list' ><tr></tr></table>");
        for (let col of columns) {
            $('.table-container #post-list tr:last').append("<th><span onClick='rowFilter(\""+col.name+"\")'>"+col.name+"</span></th>");
        }
        $('.table-container #post-list tr:last').append("<th></th>");
        $('.table-container #post-list tr:last').append("<th></th>");
        for (let row of rows) {
            $('.table-container #post-list').append("<tr></tr>");
            for (let col of columns){
                $('.table-container #post-list tr:last').append("<td>"+row[col.name]+"</td>");
            }
                $('.table-container #post-list tr:last').append("<td><button onClick='deletePost("+row.id+")' data-id='"+row.id+"' class='delete-button btn'>delete</button></td>");
                $('.table-container #post-list tr:last').append("<td><button onClick='editPost("+row.id+")' data-id='"+row.id+"' class='edit-button btn'>edit</button></td>");
        }
    }else{
        $('.table-container').html("<div>No posts</div>");
    }
}