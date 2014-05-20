var POSITIONCHANGER = 100; // Percentage, not pixels
var project1 = $('<div class="project-display" id="baller"><img src="img/ballernyc.png"><div class="project-display-info"><p>Name: Kitten</p><p>URL: <a href="http://placekitten.com/300/300">Kitten Link</a></p><p>Code: kitten.github.com</p></div></div>)');
var project2 = $('<div class="project-display" id="learnur"><img src="img/learnr.png"><div class="project-display-info"><p>Name: Kitten1</p><p>URL: <a href="http://placekitten.com/300/300">Kitten Link</a></p><p>Code: kitten1.github.com</p></div></div>)');
var project3 = $('<div class="project-display" id="relephant"><img src="img/relephant.png"><div class="project-display-info"><p>Name: Kitten2</p><p>URL: <a href="http://placekitten.com/300/300">Kitten Link</a></p><p>Code: kitten2.github.com</p></div></div>)');
var projects = [project1, project2, project3];
var carouselCounter = 0;

function initialize() {
  $('#projects').append(project1);
}

function startCarousel(){
  var interval = setInterval(function(){
    var elToHide = projects[carouselCounter % (projects.length)];
    var elToShow = projects[(carouselCounter + 1) % (projects.length)];
    elToShow.css('opacity', '0.25');
    $('#projects').append(elToShow);
    elToHide.animate({
      top: '-100%',
      opacity: 0.25
    }, 3000, function(){
    });
    elToShow.animate({
      top: '-100%',
      opacity: 1
    }, 3000, function(){
      $('#projects').empty();
      $.each(projects, function(index, element){
        element.css('top', '0%');
        element.css('opacity', '1');
      });
      $('#projects').append(elToShow);
    });
  carouselCounter++;
  }, 10000);
}

function smoothScrolling(){
  $('.smoothscroll').click(function(e){
    e.preventDefault();
    var topPaddingOffset = parseInt($('body').css('padding-top'), 10);
    var id = $(this).text().toLowerCase();
    $('html, body').animate({
      scrollTop: $('#' + id).offset().top - topPaddingOffset
    }, 1300);
  });
}

// should be animation here
function fixNavBar() {
  var navBarHeight = $('.nav-list').outerHeight();
  $(window).scroll(function(){
    if ($(this).scrollTop() > $('#header-container').outerHeight()) {
      $('.nav-list').addClass('fixed-nav');
      $('body').css('padding-top', navBarHeight);
      $('.nav-item').css('margin', '0 50px');
    } else {
      $('.nav-list').removeClass('fixed-nav');
      $('body').css('padding-top', '0');
      $('.nav-item').css('margin', '0 10px');
    }
  });
}

$(document).ready(function(){
  initialize();
  startCarousel();
  smoothScrolling();
  fixNavBar();
});

// For list of skillz (ruby, rails, psql, etc.) do a word
// map where things I know best are larger than things I
// do not.

// Do scavenger hunt. Make reward landing page? JESSE.CLUB
