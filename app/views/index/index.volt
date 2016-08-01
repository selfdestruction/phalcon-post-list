{% extends "templates/base.volt" %}


{% block content %}

    <div class="jumbotron">
        <div class="form-container container hidden">
            <h2>Форма Добавления</h2>
            {{ form('', "class":"form-form") }}

            {{ text_field("id", "class":"hidden") }}
            <label for="title">Имя</label></br>
            {{ text_field("name", "size": 32) }}</br>

            <label for="title">Телефон</label></br>
            {{ text_field("phone", "size": 32) }}</br>

            <label for="title">Емейл</label></br>
            {{ text_field("email", "size": 32) }}</br>

            <label for="title">Сообщение</label></br>
            {{ text_area("message", "size": 32, "cols": 34, "rows": 4)}}</br>


            <button type="submit" class="btn submit-button">ok</button>
            <input type="button" class="btn cancel-button" value="cancel"/>

            {{ end_form() }}
        </div>
        <div class="container">
            <button class="btn add-button">add</button>
        </div>
        <div class="table-container container">
            Loading...
        </div>
        <div class="container">
            <button data-offset="0" class="prevPage-button btn hidden">Prev Page</button>
            <button data-offset="0" class="firstPage-button btn hidden">First Page</button>
            <button data-offset="0" class="nextPage-button btn hidden">Next Page</button>
        </div>
    </div>


{% endblock %}