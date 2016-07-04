function Init(sumService){

    this.sumService = sumService;


    this.constructor.prototype.initTemplates = function(){
        var data = { number1: 0, number2: 0, numberResult: 0 };
        var error = { errorMessage: ''};
        $("#rowTmp").loadTemplate("/templates/sumRow.html", data);
        $("#errorTmp").loadTemplate("/templates/errorInField.html", error);
    }


    this.constructor.prototype.initSumBehaviour = function(sumCalculator, errorManager){
        $("#sumButton").on("click", function(event){
                event.stopPropagation();
                errorManager.removeErrors();
                sumCalculator.executeSum();
            }
        );
    }

    this.constructor.prototype.initResetBehaviour = function(errorValidator){
        $("#resetButton").on("click", function(event){
                event.stopPropagation();
                this.sumService.reset(errorValidator);
            }
        );
    }

}