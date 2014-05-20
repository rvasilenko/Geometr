;(function($) {
    $(window).load(function() {
        $('#gallery').length && $('#gallery').homepageSlider();
    });

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
}(jQuery))