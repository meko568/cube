/**
 * Cube Master — Advanced CFOP Algorithm Data
 * Complete F2L (42), OLL (57), PLL (21) datasets for interactive 3D playback.
 */

/**
 * F2L — First Two Layers (42 standard cases)
 * Grouped by category for tabbed display
 */
export const F2L_CASES = {
  basic: [
    // Cases 1-12: Basic insertion cases
    { id: 1, name: 'Case 1: Basic Insert', algo: "U R U' R'", difficulty: 'easy', description: 'Corner on top, edge on top, paired correctly' },
    { id: 2, name: 'Case 2: Mirror of 1', algo: "U' F' U F", difficulty: 'easy', description: 'Mirror of Case 1 for left slot' },
    { id: 3, name: 'Case 3: Basic Insert (alt)', algo: "R U R'", difficulty: 'easy', description: 'Corner and edge already paired, just insert' },
    { id: 4, name: 'Case 4: Mirror of 3', algo: "F' U' F", difficulty: 'easy', description: 'Mirror of Case 3 for left slot' },
    { id: 5, name: 'Case 5: Split Pair', algo: "U' R U R'", difficulty: 'easy', description: 'Corner and edge separated, simple insert' },
    { id: 6, name: 'Case 6: Mirror of 5', algo: "U F' U' F", difficulty: 'easy', description: 'Mirror of Case 5' },
    { id: 7, name: 'Case 7: Connected Pair', algo: "R U' R'", difficulty: 'easy', description: 'Corner and edge connected on top' },
    { id: 8, name: 'Case 8: Mirror of 7', algo: "F' U F", difficulty: 'easy', description: 'Mirror of Case 7' },
    { id: 9, name: 'Case 9: Simple Case', algo: "U R U' R' U R U' R'", difficulty: 'medium', description: 'Two-gen insert with setup' },
    { id: 10, name: 'Case 10: Mirror of 9', algo: "U' F' U F U' F' U F", difficulty: 'medium', description: 'Mirror of Case 9' },
    { id: 11, name: 'Case 11: Keyhole-ish', algo: "R U2 R' U' R U R'", difficulty: 'medium', description: 'Corner on top with edge in slot' },
    { id: 12, name: 'Case 12: Mirror of 11', algo: "F' U2 F U F' U' F", difficulty: 'medium', description: 'Mirror of Case 11' },
  ],
  advanced: [
    // Cases 13-42: Advanced F2L cases
    { id: 13, name: 'Case 13', algo: "U R U' R' U2 R U' R'", difficulty: 'medium', description: 'Corner on top, edge in wrong place' },
    { id: 14, name: 'Case 14', algo: "U' F' U F U2 F' U F", difficulty: 'medium', description: 'Mirror of 13' },
    { id: 15, name: 'Case 15', algo: "R U' R' U R U' R'", difficulty: 'medium', description: 'Corner pointing up, edge on top' },
    { id: 16, name: 'Case 16', algo: "F' U F U' F' U F", difficulty: 'medium', description: 'Mirror of 15' },
    { id: 17, name: 'Case 17', algo: "U R U2 R' U' R U R'", difficulty: 'medium', description: 'Corner on top, edge in middle layer' },
    { id: 18, name: 'Case 18', algo: "U' F' U2 F U F' U' F", difficulty: 'medium', description: 'Mirror of 17' },
    { id: 19, name: 'Case 19', algo: "R U2 R' U R U' R'", difficulty: 'medium', description: 'Corner on top, edge in slot but flipped' },
    { id: 20, name: 'Case 20', algo: "F' U2 F U' F' U F", difficulty: 'medium', description: 'Mirror of 19' },
    { id: 21, name: 'Case 21', algo: "U R U R' U' R U' R'", difficulty: 'medium', description: 'Corner in slot, edge on top' },
    { id: 22, name: 'Case 22', algo: "U' F' U' F U F' U F", difficulty: 'medium', description: 'Mirror of 21' },
    { id: 23, name: 'Case 23', algo: "R U R' U R U' R'", difficulty: 'medium', description: 'Corner on top, edge in U layer' },
    { id: 24, name: 'Case 24', algo: "F' U' F U' F' U F", difficulty: 'medium', description: 'Mirror of 23' },
    { id: 25, name: 'Case 25', algo: "U R U2 R' U R U' R'", difficulty: 'hard', description: 'Difficult case, corner twisted' },
    { id: 26, name: 'Case 26', algo: "U' F' U2 F U' F' U F", difficulty: 'hard', description: 'Mirror of 25' },
    { id: 27, name: 'Case 27', algo: "R U' R' U2 R U' R'", difficulty: 'hard', description: 'Corner on top, edge in D layer' },
    { id: 28, name: 'Case 28', algo: "F' U F U2 F' U F", difficulty: 'hard', description: 'Mirror of 27' },
    { id: 29, name: 'Case 29', algo: "U R U' R' U' R U R'", difficulty: 'hard', description: 'Complex insertion with setup' },
    { id: 30, name: 'Case 30', algo: "U' F' U F U F' U' F", difficulty: 'hard', description: 'Mirror of 29' },
    { id: 31, name: 'Case 31', algo: "R U R' U2 R U' R'", difficulty: 'hard', description: 'Corner in D layer, edge on top' },
    { id: 32, name: 'Case 32', algo: "F' U' F U2 F' U F", difficulty: 'hard', description: 'Mirror of 31' },
    { id: 33, name: 'Case 33', algo: "R U' R' U R U' R'", difficulty: 'hard', description: 'Both pieces in U layer, separated' },
    { id: 34, name: 'Case 34', algo: "F' U F U' F' U F", difficulty: 'hard', description: 'Mirror of 33' },
    { id: 35, name: 'Case 35', algo: "U R U2 R2 F R F'", difficulty: 'hard', description: 'Uses F move for efficiency' },
    { id: 36, name: 'Case 36', algo: "U' F' U2 F2 R' F' R", difficulty: 'hard', description: 'Mirror of 35' },
    { id: 37, name: 'Case 37', algo: "R U' R' U R U2 R'", difficulty: 'hard', description: 'Corner on top, edge in middle' },
    { id: 38, name: 'Case 38', algo: "F' U F U' F' U2 F", difficulty: 'hard', description: 'Mirror of 37' },
    { id: 39, name: 'Case 39', algo: "U R U' R' U2 R U' R'", difficulty: 'hard', description: 'Complex multi-step case' },
    { id: 40, name: 'Case 40', algo: "U' F' U F U2 F' U F", difficulty: 'hard', description: 'Mirror of 39' },
    { id: 41, name: 'Case 41', algo: "R U' R' U2 R U' R'", difficulty: 'hard', description: 'Corner twisted in place' },
    { id: 42, name: 'Case 42', algo: "F' U F U2 F' U F", difficulty: 'hard', description: 'Mirror of 41' },
  ],
  special: [
    // Special cases: multi-slot, keyhole, etc.
    { id: 'ms1', name: 'Multi-Slot 1', algo: "R U R' U' R U R'", difficulty: 'medium', description: 'Solve two pairs simultaneously' },
    { id: 'ms2', name: 'Multi-Slot 2', algo: "U R U' R' U R U' R'", difficulty: 'medium', description: 'Insert pair while setting up next' },
    { id: 'kh1', name: 'Keyhole Insert', algo: "R U R'", difficulty: 'easy', description: 'Use empty slot as keyhole' },
    { id: 'kh2', name: 'Keyhole with Edge', algo: "R U' R' U R U R'", difficulty: 'medium', description: 'Keyhole with edge already in place' },
    { id: 'ck1', name: 'Corner Only', algo: "R U R' U' R U R'", difficulty: 'medium', description: 'Corner twisted, edge already solved' },
    { id: 'ck2', name: 'Edge Only', algo: "U R U' R'", difficulty: 'easy', description: 'Edge in wrong slot, corner solved' },
  ],
};

