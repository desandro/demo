<!DOCTYPE html>
<html lang="en">
<head>
    <title>03-page-turn</title>
    <meta charset="utf-8" />

    <?php 
        $count = 24; 
        $w = 480/$count;
        $duration = 1;
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

#wrap.turning { background: yellow; }

#book {
  width: 100%;
  height: 100%;
  -webkit-transform-style: preserve-3d;
/*  -webkit-transform: rotateX(45deg);*/
  -webkit-transform-origin: left bottom;
}

.panel {
    background: url(http://i.imgur.com/8Q6xs.jpg);
    width: <?= $w+1 ?>px;
    height: 320px;
    position: relative;
    -webkit-transform: translate3d(<?= $w ?>px, 0, 0px) rotateY(0);
    -webkit-transform-origin: 0 0;
    -webkit-transform-style: preserve-3d;
    -webkit-animation-fill-mode: both;
/*    opacity: .9;*/
/*    -webkit-backface-visibility: hidden;*/
}

/*.panel.panel1 { -webkit-transform: translate3d(0,0,0);}*/

<?php for ($i=0; $i < $count; $i++): ?>
.panel<?= ($i+1) ?> {
    background-position: <?= $i*$w*-1?>px 0;
}

#wrap.turning .panel.panel<?= ($i+1) ?>,
#wrap.turn-back .panel.panel<?= ($i+1) ?> {
  -webkit-animation-delay: <?= ($count-$i)*($duration/$count) ?>s;
  -webkit-animation-fill-mode: both;
}
<?php endfor; ?>

#wrap.turning .panel {
  -webkit-animation: pageTurn <?= $duration ?>s ease-in-out;
}

#wrap.turn-back .panel {
  -webkit-animation: pageTurnBack <?= $duration ?>s ease-in-out;
}

<? $bend = 360 / $count * 0.7 ?>

@-webkit-keyframes pageTurn {
    0% { -webkit-transform: translate3d(<?= $w ?>px, 0, 0px) rotateY(0); }
   40% { -webkit-transform: translate3d(<?= $w ?>px, 0, 0px) rotateY(-<?= $bend ?>deg); }
   60% { -webkit-transform: translate3d(<?= $w ?>px, 0, 0px) rotateY(-<?= $bend ?>deg); }
  100% { -webkit-transform: translate3d(<?= $w ?>px, 0, 0px) rotateY(0deg); }
}

@-webkit-keyframes pageTurnBack {
    0% { -webkit-transform: translate3d(<?= $w ?>px, 0, 0px) rotateY(0); }
   40% { -webkit-transform: translate3d(<?= $w ?>px, 0, 0px) rotateY(<?= $bend ?>deg); }
   60% { -webkit-transform: translate3d(<?= $w ?>px, 0, 0px) rotateY(<?= $bend ?>deg); }
  100% { -webkit-transform: translate3d(<?= $w ?>px, 0, 0px) rotateY(0deg); }
}

#wrap .panel1 {
  -webkit-transform: translate3d(0, 0, 0px)  rotateY(0deg);
}


#wrap.turning .panel.panel1 {
  -webkit-animation: pageTurnPrime <?= $duration ?>s ease-in-out <?= $duration * (1-1/$count) ?>s;
  -webkit-animation-fill-mode: both;
}

@-webkit-keyframes pageTurnPrime {
    0% { -webkit-transform: translate3d(0,0,0) rotateY(0); }
  100% { -webkit-transform: translate3d(0,0,0) rotateY(-180deg); }
}

#wrap.turn-back .panel.panel1 {
  -webkit-animation: pageTurnBackPrime <?= $duration ?>s ease-in-out <?= $duration * (1-1/$count) ?>s;
  -webkit-animation-fill-mode: both;
}

@-webkit-keyframes pageTurnBackPrime {
    0% { -webkit-transform: translate3d(0,0,0) rotateY(-180deg); }
  100% { -webkit-transform: translate3d(0,0,0) rotateY(0deg); }
}



</style>




</head>
<body>

    <h1>03-page-turn</h1>

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
    
    <script>
      function init() {
        var wrap = document.getElementById('wrap');
        
        wrap.addEventListener( 'click', function(){
          var wrapClassList = wrap.classList;
          if ( wrapClassList.contains('turning') || wrapClassList.contains('turn-back') ) {
            wrapClassList.toggle('turning');
            wrapClassList.toggle('turn-back');
          } else {
            wrap.classList.toggle('turning');
          }
          
        }, false)
      }
      window.addEventListener( 'load', init, false)
    </script>

</body>
</html>