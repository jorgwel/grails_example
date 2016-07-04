function Notifier() {

    this.constructor.prototype.showErrorMessageInInput = function (selector, message) {
        $(selector).addClass("has-error has-danger");
        $("#errorTmp").loadTemplate("/templates/errorInField.html", {errorMessage: message});
        var newErrorMessage = $("#errorTmp").html();
        $(selector).append(newErrorMessage);

    };


    this.constructor.prototype.showErrorNotification = function (message) {
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

}
