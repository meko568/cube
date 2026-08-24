/**
 * Cube Master — Pro Techniques Cube Handler
 * Manages tabbed interface for Finger Tricks, OH, BLD, COLL, ZBLL
 * with 3D cube visualization and algorithm playback.
 */

import { CubeEngine } from './cube-engine.js';
import { getShape } from './algo-shapes.js';
import { FINGER_TRICKS, BLD_METHODS, COLL_CASES, ZBLL_SAMPLES } from './pro-data.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all tab systems
  initAllTabs();

  // Render all algorithm grids
  renderFingerTricksGrids();
  renderBLDGrids();
  renderCOLLGrids();
  renderZBLLSamples();

  // Initialize standalone cubes
  initStandaloneCubes();
});

/**
 * Initialize all tab groups on the page
 */
function initAllTabs() {
  const tabGroups = document.querySelectorAll('.tabs[role="tablist"]');

  tabGroups.forEach((tablist) => {
    const tabs = tablist.querySelectorAll('[role="tab"]');
    const panels = tablist.parentElement.querySelectorAll('[role="tabpanel"]');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('aria-controls');
        const targetPanel = document.getElementById(targetId);

        // Update tab states
        tabs.forEach((t) => {
          t.classList.remove('tab-btn--active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('tab-btn--active');
        tab.setAttribute('aria-selected', 'true');

        // Update panel visibility
        panels.forEach((panel) => {
          if (panel.id === targetId) {
            panel.classList.add('tab-panel--active');
            panel.removeAttribute('hidden');
          } else {
            panel.classList.remove('tab-panel--active');
            panel.setAttribute('hidden', '');
          }
        });
      });

      // Keyboard navigation
      tab.addEventListener('keydown', (e) => {
        let index = Array.from(tabs).indexOf(tab);
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          index = (index + 1) % tabs.length;
          tabs[index].click();
          tabs[index].focus();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          index = (index - 1 + tabs.length) % tabs.length;
          tabs[index].click();
          tabs[index].focus();
        } else if (e.key === 'Home') {
          e.preventDefault();
          tabs[0].click();
          tabs[0].focus();
        } else if (e.key === 'End') {
          e.preventDefault();
          tabs[tabs.length - 1].click();
          tabs[tabs.length - 1].focus();
        }
      });
    });
  });
}

/**
 * Create algorithm card HTML with cube canvas
 */
function createAlgoCard(caseData, type) {
  const card = document.createElement('article');
  card.className = 'algo-card card stagger-item';
  card.dataset.caseId = caseData.id;
  card.dataset.algoType = type;

  const difficultyClass = `badge--${caseData.difficulty}`;

  card.innerHTML = `
    <header class="algo-card__header">
      <h3 class="algo-card__title">${caseData.name}</h3>
      <span class="badge ${difficultyClass}">${caseData.difficulty}</span>
    </header>
    <div class="algo-card__visual">
      <canvas class="algo-canvas" data-algo="${caseData.algo}" data-shape-type="${type}" aria-label="${caseData.name} visualization"></canvas>
    </div>
    <div class="algo-card__notation algo-box" data-algo="${caseData.algo}">
      ${formatNotation(caseData.algo)}
    </div>
    <p class="algo-card__description">${caseData.description || ''}</p>
  `;

  return card;
}

/**
 * Format algorithm string into cube-notation__move spans
 */
function formatNotation(algoString) {
  const moves = algoString.trim().split(/\s+/).filter(Boolean);
  return moves.map(move => {
    const isPrime = move.endsWith("'");
    const isDouble = move.endsWith('2');
    const face = move[0].toUpperCase();
    let className = 'cube-notation__move';
    if (isPrime) className += ' prime';
    if (isDouble) className += ' double';
    return `<span class="${className}" aria-label="${face} ${isPrime ? 'counter-clockwise' : isDouble ? '180' : 'clockwise'}">${move}</span>`;
  }).join(' ');
}

/**
 * Initialize cube engines for all algo canvases in a grid
 */
/* WebGL context pooling — browsers cap live contexts (~16); create engines
   only while a card is near the viewport and destroy them when it leaves. */
const liveEngines = new Map(); // canvas -> CubeEngine

// Pro-page case families → their last-layer shape family.
// COLL orients LL corners (OLL-style top view); ZBLL solves the whole LL
// (PLL-style, sides visible so permutation shows).
const PRO_SHAPE_FAMILY = { COLL: 'OLL', ZBLL: 'PLL' };

function shapeForType(type) {
  return getShape(PRO_SHAPE_FAMILY[type] || type);
}

