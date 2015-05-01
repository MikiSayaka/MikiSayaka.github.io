jQuery(function($){
  //  Append header
  $('#head').append(tpl['header']);

  //  Fancybox common call up.
  $('.fancybox').fancybox();
  
  //  Login function.
  $('body').delegate('#member_service a#login', 'click', function(){
    $.fancybox.open({
      type: 'inline',
      content: tpl['login']
    });
  });

  $('body').delegate('#login_submit', 'click', function(){
    //  Validate login function
    $('#login_form').validate({
      invalidHandler: function(form, validator) {
        var errorCounts = validator.numberOfInvalids();
        var objErrorTarget = validator.errorList[0];
        $(objErrorTarget.element).focus();
      },
      errorPlacement: function(error, element) {
        $(element).next('span').html($(error).text());
      },
      highlight: function(element, errorClass, validClass) {
        $(element).next('span').show();
      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).next('span').hide();
      },
      rules: {
        account: {
          required: true,
          email: true
        },
        passwd: 'required',
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
        captcha: {
          required: '請輸入驗證碼',
          digits: '驗證碼請輸入數字'
        }
      }
    });
  });
});

//  Template
var tpl = {
  header: [
    '<div id="header_in" class="general_container">',
    '<div id="logo">',
    '<a href="Resterant.html"><h1>LOGO</h1></a>',
    '</div>',
    '<div class="btn-group menu-div" id="category_menu">',
    '<a href="Resterant.html" class="btn btn-warning btn-lg active" role="button">餐廳</a>',
    '<a href="Delivery.html" class="btn btn-success btn-lg active" role="button">宅配</a>',
    '<a href="Ticket.html" class="btn btn-success btn-lg active" role="button">票券</a>',
    '</div>',
    '<div id="member_service_div">',
    '<ul id="member_service">',
    '<li><a href="Registrator.html">註冊</a></li>',
    '<li><a id="login">登入</a></li>',
    '<li><a id="customerService">客服</a></li>',
    '</ul>',
    '<div id="search_div">',
    '<form name="searchForm" action="SearchResult.html" role="form" class="form-inline">',
    '<input type="text" name="searchKey" placeholder="輸入商品名或捷運站名" class="form-control"/>',
    '<button type="submit" class="btn btn-primary btn-sm active">搜尋</button>',
    '</form>',
    '</div>',
    '</div>',
    '</div>'
  ].join(''),
  login: [
    '<div class="loginDiv">',
    '<div class="loginInnerDiv">',
    '<form class="form-horizontal" role="form" id="login_form">',
    '<div class="form-group">',
    '<label for="account" class="col-sm-2 control-label">Email</label>',
    '<div class="col-sm-10">',
    '<input type="email" class="form-control" id="account" name="account" placeholder="Email">',
    '<span class="errorMsg">&nbsp;</span>',
    '</div>',
    '</div>',
    '<div class="form-group">',
    '<label for="passwd" class="col-sm-2 control-label">Password</label>',
    '<div class="col-sm-10">',
    '<input type="password" class="form-control" id="passwd" name="passwd" placeholder="Password">',
    '<span class="errorMsg">&nbsp;</span>',
    '</div>',
    '</div>',
    '<div class="form-group">',
    '<div class="col-sm-offset-2 col-sm-10">',
    '<button type="submit" class="btn btn-default" id="login_submit">Sign in</button>',
    '</div>',
    '</div>',
    '</form>',
    '</div>',
    '</div>'
  ].join('')
}