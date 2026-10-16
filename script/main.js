/**
 * main.js - Master Application Coordinator for Shreyas's Portfolio OS
 * Initializes clock, visitor analytics, window management, and terminal shell.
 */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  console.log('Initializing Shreyas Portfolio OS v2.4...');

  // 1. Initialize Clock, Battery & Network Status
  if (window.PortfolioClock) {
    window.PortfolioClock.init();
  }

  // 2. Initialize Visitor Tracking & Analytics
  if (window.VisitorTracker) {
    window.VisitorTracker.init();
  }

  // 3. Initialize Interactive Terminal Shell
  if (window.PortfolioTerminal) {
    window.PortfolioTerminal.init();
  }

  // 4. Initialize Desktop Window Manager (Draggable, Controls, Dock)
  if (window.WindowManager) {
    window.WindowManager.init();
  }

  // 5. Interactive Mascot Click Easter Egg
  const mascot = document.getElementById('gif');
  if (mascot) {
    mascot.addEventListener('click', function () {
      mascot.classList.add('mascot-bounce');
      setTimeout(() => mascot.classList.remove('mascot-bounce'), 800);
      if (window.PortfolioTerminal && window.PortfolioTerminal.instance) {
        window.PortfolioTerminal.instance.echo('[[;#39ff14;]BMO says: "Yay! Welcome to Shreyas\'s portfolio! Try typing \'neofetch\' or \'projects\'."]');
      }
    });
  }

  // 6. Desktop Folder Selection & Interaction Effects
  const folders = document.querySelectorAll('.desktop-icon');
  folders.forEach(folder => {
    folder.addEventListener('click', function () {
      folders.forEach(f => f.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  // Clicking empty desktop clears folder selection
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.desktop-icon')) {
      folders.forEach(f => f.classList.remove('selected'));
    }
  });
});