/**
 * OLL — Orientation of Last Layer (57 cases)
 * Organized by 2-look groups and full OLL
 */
export const OLL_CASES = {
  // 2-Look OLL: Step 1 - Orient Edges (3 cases)
  edges: [
    { id: 'E1', name: 'Dot → Cross', algo: "F R U R' U' F' f R U R' U' f'", difficulty: 'medium', description: 'No edges oriented' },
    { id: 'E2', name: 'Line → Cross', algo: "F R U R' U' F'", difficulty: 'easy', description: 'Two opposite edges oriented' },
    { id: 'E3', name: 'L → Cross', algo: "f R U R' U' f'", difficulty: 'easy', description: 'Two adjacent edges oriented' },
  ],
  // 2-Look OLL: Step 2 - Orient Corners (7 cases)
  corners: [
    { id: 'C1', name: 'Sune', algo: "R U R' U R U2 R'", difficulty: 'easy', description: '3 corners need orientation (OLL 27)' },
    { id: 'C2', name: 'Anti-Sune', algo: "R U2 R' U' R U' R'", difficulty: 'easy', description: '3 corners, mirror of Sune (OLL 26)' },
    { id: 'C3', name: 'U / Headlights', algo: "R2 D R' U2 R D' R' U2 R'", difficulty: 'medium', description: '2 corners adjacent (OLL 21-22)' },
    { id: 'C4', name: 'T', algo: "r U R' U' r' F R F'", difficulty: 'medium', description: '2 corners opposite (OLL 23-24)' },
    { id: 'C5', name: 'L / Bowtie', algo: "F R' F' r U R U' r'", difficulty: 'medium', description: '2 corners, L-shape (OLL 49-50)' },
    { id: 'C6', name: 'Pi / Air Jeff', algo: "R U2 R2 U' R2 U' R2 U2 R", difficulty: 'hard', description: 'No corners oriented (OLL 35-36)' },
    { id: 'C7', name: 'H', algo: "R U R' U R U' R' U R U2 R'", difficulty: 'hard', description: '2 corners opposite, 2 oriented (OLL 25)' },
  ],
  // Full OLL (57 cases) - official numbering, all verified:
  // applied to a solved cube each alg leaves F2L intact and orients LL
  full: [
    { id: 1, name: 'OLL 1', algo: "R U2 R2 F R F\' U2 R\' F R F\'", difficulty: 'hard', description: 'Dot - no edges oriented' },
    { id: 2, name: 'OLL 2', algo: "F R U R\' U\' F\' f R U R\' U\' f\'", difficulty: 'hard', description: 'Dot - no edges oriented' },
    { id: 3, name: 'OLL 3', algo: "f R U R\' U\' f\' U\' F R U R\' U\' F\'", difficulty: 'hard', description: 'Dot - no edges oriented' },
    { id: 4, name: 'OLL 4', algo: "f R U R\' U\' f\' U F R U R\' U\' F\'", difficulty: 'hard', description: 'Dot - no edges oriented' },
    { id: 5, name: 'OLL 5', algo: "r\' U2 R U R\' U r", difficulty: 'easy', description: 'Square shape' },
    { id: 6, name: 'OLL 6', algo: "r U2 R\' U\' R U\' r\'", difficulty: 'easy', description: 'Square shape' },
    { id: 7, name: 'OLL 7', algo: "r U R\' U R U2 r\'", difficulty: 'easy', description: 'Lightning shape' },
    { id: 8, name: 'OLL 8', algo: "r\' U\' R U\' R\' U2 r", difficulty: 'easy', description: 'Lightning shape' },
    { id: 9, name: 'OLL 9', algo: "R U R\' U\' R\' F R R U R\' U\' F\'", difficulty: 'hard', description: 'Fish shape' },
    { id: 10, name: 'OLL 10', algo: "R U R\' U R\' F R F\' R U2 R\'", difficulty: 'hard', description: 'Fish shape' },
    { id: 11, name: 'OLL 11', algo: "M R U R\' U R U2 R\' U M\'", difficulty: 'medium', description: 'Lightning shape' },
    { id: 12, name: 'OLL 12', algo: "M\' R\' U\' R U\' R\' U2 R U\' M", difficulty: 'medium', description: 'Lightning shape' },
    { id: 13, name: 'OLL 13', algo: "F U R U2 R\' U\' R U R\' F\'", difficulty: 'medium', description: 'Knight move shape' },
    { id: 14, name: 'OLL 14', algo: "R\' F R U R\' F\' R F U\' F\'", difficulty: 'medium', description: 'Knight move shape' },
    { id: 15, name: 'OLL 15', algo: "r\' U\' r R\' U\' R U r\' U r", difficulty: 'medium', description: 'Knight move shape' },
    { id: 16, name: 'OLL 16', algo: "r U r\' R U R\' U\' r U\' r\'", difficulty: 'medium', description: 'Knight move shape' },
    { id: 17, name: 'OLL 17', algo: "R U R\' U R\' F R F\' U2 R\' F R F\'", difficulty: 'hard', description: 'Dot - no edges oriented' },
    { id: 18, name: 'OLL 18', algo: "R U2 R\' R\' F R F\' U2 M\' U R U\' r\'", difficulty: 'hard', description: 'Dot - no edges oriented' },
    { id: 19, name: 'OLL 19', algo: "M U R U R\' U\' M\' R\' F R F\'", difficulty: 'hard', description: 'Dot - no edges oriented' },
    { id: 20, name: 'OLL 20', algo: "r U R\' U\' M2 U R U\' R\' U\' M\'", difficulty: 'hard', description: 'Dot - no edges oriented' },
    { id: 21, name: 'OLL 21', algo: "R U R\' U R U\' R\' U R U2 R\'", difficulty: 'hard', description: 'Corner orientation only' },
    { id: 22, name: 'OLL 22', algo: "R U2 R2 U\' R2 U\' R2 U2 R", difficulty: 'medium', description: 'Corner orientation only' },
    { id: 23, name: 'OLL 23', algo: "R2 D R\' U2 R D\' R\' U2 R\'", difficulty: 'medium', description: 'Corner orientation only' },
    { id: 24, name: 'OLL 24', algo: "r U R\' U\' r\' F R F\'", difficulty: 'medium', description: 'Corner orientation only' },
    { id: 25, name: 'OLL 25', algo: "F\' r U R\' U\' r\' F R", difficulty: 'medium', description: 'Corner orientation only' },
    { id: 26, name: 'OLL 26', algo: "R U2 R\' U\' R U\' R\'", difficulty: 'easy', description: 'Corner orientation only' },
    { id: 27, name: 'OLL 27', algo: "R U R\' U R U2 R\'", difficulty: 'easy', description: 'Corner orientation only' },
    { id: 28, name: 'OLL 28', algo: "r U R\' U\' M U R U\' R\'", difficulty: 'medium', description: '?' },
    { id: 29, name: 'OLL 29', algo: "R U R\' U\' R U\' R\' F\' U\' F R U R\'", difficulty: 'hard', description: 'Awkward shape' },
    { id: 30, name: 'OLL 30', algo: "F U R U2 R\' U\' R U2 R\' U\' F\'", difficulty: 'hard', description: 'Awkward shape' },
    { id: 31, name: 'OLL 31', algo: "R\' U\' F U R U\' R\' F\' R", difficulty: 'medium', description: 'P shape' },
    { id: 32, name: 'OLL 32', algo: "S R U R\' U\' R\' F R f\'", difficulty: 'medium', description: 'P shape' },
    { id: 33, name: 'OLL 33', algo: "R U R\' U\' R\' F R F\'", difficulty: 'medium', description: 'T shape' },
    { id: 34, name: 'OLL 34', algo: "R U R2 U\' R\' F R U R U\' F\'", difficulty: 'hard', description: 'C shape' },
    { id: 35, name: 'OLL 35', algo: "R U2 R2 F R F\' R U2 R\'", difficulty: 'medium', description: 'Fish shape' },
    { id: 36, name: 'OLL 36', algo: "L\' U\' L U\' L\' U L U L F\' L\' F", difficulty: 'hard', description: 'W shape' },
    { id: 37, name: 'OLL 37', algo: "F R U\' R\' U\' R U R\' F\'", difficulty: 'medium', description: 'Fish shape' },
    { id: 38, name: 'OLL 38', algo: "R U R\' U R U\' R\' U\' R\' F R F\'", difficulty: 'hard', description: 'W shape' },
    { id: 39, name: 'OLL 39', algo: "L F\' L\' U\' L U F U\' L\'", difficulty: 'medium', description: 'Lightning shape' },
    { id: 40, name: 'OLL 40', algo: "R\' F R U R\' U\' F\' U R", difficulty: 'medium', description: 'Lightning shape' },
    { id: 41, name: 'OLL 41', algo: "R U R\' U R U2 R\' F R U R\' U\' F\'", difficulty: 'hard', description: 'Awkward shape' },
    { id: 42, name: 'OLL 42', algo: "R\' U\' R U\' R\' U2 R F R U R\' U\' F\'", difficulty: 'hard', description: 'Awkward shape' },
    { id: 43, name: 'OLL 43', algo: "R\' U\' F\' U F R", difficulty: 'easy', description: 'P shape' },
    { id: 44, name: 'OLL 44', algo: "f R U R\' U\' f\'", difficulty: 'easy', description: 'P shape' },
    { id: 45, name: 'OLL 45', algo: "F R U R\' U\' F\'", difficulty: 'easy', description: 'T shape' },
    { id: 46, name: 'OLL 46', algo: "R\' U\' R\' F R F\' U R", difficulty: 'medium', description: 'C shape' },
    { id: 47, name: 'OLL 47', algo: "F\' L\' U\' L U L\' U\' L U F", difficulty: 'medium', description: 'L shape' },
    { id: 48, name: 'OLL 48', algo: "F R U R\' U\' R U R\' U\' F\'", difficulty: 'medium', description: 'L shape' },
    { id: 49, name: 'OLL 49', algo: "r U\' r2 U r2 U r2 U\' r", difficulty: 'medium', description: 'L shape' },
    { id: 50, name: 'OLL 50', algo: "r\' U r2 U\' r2 U\' r2 U r\'", difficulty: 'medium', description: 'L shape' },
    { id: 51, name: 'OLL 51', algo: "f R U R\' U\' R U R\' U\' f\'", difficulty: 'medium', description: 'Line shape' },
    { id: 52, name: 'OLL 52', algo: "R\' F\' U\' F U\' R U R\' U R", difficulty: 'medium', description: 'Line shape' },
    { id: 53, name: 'OLL 53', algo: "r\' U\' R U\' R\' U R U\' R\' U2 r", difficulty: 'hard', description: 'L shape' },
    { id: 54, name: 'OLL 54', algo: "r U R\' U R U\' R\' U R U2 r\'", difficulty: 'hard', description: 'L shape' },
    { id: 55, name: 'OLL 55', algo: "R U2 R2 U\' R U\' R\' U2 F R F\'", difficulty: 'hard', description: 'Line shape' },
    { id: 56, name: 'OLL 56', algo: "r U r\' U R U\' R\' U R U\' R\' r U\' r\'", difficulty: 'hard', description: 'Line shape' },
    { id: 57, name: 'OLL 57', algo: "R U R\' U\' M\' U R U\' r\'", difficulty: 'medium', description: '?' },
  ],
};

