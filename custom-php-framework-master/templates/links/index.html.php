<?php

/** @var \App\Model\Link[] $links */
/** @var \App\Service\Router $router */

$title = 'lINK List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Links List</h1>

    <a href="<?= $router->generatePath('links-create') ?>">Create new</a>

    <ul class="index-list">
        <?php foreach ($links as $post): ?>
            <li><h3><?= $post->getSubject() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('links-show', ['id' => $post->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('links-edit', ['id' => $post->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
