/* Место для плагинов */

// Исправляем тупой serializeArray
(function($) {
	$.fn.serializeObject = $.fn.serializeArray;
	
	$.fn.serializeArray = function() {
		var serialize = this.serializeObject();
		var output = {};
		
		for (var i in serialize) {
			output[serialize[i].name] = serialize[i].value;
		}
		
		return output;
	}
}(jQuery));



//krCarousel
(function($){
	var items,
		nav,
		timeout;
	$.fn.krCarousel = function(items, nav, next, back, custom) {
		var config = {
			animate: 'scroll',
		};
		config = $.extend(config, custom);
		this.each(function () {
			var carousel = this;
			
			
			carousel.heightWith = function(n) {
				var height,
					lh = $(this).height();
				$(this).css('height', 'auto');
				this.items[n].css('position', 'static');
				height = $(this).height();
				$(this).height(lh);
				this.items[n].css('position', 'absolute');
				return height;
			}
			
			carousel.setMaxHeight = function() {
				var height = 0, h;
				$(this).css('height', 'auto');
				for (var i=0; i<this.items.length; i++) {
					this.items[i].css('position', 'static');
					h = $(this).height();
					height = h > height ? h : height;
					this.items[i].css('position', 'absolute');
				}
				$(this).height(height);
			}
			
			
			carousel.items = [];
			if (items) $(this).find(items).each(function () {
				carousel.items[carousel.items.length] = $(this).css({
					position: 'absolute',
					left: '-100%',
					display: 'block'
				});
			});
			if (carousel.items.length < 2) {
				$(back).hide();
				$(next).hide();
			}
			if (nav) carousel.nav = $(this).find(nav).click(function() {
				var n = $(this).index();
				carousel.scroll(n);
				return false;
			});
			carousel.nav = $(carousel.nav);
			if (next) $(next).click(function() {
				carousel.scrollNext(1);
				return false;
			});
			if (back) $(back).click(function() {
				carousel.scrollBack(1);
				return false;
			});
			
			
			$(carousel).css({overflow: 'hidden', position: 'relative'});
			carousel.active = 0;
			carousel.items[0].css('left', 0);
			carousel.nav.eq(0).addClass('_active');
			
			carousel.scroll = function(i) {
				var n = i - this.active,
					altn = -(n/Math.abs(n)) * (this.items.length - Math.abs(n));
				if (Math.abs(altn) < Math.abs(n)) n = altn;
				if (n > 0) {
					this.scrollNext(Math.abs(n));
				} else if (n < 0) {
					this.scrollBack(Math.abs(n));
				}
			}
			carousel.scrollNext = function(x) {
				if ( x == 0 ) return false;
				var l = this.items.length,
					a = this.active,
					el;
				if (config.animate=='fade') {
					a += x;
					carousel.fade(a);
				} else {
					for (var i=0; i<=x; i++) {
						el = this.items[a];
						var posStart = (i*100) + '%',
							posEnd = ((i-x)*100) + '%';
						el.css('left', posStart).animate({left: posEnd}, 500);
						this.active = a;
						a = ((a+1) < l) ? a+1 : 0;
					}
				}
				this.nav.removeClass('_active').eq(this.active).addClass('_active');
				if (this.timeout) $(this).runCarousel();
			}
			carousel.scrollBack = function(x) {
				if ( x == 0 ) return false;
				var l = this.items.length,
					a = this.active,
					el;
				if (config.animate=='fade') {
					a -= x;
					carousel.fade(a);
				} else {
					for (var i=0; i<=x; i++) {
						el = this.items[a];
						var posStart = (-i*100) + '%',
							posEnd = ((x-i)*100) + '%';
						el.css('left', posStart).animate({left: posEnd}, 500);
						this.active = a;
						a = ((a-1) >= 0) ? a-1 : l-1;
					}
				}
				this.nav.removeClass('_active').eq(this.active).addClass('_active');
				if (this.timeout) $(this).runCarousel();
			}
			
			carousel.fade = function(i) {
				if (i<0) i = this.items.length-1;
				else if (i>=this.items.length) i = 0;
				var a = $(this.items[this.active]),
					el = $(this.items[i]);
				el.hide().css({'z-index': 2, left: a.css('left')}).fadeIn(500);
				this.active = i;
				setTimeout(function(){ a.hide(); el.css({'z-index': 1}) }, 500);
			}
			
			
			carousel.setMaxHeight();
			$(window).load(function(){carousel.setMaxHeight()});
		});
		
		
		return this;
	}
	
}(jQuery));


