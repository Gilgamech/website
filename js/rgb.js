//<script>addPage('divid');</script>

/*	
addElement($elementParent,$innerText,$elementClass,$elementType,$elementStyle,$href,$onChange,$onClick,$contentEditable,$attributeType,$attributeAction,$elementId)
addDiv($elementClass,$elementStyle,$elementParent);
addDiv($elementId,$elementStyle,$elementParent,$innerText,$elementType,$elementClass,$attributeType,$attributeAction);
*/

function addPage($hanger) {
//addElement($elementParent,$innerText,$elementClass,$elementType,$elementStyle,$href,$onChange,$onClick,$contentEditable,$attributeType,$attributeAction,$elementId)	
	$inputStyles = "img-rounded col-md-12 col-xs-12 "

	//addElement($elementParent,$innerText,$elementClass,$elementType,$elementStyle,$href,$onChange,$onClick,$contentEditable,$attributeType,$attributeAction,$elementId)	
	addElement($hanger,"","","","container img-rounded","","","","","","","wrapper")
	addElement('wrapper',"","","","img-rounded col-md-3 hidden-xs","","","","","","","spacer")
	addElement('wrapper',"","","","img-rounded col-md-6 col-xs-12","","","","","","","RGBCalc")

	addElement('RGBCalc',"RGB Calculator","contentTitles","","","img-rounded","","","","","","RGBCalcLabel")
	addElement('RGBCalc',"","","","","","","","","","","coinArea")

	addElement('coinArea',"","","","","","","","","","","htmlColorRow")
	addElement('htmlColorRow',"",$inputStyles,"input","color: #000;","","updateRgbColor()","","","maxlength",  "7","htmlRow")

	addElement('coinArea',"","","","","","","","","","","redCRow")
	addElement('redCRow',171,$inputStyles,"input","color: #fff;","","updateRgbDivColor('redRow');","","","type","number","redRow")

	addElement('coinArea',"","","","","","","","","","","greenCRow")
	addElement('greenCRow',205,$inputStyles,"input","color: #fff;","","updateRgbDivColor('greenRow');","","","type","number","greenRow")	
	
	addElement('coinArea',"","","","","","","","","","","blueCRow")
	addElement('blueCRow',239,$inputStyles,"input","color: #fff;","","updateRgbDivColor('blueRow');","","","type","number","blueRow")
	
	updateRgbDivColor('redRow');
	updateRgbDivColor('greenRow');
	updateRgbDivColor('blueRow');
}; // end addPage

function updateRgbColor() { 
	
	$hex = hexToRgb(document.getElementById("htmlRow").value);
	document.getElementById("redRow").value = $hex.r;
	document.getElementById("greenRow").value = $hex.g;
	document.getElementById("blueRow").value = $hex.b;
	
	document.getElementById("contentLabel").style.backgroundColor
	= document.getElementById("htmlRow").value
}; // end updateRgbColor

function updateRgbDivColor($divId) { 
	var $colorRatio = .25;
	var $Color = (document.getElementById($divId).value * 1);
	if ($Color > 255) {
		document.getElementById($divId).value = 255;
		$Color = (document.getElementById($divId).value * 1);
	}; // end if Color
	$Color2 = Math.round(($Color) * $colorRatio);
	
	switch ($divId) {
		case "redRow": 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color,$Color2,$Color2
			); // end document.getElementById
		break;
		case "greenRow": 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color2,$Color,$Color2
			); // end document.getElementById
		break;
		case "blueRow": 
			document.getElementById($divId).style.backgroundColor = rgbToHex(
				$Color2,$Color2,$Color
			); // end document.getElementById
		break;
	}; // end switch divColor

    document.getElementById("htmlRow").value = rgbToHex(
		(document.getElementById("redRow").value * 1), 
		(document.getElementById("greenRow").value * 1),
		(document.getElementById("blueRow").value * 1),
	);
	
	document.getElementById("RGBCalcLabel").style.backgroundColor = document.getElementById("htmlRow").value

}; // end updateRedDivColor

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};// end componentToHex

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};// end rgbToHex

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};// end hexToRgb

/*
window.onload = function(){ 
	addHeader();
	addNav();
	addPage();
	addFooter();
}
*/
	
