function trimfield() {
    document.getElementById('name').value = document.getElementById('name').value.trim();
}
 
 
		
$(function() {
    $('#password').passwordRulesValidator();
});
$(document).ready(function() {
    $("#signup").attr("disabled", true);
    $("#signup").addClass("cu-ald");
	 $("input[type=password]").keypress(function(evt) {
      var keycode = evt.charCode || evt.keyCode;
      if (keycode == 32) { //Space key's keycode
          return false;
      }
  });
 


    jQuery.validator.addMethod("noSpace", function(value, element) {
        return (value.trim() == value) && (value.indexOf(" ") < 0);
    });

    jQuery.validator.addMethod("nameRegex", function(value, element) {
        return this.optional(element) || /^[a-zA-Z_0-9.-]+$/i.test(value);
    }, "test");


    $('#username').keyup(function(e) {
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

    $('input[type=password]').keyup(function() {
        var valid = $("#password").valid();
        $("#signup").attr("disabled", false);
        $("#signup").removeClass("cu-ald");
        if (!valid) {
            $("#signup").attr("disabled", true);
            $("#signup").addClass("cu-ald");
        }
    });
    $(".toggle-password").click(function() {
        $(this).toggleClass("zmdi-eye");
        var input = $($(this).attr("data-toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });
    $('#signup-abtform').validate({
        rules: {
            'user[name]': {
                required: true,
                normalizer: function(value) {
                    return value.replace(/ /g, "");
                },
                minlength: 1

            },
            'user[username]': {
                required: true,
                minlength: 6,
                noSpace: true,
                nameRegex: true 
            },
            'user[password]': {
                required: true,
                minlength: 6
            }
        },
        messages: {
            'user[name]': "Please enter your name",
            'user[username]': "Please enter valid username (Min 6 Characters , Allowed characters :  a-zA-Z_0-9.-)",
            'user[password]': ""

        },
        highlight: function(element, errorClass, validClass) {
            $(element).parents(".vl-gp").addClass("has-error").removeClass("has-success");
            $(element).parents(".vl-gps").addClass("has-errors").removeClass("has-success");

            /* 	  $(element).parents(".vl-gps").addClass("has-errors").removeClass("has-success"); */
            $(".pwd-bgtxt").hide();
            $("#signup").attr("disabled", true);
            $("#signup").addClass("cu-ald");

        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parents(".vl-gp").addClass("has-success").removeClass("has-error");
            $(element).parents(".vl-gps").addClass("has-success").removeClass("has-errors");
           
            

            /* 			$(element).parents(".vl-gps").addClass("has-success").removeClass("has-errors");
             */
            $(".pwd-bgtxt").show();
            $("#signup").attr("disabled", false);
            $("#signup").removeClass("cu-ald");
        },
        
        success: function(label) { 
        	$(".scmsg").css("display", "none");
        	$(".un-invalid").css("display", "none");
			$('#username').blur(function() {
            var valid = $("#username").valid();
            if (valid) {
            	var x =  
                    document.getElementById("username").value; 
              	$.ajax({
                      url: '/is_username_valid',
                      type: 'get',
                      data: "username="+x,
                      dataType: 'JSON',
                      success: function(response){
                      	var obj = response.valid;
                      	if (obj == true) {
                      		$(".scmsg").css("display", "block");
                      		$("#username").removeClass('scmsg-add');
                       	}
                        else {
                          	$(".un-invalid").css("display", "block");
                          	$("#username").addClass('scmsg-add');                          
                          }
                      }
                  });
            }
            });		
		} 
        
    });
    $('#signup').click(function() {
        var valid = $("#signup-abtform").valid();
        if (!valid) {
            return false;
        }
    });
	
    $('.reg-next-button').click(function() { 
        var valid = $("#name").valid();
        var valid = $("#username").valid();
         $("#signup").attr("disabled", true);
        $(".pwd-bgtxt").hide();
        $("#signup").addClass("cu-ald");
        if (!valid) {
            return false;
        }
        current_fs = $('.signup-user-details-section');
        next_fs = $('.signup-password-details');
        next_fs.show();
		$('.signup-userdetails-txt-section').hide();
        current_fs.hide();
		$('.signup-password-txt-section').show(); 
 		$("#password").focus(); 


    });

    $('.txtShowDiv').focus(function() {
        $('.usn-info').slideDown(300);
    }).focusout(function() {
        $('.usn-info').slideUp(300);
    });

    jQuery.validator.addMethod("passwordCheck",
        function(value, element, param) {
            if (this.optional(element)) {
                return true;
            } else if (!/[A-Z]/.test(value)) {
                return false;
            } else if (!/[a-z]/.test(value)) {
                return false;
            } else if (!/[0-9]/.test(value)) {
                return false;
            } else if (!/[\W]/.test(value)) {
                return false;
            }
            return true;
        },
        "");
    $('.ffl-wrapper').floatingFormLabels();
    $(".scmsg").css("display", "none");




});