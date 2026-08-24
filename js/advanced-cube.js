/**
 * Cube Master — Advanced CFOP Cube Handler
 * Manages tabbed interface, renders algorithm cards with 3D cubes,
 * and handles algorithm playback for F2L, OLL, PLL cases.
 */

import { CubeEngine } from './cube-engine.js';
import { F2L_CASES, OLL_CASES, PLL_CASES } from './advanced-data.js';
import { getShape } from './algo-shapes.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize tab system
  initTabs();

  // Render algorithm grids
  renderF2LGrids();
  renderOLLGrids();
  renderPLLGrids();

  // Initialize cross canvas
  initCrossCube();
});

/**
 * Tab switching functionality
 */
function initTabs() {
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
          index = (index + 1) % tabs.length;
          tabs[index].click();
          tabs[index].focus();
        } else if (e.key === 'ArrowLeft') {
          index = (index - 1 + tabs.length) % tabs.length;
          tabs[index].click();
          tabs[index].focus();
        } else if (e.key === 'Home') {
          tabs[0].click();
          tabs[0].focus();
        } else if (e.key === 'End') {
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

/* ======================================================================
   WebGL context pooling
   Browsers allow only ~16 live WebGL contexts, and this page has 80+ cube
   cards. Engines are created when a card approaches the viewport and
   destroyed when it leaves, keeping live contexts well under the cap.
   ====================================================================== */
const liveEngines = new Map(); // canvas -> CubeEngine
const ENGINE_POOL_CAP = 8;

function createCardEngine(canvas) {
  const type = canvas.dataset.shapeType;
  const e = new CubeEngine(canvas, {
    cubieSize: 0.9,
    gap: 0.1,
    rotationDuration: 0.3,
    ambient: false,
    // Best viewpoint per case family: F2L shows the FR slot from the side,
    // OLL/PLL look down on the last layer.
    view: type === 'F2L' ? 'f2l' : type === 'OLL' || type === 'PLL' ? 'top' : 'default',
  });

  // Show the case SHAPE: only pieces relevant to this case are colored,
  // everything else neutral gray.
  const shape = getShape(type);
  if (shape) {
    e.setupCase(canvas.dataset.algo, shape);
  }
  return e;
}

function getOrCreateCardEngine(canvas) {
  let e = liveEngines.get(canvas);
  if (e && !e._destroyed) return e;
  if (e) {
    e.destroy();
    liveEngines.delete(canvas);
  }
  // At capacity: evict off-screen engines first (Map preserves insert order)
  for (const [c, eng] of liveEngines) {
    if (liveEngines.size < ENGINE_POOL_CAP) break;
    if (!eng._visible) {
      eng.destroy();
      liveEngines.delete(c);
    }
  }
  e = createCardEngine(canvas);
  liveEngines.set(canvas, e);
  return e;
}

/** Shared observer: create engines on approach, destroy on leave. */
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

function initGridCubes(gridSelector) {
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
      addPlayButton(
        algoBox,
        () => liveEngines.get(visualBox.querySelector('canvas')),
        canvas.dataset.algo,
        canvas.dataset.shapeType
      );
    }
  });
}

/**
 * Add play button to algorithm notation box.
 * @param {HTMLElement} algoBox
 * @param {function} getEngine - resolves the live CubeEngine at click time
 *   (engines are created/destroyed lazily as cards scroll in and out)
 * @param {string} algoString
 * @param {string} shapeType
 */
function addPlayButton(algoBox, getEngine, algoString, shapeType) {
  if (algoBox.querySelector('.algo-box__play')) return; // Already has button

  // "Display" — show the case's START state (what the cube looks like when
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
  displayBtn.setAttribute('aria-label', `Display case: ${algoString}`);
  displayBtn.addEventListener('click', () => {
    const engine = getEngine();
    if (!engine || engine._destroyed) return; // canvas not on screen yet
    engine.setupCase(algoString, getShape(shapeType));
  });
  algoBox.appendChild(displayBtn);

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

  algoBox.appendChild(playBtn);

  let isPlaying = false;
  let playingEngine = null;

  const resetBtnUI = () => {
    isPlaying = false;
    playingEngine = null;
    playBtn.disabled = false;
    playBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
        <path d="M8 5v14l11-7z"/>
      </svg>
      Replay
    `;
  };

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
    playBtn.disabled = true;
    playBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true" class="anim-spin">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="30 30"/>
      </svg>
      Playing...
    `;

    // Start from the case STATE (instant inverse of the algorithm applied to
    // solved), then animate the algorithm — the cube ends up solved.
    engine.setupCase(algoString, getShape(shapeType));

    setTimeout(() => {
      playAlgorithm(engine, algoString, () => {
        resetBtnUI();
      });
    }, 60);
  });
}

