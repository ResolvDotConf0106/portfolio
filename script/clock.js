/**
 * clock.js - Live Clock, Battery & Network Status Manager
 * Handles real-time system status bar updates for Shreyas's Portfolio OS.
 */

(function () {
  'use strict';

  const ClockManager = {
    clockElement: null,
    batteryElement: null,
    wifiElement: null,
    timer: null,

    init: function () {
      this.clockElement = document.getElementById('status-clock');
      this.batteryElement = document.getElementById('status-battery');
      this.wifiElement = document.getElementById('status-wifi');

      this.updateClock();
      this.timer = setInterval(() => this.updateClock(), 1000);

      this.initBattery();
      this.initNetwork();
    },

    updateClock: function () {
      const now = new Date();
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const dayName = days[now.getDay()];
      const monthName = months[now.getMonth()];
      const date = now.getDate();

      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 becomes 12

      const timeString = `${hours}:${minutes} ${ampm}`;
      const fullDateString = `${dayName} ${monthName} ${date}`;
      const mobileTimeString = `${hours}:${minutes}`;

      if (this.clockElement) {
        this.clockElement.innerHTML = `
          <span class="clock-date">${fullDateString}</span>
          <span class="clock-time">${timeString}</span>
        `;
        this.clockElement.setAttribute('title', now.toLocaleString());
      }

      // Sync Mobile Phone Display
      const phoneTime = document.getElementById('phone-clock');
      if (phoneTime) {
        phoneTime.textContent = mobileTimeString;
      }
      const phoneDate = document.getElementById('phone-date');
      if (phoneDate) {
        phoneDate.textContent = `${dayName}, ${monthName} ${date}`;
      }
    },

    initBattery: function () {
      if ('getBattery' in navigator) {
        navigator.getBattery().then((battery) => {
          this.updateBatteryStatus(battery);

          battery.addEventListener('levelchange', () => this.updateBatteryStatus(battery));
          battery.addEventListener('chargingchange', () => this.updateBatteryStatus(battery));
        }).catch(() => {
          this.setFallbackBattery();
        });
      } else {
        this.setFallbackBattery();
      }
    },

    updateBatteryStatus: function (battery) {
      if (!this.batteryElement) return;

      const level = Math.round(battery.level * 100);
      const isCharging = battery.charging;

      let iconName = 'battery-full-outline';
      if (isCharging) {
        iconName = 'battery-charging-outline';
      } else if (level <= 20) {
        iconName = 'battery-dead-outline';
      } else if (level <= 60) {
        iconName = 'battery-half-outline';
      }

      this.batteryElement.innerHTML = `
        <ion-icon name="${iconName}"></ion-icon>
        <span class="status-badge">${level}%</span>
      `;
      this.batteryElement.setAttribute('title', `Battery: ${level}% ${isCharging ? '(Charging)' : ''}`);

      const phoneBat = document.getElementById('phone-battery');
      if (phoneBat) {
        phoneBat.innerHTML = `<ion-icon name="${iconName}"></ion-icon> <span>${level}%</span>`;
      }
    },

    setFallbackBattery: function () {
      if (this.batteryElement) {
        this.batteryElement.innerHTML = `
          <ion-icon name="battery-half-outline"></ion-icon>
          <span class="status-badge">100%</span>
        `;
        this.batteryElement.setAttribute('title', 'Battery: 100%');
      }
      const phoneBat = document.getElementById('phone-battery');
      if (phoneBat) {
        phoneBat.innerHTML = `<ion-icon name="battery-half-outline"></ion-icon> <span>100%</span>`;
      }
    },

    initNetwork: function () {
      const updateNetwork = () => {
        if (!this.wifiElement) return;
        const isOnline = navigator.onLine;

        if (isOnline) {
          this.wifiElement.innerHTML = '<ion-icon name="wifi-outline"></ion-icon>';
          this.wifiElement.setAttribute('title', 'Network: Online');
          this.wifiElement.classList.remove('offline');
        } else {
          this.wifiElement.innerHTML = '<ion-icon name="cloud-offline-outline"></ion-icon>';
          this.wifiElement.setAttribute('title', 'Network: Offline');
          this.wifiElement.classList.add('offline');
        }
      };

      window.addEventListener('online', updateNetwork);
      window.addEventListener('offline', updateNetwork);
      updateNetwork();
    }
  };

  window.PortfolioClock = ClockManager;
})();