function getOrCreateCardEngine(canvas) {
  let e = liveEngines.get(canvas);
  if (e && !e._destroyed) return e;
  if (e) {
    e.destroy();
    liveEngines.delete(canvas);
  }
  const type = canvas.dataset.shapeType;
  const isLastLayer = type === 'COLL' || type === 'ZBLL';
  e = new CubeEngine(canvas, {
    cubieSize: 0.9,
    gap: 0.1,
    rotationDuration: 0.3,
    ambient: false,
    view: isLastLayer ? 'top' : 'default',
  });

  // COLL/ZBLL are last-layer cases — show only the relevant pieces
  const shape = shapeForType(type);
  if (shape) {
    e.setupCase(canvas.dataset.algo, shape);
  }

  liveEngines.set(canvas, e);
  return e;
}

const cardEngineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const canvas = entry.target;
    if (entry.isIntersecting) {
      getOrCreateCardEngine(canvas);
    } else {
      const e = liveEngines.get(canvas);
      if (e && !e._destroyed) {
        e.destroy();
        liveEngines.delete(canvas);
        // destroy() swaps the canvas (dead WebGL contexts can't be reused) —
        // keep watching the fresh node so the cube rebuilds on scroll-back.
        if (e.canvas && e.canvas !== canvas) cardEngineObserver.observe(e.canvas);
      }
    }
  });
}, { rootMargin: '200px' });

function initGridCubes(gridSelector, { display = true } = {}) {
  const grid = document.querySelector(gridSelector);
  if (!grid) return;

  const canvases = grid.querySelectorAll('.algo-canvas[data-algo]');

  canvases.forEach((canvas) => {
    cardEngineObserver.observe(canvas);
    // destroy() swaps the canvas node (dead WebGL contexts can't be reused),
    // so play buttons must resolve the CURRENT live node at click time.
    // The visual wrapper div is stable across swaps — anchor the lookup there.
    const visualBox = canvas.parentElement;

    // Add play button to the algo-box next to this canvas
    const algoBox = canvas.parentElement.nextElementSibling;
    if (algoBox && algoBox.classList.contains('algo-box')) {
      addPlayButton(algoBox, () => liveEngines.get(visualBox.querySelector('canvas')), canvas.dataset.algo, canvas.dataset.shapeType, display);
    }
  });
}

/**
 * Add play button to algorithm notation box
 * @param {HTMLElement} algoBox
 * @param {function} getEngine - resolves the live CubeEngine at click time
 * @param {string} algoString
 * @param {string} [shapeType] - case family; when a shape exists the play
 *   starts from the case STATE so the algorithm visibly solves it.
 */
function addPlayButton(algoBox, getEngine, algoString, shapeType, withDisplay = true) {
  if (algoBox.querySelector('.algo-box__play')) return; // Already has button

  const shape = shapeForType(shapeType);

  // "Display" — show the case's START state (what the cube looks like when
  // you should apply this algorithm) without animating anything.
  if (withDisplay) {
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
    displayBtn.setAttribute('aria-label', `Display case: ${algoString}`);
    displayBtn.addEventListener('click', () => {
      const engine = getEngine();
      if (!engine || engine._destroyed) return; // canvas not on screen yet
      engine.setupCase(algoString, shape);
    });
    algoBox.appendChild(displayBtn);
  }

  const stopBtn = document.createElement('button');
  stopBtn.type = 'button';
  stopBtn.className = 'algo-box__stop btn btn--outline btn--xs';
  stopBtn.innerHTML = `
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
      <rect x="5" y="5" width="14" height="14" rx="2"/>
    </svg>
    Stop
  `;
  stopBtn.setAttribute('aria-label', `Stop algorithm: ${algoString}`);
  stopBtn.disabled = true;

  const speedSel = document.createElement('select');
  speedSel.className = 'algo-box__speed';
  speedSel.setAttribute('aria-label', `Playback speed: ${algoString}`);
  [[0.5, '0.5×'], [0.75, '0.75×'], [1, '1×'], [1.5, '1.5×'], [2, '2×']].forEach(([v, label]) => {
    const opt = document.createElement('option');
    opt.value = String(v);
    opt.textContent = label;
    if (v === 1) opt.selected = true;
    speedSel.appendChild(opt);
  });
  speedSel.addEventListener('change', () => {
    const engine = getEngine();
    if (engine && !engine._destroyed) engine.setSpeed(speedSel.value);
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
  playBtn.setAttribute('aria-label', `Play algorithm: ${algoString}`);

  algoBox.appendChild(stopBtn);
  algoBox.appendChild(speedSel);
  algoBox.appendChild(playBtn);

  let isPlaying = false;
  let playingEngine = null;

  const resetBtnUI = () => {
    isPlaying = false;
    playingEngine = null;
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
    if (playingEngine && !playingEngine._destroyed) playingEngine.stop();
    resetBtnUI();
  });

  playBtn.addEventListener('click', () => {
    // Recover if a previous play's engine was destroyed mid-animation
    // (card scrolled away): onComplete never fired, so the button would
    // otherwise stay stuck on "Playing..." forever.
    if (isPlaying && (!playingEngine || playingEngine._destroyed)) resetBtnUI();
    if (isPlaying) return;
    const engine = getEngine();
    if (!engine || engine._destroyed) return; // canvas not on screen yet
    isPlaying = true;
    playingEngine = engine;
    engine.setSpeed(speedSel.value);
    stopBtn.disabled = false;
    playBtn.disabled = true;
    playBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true" class="anim-spin">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="30 30"/>
      </svg>
      Playing...
    `;

    if (shape) {
      // Start from the case state (inverse applied to solved, relevant pieces
      // colored) — playing the algorithm visibly SOLVES it.
      engine.setupCase(algoString, shape);
    } else {
      // No shape family (finger tricks, OH, BLD): plain solved start
      engine.reset();
    }

    setTimeout(() => {
      playAlgorithm(engine, algoString, () => {
        resetBtnUI();
      });
    }, 100);
  });
}

/**
 * Play algorithm sequence on cube engine.
 * NOTE: caller sets the starting state (setupCase or reset) before calling.
 */
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

/**
 * Initialize standalone cubes (non-grid)
 */
function initStandaloneCubes() {


  // BLD memo canvas
  const bldCanvas = document.getElementById('bld-memo-canvas');
  if (bldCanvas) {
    const engine = new CubeEngine(bldCanvas, {
      cubieSize: 0.85,
      gap: 0.05,
      rotationDuration: 0.35,
      ambient: false,
    });
    engine.camera.position.set(3.5, 2.5, 4.5);
    engine.camera.lookAt(0, 0, 0);

    const algoBox = bldCanvas.parentElement.previousElementSibling?.querySelector('.algo-box');
    if (algoBox) {
      addPlayButton(algoBox, engine, bldCanvas.dataset.algo);
    }
  }
}

/**
 * Render Finger Tricks grids
 */
function renderFingerTricksGrids() {
  const grids = [
    { id: 'ft-basics-grid', cases: FINGER_TRICKS.basics },
    { id: 'ft-advanced-grid', cases: FINGER_TRICKS.advanced },
    { id: 'ft-alg-grid', cases: FINGER_TRICKS.algExecution },
  ];

  grids.forEach(({ id, cases }) => {
    const grid = document.getElementById(id);
    if (grid) {
      cases.forEach(caseData => {
        const card = createAlgoCard(caseData, 'FingerTricks');
        grid.appendChild(card);
      });
      // Finger-trick cards are drills, not cases — no Display button.
      initGridCubes(`#${id}`, { display: false });
    }
  });
}


