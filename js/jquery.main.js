;(function($) {
    $(window).load(function() {
        $('#gallery').length && $('#gallery').homepageSlider();
    });
    $(function() {
        stretchItemsInRow($('.catalog .item'), 3);
		stretchItemsInRow($('.news-feed .item'), 2);

		jQuery('.tabset').contentTabs({
			tabLinks: 'a'
		});
    });
	function stretchItemsInRow(items, itemsInRow) {
		while (items.length) {
			var set = items.splice(0, itemsInRow);
			$('.cell', set).sameHeight({
				elements: false
			});
			$('.title', set).sameHeight({
				elements: false
			});
			$('.entry', set).sameHeight({
				elements: false
			});
		}
	}
}(jQuery));

// home page slider
;(function($) {
    $.fn.homepageSlider = function(options) {
        var settings = {speed: 600, activeBlockTop: 31, inactiveBlockTop: 56, activeImgWidth: 304, inactiveImgWidth: 226, leftPosition: 84, centerPosition: 324, rightPosition: 644};
        $.extend(settings,options);

        var target = $(this),
            blocks = target.find('a.slide')
        refs = target.find('a.nav-left, a.nav-right');

        blocks.eq(0).css({left: settings.leftPosition, top: settings.inactiveBlockTop}).addClass('left').find('img').css('width', settings.inactiveImgWidth).end().find('img.active').css('opacity', 0);
        blocks.eq(1).css({left: settings.centerPosition}).addClass('center').find('img.inactive').css('opacity', 0);
        blocks.eq(2).css({left: settings.rightPosition, top: settings.inactiveBlockTop}).addClass('right').find('img').css('width', settings.inactiveImgWidth).end().find('img.active').css('opacity', 0);

        refs.bind('click', function(e) {
            e.preventDefault();

            var leftBlock = blocks.filter('.left'),
                centerBlock = blocks.filter('.center'),
                rightBlock = blocks.filter('.right');

            if (!$(this).hasClass('nav-right')) {
                leftBlock.css('zIndex', 1).animate({left: settings.rightPosition}, settings.speed, function(){
                    leftBlock.css('zIndex','2');
                });

                centerBlock.animate({left: settings.leftPosition, top: settings.inactiveBlockTop}, settings.speed)
                    .find('img').animate({width: settings.inactiveImgWidth}).end()
                    .find('img.active').css({opacity: 0}, settings.speed/3).end()
                    .find('img.inactive').css({opacity: 1}, settings.speed/3);

                rightBlock.animate({left: settings.centerPosition, top: settings.activeBlockTop}, settings.speed)
                    .find('img').animate({width: settings.activeImgWidth}).end()
                    .find('img.inactive').animate({opacity: 0}, settings.speed/3).end()
                    .find('img.active').animate({opacity: 1}, settings.speed/3);

                leftBlock.removeClass('left').addClass('right');
                centerBlock.removeClass('center').addClass('left');
                rightBlock.removeClass('right').addClass('center');
            } else {
                rightBlock.css('zIndex', 1).animate({left: settings.leftPosition}, settings.speed, function(){
                    rightBlock.css('zIndex','2');
                });

                centerBlock.animate({left: settings.rightPosition, top: settings.inactiveBlockTop}, settings.speed)
                    .find('img').animate({width: settings.inactiveImgWidth}).end()
                    .find('img.active').css({opacity: 0}, settings.speed/3).end()
                    .find('img.inactive').css({opacity: 1}, settings.speed/3);

                leftBlock.animate({left: settings.centerPosition, top: settings.activeBlockTop}, settings.speed)
                    .find('img').animate({width: settings.activeImgWidth}).end()
                    .find('img.inactive').animate({opacity: 0}, settings.speed/3).end()
                    .find('img.active').animate({opacity: 1}, settings.speed/3);

                rightBlock.removeClass('right').addClass('left');
                centerBlock.removeClass('center').addClass('right');
                leftBlock.removeClass('left').addClass('center');
            }
        });
    };
}(jQuery));


/*!
 * Same Height jQuery Plugin v1.3
 *
 * Date: Wed Jan 16 15:15:47 2013 EST
 * Requires: jQuery v1.3+
 *
 * Copyright 2013, Karl Swedberg
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 *
 *
 *
 *
 */

