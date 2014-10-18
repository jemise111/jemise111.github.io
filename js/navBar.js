function fixNavBar() {
  $(window).scroll(function(){
    var $navBar = $('.nav-list');
    var $navItems = $('.nav-item');
    var navBarHeight = $navBar.outerHeight();
    if (!smallDevice()) {
      if ($(this).scrollTop() > $('#header-container').outerHeight()) {
        $('body').css('padding-top', navBarHeight);
        $('.nav-list').addClass('fixed-nav');
        if (!navIsWide) {
          $navItems.animate({padding: '0 2.5%'}, 1000);
          navIsWide = true;
        }
      } else {
        if (navIsWide) {
          $navBar.removeClass('fixed-nav');
          $('body').css('padding-top', '0');
          $navItems.animate({padding: '0 1%'}, 1000);
          navIsWide = false;
        }
      }
    }
  });
}
