/**
 * Cube Master — Interactive Cube
 * Powers every `[data-interactive-cube]` canvas (learn.html, beginner.html).
 * Face/slice buttons trigger rotations, x/y/z buttons rotate the viewpoint,
 * and Scramble/Reset act on their own scene. Drill algorithm buttons
 * (.drill-card__btn) play on the page's first cube.
 */

import { CubeEngine } from './cube-engine.js';

document.addEventListener('DOMContentLoaded', () => {
  const canvases = document.querySelectorAll('canvas[data-interactive-cube], #learn-cube-canvas');
  if (!canvases.length) return;

  const engines = [];

  canvases.forEach((canvas) => {
    const engine = new CubeEngine(canvas, {
      cubieSize: 0.95,
      gap: 0.05,
      rotationDuration: 0.35,
      ambient: false,
    });
    engines.push(engine);

    // Scope the controls to this cube's wrapper so multiple cubes on one
    // page each get their own buttons. The control groups live INSIDE
    // .cube-scene-wrapper but OUTSIDE .cube-scene (grid layout), so the
    // wrapper is the correct scope.
    const scene = canvas.closest('.cube-scene-wrapper')
      || canvas.closest('.cube-scene')
      || document;

    // Face + slice move buttons
    scene.querySelectorAll('.cube-btn[data-move]').forEach((btn) => {
      btn.addEventListener('click', () => engine.rotateFace(btn.dataset.move));
    });

    // Whole-cube rotation buttons (x / y / z) — viewpoint change only
    scene.querySelectorAll('.cube-btn[data-rotate]').forEach((btn) => {
      btn.addEventListener('click', () => engine.rotateWholeCube(btn.dataset.rotate));
    });

    // Scramble / Reset
    const scrambleBtn = scene.querySelector('.cube-scene__actions [data-action="scramble"]')
      || document.getElementById('scrambleBtn');
    const resetBtn = scene.querySelector('.cube-scene__actions [data-action="reset"]')
      || document.getElementById('resetBtn');
    if (scrambleBtn) scrambleBtn.addEventListener('click', () => engine.scramble(20));
    if (resetBtn) resetBtn.addEventListener('click', () => engine.reset());
  });

  // Drill algorithm buttons play on the first cube of the page
  const drillButtons = document.querySelectorAll('.drill-card__btn[data-algo]');
  drillButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      playAlgorithm(engines[0], btn.dataset.algo);
    });
  });

  function playAlgorithm(engine, algoString) {
    if (!engine) return;
    const moves = algoString.trim().split(/\s+/).filter(Boolean);
    let index = 0;

    const playNext = () => {
      if (index >= moves.length) return;
      const move = moves[index++];
      engine.rotateFace(move, playNext);
    };

    playNext();
  }

  window.addEventListener('beforeunload', () => engines.forEach((e) => e.destroy()));
});
