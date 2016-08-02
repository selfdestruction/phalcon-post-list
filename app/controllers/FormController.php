<?php

class FormController extends  BaseController
{

    public function indexAction(){

    }

    public function addAction(){

        if($this->request->isPost()){
            $post = new Post();

            $post->name = $this->request->getPost('name');
            $post->email = $this->request->getPost('email');
            $post->phone = $this->request->getPost('phone');//$_POST['phone'];
            $post->message = $this->request->getPost('message');

            $post->create();

            $offset = ($this->request->getPost("offset")) ? $this->request->getPost("offset") : 0 ;
            $limit = ($this->request->getPost("limit")) ? $this->request->getPost("limit") : 10 ;

            $filterField = ($this->request->getPost("filterField")) ? $this->request->getPost("filterField") : 'date' ;
            $filterOrder = ($this->request->getPost("filterOrder") == 'false') ? 'ASC' : 'DESC' ;
            // print_r($filterField.' '.$filterOrder);
            $rows = Post::find([
                "order" => $filterField.' '.$filterOrder,
                "limit" => $limit,
                "offset" => $offset
            ]);

            $data['result'] = $rows->toArray();

            $data['colums'][] = ['name'=> 'name', 'descr' => 'Имя'];
            $data['colums'][] = ['name'=> 'email', 'descr' => 'Емейл'];
            $data['colums'][] = ['name'=> 'phone', 'descr' => 'Телефон'];
            $data['colums'][] = ['name'=> 'message', 'descr' => 'Сообщение'];
            $data['colums'][] = ['name'=> 'date', 'descr' => 'Дата'];
            $data['count'] = Post::count();

            echo json_encode($data);
        }

        $this->view->disable();
    }

    public function editAction($id){

        $post = Post::findFirst($id);

        if($this->request->isPost()){

            $post->name = $this->request->getPost('name');
            $post->email = $this->request->getPost('email');
            $post->phone = $this->request->getPost('phone');//$_POST['phone'];
            $post->message = $this->request->getPost('message');

            $post->update();

            $offset = ($this->request->getPost("offset")) ? $this->request->getPost("offset") : 0 ;
            $limit = ($this->request->getPost("limit")) ? $this->request->getPost("limit") : 10 ;

            $filterField = ($this->request->getPost("filterField")) ? $this->request->getPost("filterField") : 'date' ;
            $filterOrder = ($this->request->getPost("filterOrder") == 'false') ? 'ASC' : 'DESC' ;
            $rows = Post::find([
                "order" => $filterField.' '.$filterOrder,
                "limit" => $limit,
                "offset" => $offset
            ]);

            $data['result'] = $rows->toArray();

            $data['colums'][] = ['name'=> 'name', 'descr' => 'Имя'];
            $data['colums'][] = ['name'=> 'email', 'descr' => 'Емейл'];
            $data['colums'][] = ['name'=> 'phone', 'descr' => 'Телефон'];
            $data['colums'][] = ['name'=> 'message', 'descr' => 'Сообщение'];
            $data['colums'][] = ['name'=> 'date', 'descr' => 'Дата'];
            $data['count'] = Post::count();

            echo json_encode($data);
        }

        $this->view->disable();
    }

    public function deleteAction($id){

        $post = Post::findFirst($id);
        $post->delete();

        $offset = ($this->request->getPost("offset")) ? $this->request->getPost("offset") : 0 ;
        $limit = ($this->request->getPost("limit")) ? $this->request->getPost("limit") : 10 ;

        $filterField = ($this->request->getPost("filterField")) ? $this->request->getPost("filterField") : 'date' ;
        $filterOrder = ($this->request->getPost("filterOrder") == 'false') ? 'ASC' : 'DESC' ;

        $rows = Post::find([
            "order" => $filterField.' '.$filterOrder,
            "limit" => $limit,
            "offset" => $offset
        ]);

        $data['result'] = $rows->toArray();

        $data['colums'][] = ['name'=> 'name', 'descr' => 'Имя'];
        $data['colums'][] = ['name'=> 'email', 'descr' => 'Емейл'];
        $data['colums'][] = ['name'=> 'phone', 'descr' => 'Телефон'];
        $data['colums'][] = ['name'=> 'message', 'descr' => 'Сообщение'];
        $data['colums'][] = ['name'=> 'date', 'descr' => 'Дата'];
        $data['count'] = Post::count();

        echo json_encode($data);
    }
}