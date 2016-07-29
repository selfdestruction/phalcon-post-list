{% extends "templates/base.volt" %}


{% block content %}

    <div class="jumbotron">
        <div class="container">
            <h2>Список</h2>

            {% for result in page.items %}
                {% if loop.first %}
                    <table class="table table-bordered">
                    <tr>
                        <th>Имя</th>
                        <th>Телефон</th>
                        <th>Емейл</th>
                        <th>Сообщение</th>
                        <th>Дата</th>
                        <th></th>
                        <th></th>
                    </tr>
                {% endif %}
                <tr>
                    <td>{{ result.name }}</td>
                    <td>{{ result.phone }}</td>
                    <td>{{ result.email }}</td>
                    <td>{{ result.message }}</td>
                    <td>{{ result.date }}</td>
                    <td>{{ link_to("form/edit/" ~ result.id, "Редактировать", "class":'button') }}</td>
                    <td>{{ link_to("form/delete/" ~ result.id, "Удалить", "class":'button') }}</td>
                </tr>
                {% if loop.last %}
                    </table>
                {% endif %}
            {% endfor %}
            <div class="button-h">
                {{ link_to("index/index/", "Первая", "class":'button') }}
                {{ link_to("index/index?page=" ~ page.before, "Предыдущая", "class":'button') }}
                {{ link_to("index/index/?page=" ~ page.next, "Следующая", "class":'button') }}
                {{ link_to("index/index/?page=" ~ page.last, "Последняя", "class":'button') }}
            </div>
        </div>
    </div>
    <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>


{% endblock %}