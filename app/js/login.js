// Модуль авторизации
;var loginModule = (function (){

	var init = function(){
				
				_setUpListners();
			},
			_setUpListners = function (){
				$('#form-login').on('submit', _submitForm); 
			},

			_submitForm = function (ev) {

		     	ev.preventDefault();
		     	
	           	var form = $(this),          
                url = '',
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

loginModule.init();