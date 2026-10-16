/**
 * terminal.js - Interactive CLI Terminal for Shreyas's Portfolio OS
 * Enhanced with rich commands, color formatting, visitor analytics integration,
 * themes, autocompletion, and polished typography.
 */

(function () {
  'use strict';

  const BANNER = `
[[b;#ff007f;]  ____  _                                ]
[[b;#ff007f;] / ___|| |__  _ __ ___ _   _  __ _ ___   ]
[[b;#00f0ff;] \\___ \\| '_ \\| '__/ _ \\ | | |/ _\` / __|  ]
[[b;#00f0ff;]  ___) | | | | | |  __/ |_| | (_| \\__ \\  ]
[[b;#39ff14;] |____/|_| |_|_|  \\___|\\__, |\\__,_|___/  ]
[[b;#39ff14;]                       |___/             ]
[[b;#ffffff;] Portfolio OS v2.4 (Interactive Desktop CLI)]
[[;#aaaaaa;] Type '][[b;#00f0ff;]help][[;#aaaaaa;]' to list commands or '][[b;#39ff14;]visitor][[;#aaaaaa;]' to inspect your visit details.]
`;

  const THEMES = {
    default: {
      '--term-color': '#00f0ff',
      '--term-glow': 'rgba(0, 240, 255, 0.4)',
      '--term-accent': '#ff007f',
      '--term-bg': 'rgba(15, 18, 30, 0.94)'
    },
    matrix: {
      '--term-color': '#00ff66',
      '--term-glow': 'rgba(0, 255, 102, 0.4)',
      '--term-accent': '#00cc44',
      '--term-bg': 'rgba(10, 20, 12, 0.96)'
    },
    dracula: {
      '--term-color': '#bd93f9',
      '--term-glow': 'rgba(189, 147, 249, 0.4)',
      '--term-accent': '#ff79c6',
      '--term-bg': 'rgba(24, 25, 38, 0.96)'
    },
    amber: {
      '--term-color': '#ffb000',
      '--term-glow': 'rgba(255, 176, 0, 0.4)',
      '--term-accent': '#ff8000',
      '--term-bg': 'rgba(26, 18, 8, 0.96)'
    },
    cyberpunk: {
      '--term-color': '#ffe600',
      '--term-glow': 'rgba(255, 230, 0, 0.4)',
      '--term-accent': '#00f0ff',
      '--term-bg': 'rgba(18, 12, 28, 0.96)'
    }
  };

  const COMMAND_LIST = [
    'help', 'about', 'skills', 'projects', 'resume', 'social',
    'visitor', 'neofetch', 'clock', 'date', 'theme', 'clear',
    'reset', 'whoami', 'sudo', 'exit'
  ];

  const startTime = Date.now();

  function formatUptime() {
    const elapsedSec = Math.floor((Date.now() - startTime) / 1000);
    const mins = Math.floor(elapsedSec / 60);
    const secs = elapsedSec % 60;
    return `${mins}m ${secs}s`;
  }

  function applyTheme(themeName) {
    const target = THEMES[themeName] || THEMES.default;
    const termEl = document.getElementById('term');
    if (!termEl) return;

    Object.keys(target).forEach(prop => {
      termEl.style.setProperty(prop, target[prop]);
    });
  }

  const TerminalApp = {
    instance: null,

    init: function () {
      const self = this;
      const termDemo = $('#term_demo');

      if (!termDemo.length) return;

      termDemo.terminal(function (command, term) {
        const cmd = command.trim();
        const parts = cmd.split(/\s+/);
        const action = parts[0].toLowerCase();
        const arg = parts.slice(1).join(' ').toLowerCase();

        switch (action) {
          case '':
            break;

          case 'help':
          case '?':
            term.echo(`
[[b;#00f0ff;]Available Commands:]
  [[b;#39ff14;]about]      - View Shreyas's background and bio
  [[b;#39ff14;]skills]     - Display categorized technical skills
  [[b;#39ff14;]projects]   - Browse featured projects & live links
  [[b;#39ff14;]resume]     - Open/download resume (PDF)
  [[b;#39ff14;]social]     - Get direct links to LinkedIn, GitHub, Email
  [[b;#ff007f;]visitor]    - View your session analytics & IP info
  [[b;#ff007f;]neofetch]   - Display retro system specifications
  [[b;#ff007f;]clock]      - Show current date, time, and timezone
  [[b;#ffbd2e;]theme]      - Change color theme ([[;#ffffff;]matrix, dracula, amber, cyberpunk, default])
  [[b;#ffbd2e;]clear]      - Clear terminal screen
  [[b;#ffbd2e;]whoami]     - Print current session user
  [[b;#ffbd2e;]exit]       - Minimize terminal window

[[;#888888;]Tip: Press TAB for autocompletion or click desktop folders to browse pages.]
            `);
            break;

          case 'about':
          case 'bio':
            term.echo(`
[[b;#00f0ff;]Shreyas Sawant • Systems Operations Engineer]
[[;#ffffff;]------------------------------------------------------------]
[[b;#39ff14;]Role:]          Systems Operations Engineer (2+ Years Hands-on Experience)
[[b;#39ff14;]Fleet Scale:]   15,000+ Production Servers (RHEL, SLES, Ubuntu, CentOS)
[[b;#39ff14;]Uptime SLA:]    99.9% Maintained on High-Availability Clusters
[[b;#39ff14;]Automation:]    Bash, Ansible Playbooks, Python (Manual Toil Reduction)
[[b;#39ff14;]Virtualization:] VMware to KVM (20,000+ VM Migration Contributor)
[[b;#39ff14;]Operations:]    Incident, Problem & Change Mgmt, RCA & Runbook Authoring
[[b;#39ff14;]Environment:]   24/7 Rotational Shifts & Weekend Outage Support

[[;#888888;]Want to explore the Harry Potter Daily Prophet edition? Open 'About' on desktop.]
            `);
            break;

          case 'skills':
            term.echo(`
[[b;#00f0ff;]Technical Skills & Tech Stack]
[[;#ffffff;]------------------------------------------------------------]
[[b;#39ff14;]Languages:]    Java, Python, C++, JavaScript (ES6+), PHP
[[b;#00f0ff;]Frontend:]     HTML5, CSS3, Bootstrap 4/5, jQuery, Responsive UI
[[b;#ff007f;]Backend:]      Node.js, Express, Firebase, REST APIs
[[b;#ffbd2e;]Databases:]    MySQL, Firestore
[[b;#ffffff;]Tools & OS:]   Git, GitHub, VS Code, Linux/Bash, Unity
            `);
            break;

          case 'projects':
            term.echo(`
[[b;#00f0ff;]Featured Projects]
[[;#ffffff;]------------------------------------------------------------]
[[b;#39ff14;]1. CouponCodeJunction]
   Live coupons aggregator with responsive UI
   Link: [[!;;;https://shreyas002-6.github.io/CCJ/]https://shreyas002-6.github.io/CCJ/]

[[b;#39ff14;]2. LightAlgo]
   Interactive algorithm visualizer for sorting and pathfinding
   Link: [[!;;;https://shreyas002-6.github.io/LightAlgo/]https://shreyas002-6.github.io/LightAlgo/]

[[b;#39ff14;]3. KiloGram (Social App)]
   Full-stack social sharing platform
   Link: [[!;;;https://github.com/Shreyas002-6/socialApp]https://github.com/Shreyas002-6/socialApp]

[[b;#39ff14;]4. More Projects:]
   WatchIt • FarmConnect • CodeRadar • MediKart • PizzaShop
   Visit the [[b;#ff007f;]Projects] folder on desktop for the full Netflix UI!
            `);
            break;

          case 'resume':
          case 'cv':
            term.echo('[[;#39ff14;]Opening resume (PDF)...]');
            try {
              window.open('./img/rs.pdf', '_blank');
            } catch (e) {
              term.echo('[[;#ff007f;]Unable to auto-open. Link:] ./img/rs.pdf');
            }
            break;

          case 'social':
          case 'contact':
            term.echo(`
[[b;#00f0ff;]Connect with Shreyas]
[[;#ffffff;]------------------------------------------------------------]
[[b;#39ff14;]GitHub:]    [[!;;;https://github.com/Shreyas002-6]https://github.com/Shreyas002-6]
[[b;#39ff14;]LinkedIn:]  [[!;;;https://linkedin.com/in/shreyas-sawant-268228190]https://linkedin.com/in/shreyas-sawant-268228190]
[[b;#39ff14;]Email:]     [[!;;;mailto:shreyas9822949536@gmail.com]shreyas9822949536@gmail.com]
            `);
            break;

          case 'visitor':
          case 'stats':
            const v = window.VisitorTracker ? window.VisitorTracker.data : null;
            if (v) {
              term.echo(`
[[b;#00f0ff;]Visitor Information (GitHub Pages Session)]
[[;#ffffff;]------------------------------------------------------------]
[[b;#39ff14;]Visit Count:]  #${v.visitCount}
[[b;#39ff14;]IP Address:]   ${v.ip}
[[b;#39ff14;]Location:]     ${v.city}, ${v.region}, ${v.country} ${v.flag}
[[b;#39ff14;]ISP/Network:]  ${v.isp}
[[b;#39ff14;]OS / Device:]  ${v.os} (${v.deviceType})
[[b;#39ff14;]Browser:]      ${v.browser}
[[b;#39ff14;]Screen Size:]  ${v.screenResolution}
[[b;#39ff14;]Referrer:]     ${v.referrer}
[[b;#39ff14;]First Visit:]  ${v.firstVisit || 'Today'}
              `);
            } else {
              term.echo('[[;#ffbd2e;]Visitor tracker initializing...]');
            }
            break;

          case 'neofetch':
            const vData = window.VisitorTracker ? window.VisitorTracker.data : {};
            term.echo(`
[[b;#00f0ff;]        /\\        ]  [[b;#ff007f;]shreyas@portfolio-os]
[[b;#00f0ff;]       /  \\       ]  -------------------------
[[b;#00f0ff;]      /\\   \\      ]  [[b;#39ff14;]OS:] ShreyasOS 2.4 (x86_64 Web)
[[b;#00f0ff;]     /      \\     ]  [[b;#39ff14;]Host:] GitHub Pages Static
[[b;#00f0ff;]    /   ,,   \\    ]  [[b;#39ff14;]Kernel:] Vanilla-JS 2026.1
[[b;#00f0ff;]   /   |  |  -\\   ]  [[b;#39ff14;]Uptime:] ${formatUptime()}
[[b;#00f0ff;]  /_-''    ''-_\\  ]  [[b;#39ff14;]Shell:] zsh 5.9 (jquery.terminal)
[[b;#00f0ff;]                  ]  [[b;#39ff14;]Resolution:] ${window.screen.width}x${window.screen.height}
[[b;#00f0ff;]                  ]  [[b;#39ff14;]Theme:] ${termDemo.data('theme') || 'default'}
[[b;#00f0ff;]                  ]  [[b;#39ff14;]Client:] ${vData.browser || 'Browser'} on ${vData.os || 'OS'}

[[;#000000;#ffffff;]   ][[;#ff0000;#ff0000;]   ][[;#00ff00;#00ff00;]   ][[;#ffff00;#ffff00;]   ][[;#0000ff;#0000ff;]   ][[;#ff00ff;#ff00ff;]   ][[;#00ffff;#00ffff;]   ]
            `);
            break;

          case 'clock':
          case 'date':
            const now = new Date();
            term.echo(`[[b;#00f0ff;]Current System Time:] ${now.toString()}`);
            break;

          case 'theme':
            if (!arg) {
              term.echo(`Available themes: [[b;#ffffff;]${Object.keys(THEMES).join(', ')}]`);
              term.echo(`Usage: theme <name> (e.g. 'theme matrix')`);
            } else if (THEMES[arg]) {
              applyTheme(arg);
              termDemo.data('theme', arg);
              term.echo(`[[;#39ff14;]Switched theme to ${arg}!]`);
            } else {
              term.echo(`[[;#ff007f;]Unknown theme '${arg}'. Options: ${Object.keys(THEMES).join(', ')}]`);
            }
            break;

          case 'clear':
            term.clear();
            break;

          case 'reset':
            term.clear();
            term.echo(BANNER);
            break;

          case 'whoami':
            term.echo('[[b;#39ff14;]guest@shreyas-portfolio] (Viewer)');
            break;

          case 'sudo':
            term.echo("[[b;#ff007f;]Permission denied: You are not in the sudoers file. This incident has been reported.]");
            break;

          case 'exit':
          case 'quit':
            term.echo('Minimizing terminal...');
            if (window.WindowManager) {
              window.WindowManager.minimize();
            }
            break;

          default:
            // Safe evaluation or helpful tip
            try {
              // Only evaluate simple arithmetic or safe expressions
              if (/^[\d\s+\-*/().%^]+$/.test(cmd)) {
                const res = Function(`"use strict"; return (${cmd})`)();
                term.echo(`[[b;#39ff14;]${res}]`);
              } else {
                term.echo(`[[;#ff007f;]Command not found: '${cmd}']. Type '[[b;#00f0ff;]help]' for available commands.`);
              }
            } catch (e) {
              term.echo(`[[;#ff007f;]Error: ${e.message}]`);
            }
            break;
        }
      }, {
        greetings: BANNER,
        prompt: 'shreyas@portfolio:~$ ',
        completion: COMMAND_LIST,
        checkArity: false,
        name: 'shreyas_terminal'
      });

      this.instance = termDemo;
    },

    executeCommand: function (cmd) {
      if (this.instance) {
        this.instance.exec(cmd);
      }
    }
  };

  window.PortfolioTerminal = TerminalApp;
})();
