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
    $('#password').keyup(function(e){
         if (e.which === 32) {
           var str = $(this).val();
          str = str.replace(/\s/g,'');
          $(this).val(str);            
         }
         }).blur(function() {
         var str = $(this).val();
         str = str.replace(/\s/g,'');
         $(this).val(str);            
         }); 

    $("#signin-form").validate({ 
        rules: {
            'user[email]': {
                required: true,
                email: true,
                noSpace: true

            },
            'user[password]': {
                required: true,
                minlength: 6 
             },
        },
        messages: {
            'user[email]': "Please enter a valid email address",
            'user[password]': "Please enter valid password" 
        }
    });
    $(".searchclear").click(function() {
        $("#email").val('');
    }); 
    $.validator.addMethod("noSpace", function(value, element) {
        return (value.trim() == value) && (value.indexOf(" ") < 0);
    });
    $('.ffl-wrapper').floatingFormLabels();

   $(".toggle-password").click(function() { 
         $(this).toggleClass("zmdi-eye");
         var input = $($(this).attr("data-toggle"));
         if (input.attr("type") == "password") {
         input.attr("type", "text");
         } else {
         input.attr("type", "password");
         }
         }); 
});