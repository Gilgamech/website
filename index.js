//Copyright 2022 Gilgamech Technologies
//Title: Basic Webserver
//Made by: Stephen Gillie
//Created on: 6/17/2022
//Updated on: 6/18/2022
//Notes: 

const http = require("http");
const fs = require('fs');
var url  = require('url');

var responseData = "Hola Mundo";
var fourOhFour = "Hola Mundo";
var pagename = "index.html";


fs.readFile("/home/app/custerr/404.htm", 'utf8', function (err,data) {
	fourOhFour =  data;
	if (err) {
		"404 not found - "+err;
		console.log(err);
	}
});


const server = http.createServer((request, response) => {
    console.log("Request from "+request.socket.remoteAddress);
	if (request.url=='/'){
		pagename = "/index.html";
	} else {
		pagename = request.url;
	};
	fs.readFile("/home/app"+pagename, 'utf8', function (err,data) {
		responseData =  data;
		if (err) {
			responseData =  fourOhFour;
			console.log(err);
		}
    response.write(responseData,'utf8')
    response.end();
	});
})
  
// Server listening to port 3000
server.listen((80), () => {
    console.log("Server is Running");
})