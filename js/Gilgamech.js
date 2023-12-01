//Copyright 2013-2023 Gilgamech Technologies
//Gilgamech.js v4.0 
//Author: Stephen Gillie
//Created on: ???
//Last updated: 12/1/2023
//Notes:
//Version history:
//4.0 - Let's get this party restarted.


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


//Text tools
function colorifyWords(divid, replaceWord, replaceClass) {
	var replaceRegex = new RegExp(replaceWord, "g");
	replaceWord = replaceWord.replace("\\","")
	var str = getElement(divid).innerHTML;
	str = str.replace(replaceRegex, '<span class="' + replaceClass + '">' + replaceWord + '</span>');
	getElement(divid).innerHTML = str;
}; // end colorifyWords

function colorifyMultipleWords(divList,wordList,replaceClass){
	for (var wordName = 0;wordName<wordList.length;wordName++){
		for (var divName = 0;divName<divList.length;divName++){
			colorifyWords(divList[divName],wordList[wordName],replaceClass);
		}
	}
}

function addPopupToWord(divid, replaceWord, popupText,outputClasses) {
	var replaceRegex = new RegExp(replaceWord, "g");
	replaceWord = replaceWord.replace(/\\/g,"")
	var str = getElement(divid).innerHTML;
	str = str.replace(replaceRegex, '<span class="popup '+outputClasses+'">' + replaceWord + '<span>' + popupText + '</span></span>');
	getElement(divid).innerHTML = str;
}; // end addPopupToWord

function addLinkToWord(divid, replaceWord, URI) {
	var replaceRegex = new RegExp(replaceWord, "g");
	replaceWord = replaceWord.replaceAll("\\","")
	var str = getElement(divid).innerHTML;
	str = str.replace(replaceRegex, '<a href="'+URI+'">' + replaceWord + '</a>');
	getElement(divid).innerHTML = str;
}; // end addLinkToWord

//[["innerText","elementType","elementId","Url"]]
function addList(parentElement,inputArray,titleText,titleClass) {
	addElement(parentElement,titleText,titleClass)
	for (var i = 0; i < inputArray.length; i++) {
		addElement(parentElement,inputArray[i][0],"",inputArray[i][1],"",inputArray[i][3],"","","","","",inputArray[i][2]);
	}
}

function addBlogPost(parentElement,dateText,dateLink,inputArray) {
	let innerElement = dateLink.replace("#","")
	addElement(parentElement,"","textBubbleBG","","","","","","","","",innerElement)
	addList(innerElement,inputArray,"","");
	addLinkToWord(parentElement,dateText,dateLink)
	addElement(parentElement,"","","br")
	addElement(parentElement,"","","br")
}

//Form building tools
//addInputField(parentElement,preInput,Input,PostInput,onChange,varName){
function addInputField(parentElement,preInput,Input,PostInput,onChange,varName,fieldType="input"){
	addElement(parentElement,preInput+": ","","span")
	addElement(parentElement,Input,"",fieldType,"","",onChange,"","","value",Input,varName)
	addElement(parentElement,PostInput,"","span")
	addElement(parentElement,"","","br")
}

function textToNumNotation($inputObject) {
	if (typeof $inputObject == "string") {
		$inputObject = $inputObject.replace(/,/g,"");
		if ($inputObject.substring($inputObject.length -1,$inputObject.length) == "k") {
			$inputObject = $inputObject.replace(/k/g," thousand");
		}
		if ($inputObject.substring($inputObject.length -2,2) == "bn") {
			$inputObject = $inputObject.replace(/bn/g," billion");
		}
		var $splitObject = $inputObject.split(" ");
		var $value = $splitObject[0]
		var $significand = $splitObject[1]
		switch ($significand){
			case "decillion":
				$significand = $decillion;
				break;
			case "nonillion":
				$significand = $nonillion;
				break;
			case "octillion":
				$significand = $octillion;
				break;
			case "septillion":
				$significand = $septillion;
				break;
			case "sixtillion":
				$significand = $sixtillion;
				break;
			case "quintillion":
				$significand = $quintillion;
				break;
			case "quadrillion":
				$significand = $quadrillion;
				break;
			case "trillion":
				$significand = $trillion;
				break;
			case "billion":
				$significand = $billion;
				break;
			case "million":
				$significand = $million;
				break;
			case "thousand":
				$significand = $thousand;
				break;
			default:
				$significand = 1;
				break;
		}
		$outputItem = $value * $significand;
		return $outputItem;
	} else if (typeof $inputObject == "number") {
		return $inputObject;
	} else {
		return $inputObject;
	}
}

function numToTextNotation($inputObject,round) {
	var $significand = ""
	var $outVal2
	if (typeof $inputObject == "string") {
		$inputObject = $inputObject.replace(/,/g,"") *1;
	}
	if ($inputObject >= $decillion){
		$outVal2 = getRoundedNumber($inputObject/$decillion,round);
		$significand = " decillion";
	}else if ($inputObject >= $nonillion){
		$outVal2 = getRoundedNumber($inputObject/$nonillion,round);
		$significand = " nonillion";
	}else if ($inputObject >= $octillion){
		$outVal2 = getRoundedNumber($inputObject/$octillion,round);
		$significand = " octillion";
	}else if ($inputObject >= $septillion){
		$outVal2 = getRoundedNumber($inputObject/$septillion,round);
		$significand = " septillion";
	}else if ($inputObject >= $sixtillion){
		$outVal2 = getRoundedNumber($inputObject/$sixtillion,round);
		$significand = " sixtillion";
	}else if ($inputObject >= $quintillion){
		$outVal2 = getRoundedNumber($inputObject/$quintillion,round);
		$significand = " quintillion";
	}else if ($inputObject >= $quadrillion){
		$outVal2 = getRoundedNumber($inputObject/$quadrillion,round);
		$significand = " quadrillion";
	}else if ($inputObject >= $trillion){
		$outVal2 = getRoundedNumber($inputObject/$trillion,round);
		$significand = " trillion";
	}else if ($inputObject >= $billion){
		$outVal2 = getRoundedNumber($inputObject/$billion,round);
		$significand = " billion";
	}else if ($inputObject >= $million){
		$outVal2 = getRoundedNumber($inputObject/$million,round);
		$significand = " million";
	}else if ($inputObject >= $thousand){
		$outVal2 = getRoundedNumber($inputObject/$thousand,round);
		$significand = "k";
	}else{
		$outVal2 = getRoundedNumber($inputObject,round);
	}
	if (isNaN($outVal2) == true) {
		$outVal2 = 0;
	}
	return $outVal2 + $significand;
}



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

