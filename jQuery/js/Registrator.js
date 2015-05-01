jQuery(function($){
  $('#reg_reset').click(function(){
    $('input[type=text], input[type=password]').val('');
  });
  $('#registrator_form').validate({
    invalidHandler: function(form, validator) {
      var errorCounts = validator.numberOfInvalids();
      var objErrorTarget = validator.errorList[0];
      $(objErrorTarget.element).focus();
      for (var _i in validator.errorList) {
        $(validator.errorList[_i].element).parent('td').find('span').html(validator.errorList[_i].message).show();
      }
    },
    errorPlacement: function(error, element) {
      $(element).parent('td').find('span').html($(error).text());
    },
    highlight: function(element, errorClass, validClass) {
      $(element).addClass(errorClass).parent('td').find('span').show();
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass(errorClass).parent('td').find('span').hide();
    },
    rules: {
      account: {
        required: true,
        email: true
      },
      passwd: 'required',
      birthDay: 'required',
      address: 'required',
      group_code: 'digits',
      captcha: {
        required: true,
        digits: true
      }
    },
    messages: {
      account: {
        required: '請輸入帳號',
        email: '請輸入正確的E-Mail格式'
      },
      passwd: '請輸入密碼',
      birthDay: '請填寫生日',
      address: '請輸入地址',
      group_code: '群組號碼請填寫數字',
      captcha: {
        required: '請輸入驗證碼',
        digits: '驗證碼請輸入數字'
      }
    }
  });
});