// Ожидание ajax запроса
Wait = (function($) {
	var delay;
	
	var defaultConfig = {
		elem: null,
		delay: 300,
		animation: 100,
	}
	function Wait(config) {
		var _c = $.extend(defaultConfig, config);
		
		this.elem = _c.elem;
		this.elem.hide();
		
		function wait(e, xhr, options) {
			if (!options.nowait) {
				delay = setTimeout(function() {
					_c.elem.fadeIn(_c.animation);
				}, _c.delay);
			}
		}
		
		function complete(e, xhr, options) {
			if (!options.nowait) {
				clearTimeout(delay);
				_c.elem.fadeOut(_c.animation);
			}
		}
		
		$(document).ajaxSend(wait);
		$(document).ajaxComplete(complete);
	}
	
	return Wait;
}(jQuery));
$(document).ready(function () {
	new Wait({
		elem: $('.Wait'),
	})
});




// Разрабатываю плагин Popup
(function($) {
  $.Popup = {};
  ScrollLock = function() {
    $('body').css('overflow', 'hidden');
  }
  ScrollUnlock = function() {
    $('body').css('overflow', 'auto');
  }
  // Метод инициализации функции всплывающих окон
  // Если блока нет, то он будет создан
  $.Popup.init = function(name, customConfig) {
    var config = {
      coverFN: '.Popup__cover',
      popupFN: '.Popup',
      titleFN: '.Popup__title',
      contentFN: '.Popup__content',
      closeFN: '.Popup__close',
      reverse: false,
      animate: 'default',
      duration: 100,
      autoClose: false,
      lockScroll: false,
    }
    config = $.extend(config, customConfig);
    var self = this;
    if ($(config.popupFN).length) self[name] = new Popup(config);
    else {
      $(document).ready(function() {
        self[name] = new Popup(config);
      });
    }
  }
  // Класс, реализующий всплывающее окно, Наследуется от jQuery
  Popup.prototype = $;
  function Popup(config) {
    var self = this;
    self.cover = $(config.coverFN);
    self.popup = $(config.popupFN);
    self.title = $(config.titleFN);
    self.content = $(config.contentFN);
    self.popups = new Array;
    self.reverse = config.reverse;
    self.autoClose = config.autoClose;
    self.lockScroll = config.lockScroll;
    $(config.closeFN).click(function() {
      self.close();
      return false;
    });
    self.cover.click(function() {
      self.close();
    });
    self.duration = config.duration;
    self.setAnimate(config.animate);
  }
  /* Основной метод - создает и открывает новое окно */
  Popup.prototype.open = function(json) {
    if (this.lockScroll) ScrollLock();
    var self = this;
    if (!json.title && !json.content) return false;
    this.popups.unshift(json);
    if (this.popups.length > 1) {
      this.popup.out();
      this.popup.queue(function(next) {
        self.set();
        self.popup.in();
        next();
      });
    } else {
      this.cover.fadeIn(this.duration);
      this.set();
      this.popup.in();
    }
    if (this.autoClose) {
      clearTimeout(self.toAC);
      self.toAC = setTimeout(function() {
        self.close();
      }, this.autoClose);
    }
  }
  Popup.prototype.close = function() {
    var self = this;
    if (this.popups.length > 1 && this.reverse) {
      this.popup.out(true);
      this.popup.queue(function(next) {
        this.popups.shift();
        self.set();
        self.popup.in();
        next();
      });
    } else {
      if (this.lockScroll) ScrollUnlock();
      this.popups = new Array;
      this.cover.fadeOut(this.duration);
      self.popup.out();
    }
  }
  Popup.prototype.set = function() {
    if (this.title.length) {
      this.title.html(this.popups[0].title);
    }
    this.content.html(this.popups[0].content);
  };
  Popup.prototype.setAnimate = function(a) {
    var d = this.duration;
    if (a == 'fade') {
      this.popup.in = function() {
        this.fadeIn(d);
      }
      this.popup.out = function() {
        this.fadeOut(d);
      }
    } else if (a == 'slide') {
      this.popup.in = function(first) {
        this.slideDown(d);
      }
      this.popup.out = function(first) {
        this.slideUp(d);
      }
    } else {
      this.popup.in = function(first) {
        this.show();
      }
      this.popup.out = function(first) {
        var self = this;
        if (first) this.hide();
        else setTimeout(function() {
          self.hide();
        }, d);
      }
    }
  }
}(jQuery));



