<!DOCTYPE html>
<html>
<head>
    <title>Post List</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {{ this.assets.outputCss('style') }}
</head>
<body>
<div class="navbar navbar-default">
    <div class="container">
        <div class="navbar-heder">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">
                <li>{{ link_to("index/index", 'Список') }}</li>
                <li>{{ link_to("form/add", 'Добавить статью') }}</li>
            </ul>
        </div>

    </div>
</div>
<div id="messages">{{ flash.output() }}</div>

{% block content %}

{% endblock %}

</body>
</html>