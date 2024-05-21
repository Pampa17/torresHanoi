import Game from './src/game.js';

const game = new Game();
game.newGame();


// funcion para monitorear la musica
document.addEventListener("DOMContentLoaded", function() {
    const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressBar = document.getElementById('progressBar');
    const currentTime = document.getElementById('currentTime');
    const duration = document.getElementById('duration');
    const muteBtn = document.getElementById('muteBtn');
    const volumeControl = document.getElementById('volumeControl');
  
    playPauseBtn.addEventListener('click', function() {
      if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸️';
      } else {
        audio.pause();
        playPauseBtn.textContent = '▶️';
      }
    });
  
    audio.addEventListener('timeupdate', function() {
      const value = (audio.currentTime / audio.duration) * 100;
      progressBar.value = value;
  
      const minutes = Math.floor(audio.currentTime / 60);
      const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
      currentTime.textContent = `${minutes}:${seconds}`;
  
      const totalMinutes = Math.floor(audio.duration / 60);
      const totalSeconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
      duration.textContent = `${totalMinutes}:${totalSeconds}`;
    });
  
    progressBar.addEventListener('input', function() {
      const time = (progressBar.value / 100) * audio.duration;
      audio.currentTime = time;
    });
  
    muteBtn.addEventListener('click', function() {
      audio.muted = !audio.muted;
      muteBtn.textContent = audio.muted ? '🔇' : '🔊';
    });
  
    volumeControl.addEventListener('input', function() {
      audio.volume = volumeControl.value;
    });
  });
  
  