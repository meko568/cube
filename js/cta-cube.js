/**
 * Cube Master — CTA Cube
 * Smaller animated cube for index.html CTA section.
 * Slow ambient rotation only.
 */

import { CubeEngine } from './cube-engine.js';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('cta-cube-canvas');
  if (!canvas) return;

  const engine = new CubeEngine(canvas, {
    cubieSize: 0.95,
    gap: 0.05,
    rotationDuration: 0.35,
    ambient: true,
  });

  // Slightly slower ambient
  let speed = 0.001;
  const orig = engine._autoRotate;
  engine._autoRotate = () => {
    if (engine._ambientActive) {
      engine.cubeGroup.rotation.y += speed;
    }
    return false;
  };

  window.addEventListener('beforeunload', () => engine.destroy());
});