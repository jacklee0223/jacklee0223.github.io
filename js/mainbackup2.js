console.log('main.js connected')

//stores shuffled_board[idx] when clicking tiles
var memory_values = [];
//counts how many tiles are flipped
var tiles_flipped = 0;
//empty board to be shuffled
var board = ['1','1','2','2','3','3','4','4','5','5','6','6','7','7','8','8','9','9'];
//current player1/2 to be changed after each turn
var currentPlayer = 'player1'
//keep track of score for each
var player_Score = 'player1_Score'
//tiles from HTML
var boardEl = document.getElementsByClassName('tiles');
console.log (boardEl);
//determines whether game is being played or not
var game_on = "true";
//initial score to be updated
var player1_Score = 0;
var player2_Score = 0;
//winner to be updated
var winner = '';

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

//Event Listener (For Loop)

for(var i = 0; i < boardEl.length; i++) {
  boardEl[i].addEventListener('click', function () {
    var idx = parseInt(this.id) - 1;
    $(this).css('background-image', "url(css/img/sc" + shuffled_board[idx] + ".png" + ")");
    $(this).removeClass('tiles').addClass('tilesF');
    tiles_flipped ++;
    console.log(this);
    memory_values.push(shuffled_board[idx]);
    match();
    getWinner();
  });
}


//changes player turn

function changeTurn() {
  if (currentPlayer == 'player1') {
    currentPlayer = 'player2';
    player_Score = 'player2_Score';
    console.log('player2')
  } else {
     currentPlayer = 'player1';
     player_Score = 'player1_Score';
     console.log('player1')
  }
}

//See if there is any match

function match() {
  if(currentPlayer === 'player1') {
    if(memory_values[1] === undefined) {
      console.log('one more');
      return;
    } else if (memory_values[0] === memory_values[1]) {
      console.log('match');
      player1_Score++
      $('#player1_Score').html(player1_Score);
      changeTurn();
      memory_values = [];
    } else if (memory_values[0] !== memory_values[1]){
      console.log('no match');
      changeTurn();
      memory_values = [];
    }
  } else {
      if(memory_values[1] === undefined) {
      console.log('one more');
      return;
    } else if (memory_values[0] === memory_values[1]) {
      console.log('match');
      player2_Score++
      $('#player2_Score').html(player2_Score);
      changeTurn();
      memory_values = [];
    } else if (memory_values[0] !== memory_values[1]){
      console.log('no match');
      changeTurn();
      memory_values = [];
    }
  }
};

function flipback() {}

//get winner

function getWinner() {
  if(tiles_flipped < 18) {
    return;
  } else if(tiles_flipped === 18) {
    if(player1_Score > player2_Score) {
      winner = "Soul Calibur";
      console.log('P1 WIN');
      window.alert("Soul Calibur Wins")
    } else if(player2_Score > player1_Score) {
      winner = "Soul Edge";
      console.log('P2 WIN');
      window.alert("Soul Edge Wins")
    } else {
      winner = "Tie";
      console.log('Tie');
      window.alert("Tie")
    }
  }
};




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




