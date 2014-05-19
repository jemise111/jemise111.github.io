var POSITIONCHANGER = 100; // Percentage, not pixels
var project1 = $('<div class="project-display" id="baller"><img src="http://placekitten.com/300/300"><div class="project-display-info"><p>Name: Kitten</p><p>URL: <a href="http://placekitten.com/300/300">Kitten Link</a></p><p>Code: kitten.github.com</p></div></div>)');
var project2 = $('<div class="project-display" id="learnur"><img src="http://placekitten.com/301/301"><div class="project-display-info"><p>Name: Kitten1</p><p>URL: <a href="http://placekitten.com/300/300">Kitten Link</a></p><p>Code: kitten1.github.com</p></div></div>)');
var project3 = $('<div class="project-display" id="rephanto"><img src="http://placekitten.com/302/302"><div class="project-display-info"><p>Name: Kitten2</p><p>URL: <a href="http://placekitten.com/300/300">Kitten Link</a></p><p>Code: kitten2.github.com</p></div></div>)');
var projects = [project1, project2, project3];

function initialize() {
  $('#projects').append(project1);
}

function startCarousel(){
  var counter = 0;
  var interval = setInterval(function(){
    var elToHide = projects[counter % (projects.length)];
    var elToShow = projects[(counter + 1) % (projects.length)];
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
  counter++;
  }, 5000);
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
  initialize();
  startCarousel();
  smoothScrolling();
});

// For list of skillz (ruby, rails, psql, etc.) do a word
// map where things I know best are larger than things I
// do not.

// Do scavenger hunt. Make reward landing page? JESSE.CLUB
