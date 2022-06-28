var GamePlay = {
    init: function() {
        GamePlay.canvas = document.getElementById('game_view');
        $('.pause').bind('click', function() { GamePlay.mode = "pause";});
        $('.play').bind('click', function() { GamePlay.mode = "play"; Board.processMove(); GamePlay.draw();});
        $('.forward').bind('click', function() { Board.processMove(); GamePlay.draw();});
        $('.newgame').bind('click', function() { GamePlay.setupNewGame();});
        $('.reset').bind('click', function() { Board.reset();});
        $('#set_board').bind('click', function() { GamePlay.setBoardNumber();});
        $('#board_number').bind('keyup', function(e) { if(e.keyCode == 13) {GamePlay.setBoardNumber();}});

        $('#check_breadcrumbs').click(function(evt) {
          if (evt.srcElement.checked) {
            GamePlay.show_breadcrumbs = true;
          } else {
            GamePlay.show_breadcrumbs = false;
          }
        });

        GamePlay.show_breadcrumbs = false;
        var itemImageUrls = ["/FruitBot/images/FruitApple.png", "/FruitBot/images/FruitBanana.png", "/FruitBot/images/FruitCherry.png", "/FruitBot/images/FruitMelon.png", "/FruitBot/images/FruitOrange.png"];
        GamePlay.itemimages = new Array();
        for (var i=0; i<itemImageUrls.length; i++) {
            var img = new Image();
            img.src = itemImageUrls[i];
            GamePlay.itemimages[i] = img;
        }
        GamePlay.player_one_image = new Image();
        GamePlay.player_one_image.src = "/FruitBot/images/FruitBlueBot.png";
        GamePlay.player_two_image = new Image();
        GamePlay.player_two_image.src = "/FruitBot/images/FruitPurpleBot.png";
        GamePlay.visitedImg = new Image();
        GamePlay.visitedImg.src = "/FruitBot/images/FruitCellVisited.png";
        GamePlay.bothVisitedImg = new Image();
        GamePlay.bothVisitedImg.src = "/FruitBot/images/FruitCellVisitedBoth.png";
        GamePlay.oppVisitedImg = new Image();
        GamePlay.oppVisitedImg.src = "/FruitBot/images/FruitCellOppVisited.png";
        GamePlay.FruitCellImg = new Image();
        GamePlay.FruitCellImg.src = "/FruitBot/images/FruitCell.png";
        GamePlay.itemimages[itemImageUrls.length - 1].onload = function(){
            GamePlay.setupNewGame();
        };

    },
    setupNewGame: function(boardNumber) {
        // Create a new board setup according to the following priority:
        // 
        // 1. If a board number is passed in, use that.
        // 2. If the bot has default_board_number() defined, use that.
        // 3. Generate a random board number.
        var nextBoardNum;

        if(boardNumber === undefined) {
            if ( typeof default_board_number == 'function' && !isNaN(parseInt(default_board_number()))) {
                nextBoardNum = default_board_number()
            } else {
                Math.seedrandom();
                nextBoardNum = Math.min(Math.floor(Math.random() * 999999), 999999);
            }
        } else {
            nextBoardNum = boardNumber;
        }

        $('#board_number').val(nextBoardNum);

        Board.init(nextBoardNum);

        Board.newGame();
        GamePlay.itemTypeCount = get_number_of_item_types();
        document.getElementById('game_view').width = GamePlay.itemTypeCount * 50 + WIDTH * 50;
        document.getElementById('game_view').height = HEIGHT * 50;
        $('#buttons').css('padding-left', GamePlay.itemTypeCount * 50);
        $('#buttons').css('padding-top', HEIGHT * 50);
        GamePlay.start();
    },
    start: function() {
        GamePlay.mode = "play";
        // GamePlay.mode = "pause";
        GamePlay.draw();
    },
    draw: function() {
        var ctx = GamePlay.canvas.getContext('2d');
        ctx.clearRect(0,0,GamePlay.canvas.width,GamePlay.canvas.height);
        GamePlay.drawItems(ctx, Board.board, Board.history);
        GamePlay.drawPlayerTwo(ctx, Board.board);
        GamePlay.drawPlayerOne(ctx, Board.board);
        GamePlay.displayScore(ctx, Board.board);
				//document.getElementById("wins").innerHTML = ((document.getElementById("wins").innerHTML++)+1);
				//document.getElementById("ties").innerHTML = ((document.getElementById("ties").innerHTML++)+1);
				//document.getElementById("losses").innerHTML = ((document.getElementById("losses").innerHTML++)+1);
        if (GamePlay.mode == "play") {
           var score = Board.checkGameOver();
			var div = document.getElementById('FruitBottext');
           if (score !== undefined) {
			   ctx.font = "30px Arial";
			   ctx.fillStyle = "#000";
               if (score > 0) {
				GamePlay.FruitBotWins++
				   try{
				    xhrRequest("POST","/FruitBotwin", function(response) {
						var fruitResponse = JSON.parse(response)[0]
						writeElement("scoreWins",fruitResponse.FruitBotwins)
						writeElement("scoreTies",fruitResponse.botstie)
						writeElement("scoreLoss",fruitResponse.simplebotwins)
					}); // end loadJSON
				}catch(e){
					writeElement("scoreWins",GamePlay.FruitBotWins)
				}
				
               } //end if score
               if (score < 0) {
				   GamePlay.simplebotWins++
				   try{
				    xhrRequest("POST","/FruitBotloss", function(response) {
						var fruitResponse = JSON.parse(response)[0]
						writeElement("scoreWins",fruitResponse.FruitBotwins)
						writeElement("scoreTies",fruitResponse.botstie)
						writeElement("scoreLoss",fruitResponse.simplebotwins)
					}); // end loadJSON
				}catch(e){
					writeElement("scoreLoss",GamePlay.simplebotWins)
				}
               } //end if score
               if (score == 0) {
				   GamePlay.botsTie++
				   try{
					xhrRequest("POST","/FruitBottie", function(response) {
						var fruitResponse = JSON.parse(response)[0]
						writeElement("scoreWins",fruitResponse.FruitBotwins)
						writeElement("scoreTies",fruitResponse.botstie)
						writeElement("scoreLoss",fruitResponse.simplebotwins)
					}); // end loadJSON
				}catch(e){
					writeElement("scoreTies",GamePlay.botsTie)
				}
               } //end if score
			   GamePlay.init();
               return;
		   } //end if score
           Board.processMove();
           setTimeout(function() {GamePlay.draw();}, 500);
        } else {
           GamePlay.mode = "pause";
        }
    },
    displayScore: function(ctx, state) {
        ctx.font = "30px Arial";
        ctx.fillStyle = "#366B76";
        ctx.fillText("My Bot - "+GamePlay.FruitBotWins, 0, 50);
        ctx.font = "15px Arial";
        ctx.fillStyle = "#000";
        for (var i=0; i<GamePlay.itemTypeCount; i++) {
			if (Board.myBotCollected[i].toFixed(1) > (Board.totalItems[i]/2)){
				ctx.beginPath();
				ctx.fillStyle = 'green';
				ctx.arc(50*i+15, 70, 10, 0, 2 * Math.PI, false);
				ctx.fill();
			}
			ctx.fillStyle = "#000";
			ctx.fillText(Board.myBotCollected[i].toFixed(1), 50*i, 75);
            ctx.drawImage(GamePlay.itemimages[i], 52*i+15, 55, 25, 25);
        }
        ctx.font = "30px Arial";
        ctx.fillStyle = "#82298E";
        ctx.fillText("Simple Bot - "+GamePlay.simplebotWins, 0, 125);
        ctx.font = "15px Arial";
        ctx.fillStyle = "#000";
        for (var i=0; i<GamePlay.itemTypeCount; i++) {
			if (Board.simpleBotCollected[i].toFixed(1) > (Board.totalItems[i]/2)){
				ctx.beginPath();
				ctx.fillStyle = 'green';
				ctx.arc(50*i+15, 145, 10, 0, 2 * Math.PI, false);
				ctx.fill();
			}
			ctx.fillStyle = "#000";
            ctx.fillText(Board.simpleBotCollected[i].toFixed(1), 50*i, 150);
            ctx.drawImage(GamePlay.itemimages[i], 52*i+15, 130, 25, 25);
        }
        ctx.font = "30px Arial";
        ctx.fillStyle = "#F00";
        ctx.fillText("items left - "+GamePlay.botsTie, 0, 200);
        ctx.font = "15px Arial";
        ctx.fillStyle = "#000";
		
        for (var i=0; i<GamePlay.itemTypeCount; i++) {
			var $itemsRemaining = (Board.totalItems[i]-Board.myBotCollected[i]-Board.simpleBotCollected[i])
			ctx.beginPath();
			if ($itemsRemaining == 0){ // if zero remain
				ctx.fillStyle = 'white';
			}else if (Board.myBotCollected[i].toFixed(1) > (Board.totalItems[i]/2)){ // if my bot has more than half of total aka won the column
				ctx.fillStyle = 'white';
			}else if (Board.simpleBotCollected[i].toFixed(1) > (Board.totalItems[i]/2)){// if simplebot has more than half of total aka won the column
				ctx.fillStyle = 'white';
			}else if ($itemsRemaining == Math.floor(Board.totalItems[i]/2)+1){// if there is one more than half of total remaining
				ctx.fillStyle = 'red';
			}else if ($itemsRemaining > (Board.totalItems[i]/2)){// if more than one more than half of total remain
				ctx.fillStyle = 'yellow';
			}else if ($itemsRemaining+Board.myBotCollected[i] > (Board.totalItems[i]/2)){// if my bot and remaining are more than half of total
				ctx.fillStyle = 'red';
			}else if ($itemsRemaining+Board.simpleBotCollected[i] > (Board.totalItems[i]/2)){// if simplebot and remaining are more than half of total
				ctx.fillStyle = 'red';
			}else {
				ctx.fillStyle = "white";
			}
			ctx.arc(50*i+15, 220, 10, 0, 2 * Math.PI, false);
			ctx.fill();
			ctx.fillStyle = "#000";
            ctx.fillText($itemsRemaining.toFixed(1), 50*i, 225);
            ctx.drawImage(GamePlay.itemimages[i], 52*i+15, 205, 25, 25);
        }
    },
    drawPlayerOne: function(ctx, state) {
        ctx.drawImage(GamePlay.player_one_image, GamePlay.itemTypeCount * 50 + Board.myX * 50 + 2, Board.myY * 50 + 2);
    },
    drawPlayerTwo: function(ctx, state) {
        ctx.drawImage(GamePlay.player_two_image, GamePlay.itemTypeCount * 50 + Board.oppX * 50 - 2, Board.oppY * 50 - 2);
    },
    drawItems: function(ctx, state, history) {
        for (var i=0; i<WIDTH; i++) {
            for (var j=0; j<HEIGHT; j++) {
				ctx.drawImage(GamePlay.FruitCellImg, Board.numberOfItemTypes * 50 + i * 50, j * 50);
                if (state[i][j] !== 0) {
                    ctx.drawImage(GamePlay.itemimages[state[i][j] - 1], GamePlay.itemTypeCount * 50 + i * 50, j * 50);
                } else if (GamePlay.show_breadcrumbs && history[i][j]==1) {
                    ctx.drawImage(GamePlay.visitedImg, GamePlay.itemTypeCount * 50 + i * 50, j * 50);
                } else if (GamePlay.show_breadcrumbs && history[i][j]==2) {
                    ctx.drawImage(GamePlay.oppVisitedImg, GamePlay.itemTypeCount * 50 + i * 50, j * 50);
                } else if (GamePlay.show_breadcrumbs && history[i][j]==3) {
                    ctx.drawImage(GamePlay.bothVisitedImg, GamePlay.itemTypeCount * 50 + i * 50, j * 50);
                }
            }
        }
    },
    setBoardNumber: function() {
        var boardNumber;

        boardNumber = parseInt($('#board_number').val());
        if (!isNaN(boardNumber)) {
            GamePlay.setupNewGame(boardNumber);
        } else {
            GamePlay.setupNewGame();
        }
    }
}
// https://laracasts.com/discuss/channels/general-discussion/load-json-file-from-javascript
function xhrRequest($verb,$location,$callback,$JSON,$file,$cached) { 
var xobj = new XMLHttpRequest(); if ($verb == 'POST') { xobj.overrideMimeType('text/plain'); } else if ($verb == 'GET') { xobj.overrideMimeType('application/json'); } else if ($verb == 'PUT') { xobj.overrideMimeType('application/json'); } else { xobj.overrideMimeType('text/plain'); }; xobj.open($verb, $location, true); xobj.onreadystatechange = function () { try { if (xobj.status == '200') { if (xobj.readyState == 4) { var $returnVar = xobj.responseText; if ($JSON) { var $returnVar = JSON.parse($returnVar); }; $callback($returnVar); }; } else { $callback(xobj.status+' Error: '+xobj.statusText); }; } catch {}; }; xobj.send($file); 
};

GamePlay.FruitBotWins = 0;
GamePlay.simplebotWins = 0;
GamePlay.botsTie = 0;
try{
	xhrRequest("POST","/FruitBottotals", function(response) {
		var fruitResponse = JSON.parse(response)[0]
		writeElement("scoreWins",fruitResponse.FruitBotwins)
		writeElement("scoreTies",fruitResponse.botstie)
		writeElement("scoreLoss",fruitResponse.simplebotwins)
	}); // end loadJSON
}catch(e){
	writeElement("scoreLoss",GamePlay.simplebotWins)
	writeElement("scoreWins",GamePlay.FruitBotWins)
	writeElement("scoreTies",GamePlay.botsTie)
}
GamePlay.init();