(function($) {

    $.fn.sameHeight = function(options) {

        var opts = $.extend({}, $.fn.sameHeight.defaults, options),
            $els = this;

        var setHeights = function() {
            var heights, maxHeight, idx;

            if ( $.isFunction(opts.elements) ) {
                $els = opts.elements.call(this);
            } else if ( opts.elements === 'children' ) {
                $els = $els.children();
            }

            opts.before.call(this, $els);

            heights = $els.map(function() {
                return parseInt( $(this).css('height'), 10 );
            });

            maxHeight = Math.max.apply( Math, heights.get() );

            if (maxHeight === 0) {
                return;
            }

            if (opts.adjust === 'height') {

                maxHeight += opts.extra;
                if (opts.animate) {
                    opts.animate = $.isPlainObject(opts.animate) ? opts.animate : {};
                    $els.animate({height: maxHeight}, opts.animate);
                } else {
                    $els.css({height: maxHeight});
                }

            } else {

                idx = $.inArray(maxHeight, heights.get());
                maxHeight += parseInt( $els.eq(idx).css(opts.adjust), 10 );

                $els.each(function() {
                    var $el = $(this),
                        style = {};

                    style[opts.adjust] = ( Math.max(0, maxHeight - $el.height()) ) + 'px';
                    $el.css(style);
                });

            }

            opts.after.call(this, $els);
        };

        if ( opts.elements ) {
            this.each(function(index) {
                setHeights.call(this);
            });
        } else {
            setHeights.call(this);
        }

        return this;
    };

    $.fn.sameHeight.defaults = {
        animate: false, // true or animate options object to animate heights
        before: function() {},
        after: function() {},
        extra: 0,
        adjust: 'height', // one of 'height', 'padding-top', 'padding-bottom'
        elements: 'children'  // can be a falsy value, in which case it uses the jQuery collection;
        // a function, which is scoped to the jQuery collection ( this == jQuery collection)
        // or "children" which will just use all children of the elements in jQuery collection
    };

})(jQuery);

/*
 * jQuery Tabs plugin
 */
