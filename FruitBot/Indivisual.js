var DynaCodeVersion = 67;
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

var isInItemIndex = 0
var itemIndex = 2
var dragging
var blankImg = new Image();
var imagesToDisplay = [];

var heeroReady = false;
var heeroImage = new Image();
heeroImage.onload = function () {heeroReady = true};
heeroImage.src = "https://www.gilgamech.com/images/heero.png";

var demonReady = false;
var demonImage = new Image();
demonImage.onload = function () {demonReady = true};
demonImage.src = "https://www.gilgamech.com/images/demon.png";

var theThingLastClicked = blankImg;

addEventListener('mousemove', function(evt) {mousePos = getMousePos(canvas, evt)}, false);
var underseaCaves = [ 
{ "x": 10.1, "y": 21.7 }, { "x": 10.4, "y": 39.9 }, { "x": 8.2, "y": 90.1 }, { "x": 15.9, "y": 10.4 }, { "x": 50.1, "y": 11.0 }, { "x": 83.3, "y": 10.2 }, { "x": 36.2, "y": 91.1 }, { "x": 52.8, "y": 91.8 }, { "x": 87.3, "y": 90.2 }, { "x": 90.9, "y": 13.5, }, { "x": 90.1, "y": 36.3 }, { "x": 90.7, "y": 71.5 } 
] 

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

function addMenu(text,boxX,boxY,font,textAlign,BGColor,boxWidth) {
	ctx.font = font;
	ctx.textAlign = textAlign;
    ctx.fillStyle = BGColor; 
	if (boxWidth) {
		width = Math.max(ctx.measureText(text).width,boxWidth);
	} else {
		width = ctx.measureText(text).width
	}
	ctx.fillRect(boxX,boxY,width,ctx.font.split("px ")[0]*1+5);
    ctx.fillStyle = "#000000"; // black
	ctx.fillText(text,boxX,boxY+ctx.font.split("px ")[0]*1);	
}

function dragClickDrop() {
	
	if (dragging == 1) {
		dragging = 0
		
		if (theThingLastClicked == heeroImage) {
			imagesToDisplay[itemIndex] = {"image":heeroImage,"imgX":mousePos.x, "imgY":mousePos.y}
		} else if (theThingLastClicked == demonImage) {
			imagesToDisplay[itemIndex] = {"image":demonImage,"imgX":mousePos.x,"imgY":mousePos.y}
		} else if (isInItemIndex < 0) {
			imagesToDisplay[isInItemIndex].imgX = mousePos.x;
			imagesToDisplay[isInItemIndex].imgY = mousePos.y;
			
		} else {
			
		}
		itemIndex++;
		isInItemIndex = 0;
		theThingLastClicked = blankImg;
		
	} else {
			theThingLastClicked = blankImg;
		
			for (dam in imagesToDisplay) {
				if (imagesToDisplay[dam].imgX-imagesToDisplay[dam].image.width < mousePos.x && mousePos.x < imagesToDisplay[dam].imgX + imagesToDisplay[dam].image.width && imagesToDisplay[dam].imgY-imagesToDisplay[dam].image.height < mousePos.y && mousePos.y < imagesToDisplay[dam].imgY+imagesToDisplay[dam].image.height) {
					dragging = 1
					theThingLastClicked = imagesToDisplay[dam].image;
					isInItemIndex = dam
					delete imagesToDisplay[dam];
				}
			}
			
		
	}
	console.log(mousePos)
	console.log(dragging)
	console.log(theThingLastClicked)
	console.log(itemIndex)
}

// Get mouse position
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function mouseOver(text,mouseX,mouseY) {
	ctx.font = "22px Helvetica";
	var TextBoxHeight = 62
	var TextWidthMax = ctx.measureText(text[0]).width;
	ctx.font = font12Hel;
	TextWidthMax = Math.max(TextWidthMax,Math.max(ctx.measureText(text[1]).width,Math.max(ctx.measureText(text[2]).width,ctx.measureText(text[3]).width)));
	var textAlign = fontLeft;
	// If the mouse is too close to the right edge, flip the text the other way.

	if ((mouseX + TextWidthMax) > canvas.width) {
		textAlign = "right";
		mouseX = mouseX - 6 - TextWidthMax
	  } else {
		textAlign = fontLeft;
		mouseX = mouseX - 6
	}; // end if mousePos

	if ((mouseY + TextBoxHeight) > canvas.height) {
		mouseY = mouseY - 16 - TextBoxHeight
	  } else {
		mouseY = mouseY + 16
	}; // end if mousePos
	
	addMenu(text[0], mouseX, mouseY,"22px Helvetica",fontLeft,colorTan,TextWidthMax); 	
	addMenu(text[1], mouseX, mouseY+24,font12Hel,fontLeft,colorTan,TextWidthMax); 
	addMenu(text[2], mouseX, mouseY+40,font12Hel,fontLeft,colorTan,TextWidthMax); 
	addMenu(text[3], mouseX, mouseY+56,font12Hel,fontLeft,colorTan,TextWidthMax); 
	
}

// Game loop
var main = function () {
  var now = Date.now();
  var delta = now - then;

	displayImage(bgReady,bgImage);

	// Set up mouseover 
	var CursorText = [];
	CursorText[0] = "Mouseover for tribe data.";
	CursorText[1] = "Lat: " + (Math.round((mousePos.y*100/canvas.height)*10)/10) + " Long: " + (Math.round((mousePos.x*100/canvas.width)*10)/10);
	CursorText[2] = ""
	CursorText[3] = ""
	
	if (dragging == 1) {
		CursorText[0] = theThingLastClicked.src.split("/")[6];
		CursorText[2] = "Length: " + (Math.round((theThingLastClicked.width*100/canvas.width)*10)/10) + " Heigh: " + (Math.round((theThingLastClicked.height*100/canvas.height)*10)/10);
	}
	
	// Set up top menus
	var menuText = [];
	menuText[0] = "testhost";
	menuText[1] = "Tribes Online";
	menuText[2] = "Current Players";
	menuText[3] = "Seen Players (Coming Soon)";

	mouseOver(menuText,30,30);
	mouseOver(CursorText,mousePos.x,mousePos.y);	 

	displayImage("true", theThingLastClicked,mousePos.x-theThingLastClicked.width,mousePos.y-theThingLastClicked.height);	 

	imagesToDisplay[0] = {"image":heeroImage,"imgX":100, "imgY":200}
	imagesToDisplay[1] = {"image":demonImage,"imgX":100,"imgY":300}

	for (dam in underseaCaves) {
		addDot(underseaCaves[dam].x,underseaCaves[dam].y,colorTeal); 
	}
	for (dam in imagesToDisplay) {
		if (isInItemIndex < 0) {
			imagesToDisplay[isInItemIndex].imgX = mousePos.x;
			imagesToDisplay[isInItemIndex].imgY = mousePos.y;
			
		} else {
			displayImage("true", imagesToDisplay[dam].image,imagesToDisplay[dam].imgX-imagesToDisplay[dam].image.width, imagesToDisplay[dam].imgY-imagesToDisplay[dam].image.height)
		}
	}
	
  then = now;
}; //end main

//Play!
var then = Date.now();
setInterval(main, 50); //function, milliseconds between execution - higher number is more responsive and also more CPU use. 
