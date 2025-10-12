// js/music.js - Music player that works across all pages
(function() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  function init() {
    // Create audio element
    const audio = document.createElement('audio');
    audio.id = 'site-music';
    audio.loop = true;
    audio.volume = 0.3;
    
    // Add your music file
    audio.src = 'assets/music/background.mp3';
    document.body.appendChild(audio);
    // Create floating music button
    const musicBtn = document.createElement('div');
    musicBtn.id = 'music-btn';
    musicBtn.textContent = '🔇';
    document.body.appendChild(musicBtn);
    const btn = document.getElementById('music-btn');
    let isPlaying = false;
    // Check localStorage
    if (localStorage.getItem('musicEnabled') === 'true') {
      playMusic();
    }
    // Toggle function
    btn.addEventListener('click', () => {
      if (isPlaying) {
        pauseMusic();
      } else {
        playMusic();
      }
    });
    function playMusic() {
      audio.play().then(() => {
        isPlaying = true;
        btn.textContent = '🎵';
        btn.classList.add('playing');
        localStorage.setItem('musicEnabled', 'true');
      }).catch(() => {
        console.log('Music autoplay blocked');
      });
    }
    function pauseMusic() {
      audio.pause();
      isPlaying = false;
      btn.textContent = '🔇';
      btn.classList.remove('playing');
      localStorage.setItem('musicEnabled', 'false');
    }
    // Auto-play on first interaction
    document.addEventListener('click', function initPlay() {
      if (!isPlaying && localStorage.getItem('musicEnabled') !== 'false') {
        playMusic();
      }
      document.removeEventListener('click', initPlay);
    }, { once: true });
    // Pause when tab is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && isPlaying) {
        audio.pause();
      } else if (!document.hidden && isPlaying) {
        audio.play();
      }
    });
  }
})();
