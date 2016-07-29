<?php

class BaseController extends \Phalcon\Mvc\Controller
{
    public function initialize()
    {

        $this->assets
            ->collection('style')
            ->addCss('third-party/bootstrap/css/bootstrap.css')
            ->setTargetPath('css/production.css')
            ->setTargetUri('css/production.css')
            ->join(true)
            ->addFilter(new Phalcon\Assets\Filters\Cssmin());


        $this->assets
            ->collection('js')
            ->addJs("third-party/js/jquery.min.js", false)
//            ->addJs("//code.highcharts.com/highcharts.js", false)
//            ->addJs("//code.highcharts.com/modules/data.js", false)
//            ->addJs("//code.highcharts.com/modules/drilldown.js", false)
            // ->addJs('bootstrap/js/jquery.min.js', false, false)
            // ->addJs('bootstrap/js/bootstrap.min.js', false, false)
            // ->addJs('js/select2.min.js', false, false)
            ->setTargetPath('js/production.js')
            ->setTargetUri('js/production.js')
            ->join(true)
            ->addFilter(new \Phalcon\Assets\Filters\Jsmin());
    }
}