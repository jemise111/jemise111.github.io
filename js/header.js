function setHeaderHeight() {
  var height = $(window).height();
  $('#header-container').css('height', height + 'px');
}

function headerText(){
  var cb = function(){
    $('.first-initial').css('margin-right', '0px');
    $('#caption, #mail-link').fadeIn(2000);
    $('.first-name, .last-name').fadeIn(1000);
  };
  setTimeout(function(){
      $('#name').css('border', 'none');
      var spacer = $('.first-name').width();
      $('.first-initial').animate({
        'margin-right': spacer + 'px'
      }, 1200, 'swing', cb);
  }, 800);
}
