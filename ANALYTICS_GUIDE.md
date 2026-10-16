# Visitor Tracking & Analytics Guide for GitHub Pages

This guide explains how your portfolio tracks visits, how to see visitor details, and how to get instant notifications when deployed to GitHub Pages.

---

## 🚀 How It Works Out-of-the-Box

Your portfolio includes a dedicated client-side tracking module ([script/tracker.js](file:///c:/Users/shrey/Desktop/Shreyas/Portfolio/script/tracker.js)) designed specifically for static hosts like GitHub Pages.

### Automatically Collected Visitor Data:
- **Location & IP**: IP Address, Country, Flag, Region, City, ISP, and Timezone (via HTTPS API `https://ipwho.is/`).
- **Device & System**: Operating System (Windows, macOS, Linux, iOS, Android), Device Type (Desktop, Mobile, Tablet).
- **Browser**: Chrome, Safari, Firefox, Edge, Opera, etc.
- **Display**: Screen resolution (e.g., 1920x1080).
- **Traffic Origin**: Referrer URL (e.g. LinkedIn, GitHub, Direct).
- **Visits Counter**: Local session storage + lifetime visit counter.

---

## ⚡ Option 1: Instant Discord Alerts (Recommended)

Since GitHub Pages has no backend server, the easiest and most popular way for developers to get notified of visits on their phone or PC is via a **Discord Webhook**.

### 3-Step Setup:
1. **Create a Discord Webhook**:
   - Open Discord and go to your private server (or create a free private server).
   - Right-click any text channel (e.g., `#portfolio-visits`) &rarr; **Edit Channel** &rarr; **Integrations** &rarr; **Webhooks** &rarr; **New Webhook**.
   - Click **Copy Webhook URL**.

2. **Paste the Webhook URL**:
   - Open [script/tracker.js](file:///c:/Users/shrey/Desktop/Shreyas/Portfolio/script/tracker.js#L14).
   - Find line 14:
     ```javascript
     const DISCORD_WEBHOOK_URL = '';
     ```
   - Paste your URL inside the quotes:
     ```javascript
     const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/123456789/abcdef...';
     ```

3. **Deploy to GitHub Pages**:
   - Push your code to GitHub.
   - Every time a recruiter, peer, or visitor lands on your site, you will instantly receive a notification card in Discord with their city, country, browser, device, screen resolution, and visit count!

---

## 💻 Option 2: Check Visitor Info Inside the Terminal

Anyone (including you) can inspect current session analytics directly from the portfolio:
1. Open the interactive terminal on the desktop.
2. Type:
   ```bash
   visitor
   ```
   or
   ```bash
   stats
   ```
3. The terminal displays the full breakdown:
   ```
   Visitor Information (GitHub Pages Session)
   ------------------------------------------------------------
   Visit Count:  #14
   IP Address:   103.160.27.49
   Location:     Hyderabad, Telangana, India 🇮🇳
   ISP/Network:  Excitel Broadband
   OS / Device:  Windows (Desktop)
   Browser:      Google Chrome
   Screen Size:  1920x1080
   Referrer:     https://linkedin.com/
   First Visit:  10/16/2026, 5:50 PM
   ```

You will also notice the live visitor badge in the top right system status bar (`Visit #X 🇮🇳 IN`).

---

## 📈 Option 3: Free GoatCounter Dashboard (Optional)

If you'd like a web dashboard with daily graphs and country heatmaps:
1. Sign up for free at [goatcounter.com](https://www.goatcounter.com/) (100% free for personal portfolios, privacy-friendly, zero cookies).
2. Choose your code (e.g., `shreyas-portfolio`).
3. Set your code in [script/tracker.js](file:///c:/Users/shrey/Desktop/Shreyas/Portfolio/script/tracker.js#L18):
   ```javascript
   const GOATCOUNTER_CODE = 'shreyas-portfolio';
   ```
GoatCounter will automatically record all pageviews and display graphs at `https://shreyas-portfolio.goatcounter.com`.

---

## 🛠️ Deploying to GitHub Pages

1. Commit and push your changes to your repository:
   ```bash
   git add .
   git commit -m "Organize portfolio OS, enhance terminal, add clock & visitor tracking"
   git push origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** &rarr; **Pages**.
   - Under **Build and deployment**, select **Source: Deploy from a branch**.
   - Choose `main` branch and `/ (root)` folder, then click **Save**.
3. Your portfolio will be live at `https://<your-username>.github.io/<repo-name>/`!
