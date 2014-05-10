var galleryItems = $('.project-display');
var POSITIONCHANGER = 150; // Percentage, not pixels

function initialize() {
  galleryItems.hide();
  galleryItems.eq(0).show();
  // for (var i = 0; i < galleryItems.length; i++) {
  //   var leftPos = POSITIONCHANGER * i;
  //   galleryItems.eq(i).css('left', leftPos + "%");
  // }
}

function startFade() {
  var counter = 0;
  var interval = setInterval(function(){
    galleryItems.eq(counter % (galleryItems.length)).fadeOut(1000);
    galleryItems.eq((counter + 1) % (galleryItems.length)).fadeIn(1000);
    counter++;
  }, 5000);
}

function startCarousel(){
  rotateLeft();
  // var interval = setInterval(function(){
  //     rotateLeft();
  //   }, 1000);
}

function rotateLeft() {
  // $.each(galleryItems, function(index, item){
  //   var curLeftPct = parseInt($(item).css("left"), 10);
  //   var newLeftPct = (curLeftPct - POSITIONCHANGER) + "%";
  //   if (parseInt($(item).css('left'), 10) === POSITIONCHANGER) {
  //     $(item).css('display', 'inline-block');
  //   }
  //   $(item).animate({
  //     left: newLeftPct
  //   }, 5000);
  // });
  // $.each(galleryItems, function(index, item){
  //   var curLeftPct = parseInt($(item).css("left"), 10);
  //   var newLeftPct = (curLeftPct - POSITIONCHANGER) + "%";
  //   if (curLeftPct === POSITIONCHANGER) {
  //     $(item).fadeIn();
  //   } else {
  //     $(item).fadeOut();
  //   }
  //   var newDisplay = curLeftPct === 150 ? 'inline-block' : 'none';
  //   console.log(newDisplay);
  //   $(item).animate({
  //     left: newLeftPct,
  //     display: newDisplay,
  //   }, 2000);
  // });
}
  // galleryItems.animate({
  //   left: "",
  //   opacity: 0.25
  // }, 2000);

$(document).ready(function(){
  initialize();
  startFade();
  // startCarousel();
});

// For list of skillz (ruby, rails, psql, etc.) do a word
// map where things I know best are larger than things I
// do not.

// Do scavenger hunt. Make reward landing page? JESSE.CLUB
