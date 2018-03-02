
$(document).ready(function() {
  //load scripts
  // Header Scripts
  const isMobile = "ontouchstart" in document.documentElement && navigator.userAgent.match(/Mobi/);
(function(){
  let my_main_line_timer;
  let lastTarget;
  function onMainLinkMouseOver(e) {
    onMainLinkMouseClick(e);
  }

  function onMainLinkMouseOut(e) {
    my_main_line_timer = setTimeout(() => {
      $(".main-menu").removeClass("main-menu-extend");
    }, 400);
  }

  function onMainLinkMouseClick(e) {
    if (isMobile) {
      if (lastTarget == e.target) {
        // console.log("double click");
        $("html").focus();
      }
      lastTarget = e.target;
    }
    clearTimeout(my_main_line_timer);
    $(".main-menu").addClass("main-menu-extend");
  }

  function onMainLinkToggle(e) {
    $(".main-menu").toggleClass("main-menu-extend");
  }

  if (isMobile) {
    $("html").on("touchstart", function(e) {
      onMainLinkMouseOut(e);
    });

    $(".main-menu").on({ addClass: function(e) {
        $("#header-group .nav .has-submenu .submenu").show();
      }, removeClass: function(e) {
        $("#header-group .nav .has-submenu .submenu").hide();
      } });
    $("#header-group .nav .has-submenu").on({ touchstart: function(e) {
        onMainLinkMouseClick(e);
        e.stopPropagation();
      } });
  } else {
    $(window).resize(function() {
      onMainLinkMouseOut();
    });

    $("#header-group .nav .has-submenu").on({
      mouseover: onMainLinkMouseOver,
      click: onMainLinkMouseClick,
      mouseout: onMainLinkMouseOut
    });
  }

  $("#header-group .mobile-menu-btn").on({ click: function() {
      $("#header-group .nav").toggleClass("display-show");
      $(this)
      .children("i")
      .toggleClass("display-hide");
    } });
  })();
  // Marquee
  // (function() {
  //   $("#hot-news").marquee({ yScroll: "bottom" });
  // })();
  /* Catalog */
  (function() {
    // 使用 mobile 預設 picker;
    if (isMobile) {
      $(".selectpicker").selectpicker("mobile");
    }

    // Sort
    $("#myBreadcrumb .selectpicker").on("change", function(e) {
      var selected = $(this)
        .find("option:selected")
        .val();
      console.log(selected);
      //接排序功能
    });
  })();
  /* Recommand List */
  // 推薦清單用 script
(function() {
  
  // 左右換頁
  function toPageNext(e){
    const group = $("#myRecommandList .row-horizon");
    const w = group.width();
    const maxW = group.prop("scrollWidth");
    const cW = group.prop("scrollLeft");
    const nextW = (cW + w) > maxW ? maxW :  (cW + w);
    group.animate({ scrollLeft: nextW }, "slow");
  }

  function toPagePrev(e) {
    const group = $("#myRecommandList .row-horizon");
    const w = group.width();
    const maxW = group.prop("scrollWidth");
    const cW = group.prop("scrollLeft");
    const nextW = cW - w < 0 ? 0 : cW - w;
    group.animate({ scrollLeft: nextW }, "slow");
  }


  $("#myRecommandList button#btn-next").on("click", toPageNext );
  $("#myRecommandList button#btn-prev").on("click", toPagePrev );

})();

/* Product Photo set */
// 用來控制產品圖輯
(function() {
  function onRollOver(e){
    const nextUrl = this.dataset.url;
    const img0 = $("#myProductPhotoSet .main-image img");
    const lastUrl = img0.attr("src");
    // console.log(lastUrl, nextUrl);
    if (lastUrl.indexOf(nextUrl) > -1 ) return;
    img0.fadeTo(100, 0, function() {
      img0.attr("src", nextUrl + "?timestamp=" + new Date().getTime());
      img0.fadeTo("fast", 1);
    });
  }

  $("#myProductPhotoSet li").on("mouseover", onRollOver );
  
})();

});