/**
 * Play algorithm sequence on cube engine
 */
function playAlgorithm(engine, algoString, onComplete) {
  const moves = algoString.trim().split(/\s+/).filter(Boolean);
  let index = 0;

  // NOTE: caller is responsible for the starting state (setupCase applies the
  // inverse so playing the algorithm visibly SOLVES the case).
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
 * Render F2L grids for all three tabs
 */
function renderF2LGrids() {
  // Basic tab
  const basicGrid = document.getElementById('f2l-basic-grid');
  if (basicGrid) {
    F2L_CASES.basic.forEach(caseData => {
      const card = createAlgoCard(caseData, 'F2L');
      basicGrid.appendChild(card);
    });
    initGridCubes('#f2l-basic-grid');
  }

  // Advanced tab
  const advancedGrid = document.getElementById('f2l-advanced-grid');
  if (advancedGrid) {
    F2L_CASES.advanced.forEach(caseData => {
      const card = createAlgoCard(caseData, 'F2L');
      advancedGrid.appendChild(card);
    });
    initGridCubes('#f2l-advanced-grid');
  }

  // Special tab
  const specialGrid = document.getElementById('f2l-special-grid');
  if (specialGrid) {
    F2L_CASES.special.forEach(caseData => {
      const card = createAlgoCard(caseData, 'F2L');
      specialGrid.appendChild(card);
    });
    initGridCubes('#f2l-special-grid');
  }
}

/**
 * Render OLL grids
 */
function renderOLLGrids() {
  // 2-Look Edges
  const edgesGrid = document.getElementById('oll-edges-grid');
  if (edgesGrid) {
    OLL_CASES.edges.forEach(caseData => {
      const card = createAlgoCard(caseData, 'OLL');
      edgesGrid.appendChild(card);
    });
    initGridCubes('#oll-edges-grid');
  }

  // 2-Look Corners
  const cornersGrid = document.getElementById('oll-corners-grid');
  if (cornersGrid) {
    OLL_CASES.corners.forEach(caseData => {
      const card = createAlgoCard(caseData, 'OLL');
      cornersGrid.appendChild(card);
    });
    initGridCubes('#oll-corners-grid');
  }

  // Full OLL
  const fullGrid = document.getElementById('oll-full-grid');
  if (fullGrid) {
    OLL_CASES.full.forEach(caseData => {
      const card = createAlgoCard(caseData, 'OLL');
      fullGrid.appendChild(card);
    });
    initGridCubes('#oll-full-grid');
  }
}

/**
 * Render PLL grids
 */
function renderPLLGrids() {
  const grids = [
    { id: 'pll-edges-grid', cases: PLL_CASES.edges },
    { id: 'pll-corners-grid', cases: PLL_CASES.corners },
    { id: 'pll-g-grid', cases: PLL_CASES.gPerms },
    { id: 'pll-other-grid', cases: PLL_CASES.other },
  ];

  grids.forEach(({ id, cases }) => {
    const grid = document.getElementById(id);
    if (grid) {
      cases.forEach(caseData => {
        const card = createAlgoCard(caseData, 'PLL');
        grid.appendChild(card);
      });
      initGridCubes(`#${id}`);
    }
  });
}

/**
 * Initialize cross example cube
 */
function initCrossCube() {
  const canvas = document.getElementById('cross-canvas');
  if (!canvas) return;

  cardEngineObserver.observe(canvas);

  // Add play button to cross algo box
  const algoBox = document.querySelector('#cross .algo-box');
  if (algoBox) {
    addPlayButton(
      algoBox,
      () => liveEngines.get(canvas),
      canvas.dataset.algo,
      canvas.dataset.shapeType || 'CROSS'
    );
  }
}