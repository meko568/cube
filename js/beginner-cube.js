/**
 * Cube Master — Beginner Cube
 * Interactive cubes for each beginner step with algorithm playback.
 * Each step canvas has a dedicated cube engine with algorithm play controls.
 */

import { CubeEngine } from './cube-engine.js';
import { getShape } from './algo-shapes.js';

// Per-step shape + best viewpoint. Each beginner step shows only the pieces
// it concerns; the rest of the cube is neutral gray.
const STEP_SHAPES = {
  1: { shape: 'DAISY', view: 'top' }, // Daisy
  2: { shape: 'CROSS', view: 'bottom' }, // White cross
  3: { shape: 'FIRST_LAYER', view: 'bottom' }, // White corners
  4: { shape: 'SECOND_LAYER', view: 'f2l' }, // Second layer
  5: { shape: 'TOP_CROSS', view: 'top' }, // Yellow cross
  6: { shape: 'OLL', view: 'top' }, // Yellow face (OLL)
  // PLL never changes the yellow face — only WHERE the side colors sit.
  // A top-down camera makes every PLL state look like a solved yellow
  // square, so use the 3/4 view: U face plus two sides visible.
  7: { shape: 'PLL', view: 'default' }, // Permute last layer (PLL)
};

document.addEventListener('DOMContentLoaded', () => {
  const stepCanvases = document.querySelectorAll('[data-step-canvas]');
  const engines = new Map();
  const stepShapeNames = new Map(); // stepNum -> default shape name (per-box data-shape overrides this)

  stepCanvases.forEach((canvas) => {
    const stepNum = parseInt(canvas.dataset.stepCanvas, 10);
    const conf = STEP_SHAPES[stepNum] || {};
    const engine = new CubeEngine(canvas, {
      cubieSize: 0.9,
      gap: 0.1,
      rotationDuration: 0.35,
      ambient: false,
      view: conf.view || 'default',
    });

    // Show the step SHAPE (relevant pieces colored, rest gray)
    const stickers = getShape(conf.shape);
    if (stickers) {
      engine.showShape(stickers);
    }

    engines.set(stepNum, engine);
    stepShapeNames.set(stepNum, conf.shape || null);
  });

  // Resolve the display shape for an algorithm box: an explicit
  // data-shape on the box wins, otherwise the whole step shares its
  // default shape (OLL for step 6, PLL for step 7).
  function shapeForBox(box, stepNum) {
    return getShape(box.dataset.shape || stepShapeNames.get(stepNum));
  }

  // Algorithm playback for each algo-box
  const algoBoxes = document.querySelectorAll('.algo-box__notation[data-algo]');
  algoBoxes.forEach((box) => {
    const algo = box.dataset.algo;
    const stepSection = box.closest('.algo-step');
    if (!stepSection) return;

    const stepNum = parseInt(stepSection.querySelector('[data-step-canvas]')?.dataset.stepCanvas || '0', 10);
    const engine = engines.get(stepNum);
    if (!engine) return;

    // Add "Display" + "Play" buttons.
    // Display: shows the case's START state (what the cube looks like when
    // you should apply this algorithm) without animating anything.
    const displayBtn = document.createElement('button');
    displayBtn.type = 'button';
    displayBtn.className = 'algo-box__display btn btn--outline btn--xs';
    displayBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14" aria-hidden="true">
        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
      Display
    `;
    displayBtn.setAttribute('aria-label', `Display case: ${algo}`);
    displayBtn.addEventListener('click', () => {
      engine.setupCase(algo, shapeForBox(box, stepNum));
    });

    const playBtn = document.createElement('button');
    playBtn.type = 'button';
    playBtn.className = 'algo-box__play btn btn--primary btn--xs';
    playBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
        <path d="M8 5v14l11-7z"/>
      </svg>
      Play
    `;
    playBtn.setAttribute('aria-label', `Play algorithm: ${algo}`);

    const stopBtn = document.createElement('button');
    stopBtn.type = 'button';
    stopBtn.className = 'algo-box__stop btn btn--outline btn--xs';
    stopBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
        <rect x="5" y="5" width="14" height="14" rx="2"/>
      </svg>
      Stop
    `;
    stopBtn.setAttribute('aria-label', `Stop algorithm: ${algo}`);
    stopBtn.disabled = true;

    const speedSel = document.createElement('select');
    speedSel.className = 'algo-box__speed';
    speedSel.setAttribute('aria-label', `Playback speed: ${algo}`);
    [[0.5, '0.5×'], [0.75, '0.75×'], [1, '1×'], [1.5, '1.5×'], [2, '2×']].forEach(([v, label]) => {
      const opt = document.createElement('option');
      opt.value = String(v);
      opt.textContent = label;
      if (v === 1) opt.selected = true;
      speedSel.appendChild(opt);
    });
    speedSel.addEventListener('change', () => engine.setSpeed(speedSel.value));

    box.parentElement.insertBefore(playBtn, box.nextSibling);
    box.parentElement.insertBefore(stopBtn, playBtn.nextSibling);
    box.parentElement.insertBefore(speedSel, stopBtn.nextSibling);
    box.parentElement.insertBefore(displayBtn, speedSel.nextSibling);

    let isPlaying = false;

    const resetBtnUI = () => {
      isPlaying = false;
      playBtn.disabled = false;
      stopBtn.disabled = true;
      playBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
          <path d="M8 5v14l11-7z"/>
        </svg>
        Replay
      `;
    };

    stopBtn.addEventListener('click', () => {
      engine.stop();
      resetBtnUI();
    });

    playBtn.addEventListener('click', () => {
      if (isPlaying) return;
      isPlaying = true;
      engine.setSpeed(speedSel.value);
      stopBtn.disabled = false;
      playBtn.disabled = true;
      playBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true" class="anim-spin">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="30 30"/>
        </svg>
        Playing...
      `;

      // Start from the step's case STATE (inverse of the algorithm applied to
      // solved, with only the step's pieces colored) so playing SOLVES it.
      engine.setupCase(algo, shapeForBox(box, stepNum));

      setTimeout(() => {
        playAlgorithm(engine, algo, () => {
          resetBtnUI();
        });
      }, 60);
    });
  });

  // Drill card buttons
  const drillButtons = document.querySelectorAll('.drill-card__btn[data-algo]');
  drillButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const algo = btn.dataset.algo;
      const stepSection = btn.closest('.algo-step');
      if (!stepSection) return;
      const stepNum = parseInt(stepSection.querySelector('[data-step-canvas]')?.dataset.stepCanvas || '0', 10);
      const engine = engines.get(stepNum);
      if (!engine) return;
      playAlgorithm(engine, algo);
    });
  });

  function playAlgorithm(engine, algoString, onComplete) {
    const moves = algoString.trim().split(/\s+/).filter(Boolean);
    let index = 0;

    const playNext = () => {
      if (index >= moves.length) {
        if (onComplete) onComplete();
        return;
      }
      const move = moves[index++];
      engine.rotateFace(move, playNext);
    };

    playNext();
  }

  // Cleanup
  window.addEventListener('beforeunload', () => {
    engines.forEach((engine) => engine.destroy());
  });
});