$(function() {
  $('#password').passwordRulesValidator();
});

$(document).ready(function() {
  $("#signup").attr("disabled", true);
  $("#signup").addClass("cu-ald");

  jQuery.validator.addMethod("noSpace", function(value, element) {
      return value.indexOf(" ") < 0 && value != "";
  }, "No space please and don't leave it empty");

  $("input").keypress(function(evt) {
      var keycode = evt.charCode || evt.keyCode;
      if (keycode == 32) { //Space key's keycode
          return false;
      }
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
  $('#signup-pwdform').validate({
      rules: {
          'user[password]': {
              required: true,
              minlength: 6
          }
      },
      messages: {
          'user[password]': ""
      },
      highlight: function(element, errorClass, validClass) {
          $(element).parents(".vl-gp").addClass("has-errors").removeClass("has-success");
          $(".pwd-bgtxt").hide();
          $("#signup").attr("disabled", true);
          $("#signup").addClass("cu-ald");

      },
      unhighlight: function(element, errorClass, validClass) {
          $(element).parents(".vl-gp").addClass("has-success").removeClass("has-errors");
          $(".pwd-bgtxt").show();
          $("#signup").attr("disabled", false);
          $("#signup").removeClass("cu-ald");
      }
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

});