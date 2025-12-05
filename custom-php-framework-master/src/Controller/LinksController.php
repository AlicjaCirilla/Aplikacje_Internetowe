<?php
namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\Link;
use App\Service\Router;
use App\Service\Templating;

class LinksController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $links = Link::findAll();

        return $templating->render('links/index.html.php', [
            'links' => $links,
            'router' => $router,
        ]);
    }

    public function createAction(?array $requestData, Templating $templating, Router $router): ?string
    {
        if ($requestData) {
            $link = Link::fromArray($requestData);
            $link->save();

            $router->redirect($router->generatePath('links-index'));
            return null;
        }

        return $templating->render('links/create.html.php', [
            'link' => new Link(),
            'router' => $router,
        ]);
    }

    public function editAction(int $id, ?array $requestData, Templating $templating, Router $router): ?string
    {
        $link = Link::find($id);
        if (! $link) {
            throw new NotFoundException("Link with id $id not found");
        }

        if ($requestData) {
            $link->fill($requestData);
            $link->save();

            $router->redirect($router->generatePath('links-index'));
            return null;
        }

        return $templating->render('links/edit.html.php', [
            'link' => $link,
            'router' => $router,
        ]);
    }

    public function showAction(int $id, Templating $templating, Router $router): ?string
    {
        $link = Link::find($id);
        if (! $link) {
            throw new NotFoundException("Link with id $id not found");
        }

        return $templating->render('links/show.html.php', [
            'link' => $link,
            'router' => $router,
        ]);
    }

    public function deleteAction(int $id, Router $router): ?string
    {
        $link = Link::find($id);
        if (! $link) {
            throw new NotFoundException("Link with id $id not found");
        }

        $link->delete();
        $router->redirect($router->generatePath('links-index'));

        return null;
    }
}