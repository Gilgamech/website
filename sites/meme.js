//Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
// canvas.height = bgImage.height;
// canvas.width = bgImage.width;

// load background
var bgImage = new Image();
var bgReady = false;
bgImage.onload = function () {
	var ImageRatio = bgImage.width / bgImage.height;
	canvas.height = canvas.width * ImageRatio;
	ctx.drawImage(bgImage, 0, 0, bgImage.width, bgImage.height, // source rectangle
	0, 0, canvas.width, (canvas.width * ImageRatio)); // destination rectangle
	addImpactWithBorder('topTextInput',10,100);
	addImpactWithBorder('BottomTextInput',10,(ctx.canvas.height - 20));
};

function updateMemeForm(memeUrlInput) {
	bgImage.src = document.getElementById(memeUrlInput).value;
};


function addImpactWithBorder(fromInputBox,pixelsFromLeft,pixelsFromTop) {
	ctx.font="100px Impact";
    ctx.lineWidth = 4;  //define the width of the stroke line
    ctx.fillStyle = 'white';
	ctx.strokeStyle = 'black';
	
	ctx.fillText(document.getElementById(fromInputBox).value,pixelsFromLeft,pixelsFromTop);
    ctx.strokeText(document.getElementById(fromInputBox).value,pixelsFromLeft,pixelsFromTop);
};


