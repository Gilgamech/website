// C:\Dropbox\repos\www\robot-fruit-hunt\mybot.js Build: 1 2017-01-29T11:39:45     






// 1 : 56 : if _returnval <> 0_   return returnval _; // end if returnval


//  # --> X
//  | 0,0 1,0 2,0
//  v 0,1 1,1 2,1 
//  Y 0,2 1,2 2,2
// 

var heatmap_percentage = .8;
var next_cell_percentage = .5;
var heatmap_incr = 3;

function make_move() {
	var board = get_board();
	var TargetX = 0;
	var TargetY = 0;
	var movedir = 0;
	var mywidth = get_my_x();
	var myheight = get_my_y();
	var b2 = ["none","east","north","west","south"];
	var widthdir = WEST;
	var heightdir = NORTH;
	var BoardHeight = (HEIGHT - 1);
	var BoardWidth = (WIDTH - 1);
	var fruittypehere = board[mywidth][myheight];

	// trace("Current location: " + mywidth + ", " + myheight);
	// trace("Board size: " + BoardWidth + ", " + BoardHeight + " - Max: " + Math.max(BoardHeight,BoardWidth));
	trace("Current max heatmap: " + max_heatmap_score() + " with cutoff:" + (max_heatmap_score() * heatmap_percentage));

   // we found an item! take it!
	if (fruittypehere > 0) {
		if (do_i_want_this(fruittypehere,mywidth,myheight,mywidth,myheight) == true) {
			trace("Taking item " + fruittypehere + " at: " + mywidth + ", " + myheight);
			return TAKE;
		} else {
			trace("Skipping item " + fruittypehere);
		}; // end if get_my_item_count
	};

//BoardHeight // (AKA y)
//BoardWidth // (AKA x)
// Look around us for more items to take.
// for (Incrementor = 0; Incrementor <= Math.max(BoardHeight,BoardWidth); Incrementor++) { 
for (HeightY = 0; HeightY <= BoardHeight; HeightY++) { 
// for (HeightY = 0; HeightY <= Math.max(BoardHeight,BoardWidth); HeightY++) { 
		var mhpY = myheight + HeightY;
		var mhmY = myheight - HeightY;
		// var mhpY = myheight + Incrementor;
		// var mhmY = myheight - Incrementor;
	//for (WidthX = 0; WidthX <= HeightY; WidthX++) { 
	for (WidthX = 0; WidthX <= BoardWidth; WidthX++) { 
		var mwpX = mywidth + WidthX;
		var mwmX = mywidth - WidthX;
		// var mwpX = mywidth + Incrementor;
		// var mwmX = mywidth - Incrementor;
		// console.log("movedir0: " + movedir);
			
			TargetX = mwpX;
			TargetY = mhpY;
			widthdir = EAST;
			heightdir = SOUTH;
			if (movedir == 0) {
				movedir = (locate_and_route_to_fruit(TargetX,TargetY,widthdir,heightdir));
		   }; // end if rand 
				// console.log("movedir1: " + movedir);
				// trace("Returning " + movedir);
				// return movedir;

			TargetX = mwmX;
			TargetY = mhpY;
			widthdir = WEST;
			heightdir = SOUTH;
			if (movedir == 0) {
				movedir = (locate_and_route_to_fruit(TargetX,TargetY,widthdir,heightdir));
		   }; // end if rand 
				// console.log("movedir2: " + movedir);
				// trace("Returning " + movedir);
			
			TargetX = mwpX;
			TargetY = mhmY;
			widthdir = EAST;
			heightdir = NORTH;
			if (movedir == 0) {
				movedir = (locate_and_route_to_fruit(TargetX,TargetY,widthdir,heightdir));
		   }; // end if rand 
				// console.log("movedir3: " + movedir);
				// trace("Returning " + movedir);
			
			TargetX = mwmX;
			TargetY = mhmY;
			widthdir = WEST;
			heightdir = NORTH;
			if (movedir == 0) {
				movedir = (locate_and_route_to_fruit(TargetX,TargetY,widthdir,heightdir));
		   }; // end if rand 
				// console.log("movedir4: " + movedir);
				// trace("Returning " + movedir);

		// trace("movedir5 " + movedir);
	if (movedir > 0) {
		// trace("Returning " + movedir);
		return movedir;
   }; // end if rand 

	}; // end for BoardWidth
}; // end for BoardHeight
	
trace("Error: failed to locate fruit!");
trace("Error: failed to locate fruit!");
trace("Error: failed to locate fruit!");
trace("Error: failed to locate fruit!");
trace("Error: failed to locate fruit!");
// Waiting for the opponent to win.

	//Otherwise, move randomly.
if (movedir == 0) {
	var rand = Math.ceil(Math.random() * 4);
	trace("Rand " + b2[rand]);
	return rand
}; // end if movedir
} // end make_move 

