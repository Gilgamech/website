//Archive

var $WebcoifVer = 400;
var website;
var $cachingVar;
var pageSettingsJson;
var $timerInterval;

//buildElementRow('advancedPageDiv',$GilMain,'',getKeys($GilMain),'delPage');
function rebuildElement(elementId) {
	var oldElement = document.getElementById(elementId);
	var newElement = {};
	newElement.elements = [];
	newElement.elements[0] = {};
	newElement.elements[0].id = elementId
	if (oldElement.parentNode.id) {newElement.elements[0].elementParent = oldElement.parentNode.id}else(newElement.elements[0].elementParent = "body");
	if (oldElement.type) {newElement.elements[0].elementType = oldElement.type};
	if (oldElement.class) {newElement.elements[0].elementClass = oldElement.class};
	//if (oldElement.style) {newElement.elements[0].elementStyle = oldElement.style};
	//if (oldElement.href) {newElement.elements[0].href = oldElement.href};
	//if (oldElement.onchange) {newElement.elements[0].onChange = oldElement.onchange};
	//if (oldElement.onclick) {newElement.elements[0].onClick = oldElement.onclick};
	//if (oldElement.contentEditable) {newElement.elements[0].contentEditable = oldElement.contentEditable};

	console.log(JSON.stringify(newElement));
	removeElement(elementId)
	//cje(oldElement.parentNode,newElement);
	cje(newElement.elements[0].elementParent,newElement);
}

function addMenuItem(elementParent,innerText,onClick,$class,href) {
	var innerParent = getBadPW();
	var parentType = getElementType(elementParent);
	var elementType = "li"
	
	if (elementParent == 'Div') {
		elementType = "p"
	} else if (elementParent == 'UList') {
		elementType = "li"
	} else {
		elementType = "li"
	}; // end if divParent
	
	var innerParent = addElement(elementParent,"",$class,elementType)
	addElement(innerParent,innerText,$class,"a","",href,"",onClick)
}; // end addMenuItem	

// Page engine
function rbp(pageName) {
	try {
		removeElement("headWrapper");
		removeElement("NavDDWrapper");
		removeElement("bodyWrapper");
		removeElement("footWrapper");
		window.clearInterval($timerInterval);
		
		cje("body",website.wrapperVar);
		cje("footWrapper",website.pages.footer);
		
		if (website.pages[pageName]) {
			cje("bodyWrapper",website.pages[pageName]);
		} else {
			// Simple 404 page.
			cje("bodyWrapper",{elements:[{elementParent:"parentElement",innerText:"404 page not found"}]})
		}; // end if GilJSVersion

	} catch(e){
		console.log("webCoifErr: Err in rbp: " + e);
		//console.log("webCoifErr: Err in rbp: " + e);
	};
}; // end rbp

function rwjs3(jsonVar) {
	var $stringVar = JSON.stringify(jsonVar);
	var $gilThis = new RegExp("[$]_.", 'g');
	$stringVar = $stringVar.replace($gilThis,"website.");
	jsonVar = JSON.parse($stringVar);
	return jsonVar;
}; // end cje

function rwjs(jsonVar) {
	if (jsonVar) {
		try {
	var $stringVar = JSON.stringify(jsonVar);
	var $listVar = $stringVar.replace(/[^0-9A-Za-z\.\$\_\[\]]+/gi, " ").replace(/\s\s+/g, ' ').split(" ").filter( onlyUnique );
	$listVar.forEach(function($twoString){
		$twoString.replace(/\s\s+/g,' ').split(" ").forEach(function($eachString){
			if ($eachString.startsWith("website.")) {
				var $rgxVar = new RegExp("\\" + $eachString,'g');
				var $replace = eval($eachString);
				$stringVar = $stringVar.replace($rgxVar,$replace);
			}; //end if eachString
		}); // end foreach twoString
	}); // end foreach listVar
		
	jsonVar = JSON.parse($stringVar);
	return jsonVar;
		} catch(e) { 
			console.log("webCoifErr: Err in rwjs: " + e);
		}; // end try
	}; // end if jsonVar
}; // end rwjs

