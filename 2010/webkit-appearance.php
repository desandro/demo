<?php
    $appearances = array('button', 'button-bevel', 'caret', 'checkbox', 'default-button', 'listbox', 'listitem', 'media-fullscreen-button', 'media-mute-button', 'media-play-button', 'media-seek-back-button', 'media-seek-forward-button', 'media-slider', 'media-sliderthumb', 'menulist', 'menulist-button', 'menulist-text', 'menulist-textfield', 'none', 'push-button', 'radio', 'searchfield', 'searchfield-cancel-button', 'searchfield-decoration', 'searchfield-results-button', 'searchfield-results-decoration', 'slider-horizontal', 'slider-vertical', 'sliderthumb-horizontal', 'sliderthumb-vertical', 'square-button', 'textarea', 'textfield')

?>

<!DOCTYPE html>
<html>
<head>
    <title>Webkit appearance</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

<style type="text/css" media="screen">
body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    padding: 80px;
}
</style>

</head>
<body>
    <h1>Webkit Appearance</h1>

    <div><input type="range" style="-webkit-appearance:slider-horizontal;"></div>
    <div><input type="range" style="-webkit-appearance:slider-vertical; height: 200px;"></div>
    <div><button style="-webkit-appearance:button;width:200px;height:30px;">gradient button</button></div>
    <div><button style="-webkit-appearance:push-button;width:200px;">aqua button</button></div>
    <div><input type="text" style="-webkit-appearance:searchfield;" value="kitten" /></div>


    <?php foreach ($appearances as $appearance): ?>
        <div>
            <p><?= $appearance ?></p>
    
        <div style="-webkit-appearance:<?= $appearance ?>"></div>
        <div style="-webkit-appearance:<?= $appearance ?>"><?= $appearance ?></div>

    </div>
    <?php endforeach; ?>

</body>
</html>