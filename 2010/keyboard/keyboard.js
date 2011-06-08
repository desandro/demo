var keys = [];

keys[8] = 'backspace';
keys[9] = 'tab';
keys[12] = 'clear';
keys[13] = 'enter';
keys[16] = 'shift';
keys[17] = 'ctrl';
keys[18] = 'alt';
keys[19] = 'f15';
keys[20] = 'capslock';
keys[27] = 'esc';
keys[32] = 'space';
keys[33] = 'pageup';
keys[34] = 'pagedown';
keys[35] = 'end';
keys[36] = 'home';
keys[37] = 'left';
keys[38] = 'up';
keys[39] = 'right';
keys[40] = 'down';
keys[44] = 'f13';
keys[45] = 'insert';
keys[46] = 'delete';
keys[48] = 'n0';
keys[49] = 'n1';
keys[50] = 'n2';
keys[51] = 'n3';
keys[52] = 'n4';
keys[53] = 'n5';
keys[54] = 'n6';
keys[55] = 'n7';
keys[56] = 'n8';
keys[57] = 'n9';
keys[59] = 'semicolon';
keys[61] = 'equals'; // firefox
keys[65] = 'a';
keys[66] = 'b';
keys[67] = 'c';
keys[68] = 'd';
keys[69] = 'e';
keys[70] = 'f';
keys[71] = 'g';
keys[72] = 'h';
keys[73] = 'i';
keys[74] = 'j';
keys[75] = 'k';
keys[76] = 'l';
keys[77] = 'm';
keys[78] = 'n';
keys[79] = 'o';
keys[80] = 'p';
keys[81] = 'q';
keys[82] = 'r';
keys[83] = 's';
keys[84] = 't';
keys[85] = 'u';
keys[86] = 'v';
keys[87] = 'w';
keys[88] = 'x';
keys[89] = 'y';
keys[90] = 'z';
keys[91] = 'lcmd';
keys[92] = 'rcmd';
keys[93] = 'rcmd'; // chrome
keys[96] = 'numpad0';
keys[97] = 'numpad1';
keys[98] = 'numpad2';
keys[99] = 'numpad3';
keys[100] = 'numpad4';
keys[101] = 'numpad5';
keys[102] = 'numpad6';
keys[103] = 'numpad7';
keys[104] = 'numpad8';
keys[105] = 'numpad9';
keys[106] = 'multiply';
keys[107] = 'plus';
keys[109] = 'minus';
keys[110] = 'dot';
keys[111] = 'divide';
keys[112] = 'f1';
keys[113] = 'f2';
keys[114] = 'f3';
keys[115] = 'f4';
keys[116] = 'f5';
keys[117] = 'f6';
keys[118] = 'f7';
keys[119] = 'f8';
keys[120] = 'f9';
keys[121] = 'f10';
keys[122] = 'f11';
keys[123] = 'f12';
keys[124] = 'f13'; // chrome
keys[125] = 'f14'; // chrome
keys[126] = 'f15'; // chrome
keys[127] = 'f16'; // chrome
keys[128] = 'f17'; // chrome
keys[129] = 'f18'; // chrome
keys[130] = 'f19'; // chrome
keys[144] = 'num lock';
keys[145] = 'f14';
keys[186] = 'semicolon';
keys[187] = 'equals'; //chrome
keys[188] = 'comma';
keys[189] = 'dash';
keys[190] = 'period';
keys[191] = 'slash';
keys[192] = 'tick';
keys[219] = 'openbracket';
keys[220] = 'backslash';
keys[221] = 'closebracket';
keys[222] = 'quote';

keys[224] = 'cmd';



$(function(){
    
    // Paul Irish logger
    function debug(){
        window.console && console.log.call(console,arguments);
    };
    
    $(document).bind('keydown keyup', function(e){
        var code = (e.keyCode ? e.keyCode : e.which);
        var keyClass = keys[code];
        var $downKey = $('#keyboard .'+keyClass);
        debug(code, keyClass);
        // console.log(code);
        
        $downKey.toggleClass('keydown');
        if (!$downKey.length) {
            alert('No key found for ' + code);
        }
        
    });
    
    $('#keyboard .key').mousedown(function(){
        $(this).addClass('keydown');
    }).mouseup(function(){
        $(this).removeClass('keydown');
    })
    
    $('#reset').click(function(){
        $('#keyboard .keydown').toggleClass('keydown');
    })
});