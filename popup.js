// Popup script for MacroMicro Dark Theme extension

document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('themeToggle');
  const statusDiv = document.getElementById('status');

  // Load current theme state
  chrome.storage.sync.get(['darkThemeEnabled'], function(result) {
    const isEnabled = result.darkThemeEnabled || false;
    toggle.checked = isEnabled;
    updateStatus(isEnabled);
  });

  // Handle toggle change
  toggle.addEventListener('change', function() {
    const isEnabled = toggle.checked;

    // Save state
    chrome.storage.sync.set({ darkThemeEnabled: isEnabled }, function() {
      updateStatus(isEnabled);

      // Send message to content script to toggle theme
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0]) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: 'toggleTheme',
            enabled: isEnabled
          }, function(response) {
            // Ignore errors if content script is not loaded
            if (chrome.runtime.lastError) {
              console.log('Content script not loaded:', chrome.runtime.lastError.message);
            }
          });
        }
      });
    });
  });

  function updateStatus(isEnabled) {
    if (isEnabled) {
      statusDiv.textContent = '✓ Dark theme is active';
      statusDiv.classList.add('active');
    } else {
      statusDiv.textContent = 'Dark theme is off';
      statusDiv.classList.remove('active');
    }
  }
});
