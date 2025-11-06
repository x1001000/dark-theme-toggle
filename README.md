# MacroMicro Chart Dark Theme Extension

A Chrome extension that adds a dark theme toggle for charts on MacroMicro.me, styled similar to popular financial chart dark themes.

## Features

- 🌙 Toggle dark theme for charts on MacroMicro.me
- 💾 Persistent theme preference (saved across sessions)
- 🎨 Optimized dark color scheme for financial charts
- ⚡ Works with dynamic chart updates
- 🎯 Supports multiple chart types (Highcharts, SVG, Canvas-based)

## Installation

### Method 1: Load as Unpacked Extension (Development)

1. **Load Extension in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right corner)
   - Click "Load unpacked"
   - Select the `mm-chart-dark` directory
   - The extension should now appear in your extensions list (icons are already included!)

2. **Use the Extension**:
   - Visit any chart page on MacroMicro.me:
     - https://www.macromicro.me/charts/109709/big-techs-m7-capex
     - https://www.macromicro.me/collections/4093/us-big-tech/109709/big-techs-m7-capex
   - Click the extension icon in your toolbar to toggle dark theme
   - Or use the floating toggle button (🌙/☀️) on the bottom-right of the page

### Method 2: Package and Install

To package the extension:
```bash
# Create a zip file
zip -r mm-chart-dark.zip . -x "*.git*" -x "README.md" -x "*.DS_Store"
```

Then load the unpacked extension or submit to Chrome Web Store.

## Files Structure

```
mm-chart-dark/
├── manifest.json          # Extension configuration
├── content.js            # Main content script
├── dark-theme.css        # Dark theme styles
├── popup.html            # Extension popup UI
├── popup.js              # Popup functionality
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── CLAUDE.md            # Project requirements
└── README.md            # This file
```

## How It Works

1. **Content Script** (`content.js`):
   - Injects into MacroMicro.me chart pages
   - Monitors DOM for chart elements
   - Applies dark theme classes when enabled
   - Creates a floating toggle button on the page

2. **Dark Theme CSS** (`dark-theme.css`):
   - Comprehensive dark theme styles
   - Targets Highcharts elements (most common on financial sites)
   - Supports SVG and Canvas-based charts
   - Applies dark colors to page elements
   - Colors inspired by GitHub Dark theme

3. **Popup Interface** (`popup.html` + `popup.js`):
   - Clean UI for toggling theme
   - Shows current theme status
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
- Refresh the MacroMicro.me page after installing the extension
- Check if the page URL matches the patterns in `manifest.json`
- Open browser console (F12) to check for JavaScript errors

**Charts look wrong:**
- Different chart types may need additional CSS rules
- Check browser console for the chart library being used
- Add custom CSS rules in `dark-theme.css` as needed

## Browser Support

- Chrome 88+ (Manifest V3)
- Edge 88+
- Other Chromium-based browsers

## Development

To modify and test the extension:

1. Make changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh icon on the extension card
4. Reload any open MacroMicro.me pages

## License

MIT License - feel free to modify and distribute

## Credits

Built with inspiration from:
- GitHub Dark theme color palette
- Financial chart dark modes (TradingView, finguider, etc.)
- Highcharts dark theme patterns
