//StarSpar game file.
//(c) 2019 Gilgamech Technologies
var DynaCodeVersion = 73;

//{ init
var canvas = document.getElementById('gameWindow');
canvas.width = window.innerWidth*0.9;
canvas.height = window.innerHeight*0.9;
var ctx = canvas.getContext("2d");
var mousePos = {

};
var font12Hel = "12px Helvetica";
var fontLeft = "left";
var colorTan = "#EFDFB0";

var isInItemIndex = 0;
var itemIndex = 2;
var dragging;
var blankImg = new Image();
var imagesToDisplay = [];

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
bgReady = true
};
bgImage.src = "https://www.gilgamech.com/images/background.png";

var heeroReady = false;
var heeroImage = new Image();
heeroImage.onload = function () {
heeroReady = true
};
heeroImage.src = "https://www.gilgamech.com/images/heero.png";

var demonReady = false;
var demonImage = new Image();
demonImage.onload = function () {
demonReady = true
};
demonImage.src = "https://www.gilgamech.com/images/demon.png";

var theThingLastClicked = blankImg;

addEventListener('mousemove', function(evt) {
mousePos = getMousePos(canvas, evt)
}, false);

//}

//{Functions
function displayImage(imageReady,imageObj,boxX,boxY) {
if (imageReady) {
if ((boxX) && (boxY)) {
ctx.drawImage(imageObj,boxX,boxY)
} else {
var ImageRatio = imageObj.width / imageObj.height;
//canvas.height = canvas.width * ImageRatio;
ctx.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, 0, 0, canvas.width, canvas.height);
 
}
}
};

function addDot(boxX,boxY,BGColor) {
 ctx.fillStyle = BGColor;
 ctx.fillRect(boxX*Math.round(canvas.width/100),boxY*Math.round(canvas.width/100),10,10)
};

function addMenu(text,boxX,boxY,font,textAlign,BGColor,boxWidth) {
 ctx.font = font;
 ctx.textAlign = textAlign;
 ctx.fillStyle = BGColor;
 if (boxWidth) {
 width = Math.max(ctx.measureText(text).width,boxWidth);
 
} else {
 width = ctx.measureText(text).width 
} ctx.fillRect(boxX,boxY,width,ctx.font.split("px ")[0]*1+5);
 ctx.fillStyle = "#000000";
ctx.fillText(text,boxX,boxY+ctx.font.split("px ")[0]*1)
};

function getMousePos(canvas, evt) {
 var rect = canvas.getBoundingClientRect();
 return {
 x: evt.clientX - rect.left, y: evt.clientY - rect.top 
}
};

function mouseOver(text,mouseX,mouseY) {
ctx.font = "22px Helvetica";
 var TextBoxHeight = 62;
 var TextWidthMax = ctx.measureText(text[0]).width;
 ctx.font = font12Hel;
 TextWidthMax = Math.max(TextWidthMax,Math.max(ctx.measureText(text[1]).width,Math.max(ctx.measureText(text[2]).width,ctx.measureText(text[3]).width)));
 var textAlign = fontLeft;
 if ((mouseX + TextWidthMax) > canvas.width) {
 textAlign = "right";
 mouseX = mouseX - 6 - TextWidthMax 
} else {
 textAlign = fontLeft;
 mouseX = mouseX - 6 
};
 if ((mouseY + TextBoxHeight) > canvas.height) {
 mouseY = mouseY - 16 - TextBoxHeight 
} else {
 mouseY = mouseY + 16 
};
 
addMenu(text[0], mouseX, mouseY,"22px Helvetica",fontLeft,colorTan,TextWidthMax);
 	
addMenu(text[1], mouseX, mouseY+24,font12Hel,fontLeft,colorTan,TextWidthMax);
 
addMenu(text[2], mouseX, mouseY+40,font12Hel,fontLeft,colorTan,TextWidthMax);
 
addMenu(text[3], mouseX, mouseY+56,font12Hel,fontLeft,colorTan,TextWidthMax);
 
}

function dragClickDrop() {

if (dragging == 1) {
 dragging = 0;
  if (theThingLastClicked == heeroImage) {
 imagesToDisplay[itemIndex] = {
"image":heeroImage,"imgX":mousePos.x, "imgY":mousePos.y
} 
} else if (theThingLastClicked == demonImage) {
 imagesToDisplay[itemIndex] = {
"image":demonImage,"imgX":mousePos.x,"imgY":mousePos.y
} 
} else if (isInItemIndex < 0) {
 imagesToDisplay[isInItemIndex].imgX = mousePos.x;
 imagesToDisplay[isInItemIndex].imgY = mousePos.y;
 
} itemIndex++;
 isInItemIndex = 0;
 theThingLastClicked = blankImg;
 
} else {
theThingLastClicked = blankImg;
for (dam in imagesToDisplay) {
if (imagesToDisplay[dam].imgX-imagesToDisplay[dam].image.width < mousePos.x && mousePos.x < imagesToDisplay[dam].imgX + imagesToDisplay[dam].image.width && imagesToDisplay[dam].imgY-imagesToDisplay[dam].image.height < mousePos.y && mousePos.y < imagesToDisplay[dam].imgY+imagesToDisplay[dam].image.height) {
dragging = 1;
theThingLastClicked = imagesToDisplay[dam].image;
isInItemIndex = dam;
delete imagesToDisplay[dam];

}
}
}

} 

//}

//{Main
var main = function () {

var now = Date.now();
var delta = now - then;
displayImage(bgReady,bgImage);
var CursorText = [];
CursorText[0] = "Mouseover for tribe data.";
CursorText[1] = "Lat: " + (Math.round((mousePos.y*100/canvas.height)*10)/10) + " Long: " + (Math.round((mousePos.x*100/canvas.width)*10)/10);
CursorText[2] = "";
CursorText[3] = "";
if (dragging == 1) {
CursorText[0] = theThingLastClicked.src.split("/")[6];
CursorText[2] = "Length: " + (Math.round((theThingLastClicked.width*100/canvas.width)*10)/10) + " Heigh: " + (Math.round((theThingLastClicked.height*100/canvas.height)*10)/10);

}
var menuText = [];
menuText[0] = "testhost";
menuText[1] = "Tribes Online";
menuText[2] = "Current Players";
menuText[3] = "Seen Players (Coming Soon)";
mouseOver(menuText,30,30);
mouseOver(CursorText,mousePos.x,mousePos.y);
	 
displayImage("true", theThingLastClicked,mousePos.x-theThingLastClicked.width,mousePos.y-theThingLastClicked.height);
	 
imagesToDisplay[0] = {
"image":heeroImage,"imgX":100, "imgY":200
};
imagesToDisplay[1] = {
"image":demonImage,"imgX":100,"imgY":300
};
then = now;
for (dam in imagesToDisplay) {

if (isInItemIndex < 0) {

imagesToDisplay[isInItemIndex].imgX = mousePos.x;
imagesToDisplay[isInItemIndex].imgY = mousePos.y;

} else {

displayImage("true", imagesToDisplay[dam].image,imagesToDisplay[dam].imgX-imagesToDisplay[dam].image.width, imagesToDisplay[dam].imgY-imagesToDisplay[dam].image.height)

}
}
};
 
//}

//{Run
var then = Date.now();
setInterval(main, 50);
 
//}


