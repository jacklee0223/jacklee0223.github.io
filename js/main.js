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
var boardEl = $('.tiles');
console.log (boardEl);
//initial score to be updated
var player1_Score = 0;
var player2_Score = 0;
//winner to be updated
var winner = '';
//Stores current matched or unmatched information
var matchStore = '';
//Stores last 2 clicked IDs
var id_memory = [];
//check if game is on (used for un/clickable function)
var gameOn = true;

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

var userClicksCard = function(event) {
  var idx = parseInt(this.id);
  if($(this).hasClass('tilesF')) {
    return;
    console.log('rejected')
  } else if($(this).hasClass('tiles')) {
    $(this).removeClass().addClass('tilesF')
    $(this).css('background-image', "url(css/img/sc" + shuffled_board[idx] + ".png" + ")");
    console.log('card flipped up');
    tiles_flipped ++;
    memory_values.push(shuffled_board[idx]);
    id_memory.push(this.id);
    match();
    getWinner();

  }
};

for(var i = 0; i < boardEl.length; i++) {
  boardEl[i].addEventListener('click', userClicksCard);
}

//changes player turn

function changeTurn() {
  if (currentPlayer == 'player1') {
    currentPlayer = 'player2';
    player_Score = 'player2_Score';
    setTimeout(function() {$('.arrow').css('background-image', 'url(css/img/compassR.png)');}, 500);
    console.log('player2')
  } else {
     currentPlayer = 'player1';
     player_Score = 'player1_Score';
     setTimeout(function() {$('.arrow').css('background-image', 'url(css/img/compassL.png)');}, 500);
     console.log('player1')
  }
}


//card flipback mechanism to be used for setTimeout within match()
function flipBack() {

  $('#'+id_memory[0]).removeAttr('style').removeClass().addClass('tiles');
  $('#'+id_memory[1]).removeAttr('style').removeClass().addClass('tiles');
  id_memory = [];
  console.log('flipback happened')
};


//check if there is any match
function match() {
  if(currentPlayer === 'player1') {
    if(memory_values[1] === undefined) {
      matchStore = '';
      console.log('one more');
    } else if (memory_values[0] === memory_values[1]) {
      console.log('match');
      matchStore = "matched";
      player1_Score++
      $('#player1_Score').html(player1_Score);
      memory_values = [];
      id_memory = [];
      $('.tiles').attr('disabled', 'disabled');
      setTimeout(function() {
      $('.tiles').removeAttr('disabled');
      }, 500);
      changeTurn();
    } else if (memory_values[0] !== memory_values[1]){
      console.log('no match');
      matchStore = "unmatched";
      setTimeout(flipBack, 500);
      tiles_flipped-=2;
      memory_values = [];
      $('.tiles').attr('disabled', 'disabled');
      setTimeout(function() {
      $('.tiles').removeAttr('disabled');
      }, 500);
      changeTurn();
    }
  } else if(currentPlayer === 'player2') {
      if(memory_values[1] === undefined) {
      matchStore = '';
      console.log('one more');
    } else if (memory_values[0] === memory_values[1]) {
      console.log('match');
      matchStore = 'matched';
      player2_Score++
      $('#player2_Score').html(player2_Score);
      memory_values = [];
      id_memory = [];
      $('.tiles').attr('disabled', 'disabled');
      setTimeout(function() {
      $('.tiles').removeAttr('disabled');
      }, 500);
      changeTurn();
    } else if (memory_values[0] !== memory_values[1]){
      console.log('no match');
      matchStore = "unmatched";
      setTimeout(flipBack, 500);
      tiles_flipped-=2;
      memory_values = [];
      $('.tiles').attr('disabled', 'disabled');
      setTimeout(function() {
      $('.tiles').removeAttr('disabled');
      }, 500);
      changeTurn();
    }
  }
};


//reset function
  function reset(){
    for(var i = 0; i < boardEl.length; i++) {
      shuffle(board);
      setTimeout(function() {$('.tilesF').removeClass().addClass('tiles').css('background-image', 'url(css/img/scb.png)');}, 500);
      tiles_flipped = 0;
      player1_Score = 0;
      player2_Score = 0;
      $('#player1_Score').html(0);
      $('#player2_Score').html(0);
    }
  };

//get winner

function getWinner() {
  if(tiles_flipped < 18) {
    return;
  } else if(tiles_flipped === 18) {
    if(player1_Score > player2_Score) {
      winner = "Soul Calibur";
      reset();
      console.log('P1 WIN');
      window.alert("Soul Calibur Wins");
    } else if(player2_Score > player1_Score) {
      winner = "Soul Edge";
      reset();
      console.log('P2 WIN');
      window.alert("Soul Edge Wins");
    } else {
      winner = "Tie";
      reset();
      console.log('Tie');
      window.alert("Tie");
    }
  }
};

//Audio Player

var audio;
var playlist;
var tracks;
var current;
var shuffled_playlist = shuffle($('#playlist'))


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




