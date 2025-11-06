// Universal Dark Theme Toggle - Content Script
// Works on any website with special support for charts and data visualizations

(function() {
  'use strict';

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

    // Apply dark theme to dynamically loaded charts
    const observer = new MutationObserver(function(mutations) {
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
    const button = document.createElement('button');
    button.id = 'mm-dark-theme-toggle';
    button.innerHTML = '🌙';
    button.title = 'Toggle Dark Theme';
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 10000;
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
  }

  // Initialize toggle button when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createToggleButton);
  } else {
    createToggleButton();
  }
})();
