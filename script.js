// Polyfill for Number.isInteger which is currently not supported in IE.
Number.isInteger = Number.isInteger || function(value) {
  return typeof value === 'number' && 
    isFinite(value) && 
    Math.floor(value) === value;
};

var container = document.getElementById("container");
var btn = document.getElementById("btn");
var input = document.getElementById("number-input");
var spanImagesNumber = document.getElementById("images-number");
var resizer = document.querySelector(".resizer");
resizer.addEventListener("mousedown", initDrag);

var startX, startY, startWidth, startHeight;

function initDrag(e) {
  startX = e.clientX;
  startY = e.clientY;
  startWidth = parseInt(document.defaultView.getComputedStyle(container).width, 10);
  startHeight = parseInt(document.defaultView.getComputedStyle(container).height, 10);
  document.documentElement.addEventListener("mouseover", doDrag, false);
  document.documentElement.addEventListener("mouseup", stopDrag, false);
}

function doDrag(e) {
  container.style.width = (startWidth + e.clientX - startX) + "px";
  container.style.height = (startHeight + e.clientY - startY) + "px";
}

function stopDrag(e) {
  document.documentElement.removeEventListener("mouseover", doDrag, false);
  document.documentElement.removeEventListener("mouseup", stopDrag, false);
}

function clearContainer(className) {
  var elements = container.getElementsByClassName(className);

  while (elements[0]) {
    console.log(elements.tagName)
    container.removeChild(elements[0]);
  }
}

function getInput() {
  var inputValue = Number(input.value);

  if (!Number.isInteger(inputValue) || inputValue < 0) {
    alert("Please input a positive integer");
    inputValue = 0;
  }

  input.value = "";

  spanImagesNumber.innerHTML = inputValue > 0 ? inputValue : "no";

  return inputValue;
}

function addImages() {
  var imgClassName = "container-img";

  clearContainer(imgClassName);

  var numberOfImages = getInput();

  for (var i = 0; i < numberOfImages; i++) {
    var img = document.createElement("img");
    img.src = "img/square.png";
    img.className = imgClassName;
    img.id = i;

    container.appendChild(img);
  }
}

btn.addEventListener("click", addImages);