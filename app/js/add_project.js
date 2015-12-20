;var myModule = (function () { // начало модуля

	// Инициализация модуля
	var init = function () {
		_setUpListners(); // эта функция далее по коду устанавливает обработчики
		// то, что должно произойти сразу - писать сюда в инициализацию
	};

	// Получаем название файла из пути
	var _getNameFromPath = function (path) {
		return path.replace(/\\/g, '/').replace(/.*\//, '');
	};

	// Прослушка события
	var _setUpListners = function () {
		$('#add-new-item').on('click', _showModal); // открыть модальное окно
		$('#page__popup-addform').on('submit', _addProject); // добавление проекта
		$('#fileupload').on('change', _changefileUpload); // добавление файла в #fileupload
	};

	// Изменили файлаплоад (добавили файл в файлаплоад)
	var _changefileUpload = function () {
		var input = $(this), // инпут type="file"
			// name = input[0].files[0].name; // имя загруженного файла
			name = _getNameFromPath(input.val()); // имя загруженного файла

		$('#filename')
			.val(name)
			.trigger('hideTooltip')
			.removeClass('has-error'); 
	};

	// Работа с модальным окном
	var _showModal = function (ev) { // функция для вызова модального окна
		// console.log('Вызов модального окна');
		ev.preventDefault(); // отменяем стандартное поведение ссылки по клику (чтобы небыло скрола в верх страницы)
		var divPopup = $('#page__popup'), // берём наш popup
			form = divPopup.find('.popup-form'); // берём нашу форму
		divPopup.bPopup({ // вызов popup с параметрами (см. документацию bPopup)
			speed: 350,
			transition: 'slideDown',
			positionStyle: 'fixed', //'fixed' or 'absolute'
			onClose : function () { // функция из документации bPopup - очистка формы
				// form.find('.server-message').text('').hide(); // очищаем текст формы и прячем её
				this.find('.popup-form').trigger("reset"); // сбрасываем форму
			}
		});
	};

	// Добавление проекта
	var _addProject = function (ev) { // функция для добавления проекта
		// console.log('Добавление проекта');
		ev.preventDefault();

		// объявляем переменные
		var form = $(this), // взять "этот" элемент, т.е. в _addProject
			url = $(this).attr('action'),
			url = 'add_project.php', // файл, к которому будем обращаться при отправке формы
			myServerGiveMeAnAnswer = _ajaxForm(form, url); // сюда будем передавать ответ из ajaxForm		

		// запрос на сервер
		if (myServerGiveMeAnAnswer) {
			myServerGiveMeAnAnswer.done(function(ans) { // сюда будет приходить ответ
			// console.log(ans);

			var successBox = form.find('.success-message'),
				errorBox = form.find('.error-message');

			if(ans.status === 'OK'){
				// console.log(ans.text);
				errorBox.hide();
				successBox.text(ans.text).show(); // если всё ок, то вставлять текст ок
			}else{
				// console.log(ans.text);
				successBox.hide();
				errorBox.text(ans.text).show(); // если всё не ок, то вставлять в блок .error-me текст ошибки
			}
		});
		}
	};

	// Универсальная функция
	// Для её работы используются
	// @form - форма
	// @url - адрес php файла, к которому мы обращаемся
	// 1. Собирает данные из формы
	// 2. Проверяет форму
	// 3. Делает запрос на сервер и возвращает ответ с сервера
	var _ajaxForm = function (form, url) { // добавляем универсальную ajax-функцию

		// 1. Проверить форму
		// 2. Собрать данные из формы
		// 3. Вернуть ответ с сервера

		if (!validation.validateForm(form)) return false;  // Возвращает false, если не проходит валидацию
		var data = form.serialize(); // собираем данные из формы в объект data

		var result = $.ajax({ // результат запроса на сервер помещаем в переменную и далее эту переменную возвращаем
			url: url, // здесь будет url сайта
			type: 'POST',
			dataType: 'json',
			data: data,
		}).fail( function(ans) {
			// console.log('Проблемы в PHP');
			form.find('.error-message').text('На сервере произошла ошибка').show();
		});

		return result; // возвращаем результат запроса на сервер
	};

	// Возвращаем объект (публичные методы)
	return {
		init: init
	};

})();

myModule.init(); // конец модуля и вызов


