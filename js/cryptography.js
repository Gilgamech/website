//Copyright 2013-2022 Gilgamech Technologies
//cryptography.js
//Author: Stephen Gillie
//Created on: ‎10/24/2022
//Last updated: 12/11/2022
//Notes: 

var alpha = ["A","B","C","D","E","F","G","H","I","J","K","L","M"];
var bet = ["N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

var alphArray = [
    ["A","B","C","D","E"],
    ["F","G","H","I","J"],
    ["K","L","M","N","O"],
    ["P","Q","R","S","T"],
    ["U","V","W","X","Y"]]

//Porta
function getPorta(message,key = "PORTA"){
	//Set message and key all uppercase, var out.
	message = message.toUpperCase().replace(/ /g,"");
	key = key.toUpperCase();
	var out = "";
	//https://www.cryptogram.org/downloads/aca.info/ciphers/Porta.pdf
	//console.log("message "+message.length+" chars "+message);

	for (messageIndex=0;messageIndex<message.length;messageIndex++) {
		//console.log("messageIndex: "+messageIndex);
		//Get the message letter.
		var msgLetter = message.substring(messageIndex,messageIndex+1)
		//Get the key letter's keycode, less 65 to make it the alphanumeric. Move forward on the key the messageLength number of times, modulus the key length, aka wrap around the key. This obviates a nested loop.
		var keyLetterCode = Math.floor((key.substring(messageIndex%key.length,messageIndex%key.length+1).codePointAt(0)-65)/2);
		//Get the message letter's keycode, less 65 to make it alphanumeric.
		var msgLetterCode = msgLetter.codePointAt(0)-65;
		//Rotate portaBeta to the key letter's keycode.
		var portaBeta = bet.slice(keyLetterCode, bet.length);
		for (arrayFillIndex=0;arrayFillIndex<keyLetterCode;arrayFillIndex++) {
			portaBeta.push(bet[arrayFillIndex]);
		}
		if (msgLetterCode >12) {
		//If the letter is N-Z, return alpha at letter's the index in portaBeta 
			out += alpha[portaBeta.indexOf(msgLetter)];
		//console.log("messageIndex: "+messageIndex+" alpha "+keyLetterCode+" out: "+out);
		}else {
		//else if the letter is A-M, return portaBeta at the letter's index in alpha
			out += portaBeta[alpha.indexOf(msgLetter)];
		//console.log("messageIndex: "+messageIndex+" beta "+keyLetterCode+" out: "+out);
		}// end if keyLetterCode
	}
	return out;
}; //end getPorta

//Myszkowski
function getMyszkowski(message,key="banana") {
	//Set message and key all uppercase, var out.
	message = message.toUpperCase().replace(/ /g,"");
	key = key.toUpperCase();
	var out = "";

	//Foreach A-Z
	for (messageChunkIndex = 0;messageChunkIndex<message.length;messageChunkIndex+=key.length) {
		//Work in key-length message chunks. 
		var currentMessageChunk = message.substring(messageChunkIndex,messageChunkIndex+key.length);
		for (currentAlphaCode = 65;currentAlphaCode<91;currentAlphaCode++) {
			//Cycle through every letter
			var currentAlpha = String.fromCodePoint(currentAlphaCode);
			for (messageIndex=0;messageIndex<currentMessageChunk.length;messageIndex++) {
				//Cycle through every letter in the chunk, getting the letter at that location, and the key at that location modulus the key length.
				var msgLetter = currentMessageChunk.substring(messageIndex,messageIndex+1);
				var keyLetter = key.substring(messageIndex%key.length,messageIndex%key.length+1);
				
				if (keyLetter == currentAlpha){
					//if the key matches the current letter, add the message's letter to the output.
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

//Runnking Key
function getRunningKey(message) {
	//First half is message, second half is key. So only the first half is encrypted.
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

//Enigma Man
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

function doRunningMan(inputString) {
	return getRunningKey(getInverseRunningKey(inputString))
}

function revertRunningMan(inputString) {
	return revertInverseRunningKey(revertRunningKey(inputString))
}

function doEnigmaMan(inputNumber,inputString) {
	if (inputNumber != 1) {
		return doRunningMan(doRunningMan(doRunningMan(doRunningMan(doRunningMan(doRunningMan(doRunningMan(doRunningMan(doRunningMan(inputString)))))))));
	}
	if (inputNumber != 2) {
		return revertRunningMan(revertRunningMan(revertRunningMan(revertRunningMan(revertRunningMan(revertRunningMan(revertRunningMan(revertRunningMan(revertRunningMan(inputString)))))))));
	}
}

