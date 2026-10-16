/**
 * tracker.js - Visitor Analytics & Geolocation Tracker for GitHub Pages
 * Collects client info, IP geolocation, session metrics, and can forward
 * instant visitor alerts via Discord Webhook or display in the terminal.
 */

(function () {
  'use strict';

  // =========================================================================
  // CONFIGURATION (Optional - for instant notifications on GitHub Pages)
  // =========================================================================
  // To receive instant alerts on your Discord channel whenever someone visits:
  // 1. Create a webhook in Discord (Server Settings -> Integrations -> Webhooks)
  // 2. Paste your Webhook URL below:
  const DISCORD_WEBHOOK_URL = ''; // e.g., 'https://discord.com/api/webhooks/...'

  // To enable GoatCounter (free privacy-friendly analytics for GitHub Pages):
  // Set your GoatCounter code below (e.g., 'shreyas-portfolio')
  const GOATCOUNTER_CODE = '';

  // =========================================================================

  const VisitorTracker = {
    data: {
      ip: 'Detecting...',
      city: 'Unknown',
      region: 'Unknown',
      country: 'Unknown',
      countryCode: '',
      flag: '🌐',
      isp: 'Unknown',
      os: 'Unknown',
      browser: 'Unknown',
      deviceType: 'Desktop',
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language || 'en',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
      referrer: document.referrer || 'Direct / None',
      pageUrl: window.location.href,
      visitCount: 1,
      firstVisit: null,
      lastVisit: null,
      timestamp: new Date().toISOString()
    },

    isReady: false,
    readyCallbacks: [],

    init: function () {
      this.detectClientInfo();
      this.updateLocalStats();
      this.fetchGeoLocation();
      this.initGoatCounter();
    },

    onReady: function (callback) {
      if (this.isReady) {
        callback(this.data);
      } else {
        this.readyCallbacks.push(callback);
      }
    },

    triggerReady: function () {
      this.isReady = true;
      this.updateStatusBadge();
      this.readyCallbacks.forEach(cb => {
        try { cb(this.data); } catch (e) { console.error(e); }
      });
      this.sendDiscordAlert();
    },

    detectClientInfo: function () {
      const ua = navigator.userAgent;

      // Detect OS
      if (/windows phone/i.test(ua)) this.data.os = 'Windows Phone';
      else if (/win(dows|98|nt|2000)/i.test(ua)) this.data.os = 'Windows';
      else if (/android/i.test(ua)) this.data.os = 'Android';
      else if (/iphone|ipad|ipod/i.test(ua)) this.data.os = 'iOS';
      else if (/macintosh|mac os x/i.test(ua)) this.data.os = 'macOS';
      else if (/linux/i.test(ua)) this.data.os = 'Linux';
      else this.data.os = 'Other';

      // Detect Device Type
      if (/tablet|ipad/i.test(ua)) {
        this.data.deviceType = 'Tablet';
      } else if (/mobile|iphone|android/i.test(ua)) {
        this.data.deviceType = 'Mobile';
      } else {
        this.data.deviceType = 'Desktop';
      }

      // Detect Browser
      if (/edg/i.test(ua)) this.data.browser = 'Microsoft Edge';
      else if (/chrome|crios/i.test(ua) && !/opr|opera/i.test(ua)) this.data.browser = 'Google Chrome';
      else if (/firefox|fxios/i.test(ua)) this.data.browser = 'Mozilla Firefox';
      else if (/safari/i.test(ua)) this.data.browser = 'Apple Safari';
      else if (/opera|opr/i.test(ua)) this.data.browser = 'Opera';
      else this.data.browser = 'Browser';
    },

    updateLocalStats: function () {
      try {
        const storedCount = parseInt(localStorage.getItem('shreyas_portfolio_visits') || '0', 10);
        const newCount = storedCount + 1;
        localStorage.setItem('shreyas_portfolio_visits', newCount.toString());

        const firstVisit = localStorage.getItem('shreyas_portfolio_first_visit') || new Date().toLocaleString();
        localStorage.setItem('shreyas_portfolio_first_visit', firstVisit);

        this.data.visitCount = newCount;
        this.data.firstVisit = firstVisit;
        this.data.lastVisit = new Date().toLocaleString();
      } catch (e) {
        // Fallback if localStorage is disabled in privacy mode
        this.data.visitCount = 1;
      }
    },

    fetchGeoLocation: function () {
      // Check session cache first to prevent redundant requests
      const cached = sessionStorage.getItem('shreyas_visitor_geo');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          Object.assign(this.data, parsed);
          this.triggerReady();
          return;
        } catch (e) { }
      }

      // Fetch accurate IP + Geolocation via ipwho.is (CORS enabled, HTTPS, free)
      fetch('https://ipwho.is/')
        .then(res => res.json())
        .then(info => {
          if (info && info.success) {
            this.data.ip = info.ip || 'Unknown';
            this.data.city = info.city || 'Unknown';
            this.data.region = info.region || 'Unknown';
            this.data.country = info.country || 'Unknown';
            this.data.countryCode = info.country_code || '';
            this.data.flag = info.flag?.emoji || '🌍';
            this.data.isp = info.connection?.isp || info.connection?.org || 'Unknown';
            this.data.timezone = info.timezone?.id || this.data.timezone;

            try {
              sessionStorage.setItem('shreyas_visitor_geo', JSON.stringify({
                ip: this.data.ip,
                city: this.data.city,
                region: this.data.region,
                country: this.data.country,
                countryCode: this.data.countryCode,
                flag: this.data.flag,
                isp: this.data.isp,
                timezone: this.data.timezone
              }));
            } catch (err) { }
          }
        })
        .catch(err => {
          console.warn('Geolocation lookup skipped or blocked:', err);
        })
        .finally(() => {
          this.triggerReady();
        });
    },

    updateStatusBadge: function () {
      const badge = document.getElementById('visitor-badge');
      if (badge) {
        const flagText = this.data.countryCode ? ` ${this.data.flag} ${this.data.countryCode}` : '';
        badge.innerHTML = `<ion-icon name="eye-outline"></ion-icon> <span>Visit #${this.data.visitCount}${flagText}</span>`;
        badge.setAttribute('title', `Visitor: ${this.data.city}, ${this.data.country} (Visit #${this.data.visitCount})`);
      }

      const phoneText = document.getElementById('phone-visitor-text');
      if (phoneText) {
        const flagText = this.data.countryCode ? ` ${this.data.flag} ${this.data.countryCode}` : '';
        phoneText.textContent = `Visit #${this.data.visitCount}${flagText}`;
      }
    },

    sendDiscordAlert: function () {
      // Only dispatch if user has configured DISCORD_WEBHOOK_URL
      if (!DISCORD_WEBHOOK_URL || !DISCORD_WEBHOOK_URL.startsWith('http')) return;

      // Don't alert repeatedly within same browser session
      if (sessionStorage.getItem('discord_alert_dispatched')) return;
      sessionStorage.setItem('discord_alert_dispatched', 'true');

      const payload = {
        username: 'Portfolio Tracker',
        avatar_url: 'https://cdn-icons-png.flaticon.com/512/2920/2920244.png',
        embeds: [{
          title: `🚀 New Visitor on Portfolio! (${this.data.flag} ${this.data.country})`,
          color: 3066993, // Greenish blue
          fields: [
            { name: '📍 Location', value: `${this.data.city}, ${this.data.region}, ${this.data.country}`, inline: true },
            { name: '🌐 IP & ISP', value: `${this.data.ip}\n(${this.data.isp})`, inline: true },
            { name: '💻 Device & OS', value: `${this.data.deviceType} • ${this.data.os}`, inline: true },
            { name: '🧭 Browser', value: `${this.data.browser}`, inline: true },
            { name: '📐 Screen', value: `${this.data.screenResolution}`, inline: true },
            { name: '🔗 Referrer', value: `${this.data.referrer}`, inline: true },
            { name: '📊 Visit Count', value: `#${this.data.visitCount}`, inline: true },
            { name: '⏰ Timezone', value: `${this.data.timezone}`, inline: true }
          ],
          footer: { text: `GitHub Pages Visitor Log • ${new Date().toLocaleString()}` }
        }]
      };

      fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(err => console.warn('Discord webhook error:', err));
    },

    initGoatCounter: function () {
      if (!GOATCOUNTER_CODE) return;
      const script = document.createElement('script');
      script.async = true;
      script.dataset.goatcounter = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`;
      script.src = '//gc.zgo.at/count.js';
      document.head.appendChild(script);
    }
  };

  window.VisitorTracker = VisitorTracker;
})();
