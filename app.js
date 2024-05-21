import Game from './src/game.js';

const game = new Game();
game.newGame();

document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');

    playPauseBtn.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = '⏸️';
        } else {
            audio.pause();
            playPauseBtn.textContent = '▶️';
        }
    });

    muteBtn.addEventListener('click', function() {
        audio.muted = !audio.muted;
        muteBtn.textContent = audio.muted ? '🔇' : '🔊';
    });
});

document.getElementById('showContentBtn').addEventListener('click', function() {
  document.getElementById('mainContent').style.display = 'none';
  document.getElementById('hiddenContent').style.display = 'block';
});

document.getElementById('backToGameBtn').addEventListener('click', function() {
  document.getElementById('mainContent').style.display = 'block';
  document.getElementById('hiddenContent').style.display = 'none';
});