// One function to make a "pointmap" showing the relative contribution to winning the game.
// Another function to turn that into some kind of "value" - the relative contribution of an area to winning the game.
// Dynamically generate regions and areas by grouping fruit. 
// Look up how to identify shapes with, like ML in Javascript.

function do_i_want_this(fruittype,mywidth,myheight,TargetX,TargetY) {
	if ((get_my_item_count(fruittype)) > (get_total_item_count(fruittype) /2)
	|| (get_opponent_item_count(fruittype)) > (get_total_item_count(fruittype) /2)) {
		return false 
	}; // end if get_my_item_count
	
	if (get_opponent_x() == TargetX
	&& get_opponent_y() == TargetY
	&& (get_opponent_x() !== mywidth
	&& get_opponent_y() !== myheight)) {
		trace("Skipping this one because opponent is closer.");
		return false
	}; // end if get_opponent_x
	
	var heatmap = get_heatmap();
	if (heatmap[TargetX][TargetY] >= ( max_heatmap_score() * heatmap_percentage) ) {
		trace("Heatmap score " + heatmap[TargetX][TargetY] + " OK!");
		return true 
		} else {
		trace("Heatmap score " + heatmap[TargetX][TargetY] + " too low.");
		return false
	}; // end if get_opponent_x

	return true 
}; // end do_i_want_this
	
	
function fruit_type_still_on_board_fun() {
	return Board.totalItems;
}; // end min_fruit_type_still_on_board

function min_fruit_type_still_on_board_fun() {
	var fruit_left_on_board = fruit_type_still_on_board_fun();
	var min_fruit_type_still_on_board = Math.max.apply(Math, fruit_type_still_on_board_fun());

	for (i=0;i<(fruit_left_on_board.length); i++) {
		if (fruit_left_on_board[i] > 0) { 
			min_fruit_type_still_on_board = Math.min(min_fruit_type_still_on_board,(i+1));
		};
	}; // end for i

	
	return min_fruit_type_still_on_board;
}; // end min_fruit_type_still_on_board
	
function max_heatmap_score() {
	var heatmap = get_heatmap();
	var max_heatmap_score = 0;
	
	for (j=0;j<(heatmap.length); j++) {
		for (i=0;i<(heatmap[0].length); i++) {
			if (heatmap[j][i] > 0) {
				max_heatmap_score = Math.ceil( Math.max(max_heatmap_score,heatmap[j][i]) *100) / 100;
			};
		}; // end for i
	}; // end for i

	
	return  max_heatmap_score;
}; // end max_heatmap_score
	
function get_current_item_count(item) {
	return (get_total_item_count(item) - (get_opponent_item_count(item) + get_my_item_count(item)));
}; // end get_current_item_count
	
