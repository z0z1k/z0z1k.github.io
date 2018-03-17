/* Confirm window - Окошео подтверждения */
/* @kudenkovr © 2015 */
(function($){
	var Confirm = {
		show: function(time) {
			time = time ? time : 200;
			if (Confirm.cover) Confirm.cover.fadeIn(time);
			Confirm.form.fadeIn(time);
		},
		hide: function(time) {
			time = time ? time : 200;
			if (Confirm.cover) Confirm.cover.fadeOut(time);
			Confirm.form.fadeOut(time);
		},
		_action: {then:function(){},else:function(){}},
		action: {},
		then: function(func) {
			Confirm.action['then'] = func;
			return Confirm;
		},
		else: function(func) {
			Confirm.action['else'] = func;
			return Confirm;
		},
	}
	$.fn.initConfirmForm = function() {
		Confirm.form = this.eq(0);
		return this;
	}
	$.fn.initConfirmCover = function() {
		Confirm.cover = this.eq(0);
		return this;
	}
	$.fn.initConfirmTitle = function() {
		Confirm.title = this.eq(0);
		return Confirm.form;
	}
	$.fn.initConfirmContent = function() {
		Confirm.content = this.eq(0);
		return Confirm.form;
	}
	$.fn.initConfirmYes = function() {
		Confirm.yes = this.eq(0);
		Confirm.yes.click(function () {
			Confirm.action.then();
			Confirm.hide();
		});
		return Confirm.form;
	}
	$.fn.initConfirmNo = function() {
		Confirm.no = this.eq(0);
		Confirm.no.click(function () {
			Confirm.action.else();
			Confirm.hide();
		});
		return Confirm.form;
	}
	
	
	var defForm = {
		title: 'Подтвердите действие',
		content: '',
	}
	
	$.Confirm = function(config) {
		config = $.extend(defForm, config);
		Confirm.title.html(config.title);
		Confirm.content.html(config.content);
		Confirm.action = Confirm._action;
		Confirm.show();
		return Confirm;
	}
}(jQuery));

/* Кастомное окошко 
$(document).ready(function () {
	var confirm = $('<div class="Confirm">');
	$('body').append(confirm);
	confirm.initConfirmForm()
		.append('<header class="Confirm__header">')
		.append('<div class="Confirm__content">')
		.find('.Confirm__content')
		.append('<p>')
		.append('<span class="Btn _green Confirm__btn"><span>Да</span></span>')
		.append('<span class="Btn _red Confirm__btn"><span>Нет</span></span>');
	confirm.find('.Confirm__header').initConfirmTitle();
	confirm.find('.Confirm__content p').initConfirmContent();
	confirm.find('._green').initConfirmYes();
	confirm.find('._red').initConfirmNo();
	$('.Popup__cover').initConfirmCover();
	
	/* Примерный вызов
	$.Confirm({title:'Тестирую вызов', content: 'Интересно как это все с текстом выглядеть будет.'})
	 .then(function () {
		alert('success');
	 });
	
});*/

function  settingrefresh_coc(){
	 $.ajax({
        type: 'POST',
        url: '/system/function.php',
        data: {
			apiname: 'settingrefresh_coc'
		},
		success: function(html) {
        $("#result").empty();
		if(html==1){
			window.location.reload();
			}else{
				$("#result").append("<h1><font color='#FF0000'><b>Не получилось обновить товары<br> Clash of Clans</b></font></h1>");
			}
        }
    })

}
function  settingrefresh_cr(){
	 $.ajax({
        type: 'POST',
        url: '/system/function.php',
        data: {
			apiname: 'settingrefresh_cr'
		},
		success: function(html) {
        $("#result").empty();
		if(html==1){
				window.location.reload();
			}else{
				$("#result").append("<h1><font color='#FF0000'><b>Не получилось обновить товары <br> Clash Royale</b></font></h1>");
			}
        }
    })

}







