<?php

class BaseController extends \Phalcon\Mvc\Controller
{
    public function initialize(){

        $this->assets
                ->collection('style')
                ->addCss('third-party/bootstrap/css/bootstrap.css')
                ->setTargetPath('css/production.css')
                ->setTargetUri('css/production.css')
                ->join(true)
                ->addFilter(new Phalcon\Assets\Filters\Cssmin());
    }
}