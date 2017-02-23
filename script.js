// Polyfill for Number.isInteger which is currently not supported in IE.
Number.isInteger = Number.isInteger || function(value) {
  return typeof value === "number" && 
    isFinite(value) && 
    Math.floor(value) === value;
};

var ImgSettings = {
  width: 100,
  height: 100,
  marginTop: 2,
  marginLeft: 2
};

Object.seal(ImgSettings);

var container = document.getElementById("container");
var resizer = document.getElementById("resizer");

var btn = document.getElementById("btn");
var input = document.getElementById("number-input");
var pImagesNumber = document.getElementById("images-number");

var startX, startY, startWidth, startHeight;
var numberOfImagesDisplayed;

resizer.addEventListener("mousedown", initDrag);
btn.addEventListener("click", btnClick);

function initDrag(e) {
  startX = e.clientX;
  startY = e.clientY;
  startWidth = parseInt(document.defaultView.getComputedStyle(container).width, 10);
  startHeight = parseInt(document.defaultView.getComputedStyle(container).height, 10);
  document.documentElement.addEventListener("mousemove", doDrag);
  document.documentElement.addEventListener("mouseup", stopDrag);
}

function doDrag(e) {
  var newWidth = startWidth + e.clientX - startX;
  var newHeight = startHeight + e.clientY - startY;
  
  newWidth = Math.max(newWidth, ImgSettings.width + 2 * ImgSettings.marginLeft);
  newHeight = Math.max(newHeight, ImgSettings.height + 2 * ImgSettings.marginTop);

  container.style.width = newWidth + "px";
  container.style.height = newHeight + "px";

  // addImages();
}

function stopDrag(e) {
  document.documentElement.removeEventListener("mousemove", doDrag);
  document.documentElement.removeEventListener("mouseup", stopDrag);
}

function clearContainer(className) {
  var elements = container.getElementsByClassName(className);

  while (elements[0]) {
    container.removeChild(elements[0]);
  }
}

function getInput() {
  var inputValue = Number(input.value);

  if (!inputValue || !Number.isInteger(inputValue) || inputValue < 0) {
    alert("Please input a positive integer");
    inputValue = 0;
  }

  return inputValue;
}

function fitContainer(containerWidth, width, marginLeft) {
  var widthAndMargin = width + ImgSettings.marginLeft;
  if (containerWidth >= widthAndMargin) {
    containerWidth -= widthAndMargin;
    if (containerWidth >= widthAndMargin + marginLeft) {
      containerWidth = containerWidth - widthAndMargin - marginLeft;
      return 2 + Math.floor(containerWidth / (width + marginLeft));
    } else {
      return 1;
    }
  } else {
    return 0;
  }
}

function getDistance(fittingImages, containerWidth, left, right) {
  var ans = left;
  
  while (left <= right) {
    var distance = Math.floor((left + right) / 2);

    var images = fitContainer(containerWidth, ImgSettings.width, distance);

    if (images >= fittingImages) {
      if (images == fittingImages) {
        ans = Math.max(ans, distance);
      }
      left = distance + 1;
    } else {
      right = distance - 1;
    }
  }

  return ans;
}

function btnClick() {
  var numberOfImages = getInput();
  if (numberOfImages > 0) {
    addImages(numberOfImages);
  }
}

function addImages(numberOfImages) {
  numberOfImagesDisplayed = numberOfImages;

  var imgClassName = "container-img";

  clearContainer(imgClassName);

  var containerWidth = parseInt(document.defaultView.getComputedStyle(container).width, 10);
  var containerHeight = parseInt(document.defaultView.getComputedStyle(container).height, 10);

  var maxFittingImages = fitContainer(containerWidth, ImgSettings.width, ImgSettings.marginLeft);

  console.log("maxFittingImages", maxFittingImages);

  var marginLeft = ImgSettings.marginLeft;

  if (maxFittingImages < numberOfImages) {
    marginLeft = getDistance(maxFittingImages, containerWidth, ImgSettings.marginLeft, ImgSettings.width);
    console.log("marginLeft", marginLeft);
  }

  var j = 0;
  for (var i = 0; i < numberOfImages; i++) {
    var div = document.createElement("div");
    div.className = imgClassName;
    div.id = i;
    div.style.width = ImgSettings.width + "px";
    div.style.height = ImgSettings.height + "px";
    div.style.display = "inline-block";
    div.style.marginTop = "2px";
    div.style.marginLeft = marginLeft + "px";
    if (i == j * maxFittingImages) {
      div.style.marginLeft = ImgSettings.marginLeft + "px";
      j++;
    }

    var img = document.createElement("img");
    img.src = "img/default.jpg";

    div.appendChild(img);
    container.appendChild(div);
  }

  var pImagesNumberText;
  switch (numberOfImagesDisplayed) {
    case 0:
      pImagesNumberText = "are no images";
      break;
    case 1:
      pImagesNumberText = "is one image";
      break;
    default:
      pImagesNumberText = "are " + numberOfImagesDisplayed + " images";
  }

  pImagesNumber.innerHTML = "There " + pImagesNumberText + " displayed right now.";

  input.value = "";
}