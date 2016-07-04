function SumCalculatorService() {

    this.validator = new Validator();
    this.initService = new Init(this);



    this.constructor.prototype.init = function(sumCalculator) {
        this.initService.initSumBehaviour(sumCalculator, this.validator.errorManager);
        this.initService.initResetBehaviour(this.validator);
        this.initService.initTemplates();
    }
    this.constructor.prototype.buildRow = function(n1, n2, result) {
        $("#rowTmp").html("");
        var dataForTemplate = { number1: n1, number2: n2, numberResult: result };
        $("#rowTmp").loadTemplate("/templates/sumRow.html", dataForTemplate);
        return $("#rowTmp").children(0).html();
    };

    this.constructor.prototype.addRow = function(newRow){
        $("#sums").append(newRow);
    }

    this.constructor.prototype.resetValues = function(){
        $("#number1").val("");
        $("#number2").val("");
    }

    this.constructor.prototype.emptyTheSums = function(){
        $("#sums").html("");
    }

    this.constructor.prototype.reset = function(errorValidator){
        errorValidator.removeErrors();
        this.resetValues();
        this.emptyTheSums();
    }

    this.constructor.prototype.executeValidation = function(number1, number2) {
        this.validator.executeValidation(number1, number2);
    }

}