window.onload = function(){
	pageSettingsJson = readElement("pageSettingsJson")
	xhrRequest("GET",pageSettingsJson,function(response) {
		removeElement("deleteme");
		website = rwjs3(response);
		var $Gil2 = rwjs(rwjs(website));
		if ($Gil2) {website = $Gil2}
		cje("head",website.pages.header);
		cje("body",website.pages.nav);
		rbp(website.startingPage);
	},"JSON"); // end xhrRequest
}; // end window.onload

//History handler
/*
var sparationalHistory = [];
var sparationalHistoryLoc = 0;
window.onpopstate = function() {
	backButton();
}; history.pushState({}, '');

function forwardNavigation(path) {
	sparationalHistoryLoc++;
	sparationalHistory[sparationalHistoryLoc] = path;
	buildPage(sparationalHistory[sparationalHistoryLoc])
	console.log("regular navigation - loc: "+sparationalHistoryLoc+" - page "+sparationalHistory[sparationalHistoryLoc])
}

function backButton() {
	sparationalHistoryLoc--;
	buildPage(sparationalHistory[sparationalHistoryLoc])
	console.log("back button - loc: "+sparationalHistoryLoc+" - page "+sparationalHistory[sparationalHistoryLoc])
}

function forwardButton() {
	sparationalHistoryLoc++;
	buildPage(sparationalHistory[sparationalHistoryLoc])
	console.log("forward button - loc: "+sparationalHistoryLoc+" - page "+sparationalHistory[sparationalHistoryLoc])
}
*/

//region Enkida
// wait on voices to be loaded before fetching list
window.speechSynthesis.onvoiceschanged = function() {
    // console.log(window.speechSynthesis.getVoices());
};

function SayThis(saythis) {
	var msg = new SpeechSynthesisUtterance();
	var voices = window.speechSynthesis.getVoices();
	
	msg.voice = voices[1]; // Note: some voices don't support altering params
	msg.voiceURI = 'native';
	msg.volume = 1; // 0 to 1
	msg.rate = 1; // 0.1 to 10
	msg.pitch = 0.5; //0 to 2
	msg.text = saythis;
	msg.lang = 'en-US';
	
	// console.log(msg);
	// console.log(speechSynthesis);
	// console.log(window.speechSynthesis.getVoices());
	// console.log(speechSynthesis.getVoices());
	// console.log(getVoices());
	speechSynthesis.speak(msg)
};

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

//Rowboat Cipher
function getRowboats(text="Mozilla/5.0(Windows NT 10.0; Win64; x64) AppleWebKit/537.36(KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36") {
	var now = new Date();//now.toISOString()
	var chunks = [];
	var plainText = ["Welcome to Rowboats.txt. Please be careful of","the swimmers, and have a great day.","o,\to__ -~-~ o_/| o_.\t-~-~ o,\to__ -~-~"]
	var encText = [text,"hi there","three","four","five","six"]
	
	var out = plainText[0]+"\n";
	out += plainText[1]+"\n";
	out += getRowboat(getStringNums(encText[0]))+"\n";
	out += getRowboat(getStringNums(encText[1]))+"\n";
	out += "\t\tc <\to\to\to\to\t\t\t " +getRowboat(getStringNums(encText[2]))+"\n";
	out += "\t /\\/ /\\/) /\\/) /\\/) /\\/)\t\t" +getRowboat(getStringNums(encText[3]))+"\n";
	out += "\t__/_____/__/_/__/_/__/_/__/______\n";
	out += "-~-~ '-----/----/----/----/-------' \n";
	out += getRowboat(getStringNums(encText[4]))+"\n";
	out += plainText[2]+"\n";
	out += getRowboat(getStringNums(encText[5]))+"\n";
	return out;
}

