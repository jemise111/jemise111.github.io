var POSITIONCHANGER = 100; // Percentage, not pixels
var project1 = $('<div class="project-display" id="baller-display"><img src="img/ballernyc.png"><div class="project-display-info"><h2 class="project-title">BallerNYC</h2><p class="project-description">Set up pickup basketball games before ever stepping foot outside. BallerNYC allows users to search for a public court in New York City and schedule a game for other users to join.</p><p class="project-links"><a href="http://ballernycco.com">View the site</a><br><a href="https://github.com/jemise111/baller">View the code</a></p></div></div>)');
var project2 = $('<div class="project-display" id="learnr-display"><img src="img/learnr.png"><div class="project-display-info"><h2 class="project-title">Learnr</h2><p class="project-description">An interactive free learning platform for children. Learn music theory through and online keyboard, and programming fundamentals through a fun grid-based game.</p><p class="project-links"><a href="http://learnur.herokuapp.com">View the site</a><br><a href="https://github.com/lacostenycoder/Learn.R/">View the code</a></p></div></div>)');
var project3 = $('<div class="project-display" id="relephant-display"><img src="img/relephant.png"><div class="project-display-info"><h2 class="project-title">Relephant</h2><p class="project-description">A speech recording tool that graphs the history of your conversations. Relephant also allows users to analyze speech for meaning.</p><p class="project-links"><a href="http://relephant.me">View the site</a><br><a href="https://github.com/sjstebbins/relephant/">View the code</a></p></div></div>)');
var project4 = $('<div class="project-display" id="trippindots-display"><img src="img/trippindots.png"><div class="project-display-info"><h2 class="project-title">Trippin Dots</h2><p class="project-description">An attempt at music visualization hacked together at the Monthly Music Hackathon in NYC.</p><p class="project-links"><a href="http://trippindots.herokuapp.com">View the site</a><br><a href="https://github.com/alexshook/trippindots">View the code</a></p></div></div>)');
var project5 = $('<div class="project-display" id="hausthebott-display"><img src="img/hausthebott.png"><div class="project-display-info"><h2 class="project-title">Haus The Bott</h2><p class="project-description">A collaborative list tool built on top of the <a href="http://www.inboxtheapp.com">InboxTheApp</a> platform. <a href="http://techweeknyhackathon.challengepost.com/">GA Daily Distruption Hackathon winner.</a></p><p class="project-links"><a href="http://hausthebott.herokuapp.com">View the site</a><br><a href="https://github.com/TaliaS1214/Haus-The-Bot">View the code</a></p></div></div>)');
var projects = [project1, project2, project3, project4, project5];
var carouselCounter;
var interval;
var navIsWide = false;
var techBoxesShowing = false;
var cutMidway = false;

function smallDevice() {
  return $(window).width() < 480;
}