function get_heatmap() {
	//Set up heatmap to be same size as board, then zero out.
	var board = get_board();
	var heatmap = [];

	for (var i = 0; i < board.length; i++) {
		heatmap[i] = board[i].slice();
	}; // end for j

	for (j=0;j<(board.length); j++) {
		for (i=0;i<(board[0].length); i++) {
			
			/*
			*/
			var fruittype = board[j][i]
			var itemvalhere = 0;
			var itemval = 0;
			var total_number_to_win  = Math.ceil(get_total_item_count(fruittype)/2);

			if ((get_my_item_count(fruittype)) > (get_total_item_count(fruittype) /2)
			|| (get_opponent_item_count(fruittype)) > (get_total_item_count(fruittype) /2)) {
			// if  ( total_number_to_win <= get_opponent_item_count(fruittype) ) { 
			// total_number_to_win = total_number_to_win - get_opponent_item_count(fruittype);
				total_number_to_win = 0;
			} else {
				itemvalhere = (1 / Math.abs(total_number_to_win - get_my_item_count( fruittype ) ));
			}; // end if total_number_to_win
			// var itemvalhere = (Math.ceil( (1 / ( Math.ceil( (get_total_item_count( fruittype )  / 2) - get_opponent_item_count(fruittype)  )) - get_my_item_count( fruittype )) *100)/100);
			
			if (fruittype > 0) {
				heatmap[j][i] = itemvalhere;

				itemvalhere = itemvalhere*next_cell_percentage;
				if (i+1 < heatmap[0].length
				&& board[j][i+1] > 0) {
					heatmap[j][i+1] += itemvalhere;
				}; // end if fruittype
					
				if (i-1 >= 0
				&& board[j][i-1] > 0) {
					heatmap[j][i-1] += itemvalhere;
				}; // end if fruittype
					
				if (j+1 < heatmap.length
				&& board[j+1][i] > 0) {
					heatmap[j+1][i] += itemvalhere;
				}; // end if fruittype
					
				if (j-1 >= 0
				&& board[j-1][i] > 0) {
					heatmap[j-1][i] += itemvalhere;
				}; // end if fruittype
				
				/*
				itemvalhere = itemval;

				// var fc_incr = 1;
				
				
				for (fc_incr = 1; fc_incr < heatmap_incr; fc_incr++) { 
				itemvalhere = itemval*next_cell_percentage * (1/(fc_incr));
				
					if (i+fc_incr < heatmap[0].length
					&& board[j][i+fc_incr] > 0) {
						heatmap[j][i+fc_incr] += itemvalhere;
					}; // end if fruittype
						
					if (i-fc_incr >= 0
					&& board[j][i-fc_incr] > 0) {
						heatmap[j][i-fc_incr] += itemvalhere;
					}; // end if fruittype
						
					if (j+fc_incr < heatmap.length
					&& board[j+fc_incr][i] > 0) {
						heatmap[j+fc_incr][i] += itemvalhere;
					}; // end if fruittype
						
					if (j-fc_incr >= 0
					&& board[j-fc_incr][i] > 0) {
						heatmap[j-fc_incr][i] += itemvalhere;
					}; // end if fruittype
					
					
					if (i+fc_incr < heatmap[0].length
					&& j+fc_incr < heatmap.length
					&& board[j][i+fc_incr] > 0
					&& board[j+fc_incr][i] > 0) {
						heatmap[j+fc_incr][i+fc_incr] += itemvalhere;
					}; // end if fruittype
						
					if (i-fc_incr >= 0
					&& j+fc_incr < heatmap.length
					&& board[j][i-fc_incr] > 0
					&& board[j+fc_incr][i] > 0) {
						heatmap[j+fc_incr][i-fc_incr] += itemvalhere;
					}; // end if fruittype
						
					if (i+fc_incr < heatmap[0].length
					&& j-fc_incr >= 0
					&& board[j][i+fc_incr] > 0
					&& board[j-fc_incr][i] > 0) {
						heatmap[j-fc_incr][i+fc_incr] += itemvalhere;
					}; // end if fruittype
						
					if (i-fc_incr >= 0
					&& j-fc_incr >= 0
					&& board[j][i-fc_incr] > 0
					&& board[j-fc_incr][i] > 0) {
						heatmap[j-fc_incr][i-fc_incr] += itemvalhere;
					}; // end if fruittype
				
				}; // end for fc_incr
				*/

			}; // end if fruittype
				
		}; // end for i
	}; // end for j

	return heatmap;
}; // end make_heat_map
	
