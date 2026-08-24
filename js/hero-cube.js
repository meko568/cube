/**
 * Cube Master — Hero Cube
 * Interactive 3D cube for index.html hero section.
 * Ambient rotation, drag, scroll zoom, click to scramble.
 */

import { CubeEngine } from './cube-engine.js';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('hero-cube-canvas');
  if (!canvas) return;

  const engine = new CubeEngine(canvas, {
    cubieSize: 0.95,
    gap: 0.05,
    rotationDuration: 0.35,
    ambient: true,
  });

  // Click to scramble
  canvas.addEventListener('click', () => {
    engine.scramble(12);
  });

  // Re-attach on unload
  window.addEventListener('beforeunload', () => engine.destroy());
});