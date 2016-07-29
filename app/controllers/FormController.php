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
            $post->phone = $this->request->getPost('phone');
            $post->message = $this->request->getPost('message');

            if (!$post->update()) {
                foreach ($post->getMessages() as $m) {
                    $message .= $m."</br>";
                }
                $this->flash->error($message);
            } else {
                $this->flash->success("Post was updated successfully");

            }

            return $this->response->redirect("index/index");
        }
    }

    public function editAction($id){

        $post = Post::findFirst($id);

        if(!$post){
            $this->flash->error("No match!");
            return $this->response->redirect("index/index");

        }else{

            $this->view->post = $post;


            if($this->request->isPost()){

                $post->name = $this->request->getPost('name');
                $post->email = $this->request->getPost('email');
                $post->phone = $this->request->getPost('phone');
                $post->message = $this->request->getPost('message');

                if (!$post->update()) {
                    foreach ($post->getMessages() as $m) {
                        $message .= $m."</br>";
                    }
                    $this->flash->error($message);
                } else {
                    $this->flash->success("Post was updated successfully");

                }

                return $this->response->redirect("index/index");
            }
        }
    }
}