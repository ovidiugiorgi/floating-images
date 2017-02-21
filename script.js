// Polyfill for Number.isInteger which is currently not supported in IE.
Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" && 
    isFinite(value) && 
    Math.floor(value) === value;
};

var container = document.getElementById("container");
var resizer = document.getElementById("resizer");

var btn = document.getElementById("btn");
var input = document.getElementById("number-input");
var spanImagesNumber = document.getElementById("images-number");

var startX, startY, startWidth, startHeight;

resizer.addEventListener("mousedown", initDrag);
btn.addEventListener("click", addImages);

function initDrag(e) {
   startX = e.clientX;
   startY = e.clientY;
   startWidth = parseInt(document.defaultView.getComputedStyle(container).width, 10);
   startHeight = parseInt(document.defaultView.getComputedStyle(container).height, 10);
   document.documentElement.addEventListener("mousemove", doDrag);
   document.documentElement.addEventListener("mouseup", stopDrag);
}

function doDrag(e) {
   container.style.width = (startWidth + e.clientX - startX) + "px";
   container.style.height = (startHeight + e.clientY - startY) + "px";
}

function stopDrag(e) {
    document.documentElement.removeEventListener("mousemove", doDrag);
    document.documentElement.removeEventListener("mouseup", stopDrag);
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