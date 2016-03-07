/**
 * FadingButton jQuery Plugin
 *
 * Developed by Denis Mitrofanov in 2016 under MIT license
 *
 * Version 1.0
 *
 */


(function($, assert) {
    "use strict";

    var presenter = {

        init: function($el, opts) {
            this.opts = opts;
            this.$el = $el;
            this.renderNormalView();
            this.assignEvents();
            console.log($el, opts);
            
        },

        //Set css attributes for the view in the 'peace state'
        renderNormalView: function() {
            var that = this;

            this.$el.css({
                display: 'inline-block',
                border: '3px solid rgb(' + that.opts.color + ')',
                boxSizing: 'padding-box',
                color: 'rgb(' + that.opts.fontColor + ')',
                textDecoration: 'none',
                backgroundColor: 'rgba(' + that.opts.color + ', 1)',
                padding: that.opts.verticalPadding + 'px ' + that.opts.horizontalPadding +  'px'
            });
        },

        fadeButton: function() {

        },


        unfadeButon: function() {

        },

        assignEvents: function() {

            var $animatedElement = this.$el;
            var thatOpts = this.opts;

            $animatedElement.hover(function() {
                //Hover starts
                
                $({ op: 9 })
                    .animate({ 
                        op: 0 
                    },
                    {
                        step: function( op ) {

                            $animatedElement.css({backgroundColor: 'rgba(' + thatOpts.color + ', 0.' + parseInt(op) + ')'});
                                
                            // On half-way change the color of the font
                            if (parseInt(op) <= 5 && parseInt(op) >= 3) 
                            {
                                // Make font bold if speciefied in the options
                                if (thatOpts.makeFontBold === true) $animatedElement.css('fontWeight', 'bold');

                                $animatedElement.css('color', 'rgb(' + thatOpts.color + ')'); 
                            }
                        },

                        duration: thatOpts.duration
                    });

            }, function() {
                //Mouse goes away
                
                $({ op: 0 })
                    .animate({ 
                        op: 9 
                    },
                    {
                        step: function( op ) {
                            
                            $animatedElement.css({backgroundColor: 'rgba(' + thatOpts.color + ', 0.' + parseInt(op) + ')'});

                            // On half-way change the color of the font
                            if (parseInt(op) <= 5 && parseInt(op) >= 3) 
                            {
                                // Return font weight to normal if it actually was made bold during the first faze of animation
                                if (thatOpts.makeFontBold === true) $animatedElement.css('fontWeight', 'normal');

                                $animatedElement.css('color', 'rgb(' + thatOpts.fontColor + ')'); 
                            }
                        },

                        complete: function() {
                            // Opacity is completely off
                            $animatedElement.css('backgroundColor', 'rgba(' + thatOpts.color + ', 1)');

                        },

                        duration: thatOpts.duration
                    });

            });
        }

    };


    var hexToRgba = function(hex) {

        // Change shorthand form (e.g. "03F") to full form (e.g. "0033FF")
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });

        var objRgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

        //If regexp failed return back initial input
        if ( ! objRgb) { return hex; }

        var result = parseInt(objRgb[1], 16) + ', ' + parseInt(objRgb[2], 16) + ', ' + parseInt(objRgb[3], 16);
        
        return result;
    };


    // Normalize options format
    var normalizeOptions = function(options) {
        
        var opts = $.extend({
            color: '#cccccc',
            fontColor: '#fff',
            verticalPadding: '13px',
            horizontalPadding: '12px',
            makeFontBold: true,
            duration: 1000
        }, options);


        opts.color = hexToRgba(opts.color);
        opts.fontColor = hexToRgba(opts.fontColor);
        opts.verticalPadding = parseInt(opts.verticalPadding);
        opts.horizontalPadding = parseInt(opts.horizontalPadding);

        return opts;
    };


    $.fn.fadingButton = function(options) {

        var opts = normalizeOptions(options);

        this.each(function(index, el) {
            
            presenter.init($(el), opts);

        });

        return this;

    }

}( jQuery, assert ));
