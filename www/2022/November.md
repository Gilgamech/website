From the [sublime](https://www.youtube.com/watch?v=CNUTlKqSO-I) to the [ridiculous](https://www.youtube.com/watch?v=zy9FkAXMBfk)

--------------------------------------------------------------------

# [11/19/2022](#11192022) - So WW3 is going to look mostly like WW2?

Found I had written this essay on [Invasion USA](https://www.youtube.com/watch?v=DK8GZxUEXeM) a couple of months ago:

> Business is war, and it's looking more like any future WW3 will be fought mostly through sanctions and boycotts. War today is much more Warcraft than Battlefield, where assembling and maintaining the military industrial complex to feed the war beast becomes as essential as good propaganda, innovative strategies, and creative tactics. Napoleon's Third Law says that 'an army travels on its belly', referring to the vast logistics needed to supply a mobilized force, and this logistical need must be backed by sufficient production facilities. As we evolve from industrial warfare to electronic warfare, this involves more and more semiconducting microprocessors, aka 'computer chips'. These sophisticated devices require a vast supply chain, but enable GPS accuracy, and sometimes do not even carry an explosive warhead - giving incredible destructive control, allowing removal of military targets with a minimum (or maximum) amount of collateral and material damage. Some nations participating in this futuristic type of warfare do not even have their own troops on the battlefield.

--------------------------------------------------------------------

# [11/08/2022](#11082022) - Mockingbird Cipher.

Got the idea from a recent [FitMC video](https://www.youtube.com/watch?v=TMBHP9FDqHI) about a distributed stash that used the same name on all Shulkers, but varied the caps to identify the shulker in their database. This brings to mind a cipher based on caps.

Each letter has an uppercase and lowercase state. This allows each letter two states for a binary effect. The lower value, such as 'a' = 65 would be zero, and 'A' = 97 would be 1. Consider the 8-letter word 'encoding' with little-endian:

|Word|Binary|Value|
|------|------|------|
|encoding|00000000|zero|
|encodinG|00000001|one|
|encodiNg|00000010|two|
|encodiNG|00000011|three|
|encodIng|00000100|four|
|eNcOdInG|01010101|85|

## Input

::: Input#keyInput
HELLOWORLD
:::{outputMockingCipher('keyInput','txtInput','txtMid')}

::: textarea#txtInput
This lets you hide info in what looks like mocking text, Lorem Ipsum, Sagan Ipsum, or other text.
:::{outputMockingCipher('keyInput','txtInput','txtMid')}

## Encryption

Text:

::: textarea#txtMid
:::{outputMockingCipher('keyInput','txtInput','txtMid')}

Encrypted:

::: textarea#output
:::{outputMockingCipher('keyInput','txtInput','txtMid')}

Next up is decryption.

::: script#
function toBinary(num) {
	return num.toString(2);
}
function swapCaps(letter) {
	if (isCapital(letter)){
		letter = letter.toLocaleLowerCase();
	} else {
		letter = letter.toLocaleUpperCase();
	}
	return letter;
}
function toDecimal(num) {return parseInt(num, 2)};
function isCapital(letter){return letter === letter.toUpperCase()};
function doMockingCipher(keyString,inputString) {
	var keyBin = Array(keyString.length).fill(0);
	var inputString = inputString.split('');
	for (var key = 0; key < keyString.length; key++) {
		keyBin[key] = toBinary(keyString.charCodeAt(key).toString(2))
	}
	keyBin = keyBin.join('').split('')
	var binStart = inputString.length - keyBin.length;
	console.log('num: '+toDecimal(keyBin.join(''))+' maxNum: '+toDecimal(inputString.join('').replace(/[a-zA-Z]/g,1).replaceAll(' |1').replaceAll('.|1').replaceAll(|,'1')));
	
	console.log('binStart: '+binStart+' of '+inputString.length)
	for (n=binStart;n<inputString.length;n++){
		var nBin = n-binStart;
		if (keyBin[nBin] == 1) {
			console.log('n: '+n+' of '+inputString.length+' nBin ' +nBin+' is '+keyBin[nBin]+' at '+inputString[n])
			inputString[n] = swapCaps(inputString[n]);
		}
	}
	return inputString.join('');
}
function outputMockingCipher(keyInput,txtInput,output) {
	writeElement(txtMid,doMockingCipher(readElement(keyInput),readElement(txtInput)));	writeElement(txtEnc,doMockingCipher(readElement(keyInput),doEnigmaMan(1,readElement(output))));
}
outputMockingCipher('keyInput','txtInput','txtMid')
decryptMockingCipher();
:::
		
