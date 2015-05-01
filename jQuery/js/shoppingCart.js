jQuery(function($){
  $('#shopping_info_reset').click(function(){
    $('input[type=text], input[type=password]').val('');
  });
  $('#shoppingCartForm').validate({
    invalidHandler: function(form, validator) {
      var errorCounts = validator.numberOfInvalids();
      var objErrorTarget = validator.errorList[0];
      $(objErrorTarget.element).focus();
      for (var _i in validator.errorList) {
        $(validator.errorList[_i].element).parent('dd').find('span').html(validator.errorList[_i].message).show();
      }
    },
    errorPlacement: function(error, element) {
      $(element).parent('dd').find('span').html($(error).text());
    },
    highlight: function(element, errorClass, validClass) {
      $(element).addClass(errorClass).parent('dd').find('span').show();
    },
    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass(errorClass).parent('dd').find('span').hide();
    },
    rules: {
      address: 'required',
      email: {
        required: true,
        email: true
      },
      name: 'required',
      mobile: {
        required: true,
        digits: true
      },
      credit_card_1: {
        required: true,
        digits: true
      },
      credit_card_2: {
        required: true,
        digits: true
      },
      credit_card_3: {
        required: true,
        digits: true
      },
      credit_card_4: {
        required: true,
        digits: true
      },
      cvv: {
        required: true,
        digits: true
      }
    },
    messages: {
      address: '請輸入地址',
      email: {
        required: '請輸入帳號',
        email: '請輸入正確的E-Mail格式'
      },
      name: '請輸入姓名',
      mobile: {
        required: '請輸入手機號碼',
        digits: '手機號碼須為數字'
      },
      credit_card_1: {
        required: '請輸入信用卡號',
        digits: '信用卡號須為數字'
      },
      credit_card_2: {
        required: '請輸入信用卡號',
        digits: '信用卡號須為數字'
      },
      credit_card_3: {
        required: '請輸入信用卡號',
        digits: '信用卡號須為數字'
      },
      credit_card_4: {
        required: '請輸入信用卡號',
        digits: '信用卡號須為數字'
      },
      cvv: {
        required: '請輸入信用卡安全碼',
        digits: '本欄位需輸入數字'
      }
    }
  });
});