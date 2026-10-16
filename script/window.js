/**
 * window.js - Desktop Window Management (Drag, Minimize, Maximize, Close, Dock)
 * Provides macOS/Linux desktop window mechanics for the portfolio terminal.
 */

(function () {
  'use strict';

  const WindowManager = {
    windowEl: null,
    headerEl: null,
    dockIcon: null,
    isMaximized: false,
    prevStyles: {},

    init: function () {
      this.windowEl = document.getElementById('term');
      this.headerEl = document.getElementById('term-header');
      this.dockIcon = document.getElementById('dock-terminal');

      if (!this.windowEl) return;

      this.initDrag();
      this.initControls();
      this.initDockToggle();
      this.initKeyboardShortcuts();
      this.centerWindow();
    },

    centerWindow: function () {
      if (!this.windowEl) return;
      if (window.innerWidth <= 768) {
        this.windowEl.style.left = '';
        this.windowEl.style.top = '';
        return;
      }
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const rect = this.windowEl.getBoundingClientRect();

      const left = Math.max(20, Math.floor((screenWidth - (rect.width || 620)) / 2));
      const top = Math.max(70, Math.floor((screenHeight - (rect.height || 420)) / 2) - 30);

      this.windowEl.style.left = `${left}px`;
      this.windowEl.style.top = `${top}px`;
    },

    initDrag: function () {
      const self = this;
      const handle = this.headerEl || this.windowEl;
      let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

      handle.onmousedown = function (e) {
        // Prevent drag on control buttons or inputs
        if (e.target.closest('.window-controls') || e.target.closest('button') || e.target.closest('a')) {
          return;
        }

        if (self.isMaximized) return; // Don't drag while maximized

        e = e || window.event;
        e.preventDefault();

        pos3 = e.clientX;
        pos4 = e.clientY;

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;

        handle.classList.add('is-dragging');
        self.windowEl.classList.add('is-active-window');
      };

      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();

        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;

        let newTop = self.windowEl.offsetTop - pos2;
        let newLeft = self.windowEl.offsetLeft - pos1;

        // Boundary safety checks
        const topBarHeight = 45;
        const dockHeight = 75;
        const maxTop = window.innerHeight - dockHeight - 60;
        const maxLeft = window.innerWidth - 120;

        newTop = Math.max(topBarHeight, Math.min(newTop, maxTop));
        newLeft = Math.max(-100, Math.min(newLeft, maxLeft));

        self.windowEl.style.top = `${newTop}px`;
        self.windowEl.style.left = `${newLeft}px`;
      }

      function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        if (handle) handle.classList.remove('is-dragging');
      }
    },

    initControls: function () {
      const closeBtn = document.getElementById('win-btn-close');
      const minBtn = document.getElementById('win-btn-min');
      const maxBtn = document.getElementById('win-btn-max');

      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.close();
        });
      }

      if (minBtn) {
        minBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.minimize();
        });
      }

      if (maxBtn) {
        maxBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleMaximize();
        });
      }
    },

    initDockToggle: function () {
      if (!this.dockIcon) return;

      this.dockIcon.addEventListener('click', (e) => {
        e.preventDefault();
        this.toggleFromDock();
      });
    },

    initKeyboardShortcuts: function () {
      document.addEventListener('keydown', (e) => {
        // Toggle terminal with Ctrl+` or Ctrl+T
        if (e.ctrlKey && (e.key === '`' || e.key === '~')) {
          e.preventDefault();
          this.toggleFromDock();
        }
      });
    },

    open: function () {
      if (!this.windowEl) return;
      this.windowEl.style.display = 'block';
      this.windowEl.classList.remove('window-minimized');
      this.windowEl.classList.add('window-opening');

      setTimeout(() => {
        this.windowEl.classList.remove('window-opening');
      }, 250);

      if (this.dockIcon) {
        this.dockIcon.classList.add('app-open', 'app-focused');
      }

      // Refocus terminal input
      const termInput = this.windowEl.querySelector('textarea, input');
      if (termInput) termInput.focus();
    },

    close: function () {
      if (!this.windowEl) return;
      this.windowEl.classList.add('window-closing');

      setTimeout(() => {
        this.windowEl.style.display = 'none';
        this.windowEl.classList.remove('window-closing');
      }, 200);

      if (this.dockIcon) {
        this.dockIcon.classList.remove('app-open', 'app-focused');
      }
    },

    minimize: function () {
      if (!this.windowEl) return;
      this.windowEl.classList.add('window-minimized');

      setTimeout(() => {
        this.windowEl.style.display = 'none';
      }, 250);

      if (this.dockIcon) {
        this.dockIcon.classList.add('app-open');
        this.dockIcon.classList.remove('app-focused');
      }
    },

    toggleMaximize: function () {
      if (!this.windowEl) return;

      if (!this.isMaximized) {
        // Save current style
        this.prevStyles = {
          top: this.windowEl.style.top,
          left: this.windowEl.style.left,
          width: this.windowEl.style.width,
          height: this.windowEl.style.height
        };

        this.windowEl.classList.add('window-maximized');
        this.isMaximized = true;
      } else {
        // Restore
        this.windowEl.classList.remove('window-maximized');
        this.windowEl.style.top = this.prevStyles.top || '70px';
        this.windowEl.style.left = this.prevStyles.left || '100px';
        this.windowEl.style.width = this.prevStyles.width || '';
        this.windowEl.style.height = this.prevStyles.height || '';
        this.isMaximized = false;
      }
    },

    toggleFromDock: function () {
      if (!this.windowEl) return;

      const isHidden = this.windowEl.style.display === 'none' ||
                       this.windowEl.classList.contains('window-minimized');

      if (isHidden) {
        this.open();
      } else {
        this.minimize();
      }
    }
  };

  window.WindowManager = WindowManager;
})();
