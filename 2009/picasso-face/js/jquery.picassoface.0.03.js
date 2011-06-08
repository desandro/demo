
$(function(){
    function debug(){
      window.console && console.log.call(console,arguments)
    }


	// get scroll Bar size
	
	var wNoScroll = 0;
    var wScroll = 0;

	var outerBox = $('<div />').css({
		position: 'absolute',
		left: -1000,
		width: 100,
		height: 50,
		overflow: 'hidden'
	});

	var innerBox = $('<div />').css({
		width: '100%',
		height: 200
	}).appendTo( outerBox );

	$('body').append( outerBox );

    // Width of the inner div sans scrollbar
    wNoScroll = innerBox.width();
    // Add the scrollbar
    outerBox.css('overflow', 'auto');
    // Width of the inner div width scrollbar
    wScroll = innerBox.width();			

	var scrollBarW =  (wNoScroll - wScroll);

	outerBox.remove();




	// letsa make Picasso Face

	var colW = 350;
	var pFaceH = 400;


	// make the picasso face, all new elements
	
	$('#menu').each(function(){
		var tree = [];
		var maxLevel = 0;

		// for ul.branch
		$(this).find('.branch').each(function(){
			
			// level = how many branches are in its parents
			var level = $(this).parents('.branch').length + 1;
			$(this).addClass('level' + level);
			maxLevel = Math.max( maxLevel, level );

			var clonedBranch = $(this).children('ul').clone();
			clonedBranch.find('.branch ul').remove();

			if (tree[level] == undefined ) tree[level] = [];
			tree[level].push( clonedBranch );					
		});

		var topMenu = $(this).clone().removeAttr('id');
		topMenu.find('.branch ul').remove();
		tree[0] = topMenu;

		var pFace = $('<div class="picasso_face" />');

		var xWrap = $('<div class="pface_x_wrap" />');
		pFace.append( xWrap );

		//	debug('colW: ' + colW);

		for( i = 0; i <= maxLevel; i++ ) {
			var column = $('<div class="column col' + i + '" />');
			var colX = Math.max( 0, colW * (i) );
			column.css({ 
				zIndex: (maxLevel-i)*100 + 100,
				left: colX
			});

		//	debug(i );
			for (j = 0; j < tree[i].length; j++ ) {
				column.append( tree[i][j] );
			}

			column.appendTo( xWrap );
		}

		$(this).before( pFace );


		pFace.css({
			'overflow-x': 'scroll',
			height: pFaceH,
			
		});

		xWrap.css({
			
			height: '100%',
			position: 'relative',
			overflow: 'hidden'
		})
			// style all columns the same
			.children('.column').css({
				width: colW,
				position: 'absolute',
				height: pFaceH - scrollBarW,
				overflow: 'hidden'
			})
				// style all column > ul the same
				.children().hide().css({
					width: colW,	
					left: colW * -1,
					height: '100%',
					position: 'absolute',
					overflow: 'auto',
					top: 0
				})
		;

		//pFace.find('.column:gt(0)').children().hide();
		pFace.find('.column:eq(0)').children().addClass('active').show().css('left', 0);

		xWrap.css('width', colW * 2)
	});


	// handling interactions, rollovers, clicks, that sort of thing

	var aniSpeed = 'slow';
	var aniEasing = 'easeOutQuart';


	function getContext(el) {
		var context = {
			pFace: el.parents('.picasso_face'),
			column: el.parents('.column'),
		};
		
		context.allCols = context.pFace.find('.column');
		context.level = context.allCols.index( context.column );
		context.nextCol = context.allCols.eq( context.level + 1);
		
		return context;
	}

	function slideAssocBranch(nextCol, branchIdx, className) {
		var assocBranch = nextCol.children().eq( branchIdx );
		
		assocBranch.stop().show()
			.addClass( className )
			.animate({left: 0}, aniSpeed, aniEasing);
		
		return assocBranch;
	}


	/**/
	$('.picasso_face .column ul.active  li').live('mouseover', function(){
		
		var context = getContext( $(this) );
		
		var branchIdx = context.column.find('.branch ').index(this);


		// hide ul's in the next column that are not the one we want to open
		context.nextCol.children().not(':eq('+branchIdx+')')
			.stop().animate({left: colW * -1}, aniSpeed, aniEasing, 
			function() { $(this).hide(); });


		// slide open the appropriate ul in the next column
		var assocBranch = slideAssocBranch(context.nextCol, branchIdx );

	});
	/**/


	var branchClick = false;
	var branchIdx;

	$('.picasso_face .column .branch').bind('click',function(){

		var column = $(this).parents('.column');
		branchIdx = column.find('.branch ').index(this);

		branchClick = true;

	});


	$('.picasso_face .column > ul').bind('click', function(){
		var context = getContext( $(this) );
		
		var xWrap = context.pFace.children();


		debug('level: ' + context.level, 'branchClick: '  + branchClick);

		var closeableDrawers = context.pFace.find('.column:gt('+context.level+')').children();

		// remove active class so we can appropriately add it.
		$('.picasso_face ul.active').removeClass('active');

		// remove inPath
		context.pFace.find('.column:gt(' + context.level + '), .column:eq(' + context.level + ')').find('.inpath').removeClass('inpath');


		var xWrapPlus = 1;

		if (branchClick) { 


			// slide out associated branch
			var assocBranch = slideAssocBranch(context.nextCol, branchIdx, 'active' );

			//	refine closeableDrawers to all of them except for the one
			//		we want to slide out
			closeableDrawers = closeableDrawers.not(':eq('+branchIdx+')');

			// add .inpath to the branch that was clicked
			context.column.find('.branch:eq('+branchIdx+')').addClass('inpath');

		
			xWrapPlus++;
		
			// if assocBranch has child branches
			var openBranch = assocBranch;


		} else {
			$(this).addClass('active');
			var openBranch = $(this);

		}
		
		// check if open Branch has child branches so we can
		//		accomodate it in the xWrapX
		if ( openBranch.find('.branch').length > 0 )  xWrapPlus++; 

		closeableDrawers.not(':hidden').stop()
			.each(function(){
				var cLevel = context.allCols.index(  $(this).parents('.column')  );
				var posX = ( context.level - cLevel) * colW;
				$(this).animate({left: posX}, aniSpeed, aniEasing, 
					function() {
						//reset to starting position
						$(this).css('left', colW * -1).hide(); 
					}
				);
			})
		;

		var xWrapW = colW * (context.level+xWrapPlus);
		var pFaceW = context.pFace.width();


		xWrap.animate({	width: xWrapW }, aniSpeed, aniEasing);

		// scroll window to open ul
		var scrollX = context.pFace.find('ul.active').parents('.column').css('left');
		scrollX = parseInt( scrollX );
		scrollX = Math.min( scrollX, xWrapW - pFaceW );
		scrollX = Math.max( scrollX, 0 );
		debug('scrolltrigger', scrollX);
		context.pFace.animate({scrollLeft: scrollX }, aniSpeed, aniEasing);

	

		// add inpath to previous column
		if ( context.level > 0) {
			var ulIdx = context.column.children('ul').index(this);
			context.allCols.eq( (context.level-1) )
				.find('.branch').eq(ulIdx).addClass('inpath');
		}


		// reset branchClick
		branchClick = false;
	});

});