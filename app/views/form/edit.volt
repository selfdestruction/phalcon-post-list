{% extends "templates/base.volt" %}

{% block content %}
    <div class="container">
        <h2>Форма редактирования сообщения</h2>
        {{ form('form/edit/' ~ post.id, 'method': 'post') }}


        <label for="title">Имя</label></br>
        {{ text_field("name", "value": post.name, "size": 32) }}</br>

        <label for="title">Телефон</label></br>
        {{ text_field("phone", "value": post.phone, "size": 32) }}</br>

        <label for="title">Емейл</label></br>
        {{ text_field("email", "value": post.email, "size": 32) }}</br>

        <label for="title">Сообщение</label></br>
        {{ text_area("message", "value": post.message, "size": 32, "cols": 34, "rows": 4)}}</br>


        {{ submit_button('ok') }}

        {{ end_form() }}
    </div>
{% endblock %}