function locate_and_route_to_fruit(TargetX,TargetY,widthdir,heightdir) {
	// Takes the search target X and target Y, the width direction number and height direction number. 
	// Outputs the correct direction number to get you closer to fruit. 
	// (A fruit, but sometimes not the closest, need to work on that.)
	var board = get_board();
	var mywidth = get_my_x();
	var myheight = get_my_y();
	var BoardHeight = (HEIGHT - 1);
	var BoardWidth = (WIDTH - 1);
	var b2 = ["none","east","north","west","south"];
	
	if ( TargetX >= 0 && TargetX <= BoardWidth 
	&& TargetY >= 0 && TargetY <= BoardHeight ){ 
		// trace("Scanning X: " + TargetX + ", Y: " + TargetY);
		var fruittype = board[TargetX][TargetY];
		if (fruittype > 0) {
			//If the location has a piece of fruit, and the Width increment (distance there) is higher, go sideways, otherwise the Height increment is higher so go vertical.
			if (do_i_want_this(fruittype,mywidth,myheight,TargetX,TargetY) == true) {
					var WidthX = Math.abs(mywidth - TargetX); 
					var HeightY = Math.abs(myheight - TargetY);
					//trace("Distance X: " + WidthX + ", Y: " + HeightY);
				if (WidthX < HeightY) {
					trace("Item " + fruittype + " located at " + TargetX + ", " + TargetY + " - Moving " + b2[heightdir]);
					return heightdir;
				} else {
					trace("Item " + fruittype + " located at " + TargetX + ", " + TargetY + " - Moving " + b2[widthdir]);
					return widthdir;
				}; // end if WidthX
			}; // end if do_i_want_this
			trace("Skipping item " + fruittype);
	   }; // end if fruittype
	}; // end if TargetX

	return 0
}; // end locate_and_route_to_fruit

/* 
 */

/*	Do I want this piece of fruit? 
	No if:
	Picking up the piece of fruit won't help me win.
	Picking up the piece of fruit won't help opponent lose.
	It's much farther away than other fruits that I also want.
	
	Yes if:
	I have fewer than half of that fruit, and so does my opponent, 
	because then more than half of that fruit remains.
	I have exactly half of that fruit, because I want more than half to win.
	My opponent does not have half, but there's enough on the board to let him get half.
 */	

			
			
function new_game() {
trace("New Game!");
trace("New Game!");
trace("New Game!");
trace("New Game!");
trace("New Game!");
trace("New Game!");
}
// Optionally include this function if you'd like to always reset to a 
// certain board number/layout. This is useful for repeatedly testing your
// bot(s) against known positions.
//
//function default_board_number() {
//    return 123;
//}


// BoardWidth = <width of game board>
// BoardHeight = <height of game board>

// Returns the current board.
// It's an array of arrays, so 
//  board = get_board();
//  field = board[x,y];
// can be used to get a position.
// function get_board()

// Current position of your bot.
// function get_my_x()
// function get_my_y()

// Current position of your opponent.
// function get_opponent_x()
// function get_opponent_y()

// EAST = <constant used to represent going right>
// NORTH = <constant used to represent going up>
// WEST = <constant used to represent going left>
// SOUTH = <constant used to represent going south>
// TAKE = <constant used to represent taking a piece of fruit if it exists on the cell>
// PASS = <constant used to represent passing the turn>

// (Deprecated) For a given field (board[x,y]), if there's a fruit at
// that position, return the index of that fruit (starting with 1),
// or false if there's no fruit there. This is a convenience
// function that checks whether field>0.
// function has_item(field)

// Return the number of different fruit types. Each fruit type might
// be on the board multiple times (use get_total_item_count(type))
// to query how often). Your goal is to have the most fruit as
// many categories as possible.
// function get_number_of_item_types()

// Returns the number of fruits you or your opponent have.
// E.g. if get_my_item_count(1) returns 3, you have 3 pieces
// of the fruit 1.
// function get_my_item_count(type)
// function get_opponent_item_count(type)

// Returns the total number of fruits available for a given
// category. E.g. if get_total_item_count(2) returns 5,
// a total of 5 fruits of type 2 exists on the board and
// the players inventories.
// function get_total_item_count(type)

// Print out a line of text, for debugging. This text will
// be visible to the author of the bot in the game replays
// and in the compile logs.
// Notice: Unlike in browsers, this function only works for strings.  
// (Note that strings longer than 1024 characters won't be displayed,
//  also the total limit of log output you can generate is 16k)
// trace(string)

// Implement this function, and return either
// NORTH, EAST, SOUTH, WEST, or TAKE.
// function make_move()

// Optionally implement this function. It will be called
// at the start of the game.
// function new_game()
