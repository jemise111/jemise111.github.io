var POSITIONCHANGER = 100; // Percentage, not pixels
var project1 = $('<div class="project-display" id="baller-display"><img src="img/ballernyc.png"><div class="project-display-info"><p>Name: Kitten</p><p>URL: <a href="http://placekitten.com/300/300">Kitten Link</a></p><p>Code: kitten.github.com</p></div></div>)');
var project2 = $('<div class="project-display" id="learnr-display"><img src="img/learnr.png"><div class="project-display-info"><p>Name: Kitten1</p><p>URL: <a href="http://placekitten.com/300/300">Kitten Link</a></p><p>Code: kitten1.github.com</p></div></div>)');
var project3 = $('<div class="project-display" id="relephant-display"><img src="img/relephant.png"><div class="project-display-info"><p>Name: Kitten2</p><p>URL: <a href="http://placekitten.com/300/300">Kitten Link</a></p><p>Code: kitten2.github.com</p></div></div>)');
var projects = [project1, project2, project3];
var carouselCounter;
var interval;

function startCarousel(currentElIndex){
  projectButtonPressed = false;
  $('#play').hide();
  $('#pause').show();
  carouselCounter = currentElIndex;
  $('#projects').empty();
  resetProjectsCSS();
  $('#projects').append(projects[carouselCounter % (projects.length)]);
  interval = setInterval(function(){
    var elToShow = projects[(carouselCounter + 1) % (projects.length)];
    carouselIteration(elToShow);
  }, 4000);
}

function carouselIteration(elToShow){
  var movementHeight = $('#projects').height();
  $('.project-button').attr('disabled', 'true');
  elToShow.css('opacity', '0.25');
  $('#projects').append(elToShow);
  $('.project-display').eq(0).animate({
    top: '-=' + movementHeight,
    opacity: 0.25
  }, 2000);
  elToShow.animate({
    top: '-=' + movementHeight,
    opacity: 1
  }, 2000, function(){
    $('#projects').empty();
    resetProjectsCSS();
    $('#projects').append(elToShow);
    $('.project-button').removeAttr('disabled');
  });
  carouselCounter++;
}

function resetProjectsCSS(){
  $.each(projects, function(index, element){
    element.css('top', '0px');
    element.css('opacity', '1');
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

function playPause(){
  $('#play').click(function(){
    startCarousel(carouselCounter);
  });
  $('#pause').click(function(){
    clearInterval(interval);
    $(this).hide();
    $('#play').show();
  });
}

function projectButtons(){
  $('.project-button').click(function(){
    var projectName = $(this).attr('id');
    var projectIndex;
    if (projectName === 'baller') {
      projectIndex = 0;
    } else if (projectName === 'learnr') {
      projectIndex = 1;
    } else {
      projectIndex = 2;
    }
    clearInterval(interval);
    startCarousel(projectIndex);
    clearInterval(interval);
    $('#pause').hide();
    $('#play').show();
  });
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

$(document).ready(function(){
  startCarousel(0);
  playPause();
  smoothScrolling();
  fixNavBar();
  projectButtons();
});

// For list of skillz (ruby, rails, psql, etc.) do a word
// map where things I know best are larger than things I
// do not.

// Do scavenger hunt. Make reward landing page? JESSE.CLUB
