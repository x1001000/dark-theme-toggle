// Universal Dark Theme Toggle - Content Script
// Works on any website with special support for charts and data visualizations

(function() {
  'use strict';

  // Fallback list for sites known to have native dark themes
  // (used if auto-detection is uncertain)
  const KNOWN_DARK_THEME_SITES = [
    'youtube.com',
    'youtu.be',
    'github.com',
    'twitter.com',
    'x.com',
    'reddit.com',
    'discord.com',
    'spotify.com',
    'netflix.com'
  ];

  /**
   * Detects if the site has native dark theme support
   * Returns: { hasNativeDarkTheme: boolean, reason: string, confidence: number }
   */
  function detectNativeDarkTheme() {
    const detectionResults = [];

    // 1. Check if page is already using dark colors
    const isDarkPage = checkIfPageIsDark();
    if (isDarkPage.isDark) {
      detectionResults.push({
        indicator: 'Dark color scheme detected',
        confidence: isDarkPage.confidence,
        positive: true
      });
    }

    // 2. Check for theme toggle elements
    const hasThemeToggle = checkForThemeToggle();
    if (hasThemeToggle) {
      detectionResults.push({
        indicator: 'Theme toggle UI detected',
        confidence: 0.8,
        positive: true
      });
    }

    // 3. Check for dark theme CSS classes/attributes
    const hasDarkThemeIndicators = checkForDarkThemeIndicators();
    if (hasDarkThemeIndicators.found) {
      detectionResults.push({
        indicator: `Dark theme indicators: ${hasDarkThemeIndicators.indicators.join(', ')}`,
        confidence: 0.7,
        positive: true
      });
    }

    // 4. Check if site responds to prefers-color-scheme
    const respondsToColorScheme = checkColorSchemeSupport();
    if (respondsToColorScheme) {
      detectionResults.push({
        indicator: 'Responds to prefers-color-scheme',
        confidence: 0.9,
        positive: true
      });
    }

    // 5. Check fallback list
    const hostname = window.location.hostname;
    const isKnownSite = KNOWN_DARK_THEME_SITES.some(site => hostname.includes(site));
    if (isKnownSite) {
      detectionResults.push({
        indicator: 'Known site with native dark theme',
        confidence: 1.0,
        positive: true
      });
    }

    // Calculate overall confidence
    const positiveResults = detectionResults.filter(r => r.positive);
    const hasNativeDarkTheme = positiveResults.length > 0;
    const avgConfidence = positiveResults.length > 0
      ? positiveResults.reduce((sum, r) => sum + r.confidence, 0) / positiveResults.length
      : 0;

    return {
      hasNativeDarkTheme,
      confidence: avgConfidence,
      reasons: detectionResults.map(r => r.indicator),
      shouldExclude: hasNativeDarkTheme && avgConfidence >= 0.6
    };
  }

  /**
   * Checks if the page is already using dark colors
   */
  function checkIfPageIsDark() {
    try {
      const body = document.body;
      const html = document.documentElement;
      const elementsToCheck = [body, html];

      // Get computed background colors
      let darkElementCount = 0;
      let totalChecked = 0;

      for (const el of elementsToCheck) {
        if (!el) continue;

        const bgColor = window.getComputedStyle(el).backgroundColor;
        const textColor = window.getComputedStyle(el).color;

        const bgLuminance = getRelativeLuminance(bgColor);
        const textLuminance = getRelativeLuminance(textColor);

        // Dark background = low luminance
        if (bgLuminance < 0.3) {
          darkElementCount++;
        }

        // Light text on dark background
        if (bgLuminance < 0.3 && textLuminance > 0.5) {
          darkElementCount += 0.5;
        }

        totalChecked++;
      }

      const darkRatio = darkElementCount / totalChecked;
      const isDark = darkRatio > 0.5;

      return {
        isDark,
        confidence: Math.min(darkRatio * 1.5, 1.0)
      };
    } catch (e) {
      return { isDark: false, confidence: 0 };
    }
  }

  /**
   * Calculates relative luminance of a color
   * Returns 0.5 (neutral) if color is transparent or invalid
   */
  function getRelativeLuminance(color) {
    try {
      // Handle transparent backgrounds
      if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') {
        return 0.5;  // Neutral - treat as unknown
      }

      const rgb = color.match(/\d+/g);
      if (!rgb || rgb.length < 3) return 0.5;

      const [r, g, b] = rgb.map(val => {
        const channel = parseInt(val) / 255;
        return channel <= 0.03928
          ? channel / 12.92
          : Math.pow((channel + 0.055) / 1.055, 2.4);
      });

      const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      return luminance;
    } catch (e) {
      console.warn('Dark Theme Toggle: Error calculating luminance for color:', color, e);
      return 0.5;
    }
  }

  /**
   * Checks for theme toggle UI elements
   */
  function checkForThemeToggle() {
    const toggleSelectors = [
      '[aria-label*="theme" i]',
      '[aria-label*="dark mode" i]',
      '[aria-label*="light mode" i]',
      '[title*="theme" i]',
      '[title*="dark mode" i]',
      'button[class*="theme" i]',
      'button[id*="theme" i]',
      '[role="switch"][aria-label*="theme" i]',
      '[role="switch"][aria-label*="dark" i]'
    ];

    return toggleSelectors.some(selector => {
      try {
        return document.querySelector(selector) !== null;
      } catch (e) {
        return false;
      }
    });
  }

  /**
   * Checks for common dark theme indicators in HTML
   */
  function checkForDarkThemeIndicators() {
    const indicators = [];

    // Check for dark theme classes
    const darkThemeClasses = [
      'dark-mode', 'dark-theme', 'theme-dark', 'darkmode',
      'dark', '__dark', 'dark-ui'
    ];

    const html = document.documentElement;
    const body = document.body;

    for (const cls of darkThemeClasses) {
      if (html?.classList.contains(cls) || body?.classList.contains(cls)) {
        indicators.push(`class="${cls}"`);
      }
    }

    // Check for data attributes
    const darkThemeAttrs = ['theme', 'data-theme', 'data-color-mode', 'data-color-scheme'];
    for (const attr of darkThemeAttrs) {
      const value = html?.getAttribute(attr) || body?.getAttribute(attr);
      if (value && /dark/i.test(value)) {
        indicators.push(`${attr}="${value}"`);
      }
    }

    // Check for CSS variables suggesting theme support
    const styles = window.getComputedStyle(html);
    const cssVars = ['--theme', '--color-mode', '--background', '--bg'];
    for (const varName of cssVars) {
      const value = styles.getPropertyValue(varName);
      if (value && value.trim()) {
        indicators.push(`${varName} defined`);
        break; // Only report once for CSS vars
      }
    }

    return {
      found: indicators.length > 0,
      indicators
    };
  }

  /**
   * Checks if site responds to prefers-color-scheme media query
   */
  function checkColorSchemeSupport() {
    try {
      // Check if there are any stylesheets that use prefers-color-scheme
      const styleSheets = Array.from(document.styleSheets);

      for (const sheet of styleSheets) {
        try {
          const rules = sheet.cssRules || sheet.rules;
          if (!rules) continue;

          for (const rule of Array.from(rules)) {
            if (rule.media && rule.media.mediaText.includes('prefers-color-scheme')) {
              return true;
            }
          }
        } catch (e) {
          // CORS restrictions - can't access external stylesheets
          continue;
        }
      }

      // Check meta tag for color-scheme
      const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
      if (metaColorScheme) {
        return true;
      }

      return false;
    } catch (e) {
      return false;
    }
  }

  // Store MutationObserver reference to prevent memory leaks
  let observer = null;

  // Wait for body to be available before running detection
  function initialize() {
    // Ensure body exists before running detection
    if (!document.body) {
      console.log('Dark Theme Toggle: Waiting for document.body...');
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
      } else {
        // Body should exist, but doesn't - try again shortly
        setTimeout(initialize, 100);
      }
      return;
    }

    // Perform detection
    const detection = detectNativeDarkTheme();

    console.log('Dark Theme Toggle Detection:', detection);

    // Skip initialization if site has native dark theme
    if (detection.shouldExclude) {
      console.log('Dark Theme Toggle: Site excluded -', detection.reasons.join('; '));
      return;
    }

    // Proceed with initialization
    initializeExtension();
  }

  function initializeExtension() {

  // Check if dark theme is enabled
  chrome.storage.sync.get(['darkThemeEnabled'], function(result) {
    if (result.darkThemeEnabled) {
      enableDarkTheme();
    }
  });

  // Listen for theme toggle messages
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'toggleTheme') {
      if (request.enabled) {
        enableDarkTheme();
      } else {
        disableDarkTheme();
      }
    }
  });

  function enableDarkTheme() {
    document.documentElement.setAttribute('data-mm-dark-theme', 'true');

    // Disconnect existing observer if present
    if (observer) {
      observer.disconnect();
    }

    // Apply dark theme to dynamically loaded charts
    observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
          applyDarkThemeToCharts();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    applyDarkThemeToCharts();
  }

  function disableDarkTheme() {
    document.documentElement.removeAttribute('data-mm-dark-theme');

    // Disconnect observer to prevent memory leaks
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  function applyDarkThemeToCharts() {
    // Target common chart containers
    const chartContainers = document.querySelectorAll(
      '.chart-container, .highcharts-container, [class*="chart"], canvas, svg'
    );

    chartContainers.forEach(container => {
      // Force redraw for canvas elements (Highcharts, Chart.js, etc.)
      if (container.tagName === 'CANVAS') {
        container.style.filter = 'invert(0.9) hue-rotate(180deg)';
      }

      // Apply dark theme class
      if (container.classList) {
        container.classList.add('mm-dark-theme-applied');
      }
    });

    // Handle SVG-based charts
    const svgElements = document.querySelectorAll('svg');
    svgElements.forEach(svg => {
      svg.classList.add('mm-dark-svg');
    });

    // Handle iframe-based charts (TradingView, etc.)
    const iframes = document.querySelectorAll('iframe[src*="chart"], iframe[class*="chart"]');
    iframes.forEach(iframe => {
      iframe.classList.add('mm-dark-iframe');
    });
  }

  // Create toggle button on the page
  function createToggleButton() {
    // Safety check - ensure body exists
    if (!document.body) {
      console.error('Dark Theme Toggle: Cannot create button - document.body not available');
      return;
    }

    // Check if button already exists
    if (document.getElementById('mm-dark-theme-toggle')) {
      console.log('Dark Theme Toggle: Button already exists, skipping creation');
      return;
    }

    try {
      const button = document.createElement('button');
      button.id = 'mm-dark-theme-toggle';
      button.innerHTML = '🌙';
      button.title = 'Toggle Dark Theme';
      button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 2147483647;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 2px solid #333;
        background: #fff;
        cursor: pointer;
        font-size: 24px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
      `;

      chrome.storage.sync.get(['darkThemeEnabled'], function(result) {
        if (result.darkThemeEnabled) {
          button.innerHTML = '☀️';
          button.style.background = '#1a1a1a';
          button.style.borderColor = '#666';
        }
      });

      button.addEventListener('click', function() {
        chrome.storage.sync.get(['darkThemeEnabled'], function(result) {
          const newState = !result.darkThemeEnabled;
          chrome.storage.sync.set({ darkThemeEnabled: newState }, function() {
            if (newState) {
              button.innerHTML = '☀️';
              button.style.background = '#1a1a1a';
              button.style.borderColor = '#666';
              enableDarkTheme();
            } else {
              button.innerHTML = '🌙';
              button.style.background = '#fff';
              button.style.borderColor = '#333';
              disableDarkTheme();
            }
          });
        });
      });

      document.body.appendChild(button);
      console.log('Dark Theme Toggle: Button created successfully');
    } catch (error) {
      console.error('Dark Theme Toggle: Error creating button', error);
    }
  }

  // Initialize toggle button when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createToggleButton);
  } else {
    createToggleButton();
  }

  }  // End of initializeExtension()

  // Start the initialization process
  initialize();
})();
