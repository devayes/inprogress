/*
 * inProgress - A progress bar for text inputs with limits
 *
 * MIT License
 * http://opensource.org/licenses/MIT
 *
 * @author  : Devin Hayes
 * @doc     : http://devinhayes.com
 * @version : 1.0
 *
 */
(function ( $ ) {
 
    $.fn.inprogress = function(options) {
        var settings = $.extend({
            max: (this.prop('maxlength') ? this.prop('maxlength') : 500),
            bgColor: false,
            minHeight: '3px',
            showPercent: false,
            showRemaining: false,
            textColor: '#fff',
        }, options);
        
        var getColor = function(percent){
            var value = (percent/100);
            var hue=((1-value)*120).toString(10);
            return ["hsl(",hue,",100%,50%)"].join("");
        }

        var id = 'inprogress'+Math.floor(Math.random()*100000000);
        this.after('<div id="'+id+'"><div><span></span></div></div>');
        $('#'+id).css('max-width', this.outerWidth());
        if(this.width()) {
            $(window).resize(function(){
                $('#'+id).css('max-width', this.outerWidth());
            });
        }

        this.on('keyup', function(e){
            var percent = (($(this).val().length / settings.max) * 100);
            $('#'+id).css('max-width', $(this).outerWidth()); // Keep it updated.
            if (percent >= 100 && (e.keyCode != 46 && e.keyCode != 8)) {
                $(this).val($(this).val().substr(0, settings.max));
                e.preventDefault();
            }
            $('#'+id+' div').animate({
                width: percent+'%'
            }, 100).css({
                'background-color': (settings.bgColor ? settings.bgColor : getColor(percent)),
                'min-height': settings.minHeight
            });
            if(settings.showPercent || settings.showRemaining){
                $('#'+id+' div').css('text-align','center');
                $('#'+id+' div span')
                    .css({'color': settings.textColor})
                    .text((settings.showRemaining ? (settings.max-$(this).val().length) : percent.toFixed()+'%'));
            }
        });
        
        if(this.val().length){
            this.keyup();
        }
    };
 
}(jQuery));