;(function($){
	$.fn.contentTabs = function(o){
		// default options
		var options = $.extend({
			activeClass:'active',
			addToParent:false,
			autoHeight:false,
			autoRotate:false,
			checkHash:false,
			animSpeed:400,
			switchTime:3000,
			effect: 'none', // "fade", "slide"
			tabLinks:'a',
			attrib:'href',
			event:'click'
		},o);

		return this.each(function(){
			var tabset = $(this), tabs = $();
			var tabLinks = tabset.find(options.tabLinks);
			var tabLinksParents = tabLinks.parent();
			var prevActiveLink = tabLinks.eq(0), currentTab, animating;
			var tabHolder;

			// handle location hash
			if(options.checkHash && tabLinks.filter('[' + options.attrib + '="' + location.hash + '"]').length) {
				(options.addToParent ? tabLinksParents : tabLinks).removeClass(options.activeClass);
				setTimeout(function() {
					window.scrollTo(0,0);
				},1);
			}

			// init tabLinks
			tabLinks.each(function(){
				var link = $(this);
				var href = link.attr(options.attrib);
				var parent = link.parent();
				href = href.substr(href.lastIndexOf('#'));

				// get elements
				var tab = $(href);
				tabs = tabs.add(tab);
				link.data('cparent', parent);
				link.data('ctab', tab);

				// find tab holder
				if(!tabHolder && tab.length) {
					tabHolder = tab.parent();
				}

				// show only active tab
				var classOwner = options.addToParent ? parent : link;
				if(classOwner.hasClass(options.activeClass) || (options.checkHash && location.hash === href)) {
					classOwner.addClass(options.activeClass);
					prevActiveLink = link; currentTab = tab;
					tab.removeClass(tabHiddenClass).width('');
					contentTabsEffect[options.effect].show({tab:tab, fast:true});
				} else {
					var tabWidth = tab.width();
					if(tabWidth) {
						tab.width(tabWidth);
					}
					tab.addClass(tabHiddenClass);
				}

				// event handler
				link.bind(options.event, function(e){
					if(link != prevActiveLink && !animating) {
						switchTab(prevActiveLink, link);
						prevActiveLink = link;
					}
				});
				if(options.attrib === 'href') {
					link.bind('click', function(e){
						e.preventDefault();
					});
				}
			});

			// tab switch function
			function switchTab(oldLink, newLink) {
				animating = true;
				var oldTab = oldLink.data('ctab');
				var newTab = newLink.data('ctab');
				prevActiveLink = newLink;
				currentTab = newTab;

				// refresh pagination links
				(options.addToParent ? tabLinksParents : tabLinks).removeClass(options.activeClass);
				(options.addToParent ? newLink.data('cparent') : newLink).addClass(options.activeClass);

				// hide old tab
				resizeHolder(oldTab, true);
				contentTabsEffect[options.effect].hide({
					speed: options.animSpeed,
					tab:oldTab,
					complete: function() {
						// show current tab
						resizeHolder(newTab.removeClass(tabHiddenClass).width(''));
						contentTabsEffect[options.effect].show({
							speed: options.animSpeed,
							tab:newTab,
							complete: function() {
								if(!oldTab.is(newTab)) {
									oldTab.width(oldTab.width()).addClass(tabHiddenClass);
								}
								animating = false;
								resizeHolder(newTab, false);
								autoRotate();
							}
						});
					}
				});
			}

			// holder auto height
			function resizeHolder(block, state) {
				var curBlock = block && block.length ? block : currentTab;
				if(options.autoHeight && curBlock) {
					tabHolder.stop();
					if(state === false) {
						tabHolder.css({height:''});
					} else {
						var origStyles = curBlock.attr('style');
						curBlock.show().css({width:curBlock.width()});
						var tabHeight = curBlock.outerHeight(true);
						if(!origStyles) curBlock.removeAttr('style'); else curBlock.attr('style', origStyles);
						if(state === true) {
							tabHolder.css({height: tabHeight});
						} else {
							tabHolder.animate({height: tabHeight}, {duration: options.animSpeed});
						}
					}
				}
			}
			if(options.autoHeight) {
				$(window).bind('resize orientationchange', function(){
					tabs.not(currentTab).removeClass(tabHiddenClass).show().each(function(){
						var tab = jQuery(this), tabWidth = tab.css({width:''}).width();
						if(tabWidth) {
							tab.width(tabWidth);
						}
					}).hide().addClass(tabHiddenClass);

					resizeHolder(currentTab, false);
				});
			}

			// autorotation handling
			var rotationTimer;
			function nextTab() {
				var activeItem = (options.addToParent ? tabLinksParents : tabLinks).filter('.' + options.activeClass);
				var activeIndex = (options.addToParent ? tabLinksParents : tabLinks).index(activeItem);
				var newLink = tabLinks.eq(activeIndex < tabLinks.length - 1 ? activeIndex + 1 : 0);
				prevActiveLink = tabLinks.eq(activeIndex);
				switchTab(prevActiveLink, newLink);
			}
			function autoRotate() {
				if(options.autoRotate && tabLinks.length > 1) {
					clearTimeout(rotationTimer);
					rotationTimer = setTimeout(function() {
						if(!animating) {
							nextTab();
						} else {
							autoRotate();
						}
					}, options.switchTime);
				}
			}
			autoRotate();
		});
	};

	// add stylesheet for tabs on DOMReady
	var tabHiddenClass = 'js-tab-hidden';
	$(function() {
		var tabStyleSheet = $('<style type="text/css">')[0];
		var tabStyleRule = '.'+tabHiddenClass;
		tabStyleRule += '{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}';
		if (tabStyleSheet.styleSheet) {
			tabStyleSheet.styleSheet.cssText = tabStyleRule;
		} else {
			tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
		}
		$('head').append(tabStyleSheet);
	});

	// tab switch effects
	var contentTabsEffect = {
		none: {
			show: function(o) {
				o.tab.css({display:'block'});
				if(o.complete) o.complete();
			},
			hide: function(o) {
				o.tab.css({display:'none'});
				if(o.complete) o.complete();
			}
		},
		fade: {
			show: function(o) {
				if(o.fast) o.speed = 1;
				o.tab.fadeIn(o.speed);
				if(o.complete) setTimeout(o.complete, o.speed);
			},
			hide: function(o) {
				if(o.fast) o.speed = 1;
				o.tab.fadeOut(o.speed);
				if(o.complete) setTimeout(o.complete, o.speed);
			}
		},
		slide: {
			show: function(o) {
				var tabHeight = o.tab.show().css({width:o.tab.width()}).outerHeight(true);
				var tmpWrap = $('<div class="effect-div">').insertBefore(o.tab).append(o.tab);
				tmpWrap.css({width:'100%', overflow:'hidden', position:'relative'}); o.tab.css({marginTop:-tabHeight,display:'block'});
				if(o.fast) o.speed = 1;
				o.tab.animate({marginTop: 0}, {duration: o.speed, complete: function(){
					o.tab.css({marginTop: '', width: ''}).insertBefore(tmpWrap);
					tmpWrap.remove();
					if(o.complete) o.complete();
				}});
			},
			hide: function(o) {
				var tabHeight = o.tab.show().css({width:o.tab.width()}).outerHeight(true);
				var tmpWrap = $('<div class="effect-div">').insertBefore(o.tab).append(o.tab);
				tmpWrap.css({width:'100%', overflow:'hidden', position:'relative'});

				if(o.fast) o.speed = 1;
				o.tab.animate({marginTop: -tabHeight}, {duration: o.speed, complete: function(){
					o.tab.css({display:'none', marginTop:'', width:''}).insertBefore(tmpWrap);
					tmpWrap.remove();
					if(o.complete) o.complete();
				}});
			}
		}
	};
}(jQuery));