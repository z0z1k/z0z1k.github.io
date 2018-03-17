drBong = {
	// массив слушателей по событиям
	_spy: {ajax:[]},
	// функция произошедшего события
	_BONG: function (bong) {
		return function() {
			for (var i=0; i<drBong._spy[bong].length; i++) {
				var spy = drBong._spy[bong][i];
				if (spy.BONG) {
					spy.BONG[bong].apply(spy, arguments)
				} else {
					drBong._spy[bong].splice(i, 1);
					i--;
				}
			}
		}
	},
	// удаление слушателя
	_killBong: function() {
		delete this.BONG;
		delete this.killBong;
	},
	// Добавление события
	_add: function (bong) {
		if (!this[bong]) {
			drBong._spy[bong] = new Array();
			drBong[bong] = drBong._BONG(bong);
		}
	},
	// Добавление слушателя
	add: function (spy, bong, func) {
		spy.BONG = spy.BONG || {};
		spy.BONG[bong] = func;
		spy.killBong = drBong._killBong;
		drBong._add(bong);
		drBong._spy[bong][drBong._spy[bong].length] = spy;
	},

	// Готовый плагин под drBong.ajax()
	ajax: function(data) {
		if (typeof data == 'string') data = $.parseJSON(data);
		for (var i=0; i<drBong._spy['ajax'].length; i++) {
			var spy = drBong._spy['ajax'][i];
			if (spy.BONG) {
				spy.BONG['ajax'].apply(spy, arguments)
			} else {
				drBong._spy['ajax'].splice(i, 1);
				i--;
			}
		}
	},
}
// Интеграция в jQuery
$.fn.drBong = function(bong, func) {
	try {
		var spy = this;
		if (typeof bong != 'string') throw {message: 'первый параметр - не строка!'}
		drBong._add(bong);
		
		if (typeof func == 'function') {
			drBong.add(spy, bong, func);
		} else {
			spy.BONG(func);
		}
	} catch (e) {
		console.error('drBong гневается: "'+e.message+'"');
	}
	return this;
}