/* @data-title плагин */
(function ($) {
	var config = {
		class: 'DataTitle',
		attr: 'data-title',
		delay: 1000,
		time: 200,
		animation: 'fade',
	}
	var toID;
	$.DataTitle = {};
	$.DataTitle.set = function(customConfig) {
		config = $.extend(config, customConfig);
	}
	$.DataTitle.init = function(customConfig) {
		this.set(customConfig);
		if ($('body').length > 0) {
			this.on();
		} else {
			var self = this;
			$(document).ready(function () {
				self.on();
			});
		}
	}
	$.DataTitle.on = function () {
		this.element = $('<div>').addClass(config.class);
		$('body').append(this.element);
		$('body').on('mouseenter', '['+config.attr+']', function () {
			var title = $(this).attr(config.attr);
			toID = setTimeout(function () {
				$.DataTitle.element.css({
					top: $.DataTitle.y+'px',
					left: $.DataTitle.x+'px',
				}).html(title);
				$.DataTitle.element.hide().fadeIn(config.time);
			}, config.delay);
		});
		$('body').on('mouseleave', '['+config.attr+']', function () {
			clearTimeout(toID);
			$.DataTitle.element.fadeOut(config.time);
		});
		$('body').on('mousemove', '['+config.attr+']', function (e) {
			$.DataTitle.x = e.pageX;
			$.DataTitle.y = e.pageY + 30;
		});
	}
	$.DataTitle.set = function (text) {
		
	};
}(jQuery));

$.DataTitle.init();





/* Кастомные скрипты */



