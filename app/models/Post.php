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

//        print_r($this->toArray());
//        die();

        $this->date = date('2100-m-d H:i:s');

//        if ($this->name == 'Peter') {
            $text = "A task cannot be named Peter";
            $field = "title";
            $type = "InvalidValue";
            $message = new Message($text, $field, $type);
            $this->appendMessage($message);
            return false;
//        }
    }
}