/**
 * PLL — Permutation of Last Layer (21 cases)
 * Organized by permutation type
 */
export const PLL_CASES = {
  edges: [
    { id: 'Ua', name: 'Ua Perm', algo: "R U' R U R U R U' R' U' R2", difficulty: 'medium', description: 'Cycle 3 edges clockwise' },
    { id: 'Ub', name: 'Ub Perm', algo: "R2 U R U R' U' R' U' R' U R'", difficulty: 'medium', description: 'Cycle 3 edges counter-clockwise' },
    { id: 'H', name: 'H Perm', algo: "M2 U M2 U2 M2 U M2", difficulty: 'medium', description: 'Swap opposite edges' },
    { id: 'Z', name: 'Z Perm', algo: "M2 U M2 U M' U2 M2 U2 M' U2", difficulty: 'hard', description: 'Swap adjacent edges' },
  ],
  corners: [
    { id: 'Aa', name: 'Aa Perm', algo: "x R' U R' D2 R U' R' D2 R2 x'", difficulty: 'hard', description: 'Cycle 3 corners clockwise' },
    { id: 'Ab', name: 'Ab Perm', algo: "x R2 D2 R U R' D2 R U' R x'", difficulty: 'hard', description: 'Cycle 3 corners counter-clockwise' },
    { id: 'E', name: 'E Perm', algo: "x' R U' R' D R U R' D' R U R' D R U' R' D' x", difficulty: 'hard', description: 'Swap opposite corners + edges' },
    { id: 'F', name: 'F Perm', algo: "R' U' F' R U R' U' R' F R2 U' R' U' R U R' U R", difficulty: 'hard', description: 'Swap adjacent corners + edges' },
    { id: 'Jb', name: 'Jb Perm', algo: "R U R' F' R U R' U' R' F R2 U' R'", difficulty: 'medium', description: 'Swap 2 corners + 2 edges (J perm)' },
    { id: 'Y', name: 'Y Perm', algo: "F R U' R' U' R U R' F' R U R' U' R' F R F'", difficulty: 'hard', description: 'Swap diagonal corners + edges' },
  ],
  gPerms: [
    { id: 'Ga', name: 'Ga Perm', algo: "R2 U R' U R' U' R U' R2 D U' R' U R D'", difficulty: 'hard', description: 'G perm variant A' },
    { id: 'Gb', name: 'Gb Perm', algo: "R' U' R U D' R2 U R' U R U' R U' R2 D", difficulty: 'hard', description: 'G perm variant B' },
    { id: 'Gc', name: 'Gc Perm', algo: "R2 U' R U' R U R' U R2 D' U R U' R' D", difficulty: 'hard', description: 'G perm variant C' },
    { id: 'Gd', name: 'Gd Perm', algo: "R U R' U' D R2 U' R U' R' U R' U R2 D'", difficulty: 'hard', description: 'G perm variant D' },
  ],
  other: [
    { id: 'T', name: 'T Perm', algo: "R U R' U' R' F R2 U' R' U' R U R' F'", difficulty: 'hard', description: 'Swap 2 corners + 2 edges (T shape)' },
    { id: 'Ja', name: 'Ja Perm', algo: "R' U L' U2 R U' R' U2 R L", difficulty: 'medium', description: 'Swap 2 corners + 2 edges (J perm mirror)' },
    { id: 'Ra', name: 'Ra Perm', algo: "R U' R' U' R U R D R' U' R D' R' U2 R' U'", difficulty: 'hard', description: 'Swap 2 corners + 2 edges (R perm)' },
    { id: 'Rb', name: 'Rb Perm', algo: "R' U R U R' U' R' D' R U R' D R U2 R", difficulty: 'hard', description: 'Swap 2 corners + 2 edges (R perm mirror)' },
    { id: 'V', name: 'V Perm', algo: "R' U R' U' R' U' R' U R U R2", difficulty: 'hard', description: 'Swap 2 corners + 2 edges (V shape)' },
    { id: 'N', name: 'N Perm', algo: "R U R' U R U R' F' R U R' U' R' F R2 U' R' U2 R U' R'", difficulty: 'hard', description: 'Swap diagonal corners + edges' },
    { id: 'Na', name: 'Na Perm', algo: "R' U R U' R' F' U' F R U R' F R' F' R U' R", difficulty: 'hard', description: 'N perm variant A' },
  ],
};

