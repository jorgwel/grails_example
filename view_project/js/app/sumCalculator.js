function SumCalculator () {

    var errorValidator = new ErrorValidator();

	var outerThis = this;

	this.constructor.prototype.executeSum = function() {
		var n1 = $("#number1").val();
		var n2 = $("#number2").val();

        errorValidator.executeValidation(n1, n2);

		var sum = parseInt(n1) + parseInt(n2);
		var newRow = this.buildRow(n1, n2, sum);
		this.addRow(newRow);
		this.resetValues();
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
                                        errorValidator.removeErrors();
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

	this.constructor.prototype.reset = function(){
        errorValidator.removeErrors();
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
