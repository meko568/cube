/**
 * Cube Master — 3D Cube Engine
 * Core module: renders a Rubik's Cube with InstancedMesh, supports
 * face rotations (U/R/F/L/B/D + primes + doubles) via GSAP, and ambient spin.
 *
 * Exposed as ES module: import { CubeEngine } from './cube-engine.js'
 */

const THREE = window.THREE;
const gsap = window.gsap;

const FACE_COLORS = {
  U: 0xffffff, // White
  D: 0xffd600, // Yellow
  R: 0xff006e, // Red (electric magenta)
  L: 0xff6b00, // Orange
  F: 0x00c853, // Green
  B: 0x006eff, // Blue
};

const INNER_COLOR = 0x1a1a1a;
// BoxGeometry face order: +x, -x, +y, -y, +z, -z → R L U D F B.
// Sticker plates must take their color from THIS map — the box body
// materials are all dark plastic (see _makeMaterials).
const FACE_LETTER_BY_INDEX = ['R', 'L', 'U', 'D', 'F', 'B'];
// Neutral gray for stickers not relevant to a case shape
const SHAPE_NEUTRAL = 0x3a3f4a;

/**
 * Named camera/group orientations so each case shows from the best angle.
 * `cam` positions the camera, `group` tilts the cube group (radians).
 */
const VIEW_PRESETS = {
  // 3/4 view showing U, F and R — the standard algorithm-viewing angle
  default: { cam: [4, 4, 6], group: [-0.35, -0.5, 0] },
  // Emphasize U face (OLL / top-layer cases): higher camera, less side tilt
  top: { cam: [3.2, 6.2, 5.2], group: [-0.15, -0.5, 0] },
  // Emphasize F/R side + slot (F2L): lower camera, GREEN (F) face front —
  // positive group-y turns the F normal toward the camera, R stays visible
  // on the right so the whole FR insertion reads left-to-right.
  f2l: { cam: [3.8, 2.8, 6.2], group: [-0.12, 0.5, 0] },
  // Emphasize bottom (cross / first layer): camera below horizon
  bottom: { cam: [4.2, -3.4, 5.6], group: [0.28, -0.5, 0] },
};

/**
 * Supported move notation:
 *   Faces   U D R L F B        (+ ' counter-clockwise, 2 double)
 *   Wide    u d r l f b        = outer face + adjacent middle slice together
 *   Slices  M E S              = middle layers (M follows L, E follows D, S follows F)
 *   Whole   x y z              = rotate the entire cube
 */

/** Per-face geometry shared by parsing: world axis, layer side, turn sign. */
const MOVE_AXIS = { U: 'y', D: 'y', R: 'x', L: 'x', F: 'z', B: 'z' };
const MOVE_SIDE = { U: 1, D: -1, R: 1, L: -1, F: 1, B: -1 };
// Clockwise when viewed from outside that face: opposites (D/L/B) flip.
const MOVE_SIGN = { U: -1, D: 1, R: -1, L: 1, F: -1, B: 1 };

/**
 * Parse one move token into primitive layer rotations.
 * @returns {Array<{axisVec:string, layer:number, angle:number}|{whole:boolean, axisVec:string, angle:number}>}
 *   layer: +1/-1 = outer layer on that side, 0 = middle slice.
 */
export function parseMove(move) {
  const ch = move[0];
  const dbl = move.slice(1).includes('2');
  const prime = move.slice(1).includes("'");
  const base = dbl ? Math.PI : Math.PI / 2;
  const dir = prime ? -1 : 1;
  const seg = (axisVec, layer, sign) => ({ axisVec, layer, angle: base * sign * dir });

  // Whole-cube rotations (lowercase x/y/z) — follow the R/U/F directions
  if ('xyz'.includes(ch) && ch !== ch.toUpperCase()) {
    const WSIGN = { x: -1, y: -1, z: -1 };
    return [{ whole: true, axisVec: ch, angle: base * dir * WSIGN[ch] }];
  }
  // Plain face
  if (MOVE_AXIS[ch]) return [seg(MOVE_AXIS[ch], MOVE_SIDE[ch], MOVE_SIGN[ch])];
  // Wide move: outer face AND middle slice, both in the face's direction
  const up = ch.toUpperCase();
  if ('udrlfb'.includes(ch) && MOVE_AXIS[up]) {
    return [seg(MOVE_AXIS[up], MOVE_SIDE[up], MOVE_SIGN[up]), seg(MOVE_AXIS[up], 0, MOVE_SIGN[up])];
  }
  // Slice moves — each turns like its reference face
  if (ch === 'M') return [seg('x', 0, MOVE_SIGN.L)];
  if (ch === 'E') return [seg('y', 0, MOVE_SIGN.D)];
  if (ch === 'S') return [seg('z', 0, MOVE_SIGN.F)];
  return []; // unknown token — ignore rather than corrupt the cube
}

