<!DOCTYPE html>
<html lang="en">
<head>
    <title>01-page-turn</title>
    <meta charset="utf-8" />

    <?php 
        $count = 24; 
        $w = 480/$count;
    ?>

<style media="screen">

body { font-family: sans-serif; }

#wrap {
    background: #DDD;
    -webkit-perspective: 1200;
    -webkit-perspective-origin: left center ;
    width: 480px;
    height: 320px;
    margin: 100px 0 0 480px;
    position: relative;
/*    overflow: hidden;*/
}

#book {
  
  -webkit-transform-style: preserve-3d;
  -webkit-transform: rotateX(45deg);
}

.panel {
    background: url(http://i.imgur.com/8Q6xs.jpg);
    width: <?= $w+1 ?>px;
    height: 320px;
    position: relative;
    -webkit-transform: translate3d(<?= $w ?>px, 0, 0px) rotateY(0);
    -webkit-transform-origin: 0 0;
    -webkit-transition: -webkit-transform 1s;
    -webkit-transform-style: preserve-3d;
/*    opacity: .9;*/
/*    -webkit-backface-visibility: hidden;*/
}

.panel.panel1 { -webkit-transform: translate3d(0,0,0);}

<?php for ($i=0; $i < $count; $i++): ?>
.panel<?= ($i+1) ?> {
    background-position: <?= $i*$w*-1?>px 0;
    -webkit-transition-delay: <?= ($count-$i)*20 ?>ms;
}



#wrap:hover .panel<?= ($i+1) ?> {
    -webkit-transform: <? if ($i !== 0): ?> translate3d(<?= $w ?>px, 0, 0px) <? endif; ?>  rotateY(<?= -(180 / ($count+1)) ?>deg);
}

<?php endfor; ?>

#wrap .panel1 {
/*        -webkit-transform: translate3d(0, 0, 0px)  rotateY(0deg);*/
}

#wrap:hover .panel1 {
/*    -webkit-transform: translate3d(0, 0, 0px)  rotateY(-90deg);*/
}


</style>




</head>
<body>

    <h1>01-page-turn</h1>

    <div id="wrap">
        <div id="book">
        <?php
            for ($i=0; $i < $count; $i++): ?>
            <?php for ($j=0; $j < $i; $j++) { echo '  '; } ?><div class="panel panel<?= $i+1 ?>">
        <?php endfor; ?>
        <?php for ($i=0; $i < $count; $i++): ?>
            <?php for ($j=0; $j < ($count - $i); $j++) { echo '  '; } ?></div>
        <?php endfor; ?>
        </div>
    </div>

</body>
</html>