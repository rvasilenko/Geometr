;(function($) {
    $(window).load(function() {
        $('#gallery').length && $('#gallery').homepageSlider();
    });
    $(function() {
        var items = $('.catalog .item');
        while (items.length) {
            var set = items.splice(0, 3);
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
    })
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