function SumCalculator () {


    this.sumCalculatorService = new SumCalculatorService();


	this.constructor.prototype.executeSum = function() {
		var n1 = $("#number1").val();
		var n2 = $("#number2").val();

        this.sumCalculatorService.executeValidation(n1, n2);

		var sum = parseInt(n1) + parseInt(n2);
		var newRow = this.sumCalculatorService.buildRow(n1, n2, sum);

        this.sumCalculatorService.addRow(newRow);
        this.sumCalculatorService.resetValues();
	};

    this.constructor.prototype.init = function(){
        this.sumCalculatorService.init(this);
    }

}

$( document ).ready(function() {
	var sumCalculator = new SumCalculator();
	sumCalculator.init();
});