function getStringNums(txt) {
	txt = txt.toString().toUpperCase().replace(/ /g,"").replace(/\//g,"").replace(/\(/g,"").replace(/\)/g,"").replace(/,/g,"").replace(/\./g,"").replace(/\;/g,"");
	txt = txt.toString().toUpperCase().replace(/1/g,"").replace(/2/g,"").replace(/3/g,"").replace(/4/g,"").replace(/5/g,"").replace(/6/g,"").replace(/7/g,"").replace(/8/g,"").replace(/9/g,"").replace(/0/g,"");
	var out = "";
	for (i=0;i<txt.length;i++){
		var location = findRowbet(txt.substring(i,i+1,Rowbet));
		out += location.col;
		out += location.row;
	}
	return out;
}

var Rowbet = [ ["A","B","C","D","E"],["F","G","H","I","J"],["K","L","M","N","O"],["P","Z","R","S","T"],["U","V","W","X","Y"] ];

function findRowbet(letter,rowBet=Rowbet) {
	letter = letter.toUpperCase();
	out = {};
	if (letter=="Q") {
		out.col = 1;
		out.row = 3;
		return out
	} else {
		for (let i = 0; i < rowBet.length; i++) {
			out.col = rowBet[i].indexOf(letter);
			if (out.col >-1) {
				out.row = i;
				return out;
			}
		}
	}
}

var r0 = '  '
var r1 = '~~'
var r2 = '..'
var r3 = '--'
var r4 = ',,'

function getRowboat(txt) {
	txt = txt.replace(/0/g,r0);
	txt = txt.replace(/1/g,r1);
	txt = txt.replace(/2/g,r2);
	txt = txt.replace(/3/g,r3);
	txt = txt.replace(/4/g,r4);
	return txt;
}

function revertRowboat(txt) {
	var regex = new RegExp(r0,"g");
	txt = txt.replace(regex,0);
	var regex = new RegExp(r1,"g");
	txt = txt.replace(regex,1);
	var regex = new RegExp(/\.\./,"g");
	txt = txt.replace(regex,2);
	var regex = new RegExp(r3,"g");
	txt = txt.replace(regex,3);
	var regex = new RegExp(r4,"g");
	txt = txt.replace(regex,4);
	return txt;
}

function revertRowbet(col,row,rowBet=Rowbet) {
	return rowBet[row][col]
}

//Depreciation
function getNumberFromDiv($numericDiv) {
	return Math.round(
		readElement($numericDiv) *1
	)
};

function s3FileUpload($siteName,$fileDiv) { 
var $file = document.getElementById($fileDiv).files[0]; 
webRequest('POST','/s3url?siteName='+$siteName+'&fileName='+$file.name+'&contentType='+$file.type,function(key){ webRequest('PUT',key,function(e){ writeElement('errDiv',e) },'',$file )},'JSON') }; 

function parseHtml($inputId,$outputId) {
	try {
	var $inputToEval = readElement($inputId);
	$inputToEval += '"}]}';
	var jsonOutput = $inputToEval
	.replace(/\<\/div\>/g,'"')
	.replace(/\<\/a\>/g,'')
	.replace(/\<\/li\>/g,'"')
	.replace(/\<\/ul\>/g,'"')
	.replace(/\<\/span\>/g,'"')
	.replace(/\<\/h1\>/g,'"')
	.replace(/\<\/h3\>/g,'"')
	.replace(/\<\/p\>/g,'"')
	.replace(/\<\/table\>/g,'')
	.replace(/\<\/tbody\>/g,'')
	.replace(/\<\/td\>/g,'')
	.replace(/\<\/tr\>/g,'')
	.replace(/\<\/th\>/g,'')
	.replace(/\<\/code\>/g,'')
	.replace(/div/g,'')
	.replace(/&nbsp;/g,'')
	.replace(/\<td/g,'td","')
	.replace(/\<tr/g,'tr","')
	.replace(/\<th/g,'th","')
	.replace(/\<table/g,'table","')
	.replace(/\<p/g,'{"elementParent": "parentElement","elementType="p","')
	.replace(/\</g,'"},{"elementParent": "parentElement","elementType=')
	.replace(/"},{"/,'{"pageName":"blank", "pageTitle":"blank", "pageDesc":"This page is for blank\'ing.", "onload":""","elements":[{"')
	.replace(/\>/g,'","innerText"="')
	.replace(/class/g,'","elementClass')
	.replace(/="/g,'=')
	.replace(/=/g,'":"')
	.replace(/"":""/g,'":"')
	.replace(/"":"/g,'":"')
	.replace(/,\"elementType\"\:\" \"/g,'')
	.replace(/"","/g,'","')
	.replace(/" ","/g,'","')
	.replace(/",","/g,'","')
	.replace(/"\/"/g,'"\\/"')
	.replace(/img src/g,'img","href')
	.replace(/a href/g,'a","href')
	.replace(/font face/g,'font","face')
	.replace(/style type/g,'style","type')
	.replace(/body bgcolor/g,'body","bgcolor')
	.replace(/href/g,',"href')
	.replace(/"elementType":" align":"center"/g,'"align":"center"')
	.replace(/" cell/g,'","cell')
	.replace(/" border/g,'","border')
	.replace(/" width/g,'","width"')
	.replace(/  text":"/g,',"innerText":"')
	.replace(/  link":"/g,',"link":"')
	.replace(/  hlink":"/g,',"hlink":"')
	.replace(/width""/g,'width"')
	.replace(/" size/g,'","size')
	.replace(/a type/g,'a","type')
	.replace(/" " "/g,'""')
	.replace(/,"innerText":" "/g,'')
	.replace(/,"innerText":""/g,'')
	.replace(/" "}/g,'"}')
	.replace(/""}/g,'"}')
	.replace(/"" "/g,'"')
	.replace(/" " }]/g,'"}]}')
	.replace(/\n/g,'')
	.replace(/\r/g,'')
	.replace(/\t/g,'')
	.replace(/"{/g,'"},{')
	.replace(/""},{/g,'"},{')
	.replace(/"  {/g,'"},{')
	.replace(/"  "},{/g,'"},{')
	.replace(/","innerText":}/g,'"}')
	.replace(/","innerText":"}/g,'"}')
	.replace(/","innerText":"    {/g,'"},{')
	.replace(/",","/g,'","')
	writeElement($outputId,jsonOutput);
	prettyPrint($outputId);
	} catch(e){writeElement("errDiv",e);}
}; // end parseHtml

function copyToClipboard(text) {
    Copied = text.createRange();
    Copied.execCommand("Copy");
}; // end copyToClipboard

function prettyPrint(divName) {
	try {
		writeElement(divName,JSON.stringify(JSON.parse(readElement(divName))).replace(/"},{"/g,'"},\n{"').replace(/","/g,'",\n"').replace(/{"/g,'{\n"').replace(/"}/g,'"\n}'));
		writeElement("errDiv","")
	} catch($err) {
		$errLoc = $err.message.split("in JSON at position ")[1];
		colorifyDiv("errDiv",readElement("jmlTextArea")[$errLoc],"red");
		appendElement("errDiv",$err+" - Text: "+findJSONErr($errLoc))
	};
}

function prettyCode(divName) {
	try {
		writeElement(divName,(readElement(divName)).replace(/"},{"/g,'"},\n{"').replace(/","/g,'",\n"').replace(/{"/g,'{\n"').replace(/"}/g,'"\n}').replace(/;/g,';\n'));
		writeElement("errDiv","")
	} catch($err) {
		$errLoc = $err.message.split("in JSON at position ")[1];
		colorifyDiv("errDiv",readElement("jmlTextArea")[$errLoc],"red");
		appendElement("errDiv",$err+" - Text: "+findJSONErr($errLoc))
	};
}

function findJSONErr($errLoc){
	var $outStr="";var $s = readElement('jmlTextArea');for ($u=$errLoc-25;$u<($errLoc*1+25);$u++){$outStr +=$s.charAt($u)};return $outStr
};

function parseJupyter($cell) {
	var $out
				console.log($cell);
	var $stringVar = JSON.stringify($cell);
				console.log($stringVar);
	$stringVar = $stringVar.replace(/\["/g,'');
	$stringVar = $stringVar.replace(/"\]/g,'');
				console.log($stringVar);
	
	if ($stringVar.indexOf('#### ') > -1 ) {
		$stringVar = $stringVar.replace(/#/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"h4"}]}
	} else if ($stringVar.indexOf('### ') > -1 ) {
		$stringVar = $stringVar.replace(/#/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"h3"}]}
	} else if ($stringVar.indexOf('## ') > -1 ) {
		$stringVar = $stringVar.replace(/#/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"h2"}]}
	} else if ($stringVar.indexOf('# ') > -1 ) {
		$stringVar = $stringVar.replace(/#/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"h1"}]}
	} else if ($stringVar.indexOf('\**') > -1 ) {
		$stringVar = $stringVar.replace(/\**/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"strong"}]}
	} else if ($stringVar.indexOf('__') > -1 ) {
		$stringVar = $stringVar.replace(/__/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"strong"}]}
	} else if ($stringVar.indexOf('\*') > -1 ) {
		$stringVar = $stringVar.replace(/\*/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"em"}]}
	} else if ($stringVar.indexOf('_') > -1 ) {
		$stringVar = $stringVar.replace(/_/g,'');
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar,"elementType":"em"}]}
	} else {
		$out = {"elements":[{"elementParent":"body","innerText":$stringVar}]}
	}; // end if cell
			console.log($out);
	return $out;
}; 

function parseJupyter2($cell) {
			$stringVar = $stringVar.replace('# ','"          "elementType": "p",');
		$stringVar = $stringVar + '</h1>"';
		$cell = JSON.parse($stringVar);
		return $cell;
}; 

function rebuildElement(elementId) {
	var oldElement = document.getElementById(elementId);
	var newElement = {};
	newElement.elements = [];
	newElement.elements[0] = {
		};
	newElement.elements[0].id = elementId;
	if (oldElement.parentNode.id) {
		newElement.elements[0].elementParent = oldElement.parentNode.id}else(newElement.elements[0].elementParent = 'body');
	if (oldElement.type) {
		newElement.elements[0].elementType = oldElement.type
	};
	if (oldElement.class) {
		newElement.elements[0].elementClass = oldElement.class
	};
	console.log(JSON.stringify(newElement));
	removeElement(elementId);
	cje(newElement.elements[0].elementParent,newElement);
};

function addMenuItem(elementParent,innerText,onclick,$class,href) {
	var innerParent = getBadPW();
	var parentType = getElementType(elementParent);
	var elementType = 'li';
	if (elementParent == 'Div') {
		elementType = 'p'
		} else if (elementParent == 'UList') {
		elementType = 'li'} else {
		elementType = 'li'
	};
	var innerParent = addElement(elementParent,'',$class,elementType);
	addElement(innerParent,innerText,$class,'a','',href,'',onclick)
};

function rwjs3(jsonVar) {
	var $stringVar = JSON.stringify(jsonVar);
	var $gilThis = new RegExp('[$]_.', 'g');
	$stringVar = $stringVar.replace($gilThis,'$spaRationalMain.');
	jsonVar = JSON.parse($stringVar);
	return jsonVar;
};

function rwjs(jsonVar) {
	if (jsonVar) {
		try {
			var $stringVar = JSON.stringify(jsonVar);
			var $listVar = $stringVar.replace(/[^0-9A-Za-z\.\$\_\[\]]+/gi, ' ').replace(/\s\s+/g, ' ').split(' ').filter( onlyUnique );
			$listVar.forEach(function($twoString){
				$twoString.replace(/\s\s+/g,' ').split(' ').forEach(function($eachString){
					if ($eachString.startsWith('$spaRationalMain.')) {
						var $rgxVar = new RegExp('\\' + $eachString,'g');
						var $replace = eval($eachString);
						$stringVar = $stringVar.replace($rgxVar,$replace);
					};
				});
			});
			jsonVar = JSON.parse($stringVar);
			return jsonVar;
		} catch(e) {
			addElement('errDiv','Err in rwjs: ' + e);
		};
	};
};

window.onload =function(){
	removeElement('deleteme');
	if (pageSettingsJson != ''){
		$spaRationalMain = rwjs3(JSON.parse(pageSettingsJson));
		var $spa2 = rwjs(rwjs($spaRationalMain));
		if ($spa2) {
			$spaRationalMain = $spa2;
		};
	};
	cje('head',$spaRationalMain.pages[6].elements.header);
	cje('body',$spaRationalMain.pages[7].elements.nav);
	getKeys($spaRationalMain.pages).forEach(function(element){
		if ($spaRationalMain.pages[element].pageTitle) {
			addMenuItem('nav2ddc',$spaRationalMain.pages[element].pageTitle,'rbp(' + element + ');',$spaRationalMain.pages[element].elementClass,$spaRationalMain.pages[element].href);
		};
	});
	rbp($spaRationalMain.pages.find(pageName => pageName=$spaRationalMain.startingpage));
};

function appendElement(elementId,source) {
	writeElement(elementId,readElement(elementId) + source)
};

function overlayOn(divId) {
  document.getElementById(divId).style.display = "block";
}

function overlayOff(divId) {
  document.getElementById(divId).style.display = "none";
}



