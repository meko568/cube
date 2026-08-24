/**
 * Cube Master — Algorithm Case Shapes
 * Sticker maps for F2L / OLL / PLL / beginner-step case visualization.
 *
 * Each entry maps a shape id → array of { cubie:[x,y,z], faces:[...] }.
 * Coordinates are home-grid (-1/0/1), y-up: U=+y, D=-y, R=+x, L=-x, F=+z, B=-z.
 * Everything not listed renders neutral gray, so the "shape" of the case
 * (which pieces it concerns) is immediately visible.
 *
 * Face entries are face letters ('U','R',...) OR {face:'D', color:'W'} pairs.
 * Color aliases: 'W' = white, 'Y' = yellow — this site's color scheme has
 * WHITE on top (U) and YELLOW on bottom (D), opposite the standard scheme,
 * so steps that teach "white cross on bottom" paint W onto D-face stickers,
 * and OLL/PLL (yellow face on top during last layer) paint Y onto U stickers.
 */

// ---- Helpers -------------------------------------------------------------
const edge = (a, b) => [
  { cubie: a.cubie, faces: [a.face] },
  { cubie: b.cubie, faces: [b.face] },
];
const corner = (a, b, c) => [
  { cubie: a.cubie, faces: [a.face] },
  { cubie: b.cubie, faces: [b.face] },
  { cubie: c.cubie, faces: [c.face] },
];

// Top-layer corner positions: [x, 1, z]
const TLC = {
  UFR: { cubie: [1, 1, 1] },
  URB: { cubie: [1, 1, -1] },
  ULB: { cubie: [-1, 1, -1] },
  UFL: { cubie: [-1, 1, 1] },
};
// Top-layer edge positions
const TLE = {
  UF: { cubie: [0, 1, 1] },
  UR: { cubie: [1, 1, 0] },
  UB: { cubie: [0, 1, -1] },
  UL: { cubie: [-1, 1, 0] },
};

/** All top-layer U stickers (center + edges + corners) in the given color. */
function topLayerStickers(color) {
  const s = [];
  s.push({ cubie: [0, 1, 0], faces: [{ face: 'U', color }] });
  for (const e of Object.values(TLE)) s.push({ cubie: e.cubie, faces: [{ face: 'U', color }] });
  for (const c of Object.values(TLC)) s.push({ cubie: c.cubie, faces: [{ face: 'U', color }] });
  return s;
}

/**
 * Whole bottom layer ("solved white face"). Structurally correct coloring:
 * the D sticker of every bottom cubie is WHITE, while its SIDE stickers keep
 * their own face colors (edges = white + one side color, corners = white +
 * two side colors) — exactly like a real solved first layer. Optionally
 * exclude slots — excluded cubies stay gray (e.g. the F2L slot corner).
 */
function bottomLayerStickers(exclude = []) {
  const s = [];
  for (let x = -1; x <= 1; x++) {
    for (let z = -1; z <= 1; z++) {
      if (exclude.some(([ex, , ez]) => ex === x && ez === z)) continue;
      const faces = [{ face: 'D', color: 'W' }];
      if (x === 1) faces.push('R');
      if (x === -1) faces.push('L');
      if (z === 1) faces.push('F');
      if (z === -1) faces.push('B');
      s.push({ cubie: [x, -1, z], faces });
    }
  }
  return s;
}

/** Middle-layer edges with both side stickers (second layer teaching). */
function middleEdgesStickers() {
  return [
    ...edge({ cubie: [1, 0, 1], face: 'F' }, { cubie: [1, 0, 1], face: 'R' }),
    ...edge({ cubie: [-1, 0, 1], face: 'F' }, { cubie: [-1, 0, 1], face: 'L' }),
    ...edge({ cubie: [1, 0, -1], face: 'B' }, { cubie: [1, 0, -1], face: 'R' }),
    ...edge({ cubie: [-1, 0, -1], face: 'B' }, { cubie: [-1, 0, -1], face: 'L' }),
  ];
}

/** The four side centers (used to show which colors the slot must match). */
const sideCenters = () => [
  { cubie: [0, 0, 1], faces: ['F'] },
  { cubie: [1, 0, 0], faces: ['R'] },
  { cubie: [0, 0, -1], faces: ['B'] },
  { cubie: [-1, 0, 0], faces: ['L'] },
];

/** U center + 4 top-edge U stickers in the given color — cross shapes. */
const topCrossStickers = (color) => [
  { cubie: [0, 1, 0], faces: [{ face: 'U', color }] },
  ...Object.values(TLE).map((p) => ({ cubie: p.cubie, faces: [{ face: 'U', color }] })),
];

/** Side sticker of a top-layer piece (the sticker NOT on U). */
const sideOf = { UF: 'F', UR: 'R', UB: 'B', UL: 'L' };

