function SumCalculator () {
	var outerThis = this;

	this.constructor.prototype.executeSum = function() {
		var n1 = $("#number1").val();
		var n2 = $("#number2").val();
		var sum = parseInt(n1) + parseInt(n2);
		var newRow = this.buildRow(n1, n2, sum);
		this.addRow(newRow);
	};

	this.constructor.prototype.buildRow = function(n1, n2, result) {
		$("#templateTmpContainer").html("");
		var dataForTemplate = { number1: n1, number2: n2, numberResult: result };
		$("#templateTmpContainer").loadTemplate("/templates/sumRow.html", dataForTemplate);
		return $("#templateTmpContainer").html();
	};

	this.constructor.prototype.addRow = function(newRow){
		$("#calculatedSums").append(newRow);
	}

	this.constructor.prototype.initializeTemplateBehaviour = function(){
		var data = { number1: 0, number2: 0, numberResult: 0 };
		$("#templateTmpContainer").loadTemplate("/templates/sumRow.html", data);
	}


	this.constructor.prototype.initializeReactToSumBehaviour = function(){
		$("#sumButton").on("click", function(event){
										event.stopPropagation();		
										outerThis.executeSum();
									}
		);
	}

	this.constructor.prototype.addBehaviours = function(){
		this.initializeReactToSumBehaviour();
		this.initializeTemplateBehaviour();
	}

}

$( document ).ready(function() {
	var sumCalculator = new SumCalculator()
	sumCalculator.addBehaviours()
});
