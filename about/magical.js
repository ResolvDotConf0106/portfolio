/**
 * magical.js - Daily Prophet Wizarding Experience for Shreyas's Portfolio
 * Features:
 * - Pure Web Audio API celesta/bell synthesizer for "Hedwig's Theme"
 * - Lumos / Nox interactive magical illumination spell
 * - Wand sparkle particles & spell effects
 * - Flying Golden Snitch interactive animation
 */

(function () {
  'use strict';

  // =========================================================================
  // WEB AUDIO CELESTA / BELL SYNTHESIZER: "HEDWIG'S THEME"
  // =========================================================================
  let audioCtx = null;
  let isPlayingTheme = false;

  const HEDWIG_MELODY = [
    { note: 493.88, dur: 0.42 }, // B4
    { note: 659.25, dur: 0.62 }, // E5
    { note: 783.99, dur: 0.28 }, // G5
    { note: 739.99, dur: 0.32 }, // F#5
    { note: 659.25, dur: 0.62 }, // E5
    { note: 987.77, dur: 0.38 }, // B5
    { note: 880.00, dur: 0.88 }, // A5
    { note: 739.99, dur: 0.88 }, // F#5
    { note: 659.25, dur: 0.62 }, // E5
    { note: 783.99, dur: 0.28 }, // G5
    { note: 739.99, dur: 0.32 }, // F#5
    { note: 622.25, dur: 0.62 }, // D#5
    { note: 698.46, dur: 0.42 }, // F5
    { note: 493.88, dur: 1.10 }  // B4
  ];

  function playTone(freq, startTime, duration) {
    if (!audioCtx) return;

    // Celesta metallic bell tone: Fundamental + subtle chime harmonic
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, startTime);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.01, startTime); // Harmonic chime overtone

    // Bell-like fast attack and decaying exponential release
    gainNode.gain.setValueAtTime(0.001, startTime);
    gainNode.gain.linearRampToValueAtTime(0.28, startTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // Warm low-pass filter
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, startTime);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration);
    osc2.stop(startTime + duration);
  }

  function playHedwigsTheme() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      if (!audioCtx) {
        audioCtx = new AudioContext();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      if (isPlayingTheme) return;
      isPlayingTheme = true;

      let currentTime = audioCtx.currentTime + 0.1;
      let totalDuration = 0;

      HEDWIG_MELODY.forEach((item) => {
        playTone(item.note, currentTime, item.dur * 1.3);
        currentTime += item.dur;
        totalDuration += item.dur;
      });

      setTimeout(() => {
        isPlayingTheme = false;
      }, (totalDuration + 0.5) * 1000);

    } catch (e) {
      console.warn('Audio synthesis not supported or blocked:', e);
      isPlayingTheme = false;
    }
  }

  // =========================================================================
  // LUMOS / NOX SPELL TOGGLE
  // =========================================================================
  let isLumosActive = false;

  function toggleLumos() {
    isLumosActive = !isLumosActive;
    const body = document.body;
    const wandBtn = document.getElementById('lumosSpellBtn');
    const wandStatus = document.getElementById('wandStatus');

    if (isLumosActive) {
      body.classList.add('lumos-active');
      if (wandBtn) wandBtn.classList.add('spell-casting');
      if (wandStatus) wandStatus.textContent = 'NOX (Extinguish)';
      createWandSparks();
      playHedwigsTheme();
    } else {
      body.classList.remove('lumos-active');
      if (wandBtn) wandBtn.classList.remove('spell-casting');
      if (wandStatus) wandStatus.textContent = 'LUMOS (Cast Light)';
    }
  }

  function createWandSparks() {
    const btn = document.getElementById('lumosSpellBtn');
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const colors = ['#ffd700', '#fff8dc', '#ffae19', '#7dd3fc', '#ffffff'];

    for (let i = 0; i < 18; i++) {
      const spark = document.createElement('div');
      spark.className = 'magic-spark';
      spark.style.left = `${rect.left + rect.width / 2}px`;
      spark.style.top = `${rect.top + rect.height / 2}px`;
      spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 80 + 30;
      const x = Math.cos(angle) * velocity;
      const y = Math.sin(angle) * velocity;

      spark.style.setProperty('--tx', `${x}px`);
      spark.style.setProperty('--ty', `${y}px`);

      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 750);
    }
  }

  // =========================================================================
  // INITIALIZATION ON DOM READY
  // =========================================================================
  document.addEventListener('DOMContentLoaded', function () {
    const spellBtn = document.getElementById('lumosSpellBtn');
    if (spellBtn) {
      spellBtn.addEventListener('click', toggleLumos);
    }

    const musicBtn = document.getElementById('playThemeBtn');
    if (musicBtn) {
      musicBtn.addEventListener('click', playHedwigsTheme);
    }

    // Daily Prophet moving picture interaction (hover removes sepia / makes it come alive)
    const movingPictures = document.querySelectorAll('.prophet-moving-img');
    movingPictures.forEach(img => {
      img.addEventListener('mouseenter', function () {
        this.classList.add('alive');
      });
      img.addEventListener('mouseleave', function () {
        this.classList.remove('alive');
      });
    });
  });

})();
