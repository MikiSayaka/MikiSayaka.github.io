jQuery(function($){
  //  FIXME Get test data
  var _objGoodsData = new Object();

  $.getJSON('js/data.json', function(data) {
    var _objGoodsDataList = data.resterant_goods_category;

    //  讀取商品資料 - 餐廳分類版頭跑馬燈
    var _bigBanner = $('#big_banner');
    var _bigBannerDesc = $('#big_banner_marguee_text');
    _bigBanner.jqoteapp(_tpl['resterantPromoPic'], _objGoodsDataList);
    _bigBannerDesc.jqoteapp(_tpl['resterantPromo'], _objGoodsDataList);
    
    //  讀取商品資料 - 組建展售區
    $('#sub_banner').jqoteapp(_tpl['goodsList'], _objGoodsDataList);
  }).done(function(data){
    //  Do something when it done
  }).fail(function(e) {
    //  When error occur, redirect to 404 page.
  });
  
  //  餐廳分類業跑馬燈
  setInterval(function(){
    var bigBannerImage = $('#big_banner > a:not(:hidden)');
    var bigBannerMarqueeLi = $('#big_banner_marguee_text li.wixoss');
    if (bigBannerMarqueeLi.next().length == 0) {
      $('#big_banner_marguee_text li:eq(0)').addClass('wixoss');
      $('#big_banner > a:hidden:eq(0)').show();
    } else {
      bigBannerMarqueeLi.next().addClass('wixoss');
      bigBannerImage.next().show();
    }
    bigBannerMarqueeLi.removeClass('wixoss');
    bigBannerImage.hide();
  }, 6000);
  
});

//  Template
var _tpl = {
  'resterantPromoPic': [
    '<% if ( j == 0) { %>',
    '<a href="GoodsPage.html?goods_code=<%=this.goods_code%>">',
    '<% } else { %>',
    '<a href="GoodsPage.html?goods_code=<%=this.goods_code%>" class="urlHidden">',
    '<% } %>',
    '<img src="img/<%=this.goods_code%>_1.jpg" title="<%=this.goods_name%>" alt="<%=this.goods_desc%>">',
    '</a>',
  ].join(''),
  'resterantPromo': [
    '<% if ( j == 0) { %>',
    '<li class="wixoss">',
    '<% } else { %>',
    '<li>',
    '<% } %>',
    '<a href="GoodsPage.html?goods_code=<%=this.goods_code%>" title="<%=this.goods_name%>">',
    '<div class="goods_promotion_desc"><h4 class="goods_name"><%=this.goods_desc%></h4>',
    '<p class="goods_desc"><%=this.goods_name%></p>',
    '</div>',
    '<span class="price">$&nbsp;<%=this.price%></span>',
    '</a>',
    '</li>'
  ].join(''),
  'goodsList': [
    '<% if ( j % 2 != 0 ) { %>',
    '<li class="paddingItem">',
    '<% } else { %>',
    '<li>',
    '<% } %>',
    '<a href="GoodsPage.html?goodsCode=<%=this.goods_code%>"><img class="sub_goods_img" src="img/<%=this.goods_code%>_1.jpg"></a>',
    '<div class="sub_goods_desc">',
    '<a href="GoodsPage.html?goodsCode=<%=this.goods_code%>">',
    '<div class="goods_promotion_desc">',
    '<h4 class="goods_name"><%=this.goods_name%></h3>',
    '<p><%=this.goods_desc%></p>',
    '</div>',
    '<span class="price">$<%=this.price%></span>',
    '</a>',
    '</div>',
    '</li>'
  ].join(''),
  'marqueeContant': [
    '<li class="marquee">',
    '<div class="marquee">',
    '</div>',
    '</li>'
  ].join(''),
  'marqueeContantItem': [
    '<div class="marquee_goods">',
    '<a href="GoodsPage.html">',
    '<img class="marquee_goods_img" src="img/<%=this.goods_code%>_1.jpg">',
    '</a>',
    '<div class="marquee_goods_desc">',
    '<a href="GoodsPage.html">',
    '<h3 class="goods_name"><%=this.goods_name%></h3>',
    '<p class="goods_desc"><%=this.goods_desc%></p>',
    '</a>',
    '</div>',
    '</div>'
  ].join('')
};
