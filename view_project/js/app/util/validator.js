function Validator(){

    this.errorManager = new ErrorManager();

    this.constructor.prototype.executeValidation = function(number1, number2) {

        try{
            this.valuePresentValidation(number1, number2);
            this.isNumericValidation(number1, number2);
        } catch(errorCollection){
            this.errorManager.manageErrors(errorCollection);
            throw errorCollection;
        }

    };

    this.constructor.prototype.isNumericValidation = function(number1, number2) {
        var message = "Is not a number!";
        var validationType = 'isNumeric';
        var errorCollection = [];

        if(!$.isNumeric(number1))
            errorCollection.push(this.errorManager.createError(validationType, message, '#number1Container'));

        if(!$.isNumeric(number2))
            errorCollection.push(this.errorManager.createError(validationType, message, '#number2Container'));

        if(errorCollection && errorCollection.length > 0)
            throw errorCollection;


    };

    this.constructor.prototype.valuePresentValidation = function(number1, number2) {

        var missingValueMessage = "Missing value";
        var validationType = 'missingValue';
        var errorCollection = [];

        if(!number1)
            errorCollection.push(this.errorManager.createError(validationType, missingValueMessage, '#number1Container'));

        if(!number2)
            errorCollection.push(this.errorManager.createError(validationType, missingValueMessage, '#number2Container'));

        if(errorCollection && errorCollection.length > 0)
            throw errorCollection;

    };


}