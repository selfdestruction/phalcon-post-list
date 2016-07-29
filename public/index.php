<?php

try {

    $loader = new \Phalcon\Loader();
    $loader->registerDirs([
        '../app/controllers/',
        '../app/models/'
    ]);
    $loader->register();

    $di = new \Phalcon\DI\FactoryDefault();

    $di->set('db', function () {
        return new \Phalcon\Db\Adapter\Pdo\Mysql([
            "host"     => "127.0.0.1",
            "username" => "root",
            "password" => "",
            "dbname"   => "post_list",
            "options" => [
                PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'
            ]
        ]);
    });


    $di->set('view', function(){
        $view = new \Phalcon\Mvc\View();
        $view->setViewsDir('../app/views');
        $view->registerEngines([
            ".volt" => 'Phalcon\Mvc\View\Engine\Volt'
        ]);
        return $view;
    });

    $di->set('flash', function () {
        $flash = new Phalcon\Flash\Direct(
            array(
                'error'   => 'alert alert-danger',
                'success' => 'alert alert-success',
                'notice'  => 'alert alert-info',
                'warning' => 'alert alert-warning'
            )
        );
        $flash->setImplicitFlush(true);
        return $flash;
    });

    $di->set('assets', function () {
        return new \Phalcon\Assets\Manager();
    }, true);

    $di->set('url', function () {

        $url = new \Phalcon\Mvc\Url();
        $url->setBaseUri('/phalcon-post-list/');
        return $url;
    });

    $app = new \Phalcon\Mvc\Application($di);
    echo $app->handle()->getContent();

} catch(\Phalcon\Exeption $e) {
    echo $e->GetMessege();
}