/** 
 *  jquery.columnview-1.1.1.js
 *  
 *  Created by Chris Yates on 2009-02-26.
 *  http://christianyates.com
 *  Copyright 2009 Christian Yates and ASU Mars Space Flight Facility. All rights reserved.
 *  
 *  Requires jQuery 1.3.x
 *  Also available with jQuery 1.2.6 support (with Live Query plugin) - see
 *  http://christianyates.com/blog/jquery/finder-column-view-hierarchical-lists-jquery
 *  
 *  Tested with Firefox 3.x, Safari 3.x,4.x, Internet Explorer 6.x,7.x
 *  Dual licensed under MIT and GPL.
 *
 */
 
(function($){
  $.fn.columnview = function(){
    // Add stylesheet, but only once
    if(!$('.containerobj').get(0)){
      $('head').prepend('\
      <style type="text/css" media="screen">\
        .containerobj {\
          border: 1px solid #ccc;\
          height:5em;\
          overflow-x:auto;\
          overflow-y:hidden;\
          white-space:nowrap;\
          position:relative;\
        }\
        .containerobj div {\
          height:100%;\
          overflow-y:scroll;\
          overflow-x:hidden;\
          position:absolute;\
        }\
        .containerobj a {\
          display:block;\
          clear:both;\
          white-space:nowrap;\
          min-width:150px;\
        }\
        .containerobj a canvas{\
          padding-left:1em;\
        }\
        .containerobj .feature {\
          min-width:200px;\
        }\
        .containerobj .feature a {\
          white-space:normal;\
        }\
        .containerobj .hasChildMenu {\
        }\
        .containerobj .active {\
          background-color:#3671cf;\
          color:#fff;\
        }\
        .containerobj .inpath {\
          background-color:#d0d0d0;\
          color:#000;\
        }\
        .containerobj .hasChildMenu .widget{\
          color:black;\
          position:absolute;\
          right:0;\
          text-decoration:none;\
          font-size:0.7em;\
        }\
      </style>');
    }
    
    // Hide original list
    $(this).hide();
    
    // Create new top container from top-level LI tags
    var top = $(this).children('li');
    var container = $('<div/>').addClass('containerobj').attr('id','cv'+Math.floor(Math.random()*10e10)).insertAfter(this);
    var topdiv = $('<div class="top"></div>').appendTo(container);
    if($.browser.msie) { $('.top').width('200px'); } // Cuz IE don't support auto width
    $.each(top,function(i,item){
      var topitem = $(':eq(0)',item).clone().data('sub',$(item).children('ul')).appendTo(topdiv);
      if($(topitem).data('sub').length) {
        $(topitem).addClass('hasChildMenu');
        if($.browser.safari){
          $(topitem).css({'margin-right':'15px'});    
        }
        addWidget(topitem);
      }
    });
    
    // Event handling functions
    $('a',container).live("click",function(){
      var container = $(this).parents('.containerobj');
      // Handle clicks
      var level = $('div',container).index($(this).parents('div'));
      // Remove blocks to the right in the tree, and 'deactivate' other links within the same level
      $('div:gt('+level+')',container).remove();
      $('div:eq('+level+') a',container).removeClass('active').removeClass('inpath');
      $('.active',container).addClass('inpath');
      $(this).addClass('active');
      if($(this).data('sub').children('li').length) {
        // Menu has children, so add another submenu
        submenu(container,this);
      } else {
        // No children, show title instead (if it exists, or a link)
        var title = $('<a/>').attr({href:$(this).attr('href')}).text($(this).attr('title') ? $(this).attr('title') : $(this).text());
        var featurebox = $('<div/>').html(title).addClass('feature').appendTo(container);
        // Set the width
        var remainingspace = 0;
        $.each($(container).children('div').slice(0,-1),function(i,item){
          remainingspace += $(item).width();
        });
        var fillwidth = $(container).width() - remainingspace;
        $(featurebox).css({'top':0,'left':remainingspace}).width(fillwidth).show();
      }
      return false;
    }); 

    // Keyboard navigation
    $('a',container).live('keydown',function(key){
      switch(key.which){
        case(37): //left
          $(this).parent().prev().children('.active').focus().click();
          break;
        case(38): //up
          $(this).prev().focus().click();
          break;
        case(39): //right
          if($(this).hasClass('hasChildMenu')){
            $(this).parent().next().children('a:first').focus().click();            
          }
          break;
        case(40): //down        
          $(this).next().focus().click();
          break;
        case(13): //enter
          $(this).dblclick();
          break;
      }
    });

  }; 
  
  // Generate deeper level menus
  function submenu(container,item){
    var leftPos = 0;
    $.each($(container).children('div'),function(i,mydiv){
      leftPos += $(mydiv).width();
    });
    var submenu = $('<div/>').css({'top':0,'left':leftPos}).appendTo(container);
    if($.browser.msie) { $(submenu).width('200px'); } // Cuz IE don't support auto width
    var subitems = $(item).data('sub').children('li');
    $.each(subitems,function(i,subitem){
      var subsubitem = $(':eq(0)',subitem).clone().data('sub',$(subitem).children('ul')).appendTo(submenu);
      if($(subsubitem).data('sub').length) {
        $(subsubitem).addClass('hasChildMenu');
        if($.browser.safari){
          $(subsubitem).css({'margin-right':'15px'});    
        }
        addWidget(subsubitem);
      }
    });
  }
  
  // Uses canvas, if available, to draw a triangle to denote that item is a parent
  function addWidget(item, color){
    var triheight = $(item).height();
    var canvas = $("<canvas></canvas>").attr({height:triheight,width:10}).addClass('widget').prependTo(item);    if(!color){ color = $(canvas).css('color'); }
    canvas = $(canvas).get(0);
    if(canvas.getContext){
      var context = canvas.getContext('2d');
      context.fillStyle = color;
      context.beginPath();
      context.moveTo(3,(triheight/2 - 3));
      context.lineTo(10,(triheight/2));
      context.lineTo(3,(triheight/2 + 3));
      context.fill();
    } else {
      /**
       * Canvas not supported - put something in there anyway that can be 
       * suppressed later if desired. We're using a decimal character here
       * representing a "black right-pointing pointer" in Windows since IE
       * is the likely case that doesn't support canvas.
       */
      $("<span>&#9658;</span>").addClass('widget').css({'height':triheight,'width':10}).prependTo(item);
    }
  } 
  
})(jQuery);