/**
 * Invert an algorithm string: reverse move order and flip each move
 * (R → R', R' → R, M2 stays M2, x → x'). Whole-cube rotations (x/y/z)
 * MUST be included: in this engine they rotate cubie positions (not just
 * the camera), so skipping them would build a wrong setup state for any
 * algorithm containing them (e.g. the Aa/Ab/E perms).
 */
function invertAlgorithm(algoString) {
  const moves = algoString.trim().split(/\s+/).filter(Boolean);
  return moves
    .reverse()
    .map((m) => {
      if (m.includes('2')) return m;
      if (m.includes("'")) return m.replace("'", '');
      return m + "'";
    });
}

export class CubeEngine {
  /**
   * @param {HTMLCanvasElement} canvas
   * @param {object} opts
   */
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.opts = {
      cubieSize: 0.95,
      gap: 0.05,
      rotationDuration: 0.35,
      ambient: false,
      view: 'default',
      ...opts,
    };

    this.cubies = [];
    this.isAnimating = false;
    this.rotationQueue = [];
    this.speedMultiplier = 1;
    this._activeTween = null;
    this._activeSeg = null;

    this._initScene();
    this._buildCube();
    this._initControls();

    if (this.opts.ambient) {
      this._startAmbient();
    }

    this._animate = this._animate.bind(this);
    this._onResize = this._onResize.bind(this);
    window.addEventListener('resize', this._onResize);

