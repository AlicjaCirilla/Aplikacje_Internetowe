<?php
require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'autoload.php';

$config = new \App\Service\Config();

$templating = new \App\Service\Templating();
$router = new \App\Service\Router();

$action = $_REQUEST['action'] ?? null;
switch ($action) {
    case 'links-index':
        $controller = new \App\Controller\LinksController();
        $view = $controller->indexAction($templating, $router);
        break;
    case 'links-show':
        if (! $_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\LinksController();
        $view = $controller->showAction($_REQUEST['id'], $templating, $router);
        break;
    case 'links-edit':
        if (! $_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\LinksController();
        $view = $controller->editAction($_REQUEST['id'], $_REQUEST ?? null, $templating, $router);
        break;
    case 'links-delete':
        if (! $_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\LinksController();
        $view = $controller->deleteAction($_REQUEST['id'], $router);
        break;
    case 'links-create':
        $controller = new \App\Controller\LinksController();
        $view = $controller->createAction($_REQUEST ?? null, $templating, $router);
        break;



    case 'post-index':
    case null:
        $controller = new \App\Controller\PostController();
        $view = $controller->indexAction($templating, $router);
        break;
    case 'post-create':
        $controller = new \App\Controller\PostController();
        $view = $controller->createAction($_REQUEST['post'] ?? null, $templating, $router);
        break;
    case 'post-edit':
        if (! $_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\PostController();
        $view = $controller->editAction($_REQUEST['id'], $_REQUEST['post'] ?? null, $templating, $router);
        break;
    case 'post-show':
        if (! $_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\PostController();
        $view = $controller->showAction($_REQUEST['id'], $templating, $router);
        break;
    case 'post-delete':
        if (! $_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\PostController();
        $view = $controller->deleteAction($_REQUEST['id'], $router);
        break;
    case 'info':
        $controller = new \App\Controller\InfoController();
        $view = $controller->infoAction();
        break;
    default:
        $view = 'Not found';
        break;
}

if ($view) {
    echo $view;
}
