
function ErrorManager(){
    var notifier = new Notifier();


    this.constructor.prototype.createError = function (validationType, message, fieldSelector) {
        return {validationType: validationType, message: message, fieldSelector: fieldSelector}
    }


    this.constructor.prototype.manageErrors = function(errorCollection){
        notifier.showErrorNotification("Error processing sum");

        for (var k in errorCollection) {
            var validationType = errorCollection[k]['validationType'];
            var message = errorCollection[k]['message'];
            var fieldSelector = errorCollection[k]['fieldSelector'];
            notifier.showErrorMessageInInput(fieldSelector, message);
        }
    }

    this.constructor.prototype.removeErrors = function () {
        $('#number1Container').removeClass("has-error has-danger");
        $('#number2Container').removeClass("has-error has-danger");
        $(".help-block.with-errors").remove();
    }
}