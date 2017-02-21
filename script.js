var container = document.getElementById("container");
var resizer = document.getElementById("resizer");

resizer.addEventListener('mousedown', initDrag);

var startX, startY, startWidth, startHeight;

function initDrag(e) {
   startX = e.clientX;
   startY = e.clientY;
   startWidth = parseInt(document.defaultView.getComputedStyle(container).width, 10);
   startHeight = parseInt(document.defaultView.getComputedStyle(container).height, 10);
   document.documentElement.addEventListener('mousemove', doDrag);
   document.documentElement.addEventListener('mouseup', stopDrag);
}

function doDrag(e) {
   container.style.width = (startWidth + e.clientX - startX) + 'px';
   container.style.height = (startHeight + e.clientY - startY) + 'px';
}

function stopDrag(e) {
    document.documentElement.removeEventListener('mousemove', doDrag);
    document.documentElement.removeEventListener('mouseup', stopDrag);
}