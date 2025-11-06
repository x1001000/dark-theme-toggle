# Adaptive Dark Theme

A Chrome extension that intelligently provides a dark theme toggle for websites **without native dark modes**. Automatically detects and skips sites with existing dark themes, preventing conflicts. Includes special optimizations for charts and data visualizations.

## Features

- 🌐 **Works on ANY website** - not limited to specific domains
- 🧠 **Smart detection** - automatically skips sites with native dark themes
- 🌙 Toggle dark theme via popup or floating button
- 💾 Persistent theme preference (saved across sessions and sites)
- 📊 **Optimized for charts** - Highcharts, Chart.js, D3.js, SVG, Canvas
- 🎨 GitHub-inspired dark color palette for readability
- ⚡ Handles dynamically loaded content
- 🎯 Two ways to toggle: extension popup or on-page button

### Adaptive Intelligence

The extension automatically detects sites with native dark themes and only activates on sites that need it! It checks for:

1. **Dark color schemes** - Analyzes if the page is already using dark backgrounds and light text
2. **Theme toggle UI** - Detects existing theme switchers (buttons, toggles)
3. **Dark theme indicators** - Looks for CSS classes like `dark-mode`, `dark-theme`, or attributes like `data-theme="dark"`
4. **CSS media queries** - Checks if the site responds to `prefers-color-scheme: dark`
5. **Known sites** - Maintains a fallback list of popular sites with excellent native themes

**Sites where the toggle won't activate:**
- YouTube, GitHub, Reddit, Twitter/X, Discord, Spotify, Netflix
- Any site already in dark mode
- Any site with a theme toggle

This adaptive behavior ensures the toggle only appears where it's needed, preventing conflicts and maintaining the best user experience!

## Installation

### Method 1: Load as Unpacked Extension (Development)

1. **Load Extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `dark-theme-toggle` directory
   - The extension should now appear in your extensions list (icons are already included!)

2. **Use the Extension**:
   - Visit **any website** (financial charts, dashboards, documentation, etc.)
   - Click the extension icon in your toolbar to toggle dark theme
   - Or use the floating toggle button (🌙/☀️) on the bottom-right of any page
   - Examples of sites that work great:
     - Financial charts: MacroMicro.me, TradingView, Yahoo Finance
     - Data dashboards: Grafana, Kibana, Tableau
     - Documentation sites, blogs, news sites, etc.

### Method 2: Package and Install

To package the extension:
```bash
# Create a zip file
zip -r dark-theme-toggle.zip . -x "*.git*" -x "README.md" -x "*.DS_Store"
```

Then load the unpacked extension or submit to Chrome Web Store.

## Use Cases

Perfect for:
- 📊 **Financial analysts** viewing charts and market data
- 👨‍💻 **Data scientists** working with dashboards and visualizations
- 📰 **Night readers** browsing news and articles
- 🎓 **Students** reading documentation and tutorials
- 👀 **Anyone** who prefers dark mode on all websites

## Files Structure

```
dark-theme-toggle/
├── manifest.json          # Extension configuration
├── content.js            # Main content script
├── dark-theme.css        # Dark theme styles (800+ lines)
├── popup.html            # Extension popup UI
├── popup.js              # Popup functionality
├── generate_icons.py     # Icon generator script
├── generate-icons.html   # Browser-based icon tool
├── icons/                # Pre-generated extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # This file
```

## How It Works

1. **Content Script** (`content.js`):
   - Injects into **all web pages**
   - **Intelligent detection**: Analyzes if site has native dark theme support
   - Automatically excludes sites with native themes (confidence threshold: 60%)
   - Monitors DOM for chart elements and dynamic content
   - Applies dark theme classes when enabled
   - Creates a floating toggle button on every page
   - Detects Highcharts, Chart.js, D3.js, SVG, Canvas charts
   - Logs detection results to console for debugging

2. **Dark Theme CSS** (`dark-theme.css`):
   - 800+ lines of comprehensive dark theme styles
   - **Chart libraries**: Highcharts, Chart.js, Google Charts, SVG, Canvas
   - **Page elements**: text, backgrounds, tables, forms, navigation
   - **Color scheme**: GitHub Dark-inspired (#0d1117 bg, #c9d1d9 text)
   - Carefully selected vibrant chart colors for dark backgrounds

3. **Popup Interface** (`popup.html` + `popup.js`):
   - Beautiful gradient UI for toggling theme
   - Shows current theme status
   - Works across all tabs and websites
   - Persists preference using Chrome storage

## Color Scheme

The dark theme uses a carefully selected color palette:

- **Background**: `#0d1117` (dark navy)
- **Chart Background**: `#161b22` (slightly lighter)
- **Grid Lines**: `#30363d` (subtle gray)
- **Text**: `#c9d1d9` (light gray)
- **Axes**: `#484f58` (medium gray)
- **Chart Colors**: Vibrant, accessible colors (blue, red, green, purple, orange)

## Customization

You can customize the theme by editing `dark-theme.css`:

```css
/* Change background color */
[data-mm-dark-theme="true"] {
  background-color: #your-color !important;
}

/* Adjust chart series colors */
[data-mm-dark-theme="true"] .highcharts-series-0 .highcharts-graph {
  stroke: #your-color !important;
}
```

## Regenerating Icons

Icons are already included in the `icons/` directory. If you need to regenerate them:

```bash
python3 generate_icons.py
```

Or use the browser-based tool by opening `generate-icons.html` in your browser.

## Troubleshooting

**Extension not appearing:**
- Icons are already included, so this should work out of the box
- Check Chrome Extensions page for error messages
- Reload the extension after making changes

**Dark theme not applying:**
- Refresh the page after enabling the extension
- The extension now works on **all URLs** by default
- Look for the floating 🌙 button in the bottom-right corner
- Open browser console (F12) to check for JavaScript errors
- Some sites may need page-specific CSS adjustments

**Charts look wrong:**
- Different chart types may need additional CSS rules
- Check browser console for the chart library being used
- Add custom CSS rules in `dark-theme.css` as needed

## Browser Support

- ✅ Chrome 88+ (Manifest V3)
- ✅ Microsoft Edge 88+
- ✅ Brave, Opera, Vivaldi
- ✅ Any Chromium-based browser

## Version History

**v2.2.0** - Adaptive Intelligence (Current)
- Renamed to "Adaptive Dark Theme" to reflect intelligent behavior
- Smart detection of sites with native dark themes
- Toggle only activates on sites that need it
- Confidence-based decision making (analyzes 5 different indicators)
- Prevents conflicts with existing dark themes
- Enhanced compatibility with modern websites

**v2.0.0** - Universal Coverage
- Now works on **any website**, not just MacroMicro.me
- Enhanced chart detection for multiple libraries
- Improved compatibility across different sites

**v1.0.0** - Initial Release
- MacroMicro.me specific dark theme
- Highcharts support
- Basic toggle functionality

## Development

To modify and test the extension:

1. Make changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Reload any open MacroMicro.me pages

## License

MIT License - feel free to modify and distribute

## Privacy & Permissions

This extension requires:
- **`<all_urls>`** - To work on any website you visit
- **`storage`** - To save your theme preference
- **`activeTab`** - To apply theme to the current tab

**Your privacy is important**: This extension does NOT:
- ❌ Collect any data
- ❌ Track your browsing
- ❌ Send data to external servers
- ❌ Show ads or analytics

All theme preferences are stored locally in your browser.

## Credits

Built with inspiration from:
- GitHub Dark theme color palette
- Financial chart dark modes (TradingView, finguider, etc.)
- Highcharts, Chart.js dark theme patterns
