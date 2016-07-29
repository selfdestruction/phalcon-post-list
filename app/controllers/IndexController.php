<?php

class IndexController extends  BaseController
{

    public function indexAction(){

    }
    public function listAction(){

//        $post = new Post();

//        $post->name = 'name';
//        $post->email = 'email@email.email';
//        $post->phone = '123456789012';
//        $post->message = 'some message';
//        $post->save();
        $offset = ($this->request->getQuery("offset")) ? $this->request->getQuery("offset") : 0 ;
        $rows = Post::find([
            "order" => "id ASC",
            "limit" => 10,
            "offset" => $offset
        ]);
       // echo "<pre>";

        // $currentPage = 1;
//        $currentPage = $this->request->getQuery("page");
//
//
//        $paginator = new \Phalcon\Paginator\Adapter\Model(
//            array(
//                "data"  => $data,
//                "limit" => 10,
//                "page"  => $currentPage
//            )
//        );
//        $page = $paginator->getPaginate();
//
//        $this->view->page = $page;
        $data['result'] = $rows->toArray();
       // print_r($data);

        $data['colums'][] = ['name'=> 'name', 'descr' => 'Имя'];
        $data['colums'][] = ['name'=> 'email', 'descr' => 'Емейл'];
        $data['colums'][] = ['name'=> 'phone', 'descr' => 'Телефон'];
        $data['colums'][] = ['name'=> 'message', 'descr' => 'Сообщение'];
        $data['colums'][] = ['name'=> 'date', 'descr' => 'Дата'];

//        echo "<pre>";
//        print_r($data);
//        echo "</pre>";

        $this->view->disable();
        echo json_encode($data);
    }
}



