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
    musicBtn.innerHTML = `
      <style>
        .music-btn {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255, 51, 51, 0.2);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 51, 51, 0.4);
          cursor: pointer;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          transition: all 0.3s;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          border: none;
        }
        .music-btn:hover {
          background: rgba(255, 51, 51, 0.3);
          transform: scale(1.05);
          box-shadow: 0 0 30px rgba(255, 51, 51, 0.5);
        }
        .music-btn.playing {
          animation: musicPulse 2s infinite;
        }
        @keyframes musicPulse {
          0%, 100% { 
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            border-color: rgba(255, 51, 51, 0.4);
          }
          50% { 
            box-shadow: 0 0 30px rgba(255, 51, 51, 0.8);
            border-color: rgba(255, 51, 51, 0.8);
          }
        }
      </style>
      <button class="music-btn" id="music-btn">🔇</button>
    `;
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
