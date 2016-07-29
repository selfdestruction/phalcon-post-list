{% extends "templates/base.volt" %}

{% block content %}
    <div class="container">
        <h2>Форма Добавления</h2>
        {{ form('form/add/', 'method': 'post') }}


        <label for="title">Имя</label></br>
        {{ text_field("name", "size": 32) }}</br>

        <label for="title">Телефон</label></br>
        {{ text_field("phone", "size": 32) }}</br>

        <label for="title">Емейл</label></br>
        {{ text_field("email", "size": 32) }}</br>

        <label for="title">Сообщение</label></br>
        {{ text_area("message", "size": 32, "cols": 34, "rows": 4)}}</br>


        {{ submit_button('ok') }}

        {{ end_form() }}
    </div>
{% endblock %}


