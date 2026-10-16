# Shreyas Sawant | Systems Operations & Developer Portfolio OS

An interactive, multi-experience developer portfolio showcasing systems engineering, production operations, and full-stack software development.

---

## 🌟 Experiences & Themes

1. **Desktop OS & CLI Shell (`/index.html`)**:
   - macOS / Linux hybrid desktop environment with draggable windows and active dock.
   - Interactive terminal powered by jQuery Terminal with custom commands (`help`, `about`, `skills`, `projects`, `visitor`, `neofetch`, `theme`, `resume`).
   - Live real-time clock, battery status API, and network connectivity indicators.
   - **Responsive Smartphone OS Transformation**: On mobile devices ($\le 768\text{px}$), automatically morphs into an iPhone / Smartphone interface with Dynamic Island, 4-column squircle app grid, phone dock, and quick-tap command ribbon.

2. **Netflix Project Showcase (`/project/index.html`)**:
   - Streaming catalog experience featuring a cinematic hero billboard, sound effects via the Web Audio API (iconic Netflix "Ta-Dum" chime), live search filtering, Top 10 rank badges, and a full interactive details pop-up modal.

3. **The Daily Prophet Gazette (`/about/index.html`)**:
   - Dark wizarding newspaper edition highlighting 2+ years of hands-on production experience managing 15,000+ Linux servers, 99.9% uptime SLA, Bash/Ansible/Python automation, and 20,000+ VM migration from VMware to KVM.
   - Features an animated SVG High-Availability cluster telemetry radar, Lumos spell lighting, Hedwig's Theme chime synthesizer, and a Hogwarts wax seal return button.

4. **Visitor Analytics for GitHub Pages**:
   - Zero-backend client-side tracking module ([script/tracker.js](file:///c:/Users/shrey/Desktop/Shreyas/Portfolio/script/tracker.js)) with IP geolocation, session counters, in-terminal `visitor` command, and Discord webhook integration for instant phone notifications.

---

## 📂 Project Structure

```plaintext
Portfolio/
├── index.html              # Desktop OS & Mobile Smartphone Home Screen
├── styles/
│   └── style.css           # Desktop, Smartphone OS, and Terminal styles
├── script/
│   ├── clock.js            # Live clock, battery API, and network monitoring
│   ├── tracker.js          # Geolocation, visitor metrics, and Discord webhooks
│   ├── window.js           # Window manager (drag, close, minimize, maximize, dock)
│   ├── terminal.js         # Interactive CLI terminal and command handler
│   └── main.js             # Master application coordinator
├── project/                # Netflix Experience
│   ├── index.html          # Netflix UI layout
│   ├── style.css           # Netflix dark theme styling
│   ├── netflix.js          # Audio chime synthesizer, modal, and live search
│   └── img/                # Project screenshots & assets
├── about/                  # Daily Prophet Experience
│   ├── index.html          # Dark Daily Prophet Gazette layout
│   ├── style.css           # Dark parchment typography & grid layout
│   └── magical.js          # Hedwig's Theme synthesizer and Lumos spell
├── skill/                  # Skills Showcase
│   ├── index.html          # Tech stack card grid
│   └── style.css           # Card hover animations
├── img/                    # Wallpaper, dock icons, system assets, resume (rs.pdf)
└── ANALYTICS_GUIDE.md      # Setup guide for visitor alerts on GitHub Pages
```

---

## 🚀 Deployment to GitHub Pages

1. Push this repository to GitHub:
   ```bash
   git add .
   git commit -m "Initialize portfolio with Desktop OS, Smartphone OS, Netflix, and Daily Prophet"
   git push -u origin main
   ```
2. Navigate to your repository on GitHub:
   - Go to **Settings** &rarr; **Pages**.
   - Under **Build and deployment**, select **Deploy from a branch**.
   - Choose `main` branch and `/ (root)` directory, then click **Save**.
3. Your portfolio will be live at `https://<your-username>.github.io/<repo-name>/`.
