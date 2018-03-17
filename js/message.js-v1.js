(function($) {
	var config = {
		wrapClass: 'Messages',
		messageClass: 'Messages__item',
		listen: 'message',
		duration: 100,
		time: 2000
	}
	
	var Wrap;
	
	$.Message = {
		init: function (custom) {
			config = $.extend(config, custom);
			
			Wrap = $('<div>').addClass(config.wrapClass);
			$('body').append(Wrap);
		},
		
		invoke: function(text) {
			var message = $('<div>')
							.addClass(config.messageClass)
							.html(text)
							.hide()
							.slideDown(config.duration, function(){
								setTimeout(function(){message.fadeOut(config.duration, function() {
									message.remove();
								})}, config.time);
							});
			Wrap.prepend(message);
			return message;
		},
	}
	
	
	
	$(document).ajaxSuccess(function (event, data) {
		data = data.responseText;
		if (data.substr(0, 1)=='<') console.error(data);
		data = $.parseJSON(data);
		if (data.message) {
			$.Message.invoke(data.message);
		}
		if (data.error) {
			$.Message.invoke(data.error).addClass('_error');
		}
		if (data.success) {
			$.Message.invoke(data.success).addClass('_success');
		}
	});
	
	
}(jQuery));

$(document).ready(function () {
	$.Message.init();
});