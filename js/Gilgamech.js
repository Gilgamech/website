const colors = [
	"#FF0000", //red
	"#FFFFFF",//white
	"#0000FF",//blue
];

window.addEventListener("mousedown", (e) => {
	const color = colors.shift();
	var foreground = "#000000"
if (parseInt(color.substr(1,2), 16)+parseInt(color.substr(3,2), 16)+parseInt(color.substr(5,2), 16) < 500){
	foreground = "#FFFFFF"
}

 document.documentElement.style.setProperty("--highlight-color", color);
 document.documentElement.style.setProperty("--foreground-color", foreground);
 colors.push(color);
});

//Canvas
function roundRect(lineColor,x, y, w, h, radius, lineWidth, degreeRotate) {
	//https://www.scriptol.com/html5/canvas/rounded-rectangle.php
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	var r = x + w;
	var b = y + h;
	context.rotate(degreeRotate * Math.PI / 180);

	context.strokeStyle=lineColor;
	context.lineWidth=lineWidth;
	context.fillStyle = lineColor;

let rectangle = new Path2D();
	rectangle.moveTo(x+radius, y);
	rectangle.lineTo(r-radius, y);
	rectangle.quadraticCurveTo(r, y, r, y+radius);
	rectangle.lineTo(r, y+h-radius);
	rectangle.quadraticCurveTo(r, b, r-radius, b);
	rectangle.lineTo(x+radius, b);
	rectangle.quadraticCurveTo(x, b, x, b-radius);
	rectangle.lineTo(x, y+radius);
	rectangle.quadraticCurveTo(x, y, x+radius, y);
	rectangle.closePath();

// Fill path
	context.fill(rectangle, 'evenodd');
	context.stroke();
}

function drag($stage,evt) {
  // target will be the container that the event listener was added to
  if(evt.target.name == "square") {
    evt.target.x = evt.stageX - 50;
    evt.target.y = evt.stageY - 50;
  }
  else  {
    evt.target.x = evt.stageX;
    evt.target.y = evt.stageY;
  }

  // make sure to redraw the stage to show the change
  $stage.update();   
}
