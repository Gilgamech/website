//Copyright 2022 Gilgamech Technologies
//Title: Basic Webserver
//Made by: Stephen Gillie
//Created on: 6/17/2022
//Updated on: 6/28/2022
//Notes: 

const http = require("http");
const https = require("https");
const fs = require('fs');
var url  = require('url');
var serverPort = 80;
var FruitBotwin = 0;
var FruitBotloss = 0;
var FruitBottie = 0;

var responseData = "Hola Mundo";
var error404 = "<HTML><body>404 Not Found</body><HTML>";
var pagename = "index.html";
var statusCode = 200;
const files = fs.readdirSync("/home/app");

fs.readFile("/home/app/custerr/404.htm", 'utf8', function (err,data) {
	error404 =  data;
	if (err) {
		console.log(err);
	}
});


const server = http.createServer((request, response) => {
	statusCode = 200;
	console.log("Request from "+request.socket.remoteAddress+" for page "+request.url);
	if (request.url=='/'){
		pagename = "/index.html";
	} else {
		pagename = request.url;
	};

	var contentType = 'text/plain';
	var encodingType = '';
	switch(pagename.split(".")[1]) {
	  case "css":
		contentType = 'text/css'
		break;
	  case "gif":
		contentType = 'image/gif'
		break;
	  case "htm":
		contentType = 'text/html'
		break;
	  case "html":
		contentType = 'text/html'
		break;
	  case "ico":
		contentType = 'image/x-icon'
		break;
	  case "jpg":
		contentType = 'image/jpeg'
		break;
	  case "js":
		contentType = 'application/javascript'
		break;
	  case "pdf":
		contentType = 'application/pdf'
		break;
	  case "png":
		contentType = 'image/png'
		break;
	  case "scad":
		break;
	  case "txt":
		break;
	  case "png":
		contentType = 'image/png'
		break;
	  default:
	}//end switch pagename

	switch(request.url) {
		case "/FruitBotwin":
		FruitBotwin++;
		var fruitResponse = [{
			FruitBotwins: FruitBotwin,
			botstie: FruitBottie,
			simplebotwins: FruitBotloss
		}];
		responseData =  fruitResponse;
		response.writeHead(statusCode, {'Content-Type': contentType});
		response.end(JSON.stringify(responseData));
		break;

	  case "/FruitBotloss":
		FruitBotloss++;
		var fruitResponse = [{
			FruitBotwins: FruitBotwin,
			botstie: FruitBottie,
			simplebotwins: FruitBotloss
		}];
		responseData =  fruitResponse;
		response.writeHead(statusCode, {'Content-Type': contentType});
		response.end(JSON.stringify(responseData));
		break;

	  case "/FruitBottie":
		FruitBottie++;
		var fruitResponse = [{
			FruitBotwins: FruitBotwin,
			botstie: FruitBottie,
			simplebotwins: FruitBotloss
		}];
		responseData =  fruitResponse;
		response.writeHead(statusCode, {'Content-Type': contentType});
		response.end(JSON.stringify(responseData));
		break;

	  case "/FruitBottotals":
		var fruitResponse = [{
			FruitBotwins: FruitBotwin,
			botstie: FruitBottie,
			simplebotwins: FruitBotloss
		}];
		responseData =  fruitResponse;
		response.writeHead(statusCode, {'Content-Type': contentType});
		response.end(JSON.stringify(responseData));
		break;

	  default:
		  if (files.includes(pagename.split("/")[1])) {
			fs.readFile("/home/app"+pagename, function (err,data) {
				statusCode = 200;
				responseData =  data;
				if (err) {
					statusCode = 404;
<<<<<<< HEAD
					responseData =  fourOhFour;
=======
					responseData =  error404;
>>>>>>> upstream/main
					console.log(err);
				} 
				response.writeHead(statusCode, {'Content-Type': contentType}); 
				response.end(responseData);
			});
		} else {
<<<<<<< HEAD
			responseData =  fourOhFour;
=======
			responseData =  error404;
>>>>>>> upstream/main
			console.log("404 error: "+pagename+" not found.");

			response.writeHead(404, {'Content-Type': 'text/html'}); 
			response.end(responseData);
		}
		break;
	} // end switch pagename
})
  
server.listen((serverPort), () => {
    console.log("Server is Running on port "+serverPort);
<<<<<<< HEAD
})

/*
function Filter-Rowboat(inVar) {
	inVar = inVar.replace(0," ");
	inVar = inVar.replace(1," ~");
	inVar = inVar.replace(2," ~ ");
	inVar = inVar.replace(3," ~~");
	inVar = inVar.replace(4,"~ ");
	inVar = inVar.replace(5,"~ ~");
	inVar = inVar.replace(6,"~~ ");
	inVar = inVar.replace(7,"~~~");
	inVar = inVar.replace(8,"- ~");
	inVar = inVar.replace(9,"-~ ");
	return inVar
}

function Filter-StringNums (intxt){
	([char[]]intxt | %{[int][char]$_ -65}) -replace "-","~" -join ""
}

function Get-Splitter (String, Index = 0, Offset = 52 ){
	if (String.length -gt Offset) {
		for(i=1; i -le [int](String.Length / Offset); i++){
			String[Index..(Index+Offset)] -join "";
			Index = Index + Offset+1;
		}
	} else {
		$string
	}

}

function Get-Rowboats {
"Welcome to Rowboats.txt. Please be careful of"
"the swimmers, and have a great day."
Get-Splitter (Filter-StringNums "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"|Filter-Rowboat) //UserAgent
"		c <	o	o	o	o			 " +(Get-Splitter (Filter-StringNums "hi t"|Filter-Rowboat)) // Message Chars 1-4
"	 /\/ /\/) /\/) /\/) /\/)		" +(Get-Splitter (Filter-StringNums "here"|Filter-Rowboat)) // Message Chars 5-8
"	__/_____/__/_/__/_/__/_/__/______"
"-~-~ '-----/----/----/----/-------' "
Get-Splitter (Filter-StringNums (get-date).toString()|Filter-Rowboat) // Current date string
"o,	o__ -~-~ o_/| o_.	-~-~ o,	o__ -~-~"
Get-Splitter (Filter-StringNums "10.20.30.40"|Filter-Rowboat) // User IP
}

*/

=======
})
>>>>>>> upstream/main
