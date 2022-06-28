var DynaCodeVersion = 31;
var bgImage
var bgReady
var canvas
var ctx
var mousePos = {};
var font12Hel = "12px Helvetica"
var fontLeft = "left"
var colorTan = "#EFDFB0"
var colorTeal = "#00eeee"
var colorPurple = "#bb88ee"


var heeroReady = false;
var heeroImage = new Image();
heeroImage.onload = function () {heeroReady = true};
heeroImage.src = "https://www.gilgamech.com/images/heero.png";
var theThingLastClicked = heeroImage;

var demonReady = false;
var demonImage = new Image();
demonImage.onload = function () {demonReady = true};
demonImage.src = "https://www.gilgamech.com/images/demon.png";

beaverDams = [ 
{ "x": 22, "y": 68.5 }, { "x": 41.6, "y": 68.5 }, { "x": 54.5, "y": 29.5 }, { "x": 82.7, "y": 59.1 }, { "x": 48.5, "y": 63.8 }, { "x": 74, "y": 40.5 } 
] 
underseaCaves = [ 
{ "x": 10.1, "y": 21.7 }, { "x": 10.4, "y": 39.9 }, { "x": 8.2, "y": 90.1 }, { "x": 15.9, "y": 10.4 }, { "x": 50.1, "y": 11.0 }, { "x": 83.3, "y": 10.2 }, { "x": 36.2, "y": 91.1 }, { "x": 52.8, "y": 91.8 }, { "x": 87.3, "y": 90.2 }, { "x": 90.9, "y": 13.5, }, { "x": 90.1, "y": 36.3 }, { "x": 90.7, "y": 71.5 } 
] 

addEventListener('mousemove', function(evt) {mousePos = getMousePos(canvas, evt)}, false);

function displayImage(imageReady,imageObj,boxX,boxY) {
	if (imageReady) {
		if ((boxX) && (boxY)) {
			ctx.drawImage(imageObj,boxX,boxY); 
		} else {
			var ImageRatio = imageObj.width / imageObj.height;
			canvas.height = canvas.width * ImageRatio
			ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, // source rectangle
										0, 0, canvas.width, canvas.height); // destination rectangle
		}
	}
}

function addDot(boxX,boxY,BGColor) {
    ctx.fillStyle = BGColor; 
	ctx.fillRect(boxX*Math.round(canvas.width/100),boxY*Math.round(canvas.width/100),10,10);
}

function addMenu(text,boxX,boxY,font,textAlign,BGColor) {
	ctx.font = font;
	ctx.textAlign = textAlign;
	var width = (ctx.measureText(text).width);
    ctx.fillStyle = BGColor; 
	ctx.fillRect(boxX,boxY,width,25);
    ctx.fillStyle = "#000000"; // black
	ctx.fillText(text,boxX,boxY);	
}

// Get mouse position
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function getMouseLoc(canvas, evt) {
	// If the mouse is too close to the right edge, flip the text the other way.
	if ((mousePos.x + TextWidthMax) > canvas.width) {
	  ctx.textAlign = "right";
		ctx.fillRect((mousePos.x-9-(TextWidthMax)), (mousePos.y+15), (TextWidthMax + 5),TextBoxHeight);
	  } else {
		ctx.fillRect((mousePos.x-9), (mousePos.y+15), (TextWidthMax + 5),62);
	}; // end if mousePos

	if ((mousePos.y + TextBoxHeight) > canvas.height) {
		// ctx.fillRect((mousePos.x-9-(TextWidthMax)), (mousePos.y-47), (TextWidthMax + 5),62)
	  } else {
		// ctx.fillRect((mousePos.x-9), (mousePos.y+15), (TextWidthMax + 5),62)
	}; // end if mousePos
}

// Game loop
var main = function () {
  var now = Date.now();
  var delta = now - then;

	displayImage(bgReady,bgImage);
	ctx.textBaseline = "top";

	// Set up mouseover 
	var CursorText = "Mouseover for tribe data."
	var CursorText2 = "Lat: " + (Math.round((mousePos.y*100/canvas.height)*10)/10) + " Long: " + (Math.round((mousePos.x*100/canvas.width)*10)/10);
	var CursorText3 = ""
	var CursorText4 = ""

	var mouseover = 0
	var TextWidthMax = 0
	var TextBoxHeight = 62
	var ADPPlayerCount = 0;
	
	// Set up top menus
	var current_info_box_X = 30;
	var current_info_box_Y = 30;
	addMenu("testhost",current_info_box_X,current_info_box_Y,font12Hel,fontLeft,colorTan);
    addMenu("Tribes Online",current_info_box_X,current_info_box_Y + 20,font12Hel,fontLeft,colorTan);
	addMenu("Current Players",current_info_box_X,current_info_box_Y + 40,font12Hel,fontLeft,colorTan);
	addMenu("Seen Players (Coming Soon)",current_info_box_X,current_info_box_Y + 60,font12Hel,fontLeft,colorTan);

	//Draw mouse.
	addMenu(CursorText, (mousePos.x-6), (mousePos.y+16),"22px Helvetica",fontLeft,colorTan); 	
	addMenu(CursorText2, (mousePos.x-6), (mousePos.y+38),font12Hel,fontLeft,colorTan); 
	addMenu(CursorText3, (mousePos.x-6), (mousePos.y+50),font12Hel,fontLeft,colorTan); 
	addMenu(CursorText4, (mousePos.x-6), (mousePos.y+62),font12Hel,fontLeft,colorTan); 
	 
	displayImage(heeroReady, theThingLastClicked,(mousePos.x-theThingLastClicked.width), (mousePos.y-theThingLastClicked.height))
	for (dam in beaverDams) {
		addDot(beaverDams[dam].x,beaverDams[dam].y,colorPurple); 
	}
	for (dam in underseaCaves) {
		addDot(underseaCaves[dam].x,underseaCaves[dam].y,colorTeal); 
	}
	
  then = now;
}; //end main

//Play!
var then = Date.now();
setInterval(main, 50); //function, milliseconds between execution - higher number is more responsive and also more CPU use. 
