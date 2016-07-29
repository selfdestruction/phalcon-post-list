<?php

class IndexController extends  BaseController
{

    public function indexAction(){





        echo "Boobs";


//        $post = new Post();

//        $post->name = 'name';
//        $post->email = 'email@email.email';
//        $post->phone = '123456789012';
//        $post->message = 'some message';
//        $post->save();

        $data = Post::find([
            "order" => "date DESC"
        ]);
//        echo "<pre>";
//        print_r($data->toArray());

        $currentPage = 1;
        $currentPage = $this->request->getQuery("page");


        $paginator = new \Phalcon\Paginator\Adapter\Model(
            array(
                "data"  => $data,
                "limit" => 10,
                "page"  => $currentPage
            )
        );
        $page = $paginator->getPaginate();

        $this->view->page = $page;
    }
}



