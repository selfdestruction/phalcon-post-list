<?php

use Phalcon\Mvc\Model;

class Post extends Model
{

    public function initialize()
    {
        $this->setSource('Post_list');

    }
}