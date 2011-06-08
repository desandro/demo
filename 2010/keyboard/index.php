<?php
    $keys = array(
        array(
            'esc' => 'esc',
            'f1' => 'F1',
            'f2' => 'F2',
            'f3' => 'F3',
            'f4' => 'F4',
            'f5' => 'F5',
            'f6' => 'F6',
            'f7' => 'F7',
            'f8' => 'F8',
            'f9' => 'F9',
            'f10' => 'F10',
            'f11' => 'F11',
            'f12' => 'F12',
            'f13' => 'F13',
            'f14' => 'F14',
            'f15' => 'F15',
            'f16' => 'F16',
            'f17' => 'F17',
            'f18' => 'F18',
            'f19' => 'F19'
        ),
        array(
            'tick' => '`',
            'n1' => '1',
            'n2' => '2',
            'n3' => '3',
            'n4' => '4',
            'n5' => '5',
            'n6' => '6',
            'n7' => '7',
            'n8' => '8',
            'n9' => '9',
            'n0' => '0',
            'dash' => '-',
            'equals' => '=',
            'backspace' => 'Backspace',
            'insert' => 'ins',
            'home' => 'Home',
            'pageup' => 'PgUp',
            'clear' => 'Clear',
            'numpadequals equals' => '=',
            'divide' => '/',
            'multiply' => '*'
        ),
        array(
            'tab' => 'Tab',
            'q' => 'Q',
            'w' => 'W',
            'e' => 'E',
            'r' => 'R',
            't' => 'T',
            'y' => 'Y',
            'u' => 'U',
            'i' => 'I',
            'o' => 'O',
            'p' => 'P',
            'openbracket' => '[',
            'closebracket' => ']',
            'backslash' => '\\',
            'delete' => 'Del',
            'end' => 'End',
            'pagedown' => 'PgDn',
            'numpad7' => '7',
            'numpad8' => '8',
            'numpad9' => '9',
            'minus' => '-'
        ),
        array(
            'capslock' => 'capslock',
            'a' => 'A',
            's' => 'S',
            'd' => 'D',
            'f' => 'F',
            'g' => 'G',
            'h' => 'H',
            'j' => 'J',
            'k' => 'K',
            'l' => 'L',
            'semicolon' => ';',
            'quote' => '\'',
            'enter' => 'Enter',
            'numpad4' => '4',
            'numpad5' => '5',
            'numpad6' => '6',
            'plus' => '+'
        ),
        array(
            'lshift shift' => 'Shift',
            'z' => 'Z',
            'x' => 'X',
            'c' => 'C',
            'v' => 'V',
            'b' => 'B',
            'n' => 'N',
            'm' => 'M',
            'comma' => ',',
            'period' => '.',
            'slash' => '/',
            'rshift shift' => 'Shift',
            'up' => '&uarr;',
            'numpad1' => '1',
            'numpad2' => '2',
            'numpad3' => '3',
            'numpadenter enter' => 'Enter',
        ),
        array(
            'lctrl ctrl' => 'Ctrl',
            'lalt alt' => 'Alt',
            'lcmd cmd' => 'Cmd',
            'space' => 'Space',
            'rcmd cmd' => 'Cmd',
            'ralt alt' => 'Alt',
            'rctrl ctrl' => 'Ctrl',
            'left' => '&larr;',
            'down' => '&darr;',
            'right' => '&rarr;',
            'numpad0' => '0',
            'dot' => '.'
        )
    );

?>



<!DOCTYPE html>
<html>
<head>
    <title>jquery keyboard</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>

    <link rel="stylesheet" href="screen.css" type="text/css" media="screen" />
    
    <script type="text/javascript" src="http://code.jquery.com/jquery.min.js" charset="utf-8"></script>
    <script type="text/javascript" src="keyboard.js" charset="utf-8"></script>
    
</head>
<body>

<ul id="keyboard">
<?php foreach ($keys as $i => $row): ?>
    <li class="row row<?= $i ?>">
        <ul>
            <?php foreach ($row as $key => $label): ?>
                <li class="key <?= $key ?>"><?= $label ?></li>
            <?php endforeach; ?>
        </ul>
    </li>
<?php endforeach; ?>
</ul>

<button id="reset">Reset</button>

</body>
</html>