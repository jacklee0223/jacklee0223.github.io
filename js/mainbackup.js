console.log('main.js connected')

var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
var board = ['1','1','2','2','3','3','4','4','5','5','6','6','7','7','8','8','9','9'];
var currentPlayer = 'player1'
var boardEl = document.getElementsByClassName('tiles');
console.log (boardEl);
var game_on = "true";

//shuffle images

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random()*currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;

  }

  return array;
}

//shuffle board
var shuffled_board = shuffle(board);

//Add ID based on shuffle
function addId() {
  for(var i=0; i < boardEl.length; i++) {
    $('.tiles').each(function () {
      code = attr('id', shuffled_board[i]);
      })
    }
};

//User Stories: Initialize with randomized cards. Tried putting boardEl, board[i], array[randomIndex], shuffle(array) into the second part of attr.


// function setImages() {
//   for (var i = 0; i <18; i++) {
//     var $button = $('#mainSquare button');
//     $button.eq[i].text(images[i]).css('"display", "none"');
//     console.log(images[i]);
//   }
// }

//Create click event listeners for all tiles


// var boardEl = document.getElementsByClassName('tiles');
// console.log (boardEl);


for(var i = 0; i < boardEl.length; i++) {
  boardEl[i].addEventListener('click', function () {
    console.log(this);
    // $('.tiles').removeAttr('id').attr('id', board[i]);
    $(this).css('background-image', "url(css/img/sc" + this.id + ".png" + ")");
    tiles_flipped ++;


  });
}


//I either have to figure out how to add board[i] to the ID, or how to shuffle the board ID

// //checks if there's a winner
// var check_if_match = function(){
//   if (tiles_flipped === 1){
//     return;
//   } else if (tiles_flipped === 2){

//     //checks to see if two cards match
//     //I'm sure there's some way to make this shorter somehow
//       if (memory_value[0].hasId('1') && memory_value[1].hasClass('1') || memory_value[0].hasClass('2') && memory_value[1].hasClass('2') || memory_value[0].hasClass('3') && memory_value[1].hasClass('3') || memory_value[0].hasClass('4') && memory_value[1].hasClass('4') || memory_value[0].hasClass('5') && memory_value[1].hasClass('5') || memory_value[0].hasClass('6') && memory_value[1].hasClass('6') || memory_value[0].hasClass('7') && memory_value[1].hasClass('7') || memory_value[0].hasClass('8') && memory_value[1].hasClass('8') || memory_value[0].hasClass('9') && memory_value[1].hasClass('9'))  {
//       // if (memory_value[0] === memory_value[1])  {

//       //turns off the ability to click on cards while two mismatches are turned upright
//       game_on = "false";

//       //add points to player score
//       if (current_player === "player1"){
//         $('#player1_Score').html(player1_Score += 1);

//         //Determines Winner after board is cleared.,
//         if(player1_Score + player2_Score === 12 && player1_Score > player2_Score){
//           alert("player 1 wins!!");
//         }else if(player1_Score + player2_Score === 12 && player1_Score === player2_Score){
//           alert("Tie!!");
//         }

//       } else {
//         $('#player2_Score').html(player2_Score += 1);

//         if(player1_Score + player2_Score === 12 && player2_Score > player1_Score){
//           alert("player 2 wins!!");
//         }else if(player1_Score + player2_Score === 12 && player1_Score === player2_Score){
//           alert("Tie!!");
//         }

//       }


//       //fades out matches
//       memory_value[0].fadeTo(1000, 0);
//       memory_value[1].fadeTo(1000, 0);


//       //the 2 cards turned over get added to array, then array is erased
//       var reset_mem_value = function(){
//         memory_value = [];
//         game_on = "true";
//         console.log(game_on);
//       }
//       //after cards fade out, can click on new cards, but not before
//       setTimeout(reset_mem_value, 1100);

//       //number of cards that can be flipped gets reset
//       tiles_flipped = 0;

//       //if no match
//     }else {
//       changeTurn();

//       game_on = "false";
//       console.log(game_on);

//       //flip mismatches back over after a second
//     var flip_cards = function(){
//       memory_value[0].addClass('back');
//       memory_value[1].addClass('back');
//       memory_value = [];
//       game_on = "true";
//       console.log(game_on);
//     };
//     setTimeout(flip_cards, 1000);
//       tiles_flipped = 0;
//     }
//   }
// }

// //changes player turn
// function changeTurn() {
//   if (current_player == 'player1') {
//     //player changes color
//     $('#player1 p').removeClass('player1Current');
//     current_player = 'player2';
//   } else {
//     $('#player2 p').removeClass('player2Current');
//      current_player = 'player1';
//   }
// }

// //checks whose turn it is
// var check_current_player = function(){
//   if (current_player === "player1"){
//     $('#player1 p').addClass('player1Current');

//     //border of card changes depending on player
//     $(".square").hover(function() {
//         $(this).removeClass("player2_current");
//     });

//       $(".square").hover(function() {
//       $(this).addClass("player1_current");
//     }, function() {
//       $(this).removeClass("player1_current");
//     });

//     }else if (current_player === "player2"){
//        $('#player2 p').addClass('player2Current');

//       $(".square").hover(function() {
//       $(this).removeClass("player1_current");
//     });

//       $(".square").hover(function() {
//       $(this).addClass("player2_current");
//     }, function() {
//       $(this).removeClass("player2_current");
//     });
//   }
// }

// //turns classes of player 1 on
// check_current_player();



//Audio Player

var audio;
var playlist;
var tracks;
var current;

init();
function init(){
    current = 0;
    audio = $('#audio');
    playlist = $('#playlist');
    tracks = playlist.find('li a');
    len = tracks.length - 1;
    audio[0].volume = 1;
    audio[0].play();
    playlist.find('a').click(function(e){
        e.preventDefault();
        link = $(this);
        current = link.parent().index();
        run(link, audio[0]);
    });
    audio[0].addEventListener('ended',function(e){
        current++;
        if(current == len){
            current = 0;
            link = playlist.find('a')[0];
        }else{
            link = playlist.find('a')[current];
        }
        run($(link),audio[0]);
    });
}
function run(link, player){
        player.src = link.attr('href');
        par = link.parent();
        par.addClass('active').siblings().removeClass('active');
        audio[0].load();
        audio[0].play();
}