function carouselControls() {
  for (var i = 0; i < projects.length; i++) {
    var dot = $("<li class='project-control-dot'><div id='" + projects[i].find('h2').text().split(" ").join("") + "-dot'></li></div>");
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
  $('#' + projects[(carouselCounter) % (projects.length)].find('h2').text().split(" ").join("") + '-dot').addClass('fill');
  interval = setInterval(function(){
    var elToShow = projects[(carouselCounter + 1) % (projects.length)];
    var dotToHideID = '#' + projects[(carouselCounter) % (projects.length)].find('h2').text().split(" ").join("") + '-dot';
    var dotToShowID = '#' + elToShow.find('h2').text().split(" ").join("") + '-dot';
    changeDots(dotToHideID, dotToShowID);
    carouselIteration(elToShow);
    carouselCounter++;
  }, 5000);
}

function changeDots(dotToHideID, dotToShowID){
  $(dotToHideID).removeClass('fill');
  $(dotToShowID).addClass('fill');
}

function carouselIteration(elToShow){
  var snapHeight = 16;
  var movementHeight = $('#project-box').height();
  $('.project-button').attr('disabled', 'true');
  elToShow.css('opacity', '0.25');
  $('#project-box').append(elToShow);

  // to achieve snap scroll use 3 animations
  $('.project-display').eq(0).animate({
    top: '-=' + (snapHeight / 2)
  }, 200, function(){
    $('.project-display').eq(0).animate({
      top: '-=' + (snapHeight / 2)
    }, 200, function(){
      $('.project-display').eq(0).animate({
        top: '-=' + (movementHeight - snapHeight)
      }, 300);
    });
  });

  elToShow.animate({
    top: '-=' + (snapHeight / 2),
  }, 200, function(){
    elToShow.animate({
      top: '-=' + (snapHeight / 2),
    }, 200, function(){
      elToShow.animate({
        top: '-=' + (movementHeight - snapHeight),
        opacity: 1
      }, 300, function(){
        if (!cutMidway) {
          $('#project-box').empty();
          resetProjectsCSS();
          $('#project-box').append(elToShow);
        }
      });
    });
  });
}

function resetProjectDotCSS(){
  $('.project-control-dot div').removeClass('fill');

}

function resetProjectsCSS(){
  $.each(projects, function(index, element){
    element.css('top', '0px');
    element.css('opacity', '1');
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
    var title = $(this).attr('id').replace('-dot','');
    var leftOffset = $(this)[0].offsetLeft - title.length / 2 * 5;
    var topOffset = $(this)[0].offsetTop - 35;
    var text = $('<span id="project-temp-label" color="white">' + title + '</span>');
    text.css({position: 'absolute', left: leftOffset, top: topOffset});
    $('body').append(text);
  });
  $('.project-control-dot div').mouseleave(function(){
    $('#project-temp-label').remove();
  });
}

function projectDotsClick(){
  $('.project-control-dot div').click(function(){
    var clickedProjectName = $(this).attr('id').replace('-dot','');
    var displayedProjectName = projects[carouselCounter % projects.length].find('h2').text().split(" ").join("");
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
      var dotToHideID = '#' + displayedProjectName + '-dot';
      if (clickedProjectName === 'BallerNYC') {
        carouselCounter = 0;
      } else if (clickedProjectName === 'Learnr') {
        carouselCounter = 1;
      } else if (clickedProjectName === 'Relephant') {
        carouselCounter = 2;
      } else if (clickedProjectName === 'TrippinDots') {
        carouselCounter = 3;
      } else {
        carouselCounter = 4;
      }
      var elToShow = projects[carouselCounter];
      var dotToShowID = '#' + elToShow.find('h2').text().split(" ").join("") + '-dot';
      changeDots(dotToHideID, dotToShowID);
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
      scrollTop: $('#' + id).offset().top - navHeight + 40
    }, 1000, 'swing');
  });
}

function animateSkillsBoxes() {
  var delay = 700;
  if (!techBoxesShowing) {
    if (!smallDevice()) {
      $(window).scroll(function(){
        techBoxesOffset = $('#about .section-header').offset().top + $('#skills').outerHeight()/2;
        if ($(this).scrollTop() > techBoxesOffset) {
          $('.technologies-box').each(function(i, box){
            setTimeout(function(){
              $(box).animate({opacity: 1}, 1700);
              $(box).find('.at-border').each(function(i, line){
                setTimeout(function(){
                  $(line).addClass('animate');
                }, 300*i)
              });
            }, delay*i);
          });
        }
      });
    } else {
      $('.technologies-box').css('opacity', '1');
      $('.at-border').addClass('animate');
    }
    techBoxesShowing = true;
  }
}

$(document).ready(function(){
  setHeaderHeight();
  headerText();
  fixNavBar();
  animateSkillsBoxes();
  carouselControls();
  carouselCounter = 0;
  startCarousel();
  playPause();
  smoothScrolling();
  projectDotsHover();
  projectDotsClick();
});
