// Chess game with timer using chess.js and chessboard.js
let board = null;
let game = new Chess();
let activeColor = 'w';
let whiteTime = 300;
let blackTime = 300;
let timerId = null;

function init() {
  document.getElementById('startBtn').addEventListener('click', startGame);
  updateClocks();
  const config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
  };
  board = Chessboard('board', config);
}

function startGame() {
  const minutes = parseInt(document.getElementById('timeInput').value, 10) || 5;
  whiteTime = blackTime = minutes * 60;
  game.reset();
  board.start();
  activeColor = 'w';
  updateClocks();
  if (timerId) clearInterval(timerId);
  timerId = setInterval(tick, 1000);
}

function tick() {
  if (activeColor === 'w') {
    whiteTime--;
    if (whiteTime <= 0) {
      clearInterval(timerId);
      alert('Black wins on time');
    }
  } else {
    blackTime--;
    if (blackTime <= 0) {
      clearInterval(timerId);
      alert('White wins on time');
    }
  }
  updateClocks();
}

function updateClocks() {
  document.getElementById('whiteTime').textContent = formatTime(whiteTime);
  document.getElementById('blackTime').textContent = formatTime(blackTime);
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function onDragStart(source, piece) {
  if (game.game_over()) return false;
  if (game.turn() === 'w' && piece.search(/^b/) !== -1) return false;
  if (game.turn() === 'b' && piece.search(/^w/) !== -1) return false;
}

function onDrop(source, target) {
  const move = game.move({ from: source, to: target, promotion: 'q' });
  if (move === null) return 'snapback';
  activeColor = game.turn();
}

function onSnapEnd() {
  board.position(game.fen());
  if (game.game_over()) {
    clearInterval(timerId);
    setTimeout(() => alert('Game over'), 50);
  }
}

window.addEventListener('load', init);
