$(document).ready(function() {
    $('#email').keyup(function(e) {
        $('.searchclear').css("display", "block");
        if (e.which === 32) {
            var str = $(this).val();
            str = str.replace(/\s/g, '');
            $(this).val(str);
        }
    }).blur(function() {
        var str = $(this).val();
        str = str.replace(/\s/g, '');
        $(this).val(str);
    }); 
    $("input").keypress(function(evt) {
        var keycode = evt.charCode || evt.keyCode;
        if (keycode == 32) { //Space key's keycode
            return false;
        }
    });
    $("#signin-form").validate({ 
        rules: {
            'user[email]': {
                required: true,
                email: true,
                noSpace: true

            } 
        },
        messages: {
            'user[email]': "Please enter a valid email address" 
         }
    });
    $(".searchclear").click(function() {
        $("#email").val('');
    }); 
    $.validator.addMethod("noSpace", function(value, element) {
        return (value.trim() == value) && (value.indexOf(" ") < 0);
    });
    $('.ffl-wrapper').floatingFormLabels();


});