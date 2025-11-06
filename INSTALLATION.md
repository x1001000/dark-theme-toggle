# Quick Installation Guide

**Adaptive Dark Theme - Smart toggle for sites without native dark mode!** 🌐

**Icons are already included - just load and go!** 🚀

## Step 1: Load Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select this directory (`dark-theme-toggle`)
5. The extension should now be loaded!

## Step 2: Test It Out

1. Visit **any website** you want to darken:
   - Financial charts: https://www.macromicro.me/charts/109709/big-techs-m7-capex
   - News sites: https://news.ycombinator.com
   - Documentation: https://docs.python.org
   - Or literally any other website!
2. Click the extension icon in your toolbar
3. Toggle the dark theme switch
4. The entire page switches to dark mode!
5. Or use the floating 🌙 button in the bottom-right corner

## Two Ways to Toggle

**Method 1 - Extension Popup:**
- Click the extension icon in your toolbar
- Toggle the switch in the popup

**Method 2 - Floating Button:**
- Look for the 🌙 button in the bottom-right corner of ANY page
- Click it to toggle between light and dark themes
- The button changes to ☀️ when dark theme is active

## Regenerating Icons (Optional)

Icons are pre-generated and included in the repository. If you want to customize them:

**Option 1 - Python script:**
```bash
python3 generate_icons.py
```

**Option 2 - Browser tool:**
Open `generate-icons.html` in your browser and download the icons manually.

## Troubleshooting

**"Could not load icon" error:**
- Icons should already be in the `icons/` directory
- If missing, run: `python3 generate_icons.py`

**Extension not appearing in toolbar:**
- Click the puzzle piece icon in Chrome's toolbar
- Find "Adaptive Dark Theme" and click the pin icon

**Dark theme not working:**
- Try refreshing the page after enabling the extension
- Look for the floating 🌙 button in the bottom-right
- The extension now works on ALL websites by default
- Check the browser console (F12) for any errors

## What Makes This Special?

- 🧠 **Adaptive** - Only activates on sites without native dark modes
- 🌐 **Universal** - Works on ANY website, not just specific domains
- 📊 **Chart-optimized** - Special support for Highcharts, Chart.js, D3.js, SVG charts
- 💾 **Persistent** - Remembers your preference across all websites
- ⚡ **Dynamic** - Handles content that loads after the page
- 🎨 **Beautiful** - GitHub Dark-inspired color scheme
- 🎯 **Flexible** - Toggle via popup or floating button

Perfect for:
- Financial charts and market data
- Data dashboards and visualizations
- Reading documentation and articles
- Any website where you prefer dark mode

Enjoy your dark-themed browsing experience! 🌙✨
