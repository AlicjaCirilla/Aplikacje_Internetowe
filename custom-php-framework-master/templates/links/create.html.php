<?php

/** @var \App\Model\Link $link */
/** @var \App\Service\Router $router */

$title = 'Create Link';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Create Link</h1>

    <form action="<?= $router->generatePath('links-create') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="links-create">
    </form>

    <a href="<?= $router->generatePath('links-index') ?>">Back to the List</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