export const ALGO_SHAPES = {
  /* ======================================================================
     F2L — the FR slot case. This is the END state (what the cube looks
     like AFTER the algorithm plays):
       • the two centers matching the pair colors (F green, R red)
       • the WHITE first layer fully solved
       • the FR corner INSERTED in its slot (white on D, green on F, red on R)
       • the FR edge in the middle layer directly above the corner
     setupCase() builds each case's start by applying the inverse of that
     case's algorithm to this solved state — so playing any F2L algorithm
     visibly inserts the pair: white corner into its slot, edge above it.
     ====================================================================== */
  F2L: {
    default: [
      // centers that define the slot colors
      { cubie: [0, 0, 1], faces: ['F'] },
      { cubie: [1, 0, 0], faces: ['R'] },
      // solved white first layer, EXCEPT the slot corner (painted fully below)
      ...bottomLayerStickers([[1, -1, 1]]),
      // the pair INSERTED: corner in the DFR slot, edge directly above it
      { cubie: [1, -1, 1], faces: [{ face: 'D', color: 'W' }, 'F', 'R'] },
      { cubie: [1, 0, 1], faces: ['F', 'R'] },
    ],
  },

  /* ======================================================================
     OLL — the first two layers are SOLVED (that's the precondition of
     OLL) and the entire top layer is YELLOW. Including the solved F2L
     matters: setupCase() applies the case's inverse to this state, and
     because OLL algs never disturb F2L, the displayed start state keeps
     the first two layers solved while the top shows the case pattern —
     instead of scattering yellow stickers across a gray cube.
     ====================================================================== */
  OLL: {
    default: [
      // solved first two layers (white bottom + middle edges + centers)
      ...bottomLayerStickers(),
      ...sideCenters(),
      ...middleEdgesStickers(),
      // fully oriented last layer
      ...topLayerStickers('Y'),
    ],
  },

  /* ======================================================================
     PLL — same idea: solved F2L beneath a full yellow top layer, plus the
     SIDE stickers of the last-layer pieces so the permutation (which piece
     sits where) is visible. PLL algs preserve both F2L and orientation,
     so Display always shows a coherent case.
     ====================================================================== */
  PLL: {
    default: [
      ...bottomLayerStickers(),
      ...sideCenters(),
      ...middleEdgesStickers(),
      ...topLayerStickers('Y'),
      // last-layer edges: U sticker yellow + side sticker in its face color
      ...Object.entries(TLE).map(([k, p]) => ({
        cubie: p.cubie,
        faces: [{ face: 'U', color: 'Y' }, sideOf[k]],
      })),
      // last-layer corners: U sticker yellow + both side stickers in face colors
      { cubie: [1, 1, 1], faces: ['F', 'R'] },
      { cubie: [1, 1, -1], faces: ['R', 'B'] },
      { cubie: [-1, 1, -1], faces: ['B', 'L'] },
      { cubie: [-1, 1, 1], faces: ['L', 'F'] },
    ],
  },

  /* ======================================================================
     CROSS — white cross on the BOTTOM: only the 4 D-face edge stickers +
     the D center are white; everything else gray.
     ====================================================================== */
  CROSS: {
    default: [
      { cubie: [0, -1, 0], faces: [{ face: 'D', color: 'W' }] }, // D center
      { cubie: [0, -1, 1], faces: [{ face: 'D', color: 'W' }] }, // DF edge
      { cubie: [1, -1, 0], faces: [{ face: 'D', color: 'W' }] }, // DR edge
      { cubie: [0, -1, -1], faces: [{ face: 'D', color: 'W' }] }, // DB edge
      { cubie: [-1, -1, 0], faces: [{ face: 'D', color: 'W' }] }, // DL edge
    ],
  },

  /* ======================================================================
     Beginner-step shapes
     ====================================================================== */

  // Daisy: YELLOW center with WHITE petals around it on top
  DAISY: {
    default: [
      { cubie: [0, 1, 0], faces: [{ face: 'U', color: 'Y' }] }, // yellow center
      ...Object.values(TLE).map((p) => ({ cubie: p.cubie, faces: [{ face: 'U', color: 'W' }] })), // white petals
    ],
  },

  // First layer complete: whole bottom layer white
  FIRST_LAYER: {
    default: [...bottomLayerStickers()],
  },

  // Second layer: white first layer + middle edges + side centers
  SECOND_LAYER: {
    default: [
      ...bottomLayerStickers(),
      ...sideCenters(),
      ...middleEdgesStickers(),
    ],
  },

  // Yellow cross on top: U center + 4 top edges in YELLOW
  TOP_CROSS: {
    default: [...topCrossStickers('Y')],
  },
};

/**
 * Get the sticker map for a case.
 * @param {string} type e.g. 'F2L'|'OLL'|'PLL'|'CROSS'|'DAISY'|...
 * @returns {Array|null} stickers for engine.showShape/setupCase (null = plain cube)
 */
export function getShape(type) {
  const group = ALGO_SHAPES[type];
  if (!group) return null;
  return group.default;
}
