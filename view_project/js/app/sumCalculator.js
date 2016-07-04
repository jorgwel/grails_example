function SumCalculator () {
	var outerThis = this;

	this.constructor.prototype.executeSum = function() {
		var n1 = $("#number1").val();
		var n2 = $("#number2").val();
		
        try{
        
	    	this.executeValidation(n1, n2);
		    
		} catch(errorCollection){		
		    this.showMessage("Error processing sum");
		    
		    console.log(errorCollection);
		    for (var k in errorCollection) {
		        var validationType = errorCollection[k]['validationType']; 
		        var message = errorCollection[k]['message']; 
		        var fieldSelector = errorCollection[k]['fieldSelector'];
		        this.showMessageInInput(fieldSelector, message);
//                if (validationType == 'missingValue')
//                if (errorCollection[k]['validationType'] == 'isNumeric') 
                    
            }
            throw errorCollection;
            		        
		}
    
		var sum = parseInt(n1) + parseInt(n2);
		var newRow = this.buildRow(n1, n2, sum);
		this.addRow(newRow);
		this.resetValues();
	};

	this.constructor.prototype.executeValidation = function(number1, number2) {
    
        this.valuePresentValidation(number1, number2);
        this.isNumericValidation(number1, number2);
       
	};
	
	this.constructor.prototype.isNumericValidation = function(number1, number2) {
		var message = "Is not a number!";
		var validationType = 'isNumeric';
		var errorCollection = [];

		if(!$.isNumeric(number1))
			errorCollection.push(this.createError(validationType, message, '#number1Container'));
		
		if(!$.isNumeric(number2))
			errorCollection.push(this.createError(validationType, message, '#number2Container'));

		if(errorCollection)
			throw errorCollection;
		

	};

	this.constructor.prototype.valuePresentValidation = function(number1, number2) {
		
		var missingValueMessage = "Missing value";
		var validationType = 'missingValue';
		var errorCollection = [];

		if(!number1)
			errorCollection.push(this.createError(validationType, missingValueMessage, '#number1Container'));

		if(!number2)
			errorCollection.push(this.createError(validationType, missingValueMessage, '#number2Container'));
			
		if(errorCollection)
			throw errorCollection;

	};

	this.constructor.prototype.createError = function(validationType, message, fieldSelector){
		return { validationType : validationType, message: message, fieldSelector : fieldSelector}
	}

	this.constructor.prototype.showMessageInInput = function(selector, message) {
		$(selector).addClass("has-error has-danger");
		$("#errorTmp").loadTemplate("/templates/errorInField.html", { errorMessage: message });
		var newErrorMessage = $("#errorTmp").html();
		$(selector).append(newErrorMessage);

	};


	this.constructor.prototype.showMessage = function(message) {
		noty({
			text: message,
			layout: 'topRight',
			closeWith: ['click'],
			type: 'warning',
			animation: {
				open: {height: 'toggle'}, // jQuery animate function property object
				close: {height: 'toggle'}, // jQuery animate function property object
				easing: 'swing', // easing
				speed: 200 // opening & closing animation speed
			}	
		});
	};


	this.constructor.prototype.buildRow = function(n1, n2, result) {
		$("#rowTmp").html("");
		var dataForTemplate = { number1: n1, number2: n2, numberResult: result };
		$("#rowTmp").loadTemplate("/templates/sumRow.html", dataForTemplate);
		return $("#rowTmp").children(0).html();
	};

	this.constructor.prototype.addRow = function(newRow){
		$("#sums").append(newRow);
	}

	this.constructor.prototype.initTemplates = function(){
		var data = { number1: 0, number2: 0, numberResult: 0 };
		var error = { errorMessage: ''};
		$("#rowTmp").loadTemplate("/templates/sumRow.html", data);
		$("#errorTmp").loadTemplate("/templates/errorInField.html", error);
	}


	this.constructor.prototype.initSumBehaviour = function(){
		$("#sumButton").on("click", function(event){
										event.stopPropagation();	
                                        outerThis.removeErrors();
										outerThis.executeSum();
									}
		);
	}

	this.constructor.prototype.initResetBehaviour = function(){
		$("#resetButton").on("click", function(event){
										event.stopPropagation();
										outerThis.reset();
									}
		);
	}


	this.constructor.prototype.resetValues = function(){
		$("#number1").val("");
		$("#number2").val("");
	}

	this.constructor.prototype.emptyTheSums = function(){
		$("#sums").html("");
	}

	this.constructor.prototype.removeErrors = function(){
	console.log("Remove errors");
		$('#number1Container').removeClass("has-error has-danger");
		$('#number2Container').removeClass("has-error has-danger");
		$(".help-block.with-errors").remove();
	}

	this.constructor.prototype.reset = function(){
        this.removeErrors();
		this.resetValues();
		this.emptyTheSums();
	}

	this.constructor.prototype.init = function(){
		this.initSumBehaviour();
		this.initResetBehaviour();
		this.initTemplates();
	}


}

$( document ).ready(function() {
	var sumCalculator = new SumCalculator()
	sumCalculator.init()
});
