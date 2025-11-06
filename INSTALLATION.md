# Quick Installation Guide

**Icons are already included - just load and go!** 🚀

## Step 1: Load Extension in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select this directory (`mm-chart-dark`)
5. The extension should now be loaded!

## Step 2: Test It Out

1. Visit a MacroMicro.me chart page:
   - https://www.macromicro.me/charts/109709/big-techs-m7-capex
2. Click the extension icon in your toolbar
3. Toggle the dark theme switch
4. The chart should switch to dark mode!

## Alternative: Use the Floating Button

Instead of the extension popup, you can use the floating toggle button:
- Look for the 🌙 button in the bottom-right corner of MacroMicro.me pages
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
- Find "MacroMicro Chart Dark Theme" and click the pin icon

**Dark theme not working:**
- Make sure you're on a MacroMicro.me chart page
- Try refreshing the page after enabling the extension
- Check the browser console (F12) for any errors

## Features

- 🌙 Beautiful dark theme optimized for financial charts
- 💾 Remembers your preference across sessions
- ⚡ Works with dynamically loaded charts
- 🎨 Carefully selected colors for readability
- 🎯 Both popup and on-page toggle options

Enjoy your dark-themed charts! 📊✨
