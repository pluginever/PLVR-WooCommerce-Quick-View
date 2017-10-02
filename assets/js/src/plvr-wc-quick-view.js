/**
 * PLVR WooCommerce Quick View
 * http://pluginever.com
 *
 * Copyright (c) 2017 PluginEver
 * Licensed under the GPLv2+ license.
 */

/*jslint browser: true */
/*global jQuery:false */

window.PLVR_WC_Quick_View = (function(window, document, $, undefined){
	'use strict';

	var app = {};

	app.init = function() {
        $("[data-fancybox]").fancybox({
            toolbar : false,
            animationEffect : "fade",
            baseTpl	:
            '<div class="fancybox-container" role="dialog" tabindex="-1">' +
            '<div class="fancybox-bg"></div>' +
            '<div class="fancybox-inner">' +
            '<div class="fancybox-infobar">' +
            '<button data-fancybox-prev title="{{PREV}}" class="fancybox-button fancybox-button--left"></button>' +
            '<div class="fancybox-infobar__body">' +
            '<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>' +
            '</div>' +
            '<button data-fancybox-next title="{{NEXT}}" class="fancybox-button fancybox-button--right"></button>' +
            '</div>' +
            '<div class="fancybox-toolbar">' +
            '{{BUTTONS}}' +
            '</div>' +
            '<div class="fancybox-navigation">' +
            '<button data-fancybox-prev title="{{PREV}}" class="fancybox-arrow fancybox-arrow--left" />' +
            '<button data-fancybox-next title="{{NEXT}}" class="fancybox-arrow fancybox-arrow--right" />' +
            '</div>' +
            '<div class="fancybox-stage"></div>' +
            '</div>' +
            '</div>',
        });

        $('#light-box').on('click', function () {
            $.fancybox.open('<div class="message"><h2 id="test">Hello!</h2><p>You are awesome!</p></div>');
        });

        $('#test').on('click', function () {
           console.log('working');
        });
    };


	$(document).ready( app.init );

	return app;

})(window, document, jQuery);
