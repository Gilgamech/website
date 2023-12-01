//Copyright 2013-2023 Gilgamech Technologies
//cryptography2.js v1.0 
//Author: Stephen Gillie
//Created on: 12/1/2023
//Last updated: 12/1/2023
//Notes:
//Cryptography 2 because there's another cryptography.js somewhere among my files.
//Version history:
//1.0 - Let's get this party started.

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
		var outLetter = ((msgLetter+26+keyLetter) % 26)+65;
		out += String.fromCodePoint(outLetter);
	}
	out += key;
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

function getInverseRunningKey(message) {
	//First half is key, second half is message. So only the second half is encrypted.
	message = message.toUpperCase().replace(/ /g,"");
	var key = message.substring(0, (message.length/2));
	var msg = message.substring((message.length/2),message.length);
	var out = "";
	
	for (messageIndex=0;messageIndex<key.length;messageIndex++) {
		var keyLetter = key.codePointAt(messageIndex)-65;
		var msgLetter = msg.codePointAt(messageIndex)-65;
		var outLetter = ((msgLetter+26+keyLetter) % 26)+65;
		out += String.fromCodePoint(outLetter);
	}
	out = key + out;
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

//Mockingbird
function toBinary(num) {
	return num.toString(2);
}//https://topitanswers.com/post/convert-number-to-binary-in-js

function toDecimal(num) {
	return parseInt(num, 2);
}//https://www.codespeedy.com/how-to-convert-binary-to-decimal-in-javascript-easily/

function isCapital(letter){
    return letter === letter.toUpperCase();
}//https://stackabuse.com/javascript-check-if-first-letter-of-a-string-is-upper-case/

function splitInto(str, len) {
    var regex = new RegExp('.{' + len + '}|.{1,' + Number(len-1) + '}', 'g');
    return str.match(regex );
}

function swapCaps(letter) {
	if (isCapital(letter)){
		letter = letter.toLocaleLowerCase();
	} else {
		letter = letter.toLocaleUpperCase();
	}
	return letter;
}

function doMockingCipher(keyString,inputString) {
	var keyBin = Array(keyString.length).fill(0);

	var inputString = inputString.split("");
	//Convert each key letter to ASCII then binary
	for (var key = 0; key < keyString.length; key++) {
		keyBin[key] = toBinary(keyString.charCodeAt(key).toString(2))
	}

	keyBin = keyBin.join("").split("")
	var binStart = inputString.length - keyBin.length;

	//var binStart = inputString.length - keyBin.length;

	//console.log("num: "+toDecimal(keyBin.join(""))+" maxNum: "+toDecimal(inputString.join("").replace(/[a-zA-Z]/g,1).replaceAll(" ","1").replaceAll(".","1").replaceAll(",","1")));
	
	//console.log("binStart: "+binStart+" of "+inputString.length)
	//Go through each letter, and if the key is 1, swap caps.
	for (n=0;n<inputString.length;n++){
		var nBin = n//-binStart;
		if (keyBin[nBin] == 1) {
			//console.log("n: "+n+" of "+inputString.length+" nBin " +nBin+" is "+keyBin[nBin]+" at "+inputString[n])
			inputString[n] = swapCaps(inputString[n]);
		}
	}
	return inputString.join("");
}

function revertMockingCipher(inputString) {
	var keyBin = ""
	var keyOutput = ""
	//Go through each letter, and if the letter is caps, add 0, else add 1.
	inputString = inputString.replace(/ /g,"").split("");
	//console.log(inputString);
	for (n=0;n<inputString.length;n++){
		if (isCapital(inputString[n])) {
			keyBin+="0"
		}else{
			keyBin+="1"
		}
	}

	//console.log(keyBin);
	//Split into 7-digit segments, convert back to letters, and add to the keyOutput.
	for (letter of splitInto(keyBin,7)) {
		if (letter != "0000000") {
			keyOutput += String.fromCharCode(toDecimal(letter).toString())
		}
	//console.log(keyOutput);
	}
	
	return keyOutput;
}

function outputMockingCipher(keyInput,txtInput,mocked,encrypted,decrypted,keyOutput) {
	writeElement(txtMid,doMockingCipher(readElement(keyInput),readElement(txtInput)));
	writeElement(txtEnc,doMockingCipher(readElement(keyInput),doEnigmaMan(1,readElement(mocked))));
	if	(decrypted) {
		writeElement(keyOutput,revertMockingCipher(readElement(encrypted)));
		writeElement(txtDecrypt,doEnigmaMan(2,readElement(encrypted)));
	}
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

