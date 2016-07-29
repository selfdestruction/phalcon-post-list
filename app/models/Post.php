<?php

use Phalcon\Mvc\Model;
use Phalcon\Mvc\Model\Message as Message;

class Post extends Model
{

    public function initialize()
    {
        $this->setSource('Post_list');

    }

    public function beforeCreate(){

        $this->date = date('Y-m-d H:i:s');
    }
}