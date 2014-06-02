var POSITIONCHANGER = 100; // Percentage, not pixels
var project1 = $('<div class="project-display" id="baller-display"><img src="img/ballernyc.png"><div class="project-display-info"><h2 class="project-title">BallerNYC</h2><p class="project-description">Set up pickup basketball games before ever stepping foot outside. BallerNYC allows users to search for a public court in New York City and schedule a game for other users to join.</p><p class="project-links"><a href="http://ballernycco.com">View the site</a><br><a href="https://github.com/jemise111/baller">View the code</a></p></div></div>)');
var project2 = $('<div class="project-display" id="learnr-display"><img src="img/learnr.png"><div class="project-display-info"><h2 class="project-title">Learnr</h2><p class="project-description">An interactive free learning platform for children. Learn music theory through and online keyboard, and programming fundamentals through a fun grid-based game.</p><p class="project-links"><a href="http://learnur.herokuapp.com">View the site</a><br><a href="https://github.com/lacostenycoder/Learn.R/">View the code</a></p></div></div>)');
var project3 = $('<div class="project-display" id="relephant-display"><img src="img/relephant.png"><div class="project-display-info"><h2 class="project-title">Relephant</h2><p class="project-description">A speech recording tool that graphs the history of your conversations. Relephant also allows users to analyze speech for meaning.</p><p class="project-links"><a href="http://relephant.me">View the site</a><br><a href="https://github.com/sjstebbins/relephant/">View the code</a></p></div></div>)');
var projects = [project1, project2, project3];
var colorPicker = ['#FD7914', '#87CEFA', '#B8B1AD'];
var carouselCounter;
var interval;
var navIsWide = false;
var techBoxesShowing = false;
var cutMidway = false;

function slideCaption(){
  $('#caption').hide();
  setTimeout(function(){
    $('#caption').slideDown(1500);
  }, 300);
}

function carouselControls() {
  for (var i = 0; i < projects.length; i++) {
    var dot = $("<li class='project-control-dot'><div id='" + projects[i].find('h2').text() + "-dot'></li></div>");
    $('#project-controls').append(dot);
  }
}

function startCarousel(){
  $('#play').hide();
  $('#pause').show();
  $('#project-box').empty();
  resetProjectsCSS();
  resetProjectDotCSS();
  $('#project-box').append(projects[carouselCounter % (projects.length)]);
  $('#' + projects[(carouselCounter) % (projects.length)].find('h2').text() + '-dot').css({
    height: '25px',
    width: '25px'
  });
  interval = setInterval(function(){
    var elToShow = projects[(carouselCounter + 1) % (projects.length)];
    var dotToHideID = '#' + projects[(carouselCounter) % (projects.length)].find('h2').text() + '-dot';
    var dotToShowID = '#' + elToShow.find('h2').text() + '-dot';
    changeDotSizes(dotToHideID, dotToShowID);
    carouselIteration(elToShow);
    carouselCounter++;
  }, 7000);
}

function changeDotSizes(dotToHideID, dotToShowID){
  $(dotToHideID).animate({
    height: '15px',
    width: '15px'
  });
  $(dotToShowID).animate({
    height: '25px',
    width: '25px'
  });
}

function carouselIteration(elToShow){
  var movementHeight = $('#project-box').height();
  $('.project-button').attr('disabled', 'true');
  elToShow.css('opacity', '0.25');
  $('#project-box').append(elToShow);
  $('.project-display').eq(0).animate({
    top: '-=' + movementHeight,
    opacity: 0.25
  }, 600);
  elToShow.animate({
    top: '-=' + movementHeight,
    opacity: 1
  }, 600, function(){
    if (!cutMidway) {
      $('#project-box').empty();
      resetProjectsCSS();
      $('#project-box').append(elToShow);
    }
  });
}

function resetProjectDotCSS(){
  $('.project-control-dot div').css('height', '15px');
  $('.project-control-dot div').css('width', '15px');
}

function resetProjectsCSS(){
  $.each(projects, function(index, element){
    element.css('top', '0px');
    element.css('opacity', '1');
  });
}

function fixNavBar() {
  $(window).scroll(function(){
    var navBarHeight = $('.nav-list').outerHeight();
    if ($(this).scrollTop() > $('#header-container').outerHeight()) {
      if ($(window).width() > 480) {
        $('body').css('padding-top', navBarHeight);
      }
      $('.nav-list').addClass('fixed-nav');
      if (!navIsWide) {
        $('.nav-item').animate({margin: '0 3%'});
        navIsWide = true;
      }
    } else {
      $('.nav-list').removeClass('fixed-nav');
      $('body').css('padding-top', '0');
      if (navIsWide) {
        $('.nav-item').animate({margin: '0 1%'});
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

function projectDotsHover(){
  $('.project-control-dot div').mouseenter(function(){
    $(this).css('background', '#252D36');
    var title = $(this).attr('id').replace('-dot','');
    var leftOffset = $(this)[0].offsetLeft - title.length / 2 * 5;
    var topOffset = $(this)[0].offsetTop - 35;
    var text = $('<span id="project-temp-label" color="white">' + title + '</span>');
    text.css({position: 'absolute', left: leftOffset, top: topOffset});
    $('body').append(text);
  });
  $('.project-control-dot div').mouseleave(function(){
    $(this).css('background', 'black');
    $('#project-temp-label').remove();
  });
}

function projectDotsClick(){
  $('.project-control-dot div').click(function(){
    var clickedProjectName = $(this).attr('id').replace('-dot','');
    var displayedProjectName = projects[carouselCounter % projects.length].find('h2').text();
    if (clickedProjectName !== displayedProjectName) {
      if ($('.project-display').is(':animated')) {
        cutMidway = true;
        $('.project-display').stop();
        $('#project-box').empty();
        $('#project-box').append(projects[carouselCounter % projects.length]);
      }
      clearInterval(interval);
      $('#play').show();
      $('#pause').hide();
      resetProjectsCSS();
      // resetProjectDotCSS();
      var dotToHideID = '#' + displayedProjectName + '-dot';
      if (clickedProjectName === 'BallerNYC') {
        carouselCounter = 0;
      } else if (clickedProjectName === 'Learnr') {
        carouselCounter = 1;
      } else {
        carouselCounter = 2;
      }
      var elToShow = projects[carouselCounter];
      var dotToShowID = '#' + elToShow.find('h2').text() + '-dot';
      changeDotSizes(dotToHideID, dotToShowID);
      cutMidway = false;
      carouselIteration(elToShow);
    }
  });
}

function smoothScrolling(){
  $('.smoothscroll').click(function(e){
    e.preventDefault();
    var id = $(this).text().toLowerCase();
    var navHeight = $('.nav-list').height();
    $('html, body').animate({
      scrollTop: $('#' + id).offset().top - navHeight
    }, 1500);
  });
}

function animateTechnologiesBoxes() {
  $('.technologies-box').hide();
  if (!techBoxesShowing) {
    $(window).scroll(function(){
      techBoxesOffset = $('#about .section-header').offset().top + $('#technologies').outerHeight()/2;
      if ($(this).scrollTop() > techBoxesOffset) {
        $('.technologies-box').show();
        $('.technologies-box').animate({
          left: '0px',
          opacity: 1,
          top: '0px'
        }, 1000);
        techBoxesShowing = true;
      }
    });
  }
}

$(document).ready(function(){
  slideCaption();
  carouselControls();
  carouselCounter = 0;
  startCarousel();
  playPause();
  smoothScrolling();
  fixNavBar();
  projectDotsHover();
  projectDotsClick();
  animateTechnologiesBoxes();
});
