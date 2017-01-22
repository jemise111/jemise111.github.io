'use strict';

(function(window) {

	var SCROLL_PROJECT_OFFSET = 350;
	var isTouchDevice = 'ontouchstart' in document.documentElement;

	/*********************
	 ** Touch Detection **
	 *********************/

	if (isTouchDevice) {
		document.body.className += ' is-touch-device';
	}
		

	/*********************
	 *** Header Reveal ***
	 *********************/

	setTimeout(function(){
		var headerContainer = document.querySelector('.header .inner');
		if (headerContainer) {
			headerContainer.className += ' show';
		}
	}, 600);

	/*********************
	 ** Down Arrow Anim **
	 *********************/

	var downArrow = document.querySelector('.fa-angle-down');
	var projectsTitle = document.querySelector('.projects');
	var projectsOffset = projectsTitle.offsetTop;
	downArrow.addEventListener('click', function(e) {
		scrollToEl(document.body, projectsOffset, 150);
	});

	/*********************
	 *** Scroll Reveal ***
	 *********************/

	var projects = {};
	Array.prototype.slice.call(document.querySelectorAll('.project-container')).map(function(el){
		if (!projects[el.offsetTop]) {
			projects[el.offsetTop] = [];
		}

		projects[el.offsetTop].push(el);
	});


	window.addEventListener('scroll', function(e) {
		var bottomOffset = window.scrollY + window.innerHeight;
		var projectOffsets = Object.keys(projects);
		
		for (var i = 0; i < projectOffsets.length; i++) {
			if (bottomOffset - SCROLL_PROJECT_OFFSET > projectOffsets[i]) {
				var els = projects[projectOffsets[i]];
				for (var j = 0; j < els.length; j++) {
					var el = els[j];
					if (el.className.indexOf('reveal') === -1) {
						el.className += ' reveal';
					}

					if (el.className.indexOf('expand') === -1) {
						el.className += ' expand';
					}
				}
			}
		}
	});

	/*********************
	 ****** Helpers ******
	 *********************/

	function scrollToEl(element, to, duration) {
		if (duration <= 0) return;
		var difference = to - element.scrollTop;
		var perTick = difference / duration * 10;

		setTimeout(function() {
			element.scrollTop = element.scrollTop + perTick;
			if (element.scrollTop === to) return;
			scrollToEl(element, to, duration - 10);
		}, 10);
	}

})(window);