/**
 * Render Blindfolded grids
 */
function renderBLDGrids() {
  const grids = [
    { id: 'bld-edges-grid', cases: BLD_METHODS.edges },
    { id: 'bld-corners-grid', cases: BLD_METHODS.corners },
  ];

  grids.forEach(({ id, cases }) => {
    const grid = document.getElementById(id);
    if (grid) {
      cases.forEach(caseData => {
        const card = createAlgoCard(caseData, 'Blindfolded');
        grid.appendChild(card);
      });
      initGridCubes(`#${id}`);
    }
  });
}

/**
 * Render COLL grids with nested tabs
 */
function renderCOLLGrids() {
  // Initialize COLL sub-tabs
  const collTabs = document.querySelector('#coll-set .tabs[role="tablist"]');
  if (collTabs) {
    const tabs = collTabs.querySelectorAll('[role="tab"]');
    const panels = collTabs.parentElement.querySelectorAll('[role="tabpanel"]');

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('aria-controls');
        const targetPanel = document.getElementById(targetId);

        tabs.forEach((t) => {
          t.classList.remove('tab-btn--active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('tab-btn--active');
        tab.setAttribute('aria-selected', 'true');

        panels.forEach((panel) => {
          if (panel.id === targetId) {
            panel.classList.add('tab-panel--active');
            panel.removeAttribute('hidden');
          } else {
            panel.classList.remove('tab-panel--active');
            panel.setAttribute('hidden', '');
          }
        });
      });
    });
  }

  // Render COLL grids
  const collGrids = [
    { id: 'coll-sune-grid', cases: COLL_CASES.sune },
    { id: 'coll-pi-grid', cases: COLL_CASES.pi },
    { id: 'coll-h-grid', cases: COLL_CASES.h },
    { id: 'coll-u-grid', cases: COLL_CASES.u },
    { id: 'coll-other-grid', cases: COLL_CASES.other },
  ];

  collGrids.forEach(({ id, cases }) => {
    const grid = document.getElementById(id);
    if (grid) {
      cases.forEach(caseData => {
        const card = createAlgoCard(caseData, 'COLL');
        grid.appendChild(card);
      });
      initGridCubes(`#${id}`);
    }
  });
}

/**
 * Render ZBLL sample grids
 */
function renderZBLLSamples() {
  const grids = [
    { id: 'zbll-samples-grid', cases: ZBLL_SAMPLES.tSet }, // We'll use tSet as default
  ];

  // Actually, ZBLL samples are shown as static cards, not grids with cubes
  // The zbll-subsets section uses static cards without canvases
  // So we don't need to render grids for ZBLL
}