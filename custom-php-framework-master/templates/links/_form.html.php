<?php /** @var \App\Model\Link $link */ ?>

<div class="form-group">
    <label for="subject">Subject</label>
    <input
            type="text"
            id="subject"
            name="subject"
            value="<?= htmlspecialchars($link->getSubject() ?? '') ?>"
    >
</div>

<div class="form-group">
    <label for="content">Content (URL)</label>
    <textarea
            id="content"
            name="content"
    ><?= htmlspecialchars($link->getContent() ?? '') ?></textarea>
</div>

<div class="form-group">
    <input type="submit" value="Save">
</div>