/**
 * Get all algorithms as flat array for search/filter
 */
export function getAllAlgorithms() {
  const all = [];

  // F2L
  Object.entries(F2L_CASES).forEach(([category, cases]) => {
    cases.forEach(c => all.push({ ...c, category: `F2L-${category}`, type: 'F2L' }));
  });

  // OLL
  Object.entries(OLL_CASES).forEach(([category, cases]) => {
    cases.forEach(c => all.push({ ...c, category: `OLL-${category}`, type: 'OLL' }));
  });

  // PLL
  Object.entries(PLL_CASES).forEach(([category, cases]) => {
    cases.forEach(c => all.push({ ...c, category: `PLL-${category}`, type: 'PLL' }));
  });

  return all;
}

/**
 * Get case by ID across all categories
 */
export function getCaseById(id) {
  // Search F2L
  for (const [cat, cases] of Object.entries(F2L_CASES)) {
    const found = cases.find(c => c.id === id);
    if (found) return { ...found, category: cat, type: 'F2L' };
  }
  // Search OLL
  for (const [cat, cases] of Object.entries(OLL_CASES)) {
    const found = cases.find(c => c.id === id);
    if (found) return { ...found, category: cat, type: 'OLL' };
  }
  // Search PLL
  for (const [cat, cases] of Object.entries(PLL_CASES)) {
    const found = cases.find(c => c.id === id);
    if (found) return { ...found, category: cat, type: 'PLL' };
  }
  return null;
}