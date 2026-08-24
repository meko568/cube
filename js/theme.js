/**
 * Cube Master — Theme Toggle
 * Dark / Light / High-Contrast theme switching with localStorage persistence.
 */

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;

  const themes = ['dark', 'light', 'hc'];
  let currentIndex = 0;

  // Initialize from localStorage or system preference
  const stored = localStorage.getItem('theme');
  if (stored && themes.includes(stored)) {
    currentIndex = themes.indexOf(stored);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    currentIndex = 1; // light
  } else if (window.matchMedia('(prefers-contrast: high)').matches) {
    currentIndex = 2; // hc
  }

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    btn.setAttribute('aria-pressed', theme !== 'dark');
    localStorage.setItem('theme', theme);
  };

  applyTheme(themes[currentIndex]);

  btn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % themes.length;
    applyTheme(themes[currentIndex]);
  });

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      currentIndex = e.matches ? 1 : 0;
      applyTheme(themes[currentIndex]);
    }
  });

  window.matchMedia('(prefers-contrast: high)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme') && e.matches) {
      currentIndex = 2;
      applyTheme(themes[currentIndex]);
    }
  });
});