    // Lazy rendering: browsers cap active WebGL contexts (~16). Pages with
    // many cube cards must only render engines whose canvas is on screen,
    // otherwise old contexts get force-lost ("Context Lost" / white canvases).
    this._destroyed = false;
    this._visible = true;
    if ('IntersectionObserver' in window) {
      this._visible = false;
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          this._visible = entry.isIntersecting;
          if (entry.isIntersecting && !this._didInitialLayout) {
            this._didInitialLayout = true;
            // Canvas got real layout only now — fix aspect/size once visible.
            this._onResize();
            io.unobserve(this.canvas); // no longer needed after first show
          }
        });
        if (this._visible) {
          this.renderer.render(this.scene, this.camera); // paint immediately
        }
      }, { rootMargin: '100px' });
      io.observe(this.canvas);
      this._observer = io;
    }

    this._animate();
  }

  _initScene() {
    const [w, h] = this._measure();

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    const view = VIEW_PRESETS[this.opts.view] || VIEW_PRESETS.default;
    this._viewPreset = view;
    this.camera.position.set(...view.cam);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(w, h, false);

    this.renderer.setClearColor(0x000000, 0);

    // Lighting (for non-basic materials)
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    const dir1 = new THREE.DirectionalLight(0xffffff, 0.6);
    dir1.position.set(5, 10, 7);
    const dir2 = new THREE.DirectionalLight(0xffffff, 0.3);
    dir2.position.set(-5, -3, -7);
    this.scene.add(ambient, dir1, dir2);

    // Group that holds all cubies
    this.cubeGroup = new THREE.Group();
    this.scene.add(this.cubeGroup);

    // Initial tilt from the view preset (nice 3/4 view by default)
    this.cubeGroup.rotation.set(...this._viewPreset.group);
  }

  _buildCube() {
    const size = this.opts.cubieSize;
    const gap = this.opts.gap;
    const step = size + gap;

    const geometry = new THREE.BoxGeometry(size, size, size);

    // Sticker plates: slightly raised colored quads on exterior faces.
    // These give the crisp "real cube" look (colored face inset in black
    // plastic) instead of a chunky fully-painted block.
    const stickerGeo = new THREE.PlaneGeometry(size * 0.86, size * 0.86);
    const faceOffset = size / 2 + 0.001;

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue;

          const materials = this._makeMaterials(x, y, z);
          const mesh = new THREE.Mesh(geometry, materials);
          mesh.position.set(x * step, y * step, z * step);
          mesh.userData = { home: new THREE.Vector3(x * step, y * step, z * step), coords: { x, y, z } };
          this.cubeGroup.add(mesh);
          this.cubies.push(mesh);

          // Add a sticker plate on each exterior face
          const extFaces = [];
          if (x === 1) extFaces.push(0);
          if (x === -1) extFaces.push(1);
          if (y === 1) extFaces.push(2);
          if (y === -1) extFaces.push(3);
          if (z === 1) extFaces.push(4);
          if (z === -1) extFaces.push(5);
          for (const fi of extFaces) {
            const sticker = new THREE.Mesh(
              stickerGeo,
              new THREE.MeshLambertMaterial({ color: FACE_COLORS[FACE_LETTER_BY_INDEX[fi]] })
            );
            // Position/rotate the plate onto its face (BoxGeometry face order)
            const dirs = [
              [1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1],
            ];
            const [dx, dy, dz] = dirs[fi];
            sticker.position.set(dx * faceOffset, dy * faceOffset, dz * faceOffset);
            if (dx !== 0) sticker.rotation.y = dx > 0 ? Math.PI / 2 : -Math.PI / 2;
            else if (dy < 0) sticker.rotation.x = Math.PI / 2;
            else if (dy > 0) sticker.rotation.x = -Math.PI / 2;
            else if (dz < 0) sticker.rotation.y = Math.PI;
            mesh.add(sticker);
            mesh.userData.stickers = mesh.userData.stickers || {};
            mesh.userData.stickers[fi] = sticker;
          }
        }
      }
    }
  }

  _makeMaterials(x, y, z) {
    // Box body is dark plastic; visible color comes from the sticker plates
    // attached in _buildCube (crisp inset-sticker look).
    const plastic = new THREE.MeshLambertMaterial({ color: INNER_COLOR });
    return Array.from({ length: 6 }, () => plastic.clone());
  }

  /* ========================================================================
     SHAPE MODE — highlight only the pieces an algorithm case concerns.
     All stickers start neutral gray; the caller paints specific
     (cubie, face) pairs. Face letters follow Singmaster notation and are
     resolved against the cubie's ORIGINAL home position.
     ======================================================================== */

  /** Restore every cubie to full standard coloring. */
  clearShape() {
    for (const c of this.cubies) {
      const { x, y, z } = c.userData.coords;
      const colors = [
        x === 1 ? FACE_COLORS.R : INNER_COLOR,
        x === -1 ? FACE_COLORS.L : INNER_COLOR,
        y === 1 ? FACE_COLORS.U : INNER_COLOR,
        y === -1 ? FACE_COLORS.D : INNER_COLOR,
        z === 1 ? FACE_COLORS.F : INNER_COLOR,
        z === -1 ? FACE_COLORS.B : INNER_COLOR,
      ];
      colors.forEach((hex, i) => {
        c.material[i].color.setHex(INNER_COLOR);
        const st = c.userData.stickers && c.userData.stickers[i];
        if (st) st.material.color.setHex(hex);
      });
    }
  }

  /**
   * Paint only the given stickers, dimming everything else to gray.
   * @param {Array<{cubie:[x,y,z], faces:string[]}>} stickers
   *   cubie coords in -1/0/1 (home grid); faces = array of 'U','R','F',...
   */
  showShape(stickers) {
    this.clearShape();
    // Neutralize every exterior sticker first
    for (const c of this.cubies) {
      const { x, y, z } = c.userData.coords;
      const neutral = (i) => {
        const st = c.userData.stickers && c.userData.stickers[i];
        if (st) st.material.color.setHex(SHAPE_NEUTRAL);
      };
      if (x === 1) neutral(0);
      if (x === -1) neutral(1);
      if (y === 1) neutral(2);
      if (y === -1) neutral(3);
      if (z === 1) neutral(4);
      if (z === -1) neutral(5);
    }
    // Paint the highlighted ones back. Each face entry is either a face letter
    // ('F' → that face's color) or { face:'D', color:'W' } for an explicit color.
    const faceIdx = { R: 0, L: 1, U: 2, D: 3, F: 4, B: 5 };
    for (const s of stickers) {
      const cubie = this._findHomeCubie(s.cubie);
      if (!cubie) continue;
      for (const f of s.faces) {
        const face = typeof f === 'string' ? f : f.face;
        const colorKey = typeof f === 'string' ? f : f.color;
        const i = faceIdx[face];
        const st = cubie.userData.stickers && cubie.userData.stickers[i];
        if (i !== undefined && st) st.material.color.setHex(this._faceColorFor(colorKey));
      }
    }
  }

  _findHomeCubie(coords) {
    return this.cubies.find(
      (c) =>
        c.userData.coords.x === coords[0] &&
        c.userData.coords.y === coords[1] &&
        c.userData.coords.z === coords[2]
    );
  }

  _faceColorFor(face) {
    return {
      U: FACE_COLORS.U, D: FACE_COLORS.D, R: FACE_COLORS.R,
      L: FACE_COLORS.L, F: FACE_COLORS.F, B: FACE_COLORS.B,
      // Color aliases — let shapes paint "white" / "yellow" stickers on any
      // face position (e.g. white cross lives on D, yellow OLL lives on U).
      W: 0xffffff,
      Y: 0xffd600,
    }[face];
  }

  /**
   * Set up a case shape WITHOUT animating: instantly apply the inverse of the
   * algorithm from solved state, so pressing Play "solves" it with the alg.
   * Only the pieces relevant to the case keep their colors (see showShape).
   */
  setupCase(algoString, stickers) {
    this.reset();
    this.clearShape();
    if (stickers && stickers.length) {
      this.showShape(stickers);
    }
    const inverse = invertAlgorithm(algoString);
    for (const mv of inverse) {
      this._applyMoveInstant(mv);
    }
    this.renderOnce();
  }

  /** Apply one move to cubie transforms immediately (no animation). */
  _applyMoveInstant(move) {
    for (const seg of parseMove(move)) {
      if (seg.whole) {
        this._applyWholeInstant(seg.axisVec, seg.angle);
        continue;
      }
      const selected = this._selectLayer(seg.axisVec, seg.layer);
      const pivot = new THREE.Group();
      this.cubeGroup.add(pivot);
      selected.forEach((c) => pivot.attach(c));
      pivot.rotation[seg.axisVec] = seg.angle;
      pivot.updateMatrixWorld(true);
      selected.forEach((c) => {
        this.cubeGroup.attach(c);
        this._snapCubie(c);
      });
      this.cubeGroup.remove(pivot);
    }
  }

  /** Instant whole-cube rotation: re-home every cubie around the center. */
  _applyWholeInstant(axisVec, angle) {
    const pivot = new THREE.Group();
    this.cubeGroup.add(pivot);
    this.cubies.forEach((c) => pivot.attach(c));
    pivot.rotation[axisVec] = angle;
    pivot.updateMatrixWorld(true);
    this.cubies.forEach((c) => {
      this.cubeGroup.attach(c);
      this._snapCubie(c);
    });
    this.cubeGroup.remove(pivot);
  }

  /** Snap position + orientation after instant moves. */
  _snapCubie(c) {
    const step = this.opts.cubieSize + this.opts.gap;
    c.position.set(
      Math.round(c.position.x / step),
      Math.round(c.position.y / step),
      Math.round(c.position.z / step)
    );
    c.position.multiplyScalar(step);
    this._snapRotation(c);
  }

  renderOnce() {
    this.renderer.render(this.scene, this.camera);
  }

  _initControls() {
    let isDragging = false;
    let prevX = 0, prevY = 0;
    let autoRotate = this.opts.ambient;

    this.canvas.style.touchAction = 'none';

    const onPointerDown = (e) => {
      isDragging = true;
      autoRotate = false;
      prevX = e.clientX;
      prevY = e.clientY;
      try { this.canvas.setPointerCapture(e.pointerId); } catch (_) {}
    };
    const onPointerMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;
      this.cubeGroup.rotation.y += dx * 0.01;
      this.cubeGroup.rotation.x += dy * 0.01;
    };
    const onPointerUp = () => { isDragging = false; };
    const onPointerCancel = () => { isDragging = false; };

    this.canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerCancel);

    // Scroll zoom
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      const dist = this.camera.position.length();
      const newDist = Math.max(3, Math.min(12, dist + e.deltaY * 0.005));
      this.camera.position.setLength(newDist);
    }, { passive: false });

    this._autoRotate = () => autoRotate;
  }

  _startAmbient() {
    this._ambientActive = true;
  }

  /**
   * Rotate a face. move format: 'U', 'R\'', 'F2', etc.
   * @param {string} move
   * @param {function} onComplete
   */
  rotateFace(move, onComplete) {
    this.rotationQueue.push({ move, onComplete });
    this._processQueue();
  }

  /**
   * Playback speed multiplier (0.5×–2×). Affects every subsequent move
   * tween, including one already mid-queue (each tween reads it at start).
   * @param {number} mult e.g. 0.5 | 1 | 2
   */
  setSpeed(mult) {
    const n = Number(mult);
    this.speedMultiplier = n >= 0.25 && n <= 4 ? n : 1;
  }

  /**
   * Abort playback: drop all queued moves and finish the currently animating
   * segment instantly at its target angle (cube never rests half-turned).
   * @returns {boolean} true if a running animation was interrupted
   */
  stop() {
    this.rotationQueue.length = 0;
    const tween = this._activeTween;
    if (!tween) return false;

    tween.kill();
    const seg = this._activeSeg;
    if (seg && seg.pivot) {
      seg.pivot.rotation[seg.axisVec] = seg.angle;
      seg.pivot.updateMatrixWorld(true);
      seg.selected.forEach((c) => {
        this.cubeGroup.attach(c);
        this._snapCubie(c);
      });
      this.cubeGroup.remove(seg.pivot);
    }
    this._activeTween = null;
    this._activeSeg = null;
    this.isAnimating = false;
    return true;
  }

  _processQueue() {
    if (this.isAnimating || this.rotationQueue.length === 0) return;
    const { move, onComplete } = this.rotationQueue.shift();
    this._doRotation(move, onComplete);
  }

  /**
   * Animate one move token. Wide/slice moves animate their primitive layers
   * in sequence; whole rotations reuse the same path via layer=null.
   */
  _doRotation(move, onComplete) {
    const segs = parseMove(move);

    // Unknown token — skip it rather than corrupting the cube state.
    if (segs.length === 0) {
      console.warn(`CubeEngine: unsupported move "${move}" skipped`);
      if (onComplete) onComplete();
      this._processQueue();
      return;
    }

    this._animateSegments(segs, 0, onComplete);
  }

  _animateSegments(segs, i, onComplete) {
    if (i >= segs.length) {
      if (onComplete) onComplete();
      this._processQueue();
      return;
    }
    const seg = segs[i];
    this.isAnimating = true;

    const selected = seg.whole
      ? this.cubies.slice()
      : this._selectLayer(seg.axisVec, seg.layer);
    const pivot = new THREE.Group();
    this.cubeGroup.add(pivot);
    selected.forEach((c) => pivot.attach(c));

    const tween = gsap.to(pivot.rotation, {
      [seg.axisVec]: seg.angle,
      duration: this.opts.rotationDuration / (this.speedMultiplier || 1),
      ease: 'power2.inOut',
      onComplete: () => {
        // NOTE: keep pivot rotation at `angle` while re-attaching — attach()
        // preserves each cubie's world transform. Resetting it first would
        // hand cubies back un-rotated (the "snap-back" bug).
        selected.forEach((c) => {
          this.cubeGroup.attach(c);
          this._snapCubie(c);
        });
        this.cubeGroup.remove(pivot);
        this.isAnimating = false;
        this._activeTween = null;
        this._activeSeg = null;
        this._animateSegments(segs, i + 1, onComplete);
      },
    });
    this._activeTween = tween;
    this._activeSeg = { pivot, selected, axisVec: seg.axisVec, angle: seg.angle };
  }

  /**
   * Cubies in a single rotating layer.
   * @param {string} axisVec 'x'|'y'|'z'
   * @param {number} layer +1/-1 outer layer on that side, 0 middle slice
   */
  _selectLayer(axisVec, layer) {
    const step = this.opts.cubieSize + this.opts.gap;
    if (layer === 0) {
      // Middle slice: coordinate ≈ 0
      return this.cubies.filter((c) => Math.abs(c.position[axisVec]) < step * 0.5);
    }
    const target = layer * step;
    return this.cubies.filter(
      (c) => Math.abs(c.position[axisVec] - target) < step * 0.5
    );
  }

  _snapRotation(mesh) {
    // Any legal cube orientation is an axis-aligned rotation, so its rotation
    // matrix consists solely of 0/±1 entries. Rounding the matrix removes
    // floating-point drift WITHOUT changing the true orientation (rounding
    // Euler angles per-component would corrupt it).
    const m = new THREE.Matrix4().makeRotationFromQuaternion(mesh.quaternion);
    m.elements.forEach((v, i, arr) => { arr[i] = Math.round(v); });
    mesh.quaternion.setFromRotationMatrix(m);
    mesh.rotation.setFromQuaternion(mesh.quaternion);
  }

  _animate() {
    if (this._destroyed) return; // stop the loop entirely once destroyed
    requestAnimationFrame(this._animate);

    if (this._ambientActive && this._autoRotate && this._autoRotate()) {
      this.cubeGroup.rotation.y += 0.003;
    }

    // Skip rendering when off-screen — frees the GPU/context pressure.
    if (!this._visible) return;

    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Measure the CANVAS itself (its CSS box), falling back to the parent.
   * Cards on advanced/pro wrap square canvases in non-square flex containers
   * (`.algo-card__visual` etc.) — measuring the parent there produced a
   * mismatched buffer/aspect and a distorted, undersized cube. Measuring the
   * canvas keeps every page's cube proportioned like the beginner steps.
   */
  _measure() {
    const cw = this.canvas.clientWidth;
    const ch = this.canvas.clientHeight;
    if (cw && ch) return [cw, ch];
    const container = this.canvas.parentElement || this.canvas;
    return [container.clientWidth || 300, container.clientHeight || 300];
  }

  _onResize() {
    const [w, h] = this._measure();
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
  }

  scramble(moves = 20) {
    const faces = ['U', 'D', 'R', 'L', 'F', 'B'];
    const suffixes = ['', "'", '2'];
    for (let i = 0; i < moves; i++) {
      const f = faces[Math.floor(Math.random() * faces.length)];
      const s = suffixes[Math.floor(Math.random() * suffixes.length)];
      this.rotateFace(f + s);
    }
  }

  /**
   * Rotate the WHOLE cube (x/y/z notation). Pure viewpoint change —
   * cubie positions are untouched; only cubeGroup orientation animates.
   * @param {string} move 'x', 'y', 'z', with optional "'" or "2"
   */
  rotateWholeCube(move, onComplete) {
    this.rotationQueue.push({ move, onComplete });
    this._processQueue();
  }

  reset() {
    this.cubies.forEach((c) => {
      c.position.copy(c.userData.home);
      c.rotation.set(0, 0, 0);
    });
    this.cubeGroup.rotation.set(...this._viewPreset.group);
  }

  destroy() {
    this._destroyed = true;
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
    window.removeEventListener('resize', this._onResize);
    this.renderer.dispose();
    // Free the GPU context slot: browsers cap live WebGL contexts (~16) and
    // silently kill the oldest when exceeded, so released contexts must be
    // truly freed or every canvas eventually goes blank.
    const ext = this.renderer.getContext().getExtension('WEBGL_lose_context');
    if (ext) ext.loseContext();
    // A canvas whose context was lost can NEVER render again — reusing it
    // yields the same dead context. Swap in a pristine clone (attributes like
    // class/data-* survive) so the next engine for this card gets a fresh,
    // working context. Callers should re-observe the new node.
    if (this.canvas && this.canvas.isConnected) {
      const fresh = this.canvas.cloneNode(false);
      this.canvas.replaceWith(fresh);
      this.canvas = fresh;
    }
  }
}
