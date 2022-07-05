//Copyright 2022 Gilgamech Technologies
//Title: Basic Webserver
//Made by: Stephen Gillie
//Created on: 6/17/2022
//Updated on: 7/5/2022
//Notes: 

const http = require("http");
const https = require("https");
const fs = require('fs');
const url  = require('url');
const serverPort = 80;

var FruitBotwin = 0;
var FruitBotloss = 0;
var FruitBottie = 0;

var error404 = "404 Not Found";
var pagename = "/index.html";
var optionsData = 'HTTP/1.1 200 OK\nAllow: GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS\nAccess-Control-Allow-Origin: https://Gilgamech.com\nAccess-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,HEAD,OPTIONS\nAccess-Control-Allow-Headers: Content-Type'
// Listing of files, to more safely check inputs.
const files = fs.readdirSync("/home/app");

fs.readFile("/home/app/custerr/404.htm", 'utf8', function (err,data) {
	error404 =  data;
	if (err) {
		console.log(err);
	}
});

const server = http.createServer((request, response) => {
// const server = https.createServer((request, response) => {
		// key: fs.readFileSync("/etc/letsencrypt/archive/example.com/privkey1.pem"),
		// cert: fs.readFileSync("/etc/letsencrypt/archive/example.com/fullchain1.pem"),
		// ca: fs.readFileSync("/etc/letsencrypt/archive/example.com/chain1.pem")
	var statusCode = 200;
	var responseData = "";
	var contentType = 'text/plain';
	var encodingType = '';
	console.log(request.method+" request from "+request.socket.remoteAddress+" for page "+pagename);

	if (request.url=='/'){
		pagename = "/index.html";
	} else {
		pagename = request.url;
	};

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
		break;
	}//end switch pagename
	
	switch(pagename) {
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
					console.log("404 error: "+pagename+" not found.");
					response.writeHead(404, {'Content-Type': 'text/html'}); 
					response.end(error404);
				} 
				response.writeHead(statusCode, {'Content-Type': contentType}); 
				response.end(responseData);
			});
		} else {
			console.log("404 error: "+pagename+" not found.");
			response.writeHead(404, {'Content-Type': 'text/html'}); 
			response.end(error404);
		}
		break;
	} // end switch pagename
})
  
server.listen((serverPort), () => {
	console.log("Server is Running on port "+serverPort);
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
