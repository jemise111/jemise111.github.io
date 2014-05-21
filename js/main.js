var POSITIONCHANGER = 100; // Percentage, not pixels
var project1 = $('<div class="project-display" id="baller-display"><img src="img/ballernyc.png"><div class="project-display-info"><h2 class="project-title">BallerNYC</h2><p class="project-description">Set up your pickup basketball games before ever stepping foot outside. BallerNYC allows users to search for a court near them and schedule a game.</p><p class="project-links"><a href="http://ballernycco.com">View the site</a><br><a href="https://github.com/jemise111/baller">View the code</a></p></div></div>)');
var project2 = $('<div class="project-display" id="learnr-display"><img src="img/learnr.png"><div class="project-display-info"><h2 class="project-title">Learn.r</h2><p class="project-description">An interactive free learning platform for children. Learn music and programming fundamentals.</p><p class="project-links"><a href="http://learnur.herokuapp.com">View the site</a><br><a href="https://github.com/lacostenycoder/Learn.R/">View the code</a></p></div></div>)');
var project3 = $('<div class="project-display" id="relephant-display"><img src="img/relephant.png"><div class="project-display-info"><h2 class="project-title">Relephant</h2><p class="project-description">A tool to maintain persistent, searchable, analyzable speech</p><p class="project-links"><a href="http://immense-wildwood-2725.herokuapp.com">View the site</a><br><a href="https://github.com/sjstebbins/relephant/">View the code</a></p></div></div>)');
var projects = [project1, project2, project3];
var carouselCounter;
var interval;
var navIsWide = false;

function slideCaption(){
  $('#caption').hide();
  setTimeout(function(){
    $('#caption').slideDown(1500);
  }, 300);
}

function imageHover(){
  $('#contact-list img').mouseenter(function(){
    $(this).css('background-color', '#9F7859');
  });
  $('#contact-list img').mouseleave(function(){
    $(this).css('background', 'none');
  });
}

function startCarousel(currentElIndex){
  projectButtonPressed = false;
  $('#play').hide();
  $('#pause').show();
  carouselCounter = currentElIndex;
  $('#project-box').empty();
  resetProjectsCSS();
  $('#project-box').append(projects[carouselCounter % (projects.length)]);
  interval = setInterval(function(){
    var elToShow = projects[(carouselCounter + 1) % (projects.length)];
    carouselIteration(elToShow);
  }, 6000);
}

function carouselIteration(elToShow){
  var movementHeight = $('#project-box').height();
  $('.project-button').attr('disabled', 'true');
  elToShow.css('opacity', '0.25');
  $('#project-box').append(elToShow);
  $('.project-display').eq(0).animate({
    top: '-=' + movementHeight,
    opacity: 0.25
  }, 2000);
  elToShow.animate({
    top: '-=' + movementHeight,
    opacity: 1
  }, 2000, function(){
    $('#project-box').empty();
    resetProjectsCSS();
    $('#project-box').append(elToShow);
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
      $('.nav-list').css('opacity', '1');
      if (!navIsWide) {
        $('.nav-item').animate({margin: '0 50px'});
        navIsWide = true;
      }
    } else {
      $('.nav-list').removeClass('fixed-nav');
      $('body').css('padding-top', '0');
      $('.nav-list').css('opacity', '0.7');
      if (navIsWide) {
        $('.nav-item').animate({margin: '0 10px'});
        navIsWide = false;
      }
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
  slideCaption();
  imageHover();
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
