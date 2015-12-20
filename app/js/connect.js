// Модуль связи
;var connectMe = (function (){

	var init = function(){

				_setUpListners();
			},
			_setUpListners = function (){
				$('#contactme-form').on('submit', _submitForm); 
			},

			_submitForm = function (ev) {
				
				 ev.preventDefault();

				 var form = $(this),          
	          	 url = '/send_mail.php',
	          	 defObject = _ajaxForm(form, url);
	          	 
	   		 },

	    	_ajaxForm = function (form, url) {
      
	      		if (!validation.validateForm(form)) return false;  
	      		var data = form.serialize(); 
	   		 };   

	return {
		init: init
	};

})();

connectMe.init();