/* Всё, что выполняется после загрузки документа */$(document).ready(function(){
drBong._add('ajax');

// Инициализируем главный Popup
$.Popup.init('main', {
	popupFN: '.Popup',
	covsrFN: '.Popup__cover',
	contentFN: '.Popup__content',
	titleFN: '.Popup__header',
	reverse: false,
	animate: 'fade',
	duration: 200,
	lockScroll: true,
});
drBong.add($.Popup.main, 'ajax', function(data) {
	if (data.popup) {
		this.open(data.popup);
		// Для фоток
		this.content.find('.Profile__photo').click(function () {
			var photo = $(this).attr('data-photo');
			$.post(
				'ajax',
				{
					action: 'setPhoto',
					photo: photo,
				},
				drBong.ajax
			);
		});
	}
	if (data.error===false) this.close();
});



// Покупка и автообновление билетиков :-3
(function() {
	var id = $('.Tickets__info').attr('data-id');
	
	var to = null;
	var interval = 2000;
	
	var ticketsPage = false;
	
	if ($('.Tickets__info').length > 0) {
		ticketsPage = true;
		to = setTimeout(buyPlace, interval);
	}
	
	$('.Tickets__btn').click(function () {
		var place = $(this).attr('data-place');
		buyPlace(place);
		return false;
	});


	// случайное место в лотах
	$('.Tickets__randomBtn').click(function () {
		var tickets = $('.Tickets__btn');
		var rnd = Math.floor(Math.random() * tickets.length);
		tickets.eq(rnd).click();
		
		return false;
	});

	
	// Прием данных
	if (ticketsPage) {
		$(document).ajaxSuccess(function (event, data) {
			data = data.responseText;
			data = $.parseJSON(data);
			
			if (data.ticketsInfo) {
				data.ticketsInfo.busy && $('.Tickets__loadWrap *').html(data.ticketsInfo.busy);
				data.ticketsInfo.percent && $('.Tickets__load').attr('width', data.ticketsInfo.percent);
				data.ticketsInfo.user && $('.Tickets__title').replaceWith(data.ticketsInfo.user);
				data.ticketsInfo.chanse && $('.Tickets__chanse').replaceWith(data.ticketsInfo.chanse);
				data.ticketsInfo.timestamp && $('.Tickets__info').attr('data-timestamp', data.ticketsInfo.timestamp);
			}
					
			if (data.tickets) {
				for (var i in data.tickets) {
					var ticket = data.tickets[i];
					var o = $('[data-place='+ticket.place+']');
					if (o.length > 0) {
						var x = o.position().left,
							y = o.position().top;
						o.css({position: 'absolute', top: y+'px', left: x+'px'})
							.fadeOut(300, function(){o.remove()})
							.after(ticket.content);
					}
				}
			}
			
			if (data.ticketsWinner) {
				$('.Tickets__place').eq(data.ticketsWinner-1).addClass('_win');
				$('.Tickets__winHide').slideUp();
			}
			
			to = setTimeout(buyPlace, interval);
		});
	}
	
	
	function buyPlace(place) {
		clearTimeout(to);
		var timestamp = $('.Tickets__info').attr('data-timestamp');
		timestamp -= interval/1000;
		var options = {
				type: 'POST',
				data: {
					action: 'buyPlace',
					id: id,
					timestamp: timestamp,
				},
			}
		if (place) {
			options['data']['place'] = place;
		} else {
			options['nowait'] = true;
		}
		$.ajax('ajax', options);
	}
}());



// Изменение фото
$('#changePhoto').click(function () {
	$.post(
		'ajax',
		{
			get: 'selectProfilePhoto',
		},
		function (data) {
			drBong.ajax(data);
			onDragNDrop();
		}
	);
	return false;
});
$('.SiteContent .Profile__photo._big img').drBong('ajax', function(data){
	if (data.user && data.user.photo && data.user.photo.max) this.attr('src', data.user.photo.max)
});
function onDragNDrop() {
	var t;
	var Zone = $('#dropPhoto');
	Zone.on('change', '[type=file]', function() {
		UploadUserPhoto(this.files[0]);
	});
	Zone[0].ondragover = function() {
		clearTimeout(t);
		$(this).addClass('_hover');
		return false;
	}
	Zone[0].ondragleave = function() {
		var e = $(this);
		t = setTimeout(function(){e.removeClass('_hover')}, 50);
		return false;
	}
	Zone[0].ondrop = function(event) {
		event.preventDefault();
		$(this).removeClass('_hover');
		file = event.dataTransfer.files[0];
		if (!(file.type=='image/png' || file.type=='image/jpg' || file.type=='image/jpeg')) {
			$.Message.invoke('Неверный формат изображения!').addClass('_error');
			return false;
		}
		UploadUserPhoto(file);
	}
}
function UploadUserPhoto(file) {
	if (file) {
		var data = new FormData();
		data.append('photo', file);
		$.ajax({
			url: 'ajax?action=uploadPhoto',
			type: 'POST',
			data: data,
			cache: false,
			dataType: 'json',
			processData: false, // Не обрабатываем файлы (Don't process the files)
			contentType: false, // Так jQuery скажет серверу что это строковой запрос
			success: function( data, textStatus, jqXHR ){
				drBong.ajax(data);
				$.Popup.main.close();
			}
		});
	}
}



// изменить пароль...
$('#changePassword').click(function () {
	$.post(
		'ajax',
		{
			get: 'changePassword',
		},
		function (data) {
			data = $.parseJSON(data);
			if (data.message) {
				$.Popup.message.open({content: data.message});
			}
			if (data.popup) {
				$.Popup.main.open(data.popup);
				$.Popup.main.content.find('form').submit(function () {
					$.post(
						'ajax',
						{
							action: 'changePassword',
							password: $.Popup.main.content.find('[name=password]').val(),
							password1: $.Popup.main.content.find('[name=password1]').val(),
							password2: $.Popup.main.content.find('[name=password2]').val(),
						},
						drBong.ajax
					);
					
					return false;
				});
			}
		}
	);
});






// Carousel для превью аккаунтов
$('.Carousel').krCarousel(
	'.Carousel__item',
	null,
	'.Carousel__next',
	'.Carousel__back'
);


// Инфа в хидере
(function($){
	var to = null;
	var interval = 10000;
	
	var photo = $('.SiteHeader .Profile__photo img'),
		zip = $('.LogIn__money span'),
		messages = $('.Profile__messages');
	if (messages.html()!='0') messages.show();

	$(document).ajaxSuccess(function (event, data) {
		data = data.responseText;
		data = $.parseJSON(data);
		if (data.user) {
			// Фотка в хидере
			if (data.user.photo && data.user.photo.normal) {
				photo.attr('src', data.user.photo.normal)
			}
			
			// Новые сообщения
			if (data.user.messages!=undefined) {
				if (data.user.messages) messages.html(data.user.messages).fadeIn();
				else {
					messages.html('0').fadeOut();
				}
			}
			// Баланс
			if (data.user.zip!=undefined) {
				var str = zip.html();
				str = str.replace(/[0-9\.]+/, data.user.zip);
				zip.html(str);
			}
		}
		
		to = setTimeout(refresh, interval);
	});
	$(document).ajaxSend(function() {
		clearTimeout(to);
	});
	function refresh() {
		$.ajax('ajax', {
			type: 'POST',
			nowait: true,
		});
	}
	to = setTimeout(refresh, interval);
}(jQuery));


/* Указание реквизитов для зачисления гемов */
$('.Tickets__info').delegate('.Gems__enroll', 'submit', function () {
	var form = $(this);
	var login = form.find('[name=login]').val();
	var password = form.find('[name=password]').val();
	var os = form.find('[name=os]:checked').val();
	var resource = form.find('[name=resource]').val();
	$.post(
		'ajax',
		{
			action: 'Gems_enrollTo',
			resource: resource,
			login: login,
			password: password,
			os: os,
		},
		function(data) {
			data = $.parseJSON(data);
			if (data.enroll) {
				$('#Enroll').replaceWith(data.enroll);
			}
		}
	);
	return false;
});






/* Форма бустинга */
$('.BoostingForm').submit(function () {
	var self = $(this);
	var vk = self.find('[name=vk]').val();
	var message = self.find('[name=message]').val();
	$.post(
		'ajax',
		{
			action: 'orderBoosting',
			vk: vk,
			message: message,
		},
		function(data) {
			data = $.parseJSON(data);
			if (!data.error) {
				self[0].reset();
				self.slideUp();
			}
		}
	);
	return false;
});





/* Форма отзывов */
$('#addReviews').submit(function () {
	var self = $(this),
		text = self.find('[name=text]').val();
		mark = self.find('[name=mark]:checked').val();
		reviewBlock = self.parents('.Review');
	
	$.post(
		'ajax',
		{
			action: 'addReviews',
			text: text,
			mark: mark,
		},
		function (data) {
			data = $.parseJSON(data);
			if (data.review) {
				setDate(data.review.date);
				setMark(data.review.mark);
				addText(data.review.text);
				hideForm();
			}
		}
	);
	
	function setDate(text) {
		var elem = reviewBlock.find('.Review__date');
		elem.html(text);
		elem.fadeIn();
	}
	function addText(text) {
		var elem = reviewBlock.find('.Review__text');
		
		elem.append(text);
	}
	function setMark(mark) {
		var elem = reviewBlock.find('._star');
		elem.removeClass('_star');
		elem.addClass('_star'+mark);
	}
	function hideForm() {
		self.css({
			position: 'absolute',
		}).fadeOut();
	}
	
	
	return false;
});
/* Подзагрузка отзывов */
$('.Reviews').on('click', '.Reviews__next', function() {
	var page = $(this).attr('data-page'),
		self = $(this);
	$.post(
		'ajax',
		{
			action: 'getReviewsPage',
			page: page,
		},
		function(data) {
			data = $.parseJSON(data);
			if (data.content) {
				self.remove();
				var content = '<div class="newPage">'+data.content+'</div>';
				$('.Reviews').append(content);
				$('.newPage')
					.hide()
					.slideDown()
					.removeClass('newPage');
			}
		}
	)
});
// Скрыть показать отзыв (нужны права модера)
$('.Reviews').on('change', '.Review__published', function() {
	var review = $(this).parents('.Review'),
		id = review.attr('data-id'),
		published = $(this).attr('checked');
		published = published ? 1 : 0;
	$.post(
		'ajax',
		{
			action: 'changeReviews',
			id: id,
			published: published,
		},
		function(data) {
			data = $.parseJSON(data);
			if (data.success) {
				if (data.published) {
					review.removeClass('_hidden');
				} else {
					review.addClass('_hidden');
				}
			}
		}
	);
});
// Удаление отзыва (нужны права модера)
$('.Reviews').on('click', '.Review__show._del', function() {
	var review = $(this).parents('.Review'),
		id = review.attr('data-id'),
		published = -1;
	$.Confirm({
		title: 'Подтверждение',
		content: 'Вы действительно хотите удалить отзыв?',
	}).then(function () {
		$.post(
			'ajax',
			{
				action: 'changeReviews',
				id: id,
				published: published,
			},
			function(data) {
				data = $.parseJSON(data);
				if (data.success) {
					if (review.prev('hr').length) {
						review.prev().remove();
						review.remove();
					} else {
						review.next('hr').remove();
						review.remove();
					}
				}
			}
		);
	});
});
// Подзагрузка писем
$(document).on('click', '.Mail__next', function() {
	var page = $(this).attr('data-page'),
		self = $(this);
	$.post(
		'ajax',
		{
			action: 'getMessagesPage',
			page: page,
		},
		function(data) {
			data = $.parseJSON(data);
			if (data.content) {
				var content = '<div class="newPage">'+data.content+'</div>';
				self.after(content);
				$('.newPage')
					.hide()
					.slideDown()
					.removeClass('newPage');
				self.remove();
			}
		}
	)
});
$(document).on('submit', '.Mail__form', function() {
	
	var options = $(this).serializeArray();
	options['action'] = 'sendMessage';
	
	var self = this;
	
	$.post(
		'ajax',
		options,
		function(data) {
			data = $.parseJSON(data);
			self.reset();
			$(self).slideUp();
			if (data.mail) {
				$(self).after('<div>');
				$(self).next()
					.append(data.mail)
					.hide()
					.slideDown();
			}
		}
	);
	
	return false;
});




/* Конец выполнения скриптов после загрузки */});




