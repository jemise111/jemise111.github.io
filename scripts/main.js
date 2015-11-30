'use strict';

(function(window) {

	var isTouchDevice = 'ontouchstart' in document.documentElement;

	setTimeout(function(){
		var headerContainer = document.querySelector('.header .inner');
		if (headerContainer) {
			headerContainer.className += ' show';
		}
	}, 300);

	var downArrow = document.querySelector('.fa-angle-down');
	var projectsTitle = document.querySelector('.projects');
	var projectsOffset = projectsTitle.offsetTop;
	downArrow.addEventListener('click', function(e) {
		scrollToEl(document.body, projectsOffset, 150);
	});

	if (isTouchDevice) {
		var projects = {};
		Array.prototype.slice.call(document.querySelectorAll('.project')).map(function(el){
			projects[el.offsetTop] = el;
		});
		window.addEventListener('scroll', function(e) {
			var bottomOffset = window.scrollY + window.innerHeight;
			var projectOffsets = Object.keys(projects);
			for (var i = 0; i < projectOffsets.length; i++) {
				if (bottomOffset - 200 > projectOffsets[i]) {
					var el = projects[projectOffsets[i]];
					if (el.className.indexOf('reveal') === -1) {
						el.className += ' reveal';
					}
				}
			}
		});
	}

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