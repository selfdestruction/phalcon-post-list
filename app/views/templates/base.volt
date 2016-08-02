<!DOCTYPE html>
<html>
<head>
    <title>Post List</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {{ this.assets.outputCss('style') }}
    {{ this.assets.outputJs('js') }}
</head>
<body>
<div id="messages">{{ flash.output() }}</div>

{% block content %}

{% endblock %}

</body>
</html>