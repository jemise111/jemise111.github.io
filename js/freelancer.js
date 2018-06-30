// FLIPPER
document.querySelector('.flip-container').onclick = function() {
  var el = document.querySelector('.flip-container');
  if (el.className.indexOf('do-flip') === -1) {
    el.className = 'flip-container do-flip';
  } else {
    el.className = 'flip-container';
  }
}

// COLOR CHANGER
const dots = document.querySelectorAll('.dot');
for (let i = 0; i < dots.length; i++) {
  dots[i].onmouseover = onMouseOverDot;
  dots[i].onmouseleave = onMouseLeave;
}

function onMouseOverDot() {
  const color = this.id;
  const topDiv = document.querySelector('.top');
  topDiv.classList += ` ${color}`;

  const headshot = document.getElementById('headshot');
  headshot.src = `img/headshot-${color}.png`;
}

function onMouseLeave() {
  const topDiv = document.querySelector('.top');
  topDiv.classList = 'top';
  const headshot = document.getElementById('headshot');
  headshot.src = 'img/headshot.png';
}