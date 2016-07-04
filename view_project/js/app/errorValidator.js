function ErrorValidator(){

    this.constructor.prototype.manageErrors = function(errorCollection){
        this.showErrorNotification("Error processing sum");

        for (var k in errorCollection) {
            var validationType = errorCollection[k]['validationType'];
            var message = errorCollection[k]['message'];
            var fieldSelector = errorCollection[k]['fieldSelector'];
            this.showErrorMessageInInput(fieldSelector, message);
        }
    }

    this.constructor.prototype.executeValidation = function(number1, number2) {

        try{
            this.valuePresentValidation(number1, number2);
            this.isNumericValidation(number1, number2);
        } catch(errorCollection){
            this.manageErrors(errorCollection);
            throw errorCollection;
        }


    };

    this.constructor.prototype.isNumericValidation = function(number1, number2) {
        var message = "Is not a number!";
        var validationType = 'isNumeric';
        var errorCollection = [];

        if(!$.isNumeric(number1))
            errorCollection.push(this.createError(validationType, message, '#number1Container'));

        if(!$.isNumeric(number2))
            errorCollection.push(this.createError(validationType, message, '#number2Container'));

        if(errorCollection && errorCollection.length > 0)
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

        if(errorCollection && errorCollection.length > 0)
            throw errorCollection;

    };

    this.constructor.prototype.createError = function(validationType, message, fieldSelector){
        return { validationType : validationType, message: message, fieldSelector : fieldSelector}
    }

    this.constructor.prototype.showErrorMessageInInput = function(selector, message) {
        $(selector).addClass("has-error has-danger");
        $("#errorTmp").loadTemplate("/templates/errorInField.html", { errorMessage: message });
        var newErrorMessage = $("#errorTmp").html();
        $(selector).append(newErrorMessage);

    };


    this.constructor.prototype.showErrorNotification = function(message) {
        noty({
            text: message,
            layout: 'topRight',
            closeWith: ['click'],
            type: 'warning',
            timeout: 2000,
            animation: {
                open: {height: 'toggle'}, // jQuery animate function property object
                close: {height: 'toggle'}, // jQuery animate function property object
                easing: 'swing', // easing
                speed: 200 // opening & closing animation speed
            }
        });
    };

    this.constructor.prototype.removeErrors = function(){
        console.log("Remove errors");
        $('#number1Container').removeClass("has-error has-danger");
        $('#number2Container').removeClass("has-error has-danger");
        $(".help-block.with-errors").remove();
    }

}