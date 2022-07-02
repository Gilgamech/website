//Gilgamech.js
var lineBreak = "\n"

//{region Marked for depreciation
function getNumberFromDiv($numericDiv) {
	return Math.round(
		readElement($numericDiv) *1
	)
};

function s3FileUpload($siteName,$fileDiv) { 
var $file = document.getElementById($fileDiv).files[0]; 
xhrRequest('POST','/s3url?siteName='+$siteName+'&fileName='+$file.name+'&contentType='+$file.type,function(key){ xhrRequest('PUT',key,function(e){ writeElement('errDiv',e) },'',$file )},'JSON') }; 

function parseJupyter2($cell) {
			$stringVar = $stringVar.replace('# ','"          "elementType": "p",');
		$stringVar = $stringVar + '</h1>"';
		$cell = JSON.parse($stringVar);
		return $cell;
}; 
//}endregion

//{region Table tools
function sortAlphaTable(currentColumn,tableid) {
  var table, rows, switching, currentRow, currentCell, nextCell, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(tableid);
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the first, which contains table headers): */
    for (currentRow = 1; currentRow < (rows.length - 1); currentRow++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare, one from current row and one from the next: */
      currentCell = rows[currentRow].getElementsByTagName("td")[currentColumn];
      nextCell = rows[currentRow + 1].getElementsByTagName("td")[currentColumn];
      /* Check if the two rows should switch place, based on the direction, asc or desc: */
      if (dir == "asc") {
        if (currentCell.innerHTML.toLowerCase() > nextCell.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (currentCell.innerHTML.toLowerCase() < nextCell.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch and mark that a switch has been done: */
      rows[currentRow].parentNode.insertBefore(rows[currentRow + 1], rows[currentRow]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function sortNumTable(currentColumn,tableid) {
  var table, rows, switching, currentRow, currentCell, nextCell, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(tableid);
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the first, which contains table headers): */
    for (currentRow = 1; currentRow < (rows.length - 1); currentRow++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare, one from current row and one from the next: */
      currentCell = rows[currentRow].getElementsByTagName("td")[currentColumn];
      nextCell = rows[currentRow + 1].getElementsByTagName("td")[currentColumn];
      /* Check if the two rows should switch place, based on the direction, asc or desc: */
      if (dir == "asc") {
        if ((textToNumNotation(currentCell.innerHTML)) > (textToNumNotation(nextCell.innerHTML))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if ((textToNumNotation(currentCell.innerHTML)) < (textToNumNotation(nextCell.innerHTML))) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch and mark that a switch has been done: */
      rows[currentRow].parentNode.insertBefore(rows[currentRow + 1], rows[currentRow]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function returnAllValues(col,tableid) {
	var subtotal = [];
	var tbody = returnTablePart(tableid,'TBODY')
	
	for (var j = 0; j < tbody.children.length; j++) {
		var el = tbody.children[j];
			for (var k = 0; k < el.children.length; k++) {
				if (k == col) {
					subtotal.push(textToNumNotation(el.children[k].innerText));
				} 
			} // end for tr 
	} //end for tbody 
	return subtotal
} // end function 

function getMaxOfArray(array) {
  return Math.max.apply(Math, array);
}

function getMinOfArray(array) {
  return Math.min.apply(Math, array);
}

function formatMax(targetColumn,tableid) {
	var tb = document.getElementById(tableid)
	var subtotal = returnAllValues(targetColumn,tableid);
	var maxValue = getMaxOfArray(subtotal); 
	var minValue = getMinOfArray(subtotal); 
	var tbody = returnTablePart(tableid,'TBODY')
			
	for (var currentRow = 0; currentRow < tbody.children.length; currentRow++) {
	var childrenOftBody = tbody.children[currentRow];
		for (var currentCell = 0; currentCell < childrenOftBody.children.length; currentCell++) {
			if (currentCell == targetColumn) {
				var currentCellValue = textToNumNotation(childrenOftBody.children[currentCell].innerText);
			if (currentCellValue == Infinity) {
				childrenOftBody.children[currentCell].innerText = 0;
			} else if (currentCellValue == maxValue) {
				childrenOftBody.children[currentCell].classList.add('maxValueInArray');
			} else {
				var percent = ((currentCellValue - minValue) / (maxValue - minValue))*100;
				childrenOftBody.children[currentCell].style.background = "linear-gradient(90deg, green ,white " + percent + "%)";
			} // end if currentCell
			}
		} // end for tr 
	} //end for tbody 
}

function addRowHandlers(col,tableid) {
 var table = document.getElementById(tableid);
 var rows = table.getElementsByTagName("tr");
    
 for (i = 0; i < rows.length; i++) {
   var currentRow = table.rows[i];
   currentRow.onclick = createClickHandler(col,tableid);
 }
}

function createClickHandler(col,table) {
  return function() { 
	formatMax(col,table)
  };
}

function addColumn(tableid,columnName,headLess,tableLength) {
	if (headLess != "true") {
		var tableHead = returnTablePart(tableid,"THEAD");
		for (var currentRow=0; currentRow<tableHead.rows.length; currentRow++) {
			var newTH = document.createElement('th');
			tableHead.rows[currentRow].appendChild(newTH);
			newTH.innerHTML = columnName;
			newTH.setAttribute("onclick", "sortNumTable("+(tableHead.children[0].children.length-1)+",'"+tableid+"')");
		}
	}

	var bodyLength
	var tableBody = returnTablePart(tableid,"TBODY");
	if (typeof tableLength == "number") {
		bodyLength = tableLength;
	} else {
		bodyLength = tableBody.rows.length;
	}

	for (var i=0; i<tableBody.rows.length; i++) {
		var newCell = tableBody.rows[i].insertCell(-1);
		//newCell.innerHTML = '[td] row:' + i + ', cell: ' + (tableBody.rows[i].cells.length - 1)
	}
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

function deleteColumn(tableid){
	var allRows = document.getElementById(tableid).rows;
	for (var i=0; i<allRows.length; i++) {
		if (allRows[i].cells.length > 1) {
			allRows[i].deleteCell(-1);
		}
	}
}

function returnTablePart(tableid,tablePart) {
	var table = document.getElementById(tableid);
	var tableData;
	for (var i = 0; i < table.children.length; i++) {
		if (table.children[i].tagName === tablePart) {
			tableData = table.children[i];
		}
	} //end for tb.children
	return tableData;
}

function columnMath(TableAid,inputACol,TableBid,inputBCol,rowBAdj,TableOutid,outputCol,mathOperation,roundDigits,formatMaxOutput,newOutColumnName) {
	var TableA = returnTablePart(TableAid,"TBODY");
	var TableB;
	var TableOut = returnTablePart(TableOutid,"TBODY");
	
	if (TableBid != "") {
		TableB = returnTablePart(TableBid,"TBODY");
	}
	if (outputCol >= TableOut.children[0].children.length) {
		if (newOutColumnName == null) {
			var TableAHead = returnTablePart(TableAid,"THEAD");
			var TableBHead = returnTablePart(TableBid,"THEAD");
			var mathOperator;

			switch(mathOperation) {
			  case "none":
				mathOperator = "";
				mathVerb = "";
				break;
			  case "add":
				mathOperator = " + ";
				mathVerb = " sum";
				break;
			  case "subtract":
				mathOperator = " - ";
				mathVerb = " change";
				break;
			  case "multiply":
				mathOperator = " * ";
				mathVerb = " multiple";
				break;
			  case "divide":
				mathOperator = " / ";
				mathVerb = " rate";
				break;
			  case "percent":
				mathOperator = " % ";
				mathVerb = " percent";
				break;
			  default:
				mathOperator = " ? ";
				mathVerb = " error";
				break;
			}
			if (TableBid != "") {
				if (TableAHead.children[0].children[inputACol].innerText == TableBHead.children[0].children[inputBCol].innerText) {
					newOutColumnName = TableAHead.children[0].children[inputACol].innerText + mathVerb;
				} else {
					newOutColumnName = TableAHead.children[0].children[inputACol].innerText + mathOperator + TableBHead.children[0].children[inputBCol].innerText;
				}
			} else {
				newOutColumnName = TableAHead.children[0].children[inputACol].innerText + mathOperator + numToTextNotation(inputBCol);
			}
		}

		addColumn(TableOutid,newOutColumnName);
	}
		
	for (var currentRow = (0-rowBAdj); currentRow < TableA.children.length; currentRow++) {
		var childrenOfA = TableA.children[currentRow];
		var childrenOfB;
		var childrenOfOut = TableOut.children[currentRow];
		
		var InputAText = textToNumNotation(childrenOfA.children[inputACol].innerText);
		var InputBText;
		
		if (TableBid != "") {
			childrenOfB = TableB.children[currentRow+rowBAdj];
			InputBText = textToNumNotation(childrenOfB.children[inputBCol].innerText);
		} else {
			InputBText = textToNumNotation(inputBCol);
		}
	
		switch(mathOperation) {
		  case "none":
			childrenOfOut.children[outputCol].innerText = childrenOfA.children[inputACol].innerText;
			break;
		  case "add":
			childrenOfOut.children[outputCol].innerText = numToTextNotation((InputAText *1)   +   (InputBText*1), roundDigits);
			break;
		  case "subtract":
			childrenOfOut.children[outputCol].innerText = numToTextNotation((InputAText *1)   -   (InputBText*1), roundDigits);
			break;
		  case "multiply":
			childrenOfOut.children[outputCol].innerText = numToTextNotation((InputAText *1)   *   (InputBText*1), roundDigits);
			break;
		  case "divide":
			if ((InputAText *1)   /   (InputBText*1)  == Infinity) {
				childrenOfOut.children[outputCol].innerText = 0;
			} else {
				childrenOfOut.children[outputCol].innerText = numToTextNotation((InputAText *1)   /   (InputBText*1), roundDigits);
			}
			break;
		  case "percent":
			if (((InputAText *1)   /   (InputBText*1)) *100 == Infinity) {
				childrenOfOut.children[outputCol].innerText = 0;
			} else {
				childrenOfOut.children[outputCol].innerText = numToTextNotation(((InputAText *1)   /   (InputBText*1))   *100   , roundDigits);
			}
			break;
		  default:
			// code block
			break;
		}
		if (currentRow+1 == TableOut.children.length+rowBAdj && formatMaxOutput == "true") {
			formatMax(outputCol,TableAid);
		}
	} //end for TableA 
}

function newDivTable(parentDivID,newTableID,firstColumnTitle,tableLength) {
	var parentDiv = document.getElementById(parentDivID);
	var newDiv = document.createElement("div");
	var newTable = document.createElement("table");
	newDiv.className = "textBubbleBG";
	newTable.id = newTableID;
	
	var newThead = document.createElement('thead');
	var newTbody = document.createElement('tbody');
	var newTR = newThead.insertRow(0);
	var newTH = document.createElement('th');
	newTable.appendChild(newThead);
	newTable.appendChild(newTbody);
	newThead.appendChild(newTR);
	newTR.appendChild(newTH);
	newTH.innerHTML = firstColumnTitle;

	for (var i=0;i<tableLength;i++){
		newRow = newTbody.insertRow(0);
		newRow.insertCell(0);
	}
	newDiv.appendChild(newTable);
	parentDiv.insertBefore(newDiv,parentDiv.children[0]);

}
//}endregion

//{region WebCoif
function addElement($elementParent,$innerText,$elementClass,$elementType,$elementStyle,$href,$onChange,$onClick,$contentEditable,$attributeType,$attributeAction,$elementId) {
	if (!$elementParent) {
		return;
	}; // end if elementType	

	if (!$elementType) {
		$elementType = 'div'
	}; // end if elementType	
	var $newElement = document.createElement($elementType);

	if (!$elementId) {
		$elementId = getBadPW();
	}; // end if divParent
	$newElement.id = $elementId;

	if ($elementStyle) {
		$newElement.style = $elementStyle
	}; // end if elementStyle
	
	if ($elementClass) {
		$newElement.className = $elementClass
	}; // end if elementClass
	
	if ($elementParent == 'body') {
		document.body.appendChild($newElement);
	} else if ($elementParent == 'head') {
		document.head.appendChild($newElement);
	} else {
		//console.log($elementParent)
		document.getElementById($elementParent).appendChild($newElement);
	}; // end if divParent
	
	if ($elementType == 'input' && $innerText) {
		$newElement.value = $innerText
	} else if ($elementType == 'img' && $innerText) {
		$newElement.title = $innerText
	} else if ($innerText) {
		$newElement.innerText = $innerText
	}; // end if elementType	
	
	if ($elementType == 'a' && $href) {
		$newElement.href = $href
	} else if ($elementType == 'img' && $href) {
		$newElement.src = $href
	} else if ($elementType == 'script' && $href) {
		$newElement.src = $href
	} else if ($elementType == 'iframe' && $href) {
		$newElement.src = $href
	} else if ($elementType == 'link' && $href) {
		$newElement.href = $href
		$newElement.rel = "stylesheet"
		$newElement.type="text/css"
	}; // end if elementType	
	
	if ($onChange) {
			document.getElementById($elementId).setAttribute("onchange", $onChange);
	}; // end if onChange	
	if ($onClick) {
			document.getElementById($elementId).setAttribute("onclick", $onClick);
	}; // end if onClick	
	if ($contentEditable) {
			document.getElementById($elementId).contentEditable = true;
	}; // end if contentEditable	
	if ($attributeType && $attributeAction) {
		document.getElementById($elementId).setAttribute($attributeType, $attributeAction);
	}; // end if attributeType

	return $elementId
}; // end addElement	

function getBadPW() {
	return Math.random().toString(36).slice(-20);
 }

function getKeys(obj){
   var keys = [];
   for(var key in obj){
      keys.push(key);
   }
   return keys;
}; // end getKeys

function getElementType($elementId) {
	return document.getElementById($elementId).toString().replace("[object HTML","").replace("Element]");
}; // end getElementType	 

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}; //end function onlyUnique

function xhrRequest($verb,$location,$callback,$JSON,$file,$cached) {
	var $status;
	var xhRequest = new XMLHttpRequest();
	var $locationCache = $location.replace(/\//g,"").replace(/\./g,"").replace(/\:/g,"");
	var $returnVar;
		if ($verb == "POST") {
			xhRequest.overrideMimeType("text/plain");
		} else if ($verb == "GET") {
			xhRequest.overrideMimeType("application/json");
		} else if ($verb == "PUT") {
			xhRequest.overrideMimeType("application/json");
		} else {
			xhRequest.overrideMimeType("text/plain");
		}; // end if verb
	
		xhRequest.open($verb, $location, true); 
		xhRequest.onreadystatechange = function () {
			try {
				$status = xhRequest.status;
				if (xhRequest.status == "200") {
					if (xhRequest.readyState == 4) {
							$returnVar = xhRequest.responseText;
						if ($JSON) {
							$returnVar = JSON.parse($returnVar);
						}; // end if JSON
						
	/*Caching section needs testing.
	if ($cached) {
		$status = "304";
		$returnVar = $cachingVar[$locationCache];
		$callback($returnVar,$status);
	} else {
	}; //end if cached
	*/
						//$cachingVar[$locationCache] = $returnVar;
						$callback($returnVar,$status);

					}; // end xhRequest.readyState
				} else {
					$callback(" Error: "+xhRequest.statusText,$status);
				}; // end if xhRequest.status
			} catch {
			}; // end try
		}; // end xhRequest.onreadystatechange
	xhRequest.send($file);
};// end xhrRequest

function overlayOn(divId) {
  document.getElementById(divId).style.display = "block";
}

function overlayOff(divId) {
  document.getElementById(divId).style.display = "none";
}

function writeElement($elementId,$source) {	  
	var $elementType = JSON.stringify(document.getElementById($elementId).type);
	
	if (($elementType == '"text"') || ($elementType == '"number"')|| ($elementType == '"select-one"')) {
		document.getElementById($elementId).value = $source;
	} else {
		if (document.getElementById($elementId).tagName  == 'IMG') {
			document.getElementById($elementId).src = $source;
		} else {
			document.getElementById($elementId).innerText = $source;
		}
	}; // end if divParent
}; // end writeElement

function readElement($elementId) {
	var $elementType = JSON.stringify(document.getElementById($elementId).type);
	
	if (($elementType == '"text"') || ($elementType == '"textarea"')|| ($elementType == '"select-one"')|| ($elementType == '"number"')) {
		return document.getElementById($elementId).value;
	} else {
		return document.getElementById($elementId).innerText;
	}; // end if divParent
}; // end readElement

function appendElement($elementId,$source) {
	writeElement($elementId,readElement($elementId) + $source)
}; // end appendElement

function toggleElement($divId) {
	if (document.getElementById($divId).style.visibility == "visible") {
		document.getElementById($divId).style.visibility="hidden";
	} else { 
		document.getElementById($divId).style.visibility="visible";
	} // end if
}; // end toggleElement

function hideElement($divId) {
	document.getElementById($divId).style.visibility="hidden";
}; // end toggleElement

function showElement($divId) {
	document.getElementById($divId).style.visibility="visible";
}; // end toggleElement

function removeElement($divId) {
	var $div = document.getElementById($divId);
	if ($div) {
		$div.parentNode.removeChild($div);
	}	
}; // end removeBot

function cje($parentElement,$jsonVar) {
	//convertJsonToElement
	var $elementForErr;
	if	(!$parentElement) {
		console.log("webCoifErr: Err in cje - no parent element in: " + $jsonVar);
	}
	var $rgxVar
	if	($jsonVar) {
		$jsonVar = rwjs(rwjs($jsonVar));
		
	try {
/*	if ($jsonVar.split(':')[0] == 'http' || $jsonVar.split(':')[0] == 'https') {
		xhrRequest("GET",$jsonVar,function(response) {
			cje(response,$parentElement);
		},"JSON"); // end xhrRequest

	}else */if ($jsonVar.elements) {
		$rgxVar = new RegExp($jsonVar.elements[0].elementParent,'g');
		$jsonVar = JSON.stringify($jsonVar).replace($rgxVar,$parentElement);
		$jsonVar = JSON.parse($jsonVar);
		$jsonVar.elements.forEach(function($element){
			$elementForErr = $element;
			addElement($element.elementParent,$element.innerText,$element.elementClass,$element.elementType,$element.elementStyle,$element.href,$element.onChange,$element.onClick,$element.contentEditable,$element.attributeType,$element.attributeAction,$element.id);
		}); // end foreach jsonVar
	}; // end if jsonVar.elements
	} catch(e) { 
		console.log("webCoifErr: Err in cje elements: " + e + " $jsonVar: "+JSON.stringify($elementForErr));
	}; // end try
	
	}; // end if jsonVar
}; // end cje

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

function groupArray(arrayToGroup) {
	var newGroup = [],
		groupingArray = {},
		i, j, currentItem;
	for (i = 0, j = arrayToGroup.length; i < j; i++) {
		currentItem = arrayToGroup[i];
		if (!(currentItem.itemName in groupingArray)) {
			groupingArray[currentItem.itemName] = {itemName: currentItem.itemName, Types: []};
			newGroup.push(groupingArray[currentItem.itemName]);
		}
		groupingArray[currentItem.itemName].Types.push(currentItem.Type);
	}
	return newGroup;
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

function parseHtml($inputId,$outputId) {
	try {
	var $inputToEval = readElement($inputId);
	$inputToEval += '"}]}';
	var $jsonOutput = $inputToEval
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
	writeElement($outputId,$jsonOutput);
	prettyPrint($outputId);
	} catch(e){writeElement("errDiv",e);}
}; // end parseHtml

function copyToClipboard(text) {
    Copied = text.createRange();
    Copied.execCommand("Copy");
}; // end copyToClipboard

function colorifyDiv(divid, replaceWord, replaceClass) {
	var replaceRegex = new RegExp(replaceWord, "g");
	replaceWord = replaceWord.replace("\\","")
	var str = document.getElementById(divid).innerHTML;
	str = str.replace(replaceRegex, '<span class="' + replaceClass + '">' + replaceWord + '</span>');
	document.getElementById(divid).innerHTML = str;
}; // end colorifyDiv

function addPopupToWord(divid, replaceWord, popupText,outputClasses) {
	var replaceRegex = new RegExp(replaceWord, "g");
	replaceWord = replaceWord.replace(/\\/g,"")
	var str = document.getElementById(divid).innerHTML;
	str = str.replace(replaceRegex, '<span class="popup '+outputClasses+'">' + replaceWord + '<span>' + popupText + '</span></span>');
	document.getElementById(divid).innerHTML = str;
}; // end colorifyDiv

function colorifyMultipleWords (wordList,$replaceClass,divList){
	for (var wordName = 0;wordName<wordList.length;wordName++){
		for (var divName = 0;divName<divList.length;divName++){
			colorifyDiv(divList[divName],wordList[wordName],$replaceClass);
		}
	}
}

function prettyPrint($divName) {
	try {
		writeElement($divName,JSON.stringify(JSON.parse(readElement($divName))).replace(/"},{"/g,'"},\n{"').replace(/","/g,'",\n"').replace(/{"/g,'{\n"').replace(/"}/g,'"\n}'));
		writeElement("errDiv","")
	} catch($err) {
		$errLoc = $err.message.split("in JSON at position ")[1];
		colorifyDiv("errDiv",readElement("jmlTextArea")[$errLoc],"red");
		appendElement("errDiv",$err+" - Text: "+findJSONErr($errLoc))
	};
}

function prettyCode($divName) {
	try {
		writeElement($divName,(readElement($divName)).replace(/"},{"/g,'"},\n{"').replace(/","/g,'",\n"').replace(/{"/g,'{\n"').replace(/"}/g,'"\n}').replace(/;/g,';\n'));
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

function detectEnter($keypress,callback){
    if($keypress.keyCode === 13){
        $keypress.preventDefault(); // Ensure it is only this code that runs
		$outputCallback = function () {
            callback();
		};
    };
}; // end detectEnter

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
//}endregion

//{region General
function getRoundedNumber(number,digits){
	return Math.round(number*Math.pow(10, digits))/Math.pow(10, digits);
}
//}endregion

//{region Encrypto
var alpha = ["A","B","C","D","E","F","G","H","I","J","K","L","M"];
var bet = ["N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

var alphArray = [
    ["A","B","C","D","E"],
    ["F","G","H","I","J"],
    ["K","L","M","N","O"],
    ["P","Q","R","S","T"],
    ["U","V","W","X","Y"]]
	
function rotateArray(inArray,num){
	var outArray = inArray.slice(num, inArray.length);
	for (n=0;n<num;n++) {
		outArray.push(inArray[n]);
	}
	return outArray;
}

function getPorta(message,key = "PORTA"){
	message = message.toUpperCase().replace(/ /g,"");
	key = key.toUpperCase();
	var out = "";
	//https://www.cryptogram.org/downloads/aca.info/ciphers/Porta.pdf
	//console.log("message "+message.length+" chars "+message);

	for (messageIndex=0;messageIndex<message.length;messageIndex++) {
		//console.log("messageIndex: "+messageIndex);
		var msgLetter = message.substring(messageIndex,messageIndex+1)
		var keyLetterCode = Math.floor((key.substring(messageIndex%key.length,messageIndex%key.length+1).codePointAt(0)-65)/2);
		var msgLetterCode = msgLetter.codePointAt(0)-65;
		var portaBeta = bet.slice(keyLetterCode, bet.length);
		for (arrayFillIndex=0;arrayFillIndex<keyLetterCode;arrayFillIndex++) {
			portaBeta.push(bet[arrayFillIndex]);
		}

		if (msgLetterCode >12) {
			out += alpha[portaBeta.indexOf(msgLetter)];
		//console.log("messageIndex: "+messageIndex+" alpha "+keyLetterCode+" out: "+out);
		}else {
			out += portaBeta[alpha.indexOf(msgLetter)];
		//console.log("messageIndex: "+messageIndex+" beta "+keyLetterCode+" out: "+out);
		}// end if keyLetterCode
	}
	return out;
}; //end getPorta

function getMyszkowski(message,key="banana") {
	message = message.toUpperCase().replace(/ /g,"");
	key = key.toUpperCase();
	var out = "";

	//Foreach A-Z
	for (messageChunkIndex = 0;messageChunkIndex<message.length;messageChunkIndex+=key.length) {
		var currentMessageChunk = message.substring(messageChunkIndex,messageChunkIndex+key.length);
		for (currentAlphaCode = 65;currentAlphaCode<91;currentAlphaCode++) {
			var currentAlpha = String.fromCodePoint(currentAlphaCode);
			for (messageIndex=0;messageIndex<currentMessageChunk.length;messageIndex++) {

				var msgLetter = currentMessageChunk.substring(messageIndex,messageIndex+1);
				var keyLetter = key.substring(messageIndex%key.length,messageIndex%key.length+1);
				
				if (keyLetter == currentAlpha){
					out += msgLetter;
				}// end if keyLetter
			}// end for messageIndex
		}// end for currentAlphaCode
	}// end for messageChunkIndex
	return out;
}; //end getMyszkowski

function revertMyszkowski(message,key="banana") {
	message = message.toUpperCase().replace(/ /g,"");
	key = key.toUpperCase();
	var out = "";
	
	//Work in key-length chunks.
	for (messageChunkIndex = 0;messageChunkIndex<message.length;messageChunkIndex+=key.length) {
		var currentMessageChunk = message.substring(messageChunkIndex,messageChunkIndex+key.length);
		var currentMessageChunk = currentMessageChunk.split('');
		var keySplit = key.split('');
		//Cycle through key 
		for (KeyIndex = 0;KeyIndex<keySplit.length;KeyIndex++) {
			var keySorted = key.split('').sort();
			//Cycle through the message chunk
			for (messageIndex=0;messageIndex<keySplit.length;messageIndex++) {
					var keySortedLetter = keySorted[messageIndex];
					var keySplitLetter = keySplit[KeyIndex];
					var keySortedIndex = keySorted.indexOf(keySplitLetter)
					var msgLetter = currentMessageChunk[keySortedIndex];
					
					//If the key at this location matches the A-Z, add it to the output string.
					if (keySortedLetter == keySplitLetter){
						out += msgLetter;

						keySplit.splice(KeyIndex,1);
						keySorted.splice(keySortedIndex,1);
						currentMessageChunk.splice(keySortedIndex,1);
						
						messageIndex=0
					}// end if keyLetter
					if (currentMessageChunk.length == 1) {
						out += currentMessageChunk[0];
					}
					
			}// end for messageIndex
		}// end for keySplitLetterCode
	}// end for messageChunkIndex
	return out;
	
}; //end getMyszkowski

function getRunningKey(message) {
	message = message.toUpperCase().replace(/ /g,"");
	var msg = message.substring(0, (message.length/2));
	var key = message.substring((message.length/2),message.length);
	var out = "";
	
	for (messageIndex=0;messageIndex<key.length;messageIndex++) {
		var keyLetter = key.codePointAt(messageIndex)-65;
		var msgLetter = msg.codePointAt(messageIndex)-65;
		var outLetter = ((keyLetter + msgLetter) % 26)+65;
		out += String.fromCodePoint(outLetter);
	}
	out += key;
	return out;
}

function getInverseRunningKey(message) {
	message = message.toUpperCase().replace(/ /g,"");
	var key = message.substring(0, (message.length/2));
	var msg = message.substring((message.length/2),message.length);
	var out = "";
	
	for (messageIndex=0;messageIndex<key.length;messageIndex++) {
		var keyLetter = key.codePointAt(messageIndex)-65;
		var msgLetter = msg.codePointAt(messageIndex)-65;
		var outLetter = ((keyLetter + msgLetter) % 26)+65;
		out += String.fromCodePoint(outLetter);
	}
	out = key + out;
	return out;
}

function revertRunningKey(message) {
	message = message.toUpperCase().replace(/ /g,"");
	var msg = message.substring(0, (message.length/2));
	var key = message.substring((message.length/2),message.length);
	var out = "";
	
	for (messageIndex=0;messageIndex<key.length;messageIndex++) {
		var keyLetter = key.codePointAt(messageIndex)-65
		var msgLetter = msg.codePointAt(messageIndex)-65;
		var outLetter = ((msgLetter+26-keyLetter) % 26)+65;
		out += String.fromCodePoint(outLetter);
	}
	out += key;
	return out;
}

function revertInverseRunningKey(message) {
	message = message.toUpperCase().replace(/ /g,"");
	var key = message.substring(0, (message.length/2));
	var msg = message.substring((message.length/2),message.length);
	var out = "";
	
	for (messageIndex=0;messageIndex<key.length;messageIndex++) {
		var keyLetter = key.codePointAt(messageIndex)-65
		var msgLetter = msg.codePointAt(messageIndex)-65;
		var outLetter = ((msgLetter+26-keyLetter) % 26)+65;
		out += String.fromCodePoint(outLetter);
	}
	out = key + out;
	return out;
}

function enigmaReciprocal(inputString,keyArray,swapArray){
	var inputString = inputString.toUpperCase().replace(/ /g,"")
	for (index = 0;index<keyArray.length;index++) {
		var regexKey = new RegExp(keyArray[index],'g');
		var regexSwap = new RegExp(swapArray[index],'g');
		inputString = inputString.replace(regexKey,'#@#');
		inputString = inputString.replace(regexSwap,keyArray[index]);
		inputString = inputString.replace(/#@#/g,swapArray[index]);
	}
	return inputString;
}

//}endregion

//region misc
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

function getNumberFromDiv($numericDiv) {
	return Math.round(
		document.getElementById($numericDiv).innerText  *1
	)
};
//endregion

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

//endregion

//{region Rowboat Cipher
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

//}endregion

//{region Physics
function returnLorentzFactor(Velocity) {
	return 1 / Math.sqrt( (1- (Math.pow(Velocity,2) / c_Squared)));
}

function returnLorentzMultiple(Velocity) {
	return (Velocity * (returnLorentzFactor(Velocity)));
}

function returnRMomentum(Mass,Velocity) {
	return 1 / Math.sqrt(1+ (Math.pow(Velocity,2)/(Math.pow(Mass,2) * c_Squared)));
}

function returnTimeDilation(timeObserver,Velocity) {
	return (returnLorentzFactor(Velocity)) * timeObserver;
}

function returnLengthContraction(Length,Velocity) {
	return Length/(returnLorentzFactor(Velocity));
}

function returnRMass(restMass,Velocity) {
	return (returnLorentzFactor(Velocity))* restMass;
}

function returnRMomentum(restMass,Velocity) {
	return (returnLorentzFactor(Velocity)) * restMass * Velocity;
}

function returnRKE(restMass,Velocity) {
	return ((returnLorentzFactor(Velocity)) -1) * restMass * c_Squared;
}

function returnEscapeVelocity(restMass = EarthMass,Radius = EarthRadius) {
//Escape velocity is the minimum speed a ballistic object needs to escape from a massive body such as Earth. It represents the kinetic energy that, when added to the object's gravitational potential energy, (which is always negative) is equal to zero. The general formula for the escape velocity of an object at a distance r from the center of a planet with mass M is
	return returnLorentzMultiple (Math.sqrt( (2 * GravitationalConstant * restMass) / Radius))
}

function returnUnits(FirstUnit,SecondUnit) {
	var out = FirstUnit;
	if(out.Contains(SecondUnit)) {
		out = out.Replace("SecondUnit^-1","");
		out = out.Replace(" "," ");
	}
	return out;
}

function returnGasMoleculeMetersPerSecond(Kelvins,restMassKG,units="JK") {
	//in meters/sec
	var Velocity = {};
	var useUnits = BoltzmannConstantJK;
	switch (units) {
		case "JK":
		useUnits = BoltzmannConstantJK;
		break;
		case "EVK":
		useUnits = BoltzmannConstantEVK;
		break;
		case "Ideal":
		useUnits = IdealGasConstant;
		break;
		default:
		return "error"
		break;
	}
	Velocity.Avg = (returnLorentzMultiple (Math.sqrt(3 * useUnits * Kelvins / restMassKG )));
	Velocity.Min = Velocity.Avg * .20; 
	Velocity.Max = Velocity.Avg * 2;
	return Velocity;
}

function returnGasMoleculeKelvins(metersPerSecond,restMassKG) {
	return restMassKG * Math.pow(metersPerSecond,2) /  IdealGasConstant/ 3;
}

function returnEVMetersPerSecond(EV,restMassKG) {
	return EV*eVperJoules/restMassKG
}

function returnComptonWavelength(mass) {
	return Math.sqrt(PlanckConstant/(mass*c_Light));
}

function returnComptonFrequency(mass) {
	return Math.sqrt((mass*c_Squared/PlanckConstant));
}

function returnEntropy(states) {
	return BoltzmannConstant*Math.log(states);
}
//}endregion

//{region Constants

//{region Power names
$thousand = 1000;
$million = $thousand *$thousand;
$billion = $million *$thousand;
$trillion = $billion *$thousand;
$quadrillion = $trillion *$thousand;
$quintillion = $quadrillion *$thousand;
$sixtillion = $quadrillion *$thousand;
$septillion = $sixtillion *$thousand;
$octillion = $septillion *$thousand;
$nonillion = $octillion *$thousand;
$decillion = $nonillion *$thousand;
//} endregion Power names

//{region ConstantValues
//Conversion
const eVperJoules = 1.609E-19; //ENERGY
const eVc = 5.36E-28; //MOMENTUM
const eVc2 = 1.79E-36; //MASS
const eVperKG = 5.6095883571872E35; //MASS
const amuToKG = 1.660540199E-27; //Atomic Mass Unit

//Massive bodies
var EarthMass = 5.97237E24;
var EarthRadius = 6.378137E6;
var SunMass = 1.99E30;
var SunRadius = 7E8;
var SunSurfaceTemp = 5800;

var WattsPerHorsepower = 745.7;

//Axioms
const e = Math.e;
const pi = Math.PI;
const cs133HTF = 9192631770; //caesium-133 Hyperfine Transition Frequency
const AvogadroConstant = 6.02214129E23;
const BoltzmannConstant = 1.3806488E-23;
const elementaryCharge = 1.602176565E-19;
const PlanckConstant = 6.62607015E-34;
const GravitationalConstant = 6.67430E-11;
const c_Light = 299792458;

const electricConstant = 8.854187817E-12;
const FaradayConstant = 96485.3365;
const FermiCouplingConstant = 1.166364E-5;
const FineStructureConstant = 7.2973525698E-3;
const FirstRadiationConstant = 3.74177153E-16;
const IdealGasConstant = 8.314;
const RydbergConstant = 10973731.568;

const BohrMagneton = 927.400968E-26;
const BohrRadius = 0.52917721092E-10;
const HydrogenMass = 1.67E-24;
const classicalElectronRadius = 2.8179403267E-15;
const electronGfactor = -2.00231930436153;
const electronMass = 9.10938291E-31;
const electronCharge = 1.602176634E-19;
const MuonComptonWavelength = 11.73444103E-15;
const neutronGfactor = -3.82608545;
const neutronMassKG = 1.674927351E-27;
const nuclearMagneton = 5.05078353E-27;
const protonChargetoMassQuotient = 9.57883358E7;
const protonComptonWavelength = 1.32140985623E-15;
const protonGfactor = 5.585694713;
const protonElectronMassRatio = 1836.15267245;
const solarPhotonsPerSecond = 1.00E+45;

const PlanckMassEnergy = 1.220932E19;
//}endregion

//{region DerivedValues
const c_Squared = Math.pow(c_Light,2);
const MagneticConstant = 1/(electricConstant*c_Squared);
const InverseFineStructureConstant = 1/FineStructureConstant;

//Conversion
const KGperJoule = 1/c_Squared;
const JoulesPerEV = 1/eVperJoules;
const KGpereV = JoulesPerEV/KGperJoule;

const protonMass = electronMass*protonElectronMassRatio;

const PlanckReduced = PlanckConstant/(2*pi);
const PlanckLength = Math.sqrt(PlanckReduced*GravitationalConstant/Math.pow(c_Light,3));
const PlanckMass = Math.sqrt((PlanckReduced*c_Light)/GravitationalConstant);
const PlanckTemperature = Math.sqrt((PlanckReduced*Math.pow(c_Light,5))/(GravitationalConstant*Math.pow(BoltzmannConstant,2)));
const PlanckTime = Math.sqrt(PlanckReduced*GravitationalConstant/Math.pow(c_Light,5));
const PlanckForce = Math.pow(c_Light,4)/GravitationalConstant;

const BoltzmannConstantEVK = BoltzmannConstant/eVperJoules;
const CharacteristicImpedanceofVacuum = Math.sqrt(MagneticConstant/electricConstant);

//}endregion

//{region Units
const eVperJoulesunits = "J";
const eVcUnits ="kg-m/s";
const eVc2Units = "kg";

const AvogadroConstantUnits = "mol^-1";
const BohrMagnetonUnits = "J T^-1";
const BohrRadiusUnits = "m";
const BoltzmannConstantUnits = "g cm2 sec-2 deg-1";
const cUnits = "m s^-1";
const CharacteristicEmpedanceofVacuumUnits = "ohm";
const classicalElectronRadiusUnits = "m";
const ComptonWavelengthUnits = "m";
const EarthMassUnits = "g";
const EarthRadiusUnits = "m";
const SunMassUnits = "g";
const SunRadiusUnits = "m";
const SunSurfaceTempUnits = "K";
const HydrogenMassUnits = "g";
const electricConstantUnits = "F m^-1";
const electronGfactorUnits = "{dimensionless}";
const electronMassUnits = "kg";
const electronChargeUnits = "C";
const elementaryChargeUnits = "C";
const FaradayConstantUnits = "C mol^-1";
const FermiCouplingConstantUnits = "GeV^-2";
const FineStructureConstantUnits = "{dimensionless}";
const FirstRadiationConstantUnits = "W m^2";
const GravitationalConstantUnits = "m^3 kg^-1 s^-2";
const IdealGasConstantUnits = "kg*m2/s2*mol*K";
const InverseFineStructureConstantUnits = "{dimensionless}";
const MagneticConstantUnits = "N A^-2";
const MuonComptonWavelengthUnits = "m";
const neutronGfactorUnits = "{dimensionless}";
const neutronMassUnits = "kg";
const nuclearMagnetonUnits = "J T^-1";
const PlanckConstantUnits = "J s";
const PlanckForceUnits = "N";
const PlanckLengthUnits = "m";
const PlanckMassEnergyUnits = "GeV";
const PlanckMassUnits = "kg";
const PlanckTemperatureUnits = "K";
const PlanckTimeUnits = "s";
const protonChargetoMassQuotientUnits = "C kg^-1";
const protonComptonWavelengthUnits = "m";
const protonGfactorUnits = "{dimensionless}";
const protonElectronEassRatioUnits = "{dimensionless}";
const RydbergConstantUnits = "m^-1";
//}endregion

//}endregion





