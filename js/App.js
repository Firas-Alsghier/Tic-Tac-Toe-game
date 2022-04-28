// Defining The Variables
const startBtn = document.getElementById('start-btn');
const imgLogo = document.getElementById('img-logo');
const winnerLogo = document.getElementById('winner-logo');
const restart = document.getElementById('restart-btn');
const restartGame = document.getElementById('restart-game');
const playAgain = document.getElementById('play-again-game-btn');
const playersTies = document.getElementById('players-ties');
const playerX = document.querySelector('.player-x');
const playerO = document.querySelector('.player-o');
const playerXDiv = document.querySelector('.player-picker-container__player-x');
const playerODiv = document.querySelector('.player-picker-container__player-o');
const playersBg = document.querySelector('.player-picker-container__bg');
const PickerContainer = document.querySelector('.player-picker-container');
const gameContainer = document.querySelector('.game-container');
const BoxContainer = document.querySelector('.game-container__grid-container');
const popUpWindow = document.querySelector('.bgs');
const boxes = document.querySelectorAll('.game-container__grid-box');
const freeBoxes = document.querySelectorAll('.free');

let yourPlayer;
let cpuPlayer;
let gridContainer;
let yourPlayerTurn;
let cpuPlayerTurn;
let yourPlayerCounter = 1;
let cpuPlayerCounter = 1;
let tiesCounter = 1;

// Defining The Functions
boxes.forEach((el, index) => {
  el.classList.add(`box-${index + 1}`);
});

function getBoxNum(num) {
  return document.querySelector('.box-' + num);
}

function checkTheWinner(c1, c2, c3, player) {
  // Make A Win Function

  if (getBoxNum(c1).classList.contains(player) && getBoxNum(c2).classList.contains(player) && getBoxNum(c3).classList.contains(player)) {
    return true;
  }
}

function playAgainFun() {
  boxes.forEach((el) => {
    el.innerHTML = '';
    el.classList.remove('cpu', 'you', 'free', 'magictime', 'vanishIn');
    el.classList.add('free');
  });
  popUpWindow.classList.add('hide');
}
// Make A Function That Chooses A Player
playersBg.addEventListener('click', (e) => {
  if (e.target.alt === 'Player X' || e.target.alt === 'Player O') {
    [playerXDiv, playerODiv].forEach((el) => {
      el.classList.remove('active-player');
      el.classList.add('cpu-player');
    });
    e.target.parentElement.classList.add('active-player');
    e.target.parentElement.classList.remove('cpu-player');
    yourPlayer = e.target;
    cpuPlayer = document.querySelector('.cpu-player').firstElementChild;
  }
});

// Click On The Button To Start The Game
startBtn.addEventListener('click', () => {
  if (playerXDiv.classList.contains('active-player') || playerODiv.classList.contains('active-player')) {
    PickerContainer.classList.add('hide');
    gameContainer.classList.remove('hide');
    gameContainer.classList.add('magictime', 'puffIn');
    yourPlayerTurn = yourPlayer.src.slice(yourPlayer.src.indexOf('/images'), yourPlayer.src.indexOf('.svg'));
    cpuPlayerTurn = cpuPlayer.src.slice(cpuPlayer.src.indexOf('/images'), cpuPlayer.src.indexOf('.svg'));
    imgLogo.src = yourPlayerTurn + '-outline.svg';
    getBoxNum(1);
  } else {
    // eslint-disable-next-line no-alert
    alert('Please Choose A Player 🎯');
  }
});

// // Click On A Random Square To Mark Your Sign
BoxContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('free')) {
    e.target.insertAdjacentHTML('afterbegin', yourPlayer.outerHTML);
    e.target.classList.add('you', 'magictime', 'vanishIn');
    e.target.classList.remove('free');
    imgLogo.src = '../images/icon-o-outline.svg';
    imgLogo.src = cpuPlayerTurn + '-outline.svg';
    setTimeout(() => {
      // Make The Cpu Select A Random Square To Mark Its Sign
      const freeSquares = document.querySelectorAll('.free');
      const randomSquares = Math.trunc(Math.random() * freeSquares.length);
      if (freeSquares.length > 0) {
        freeSquares[randomSquares].insertAdjacentHTML('afterbegin', cpuPlayer.outerHTML);
        freeSquares[randomSquares].classList.add('cpu', 'magictime', 'vanishIn');
        freeSquares[randomSquares].classList.remove('free');
        imgLogo.src = yourPlayerTurn + '-outline.svg';
      } else {
        document.getElementById('winner-title').textContent = "It's a tie";
        popUpWindow.classList.remove('hide');
        playersTies.textContent = tiesCounter++;
      }
      if (checkTheWinner(1, 2, 3, 'you') || checkTheWinner(4, 5, 6, 'you') || checkTheWinner(7, 8, 9, 'you') || checkTheWinner(1, 4, 7, 'you') || checkTheWinner(2, 5, 8, 'you') || checkTheWinner(3, 6, 9, 'you') || checkTheWinner(1, 5, 9, 'you') || checkTheWinner(7, 5, 3, 'you')) {
        winnerLogo.src = yourPlayerTurn + '-outline.svg';
        popUpWindow.classList.remove('hide');
        document.getElementById(`${yourPlayer.classList}-score`).textContent = yourPlayerCounter++;
      } else if (checkTheWinner(1, 2, 3, 'cpu') || checkTheWinner(4, 5, 6, 'cpu') || checkTheWinner(7, 8, 9, 'cpu') || checkTheWinner(1, 4, 7, 'cpu') || checkTheWinner(2, 5, 8, 'cpu') || checkTheWinner(3, 6, 9, 'cpu') || checkTheWinner(1, 5, 9, 'cpu') || checkTheWinner(7, 5, 3, 'cpu')) {
        winnerLogo.src = cpuPlayerTurn + '-outline.svg';
        popUpWindow.classList.remove('hide');
        document.getElementById(`${cpuPlayer.classList}-score`).textContent = cpuPlayerCounter++;
      }
    }, 850);
  }
});

// This Will Restart The Game And Remove All The Players Scores
restart.addEventListener('click', () => {
  location.reload();
});

// This Will Restart The Game Without Losing Any Thing With The Same Player
playAgain.addEventListener('click', playAgainFun);
restartGame.addEventListener('click', playAgainFun);
