/**
 * Cube Master — Pro Techniques Algorithm Data
 * Finger tricks, One-Handed, Blindfolded, COLL, ZBLL datasets.
 */

/**
 * Finger Tricks — Fundamentals
 */
export const FINGER_TRICKS = {
  basics: [
    { id: 'ft1', name: 'R / R\' (Index)', algo: "R U R' U'", difficulty: 'easy', description: 'Index finger push for R, pull for R\'. Keep wrist stable.' },
    { id: 'ft2', name: 'U / U\' (Index/Middle)', algo: "U R U' R'", difficulty: 'easy', description: 'Index for U, middle for U\'. Flick, don\'t push.' },
    { id: 'ft3', name: 'F / F\' (Index)', algo: "F R U R' U' F'", difficulty: 'medium', description: 'Index finger push for F. Rotate wrist slightly.' },
    { id: 'ft4', name: 'L / L\' (Middle/Ring)', algo: "L' U' L U", difficulty: 'medium', description: 'Ring for L, middle for L\'. Mirror of R moves.' },
    { id: 'ft5', name: 'Double Flick (R U)', algo: "R U R' U'", difficulty: 'easy', description: 'Index does R then immediately U in one motion.' },
    { id: 'ft6', name: 'Sledgehammer', algo: "R' F R F'", difficulty: 'medium', description: 'Ring finger R\', index F, ring R, index F\'. Flow as one.' },
    { id: 'ft7', name: 'Sexy Move', algo: "R U R' U'", difficulty: 'easy', description: 'Index R, index U, index R\', index U\'. The foundation.' },
    { id: 'ft8', name: 'Reverse Sexy', algo: "U R U' R'", difficulty: 'easy', description: 'Index U, index R, index U\', index R\'. Mirror flow.' },
  ],
  advanced: [
    { id: 'ft9', name: 'Air Jeff / Pi Trigger', algo: "R U2 R2 U' R2 U' R2 U2 R", difficulty: 'hard', description: 'R U2 with index, R2 with ring+middle, U\' with middle...' },
    { id: 'ft10', name: 'T Perm Finger Trick', algo: "R U R' U' R' F R2 U' R' U' R U R' F'", difficulty: 'hard', description: 'Regripless T perm. R U R\' U\' (sexy), R\' F (sledge), R2 U\' R\' U\' R U R\' F\'.' },
    { id: 'ft11', name: 'J Perm (Ja) Flow', algo: "R' U L' U2 R U' R' U2 R L", difficulty: 'hard', description: 'Ring R\', index U, thumb L\', index U2, index R...' },
    { id: 'ft12', name: 'Y Perm Execution', algo: "F R U' R' U' R U R' F' R U R' U' R' F R F'", difficulty: 'hard', description: 'F (index), R U\' R\' U\' (reverse sexy), R U R\' F\'...' },
    { id: 'ft13', name: 'V Perm Finger Trick', algo: "R' U R' U' R' U' R' U R U R2", difficulty: 'hard', description: 'All ring/middle fingers. No regrips. Pure flow.' },
    { id: 'ft14', name: 'E Perm OH Style', algo: "x' R U' R' D R U R' D' R U R' D R U' R' D'", difficulty: 'hard', description: 'Table abuse for D turns. Wrist rotation replaces regrips.' },
    { id: 'ft15', name: 'Z Perm Optimization', algo: "M2 U M2 U M' U2 M2 U2 M' U2", difficulty: 'hard', description: 'Ring for M2, middle for M\'. Ring finger M2 U M2...' },
    { id: 'ft16', name: 'G Perm (Ga) Flow', algo: "R2 U R' U' R U R U R U' R'", difficulty: 'hard', description: 'R2 (ring+middle), U (index), R\' (ring), U\' (middle)...' },
  ],
  algExecution: [
    { id: 'ft17', name: 'OLL 27 (Sune) Optimized', algo: "R U R' U R U2 R'", difficulty: 'easy', description: 'Index R, index U, ring R\', index U, index R, index U2 (double flick), ring R\'.' },
    { id: 'ft18', name: 'OLL 26 (Anti-Sune) Optimized', algo: "R U2 R' U' R U' R'", difficulty: 'easy', description: 'Index R, index U2, ring R\', middle U\', index R, middle U\', ring R\'.' },
    { id: 'ft19', name: 'PLL Ua Perm', algo: "R U' R U R U R U' R' U' R2", difficulty: 'medium', description: 'Index R, middle U\', index R, index U, index R, index U, ring R\', middle U\', middle U\', ring+middle R2.' },
    { id: 'ft20', name: 'PLL Ub Perm', algo: "R2 U R U R' U' R' U' R' U R'", difficulty: 'medium', description: 'Ring+middle R2, index U, index R, index U, ring R\', middle U\', middle U\', ring R\', middle U, ring R\'.' },
    { id: 'ft21', name: 'PLL H Perm', algo: "M2 U M2 U2 M2 U M2", difficulty: 'medium', description: 'Ring M2, index U, ring M2, index U2, ring M2, index U, ring M2. All ring finger.' },
    { id: 'ft22', name: 'PLL Z Perm', algo: "M2 U M2 U M' U2 M2 U2 M' U2", difficulty: 'hard', description: 'Ring M2, index U, ring M2, index U, middle M\', index U2...' },
    { id: 'ft23', name: 'F2L Case 1 (R U R\')', algo: "R U R'", difficulty: 'easy', description: 'Index R, index U, ring R\'. The most basic insert.' },
    { id: 'ft24', name: 'F2L Case 2 (U\' F\' U F)', algo: "U' F' U F", difficulty: 'easy', description: 'Middle U\', index F\', middle U, index F. Left hand mirror.' },
  ],
};

/**
 * One-Handed (OH) Techniques
 */
export const OH_TECHNIQUES = {
  notation: [
    { id: 'oh1', name: 'R / R\' (Pinky/Ring)', algo: "R U R' U'", difficulty: 'easy', description: 'Pinky pushes R, ring pulls R\'. Wrist rotates for U/U\'.' },
    { id: 'oh2', name: 'U / U\' (Index/Middle)', algo: "U R U' R'", difficulty: 'easy', description: 'Index flicks U, middle flicks U\'. Wrist stable.' },
    { id: 'oh3', name: 'F / F\' (Index/Thumb)', algo: "F R U R' U' F'", difficulty: 'medium', description: 'Index pushes F, thumb pulls F\'. Cube on table for stability.' },
    { id: 'oh4', name: 'L / L\' (Ring/Pinky)', algo: "L' U' L U", difficulty: 'hard', description: 'Ring pushes L, pinky pulls L\'. Awkward, avoid when possible.' },
    { id: 'oh5', name: 'D / D\' (Table Abuse)', algo: "D R U R' D'", difficulty: 'medium', description: 'Push cube against table, rotate wrist for D/D\'. No finger effort.' },
    { id: 'oh6', name: 'B / B\' (Wrist Rotation)', algo: "B R U R' B'", difficulty: 'hard', description: 'Rotate entire wrist. Cube stays on table. Rarely used in OH.' },
    { id: 'oh7', name: 'M / M\' (Ring)', algo: "M2 U M2", difficulty: 'medium', description: 'Ring finger pushes M slice. Table stabilizes cube.' },
    { id: 'oh8', name: 'S / S\' (Index)', algo: "S R U R' S'", difficulty: 'hard', description: 'Index pushes S slice. Very rare in OH solves.' },
  ],
  f2l: [
    { id: 'ohf1', name: 'OH F2L Case 1', algo: "R U R'", difficulty: 'easy', description: 'Pinky R, index U, ring R\'. Standard right-hand insert.' },
    { id: 'ohf2', name: 'OH F2L Case 2', algo: "U' R U R'", difficulty: 'easy', description: 'Middle U\', pinky R, index U, ring R\'. Setup + insert.' },
    { id: 'ohf3', name: 'OH F2L Case 3', algo: "R U' R'", difficulty: 'easy', description: 'Pinky R, middle U\', ring R\'. Connected pair.' },
    { id: 'ohf4', name: 'OH F2L Case 4', algo: "R' U' R U' R' U2 R U' R U R' U R U2 R'", difficulty: 'medium', description: 'Pinky R, index U2 (double), ring R\', middle U\', pinky R, index U, ring R\'.' },
    { id: 'ohf5', name: 'OH F2L Case 5', algo: "U R U' R' U R U' R'", difficulty: 'medium', description: 'Index U, pinky R, middle U\', ring R\', index U, pinky R, middle U\', ring R\'.' },
    { id: 'ohf6', name: 'OH F2L Case 6 (Mirror)', algo: "U' L' U L", difficulty: 'hard', description: 'Middle U\', ring L\', index U, pinky L. Left slot, awkward.' },
    { id: 'ohf7', name: 'OH F2L Multi-Slot', algo: "R U R' U' R U R'", difficulty: 'medium', description: 'Insert first pair while setting up second. Pinky/index/ring flow.' },
    { id: 'ohf8', name: 'OH Keyhole', algo: "R U R'", difficulty: 'easy', description: 'Use empty slot. Pinky R, index U, ring R\'. Fast and efficient.' },
  ],
  ollPll: [
    { id: 'oholl1', name: 'OH OLL 27 (Sune)', algo: "R U R' U R U2 R'", difficulty: 'easy', description: 'Pinky R, index U, ring R\', index U, pinky R, index U2, ring R\'.' },
    { id: 'oholl2', name: 'OH OLL 26 (Anti-Sune)', algo: "R U2 R' U' R U' R'", difficulty: 'easy', description: 'Pinky R, index U2, ring R\', middle U\', pinky R, middle U\', ring R\'.' },
    { id: 'oholl3', name: 'OH OLL 21 (U-shape)', algo: "R U R' U R U' R' U R U2 R'", difficulty: 'medium', description: 'Long but flowy. Pinky/index/ring alternating.' },
    { id: 'oholl4', name: 'OH OLL 23 (T-shape)', algo: "r U R' U' r' F R F'", difficulty: 'hard', description: 'r = R + M (pinky+ring). F with index. Complex.' },
    { id: 'ohpll1', name: 'OH PLL Ua', algo: "R U' R U R U R U' R' U' R2", difficulty: 'medium', description: 'Standard Ua. Pinky R, middle U\', pinky R, index U...' },
    { id: 'ohpll2', name: 'OH PLL Ub', algo: "R2 U R U R' U' R' U' R' U R'", difficulty: 'medium', description: 'Ring+middle R2, index U, pinky R, index U, ring R\', middle U\'...' },
    { id: 'ohpll3', name: 'OH PLL H', algo: "M2 U M2 U2 M2 U M2", difficulty: 'easy', description: 'Best OH PLL. All ring finger M2. Very fast.' },
    { id: 'ohpll4', name: 'OH PLL Z', algo: "M2 U M2 U M' U2 M2 U2 M' U2", difficulty: 'hard', description: 'Ring M2, index U, ring M2, index U, middle M\', index U2...' },
  ],
};

/**
 * Blindfolded (3BLD) Methods
 */
export const BLD_METHODS = {
  edges: [
    { id: 'bld1', name: 'M2 Edge Swap', algo: "M2", difficulty: 'easy', description: 'Core of M2 method. Swap UF (buffer) with target edge.' },
    { id: 'bld2', name: 'M2 Setup: UF→UB', algo: "U M2 U'", difficulty: 'easy', description: 'Setup UB to UF, M2, undo setup.' },
    { id: 'bld3', name: 'M2 Setup: UF→UL', algo: "L' M2 L", difficulty: 'easy', description: 'Setup UL to UF via L\'.' },
    { id: 'bld4', name: 'M2 Setup: UF→UR', algo: "R M2 R'", difficulty: 'easy', description: 'Setup UR to UF via R.' },
    { id: 'bld5', name: 'M2 Setup: UF→DF', algo: "D M2 D'", difficulty: 'easy', description: 'Setup DF to UF via D.' },
    { id: 'bld6', name: 'M2 Setup: UF→DL', algo: "L2 M2 L2", difficulty: 'medium', description: 'Double setup for DL.' },
    { id: 'bld7', name: 'M2 Setup: UF→DR', algo: "R2 M2 R2", difficulty: 'medium', description: 'Double setup for DR.' },
    { id: 'bld8', name: 'M2 Setup: UF→DB', algo: "D2 M2 D2", difficulty: 'medium', description: 'Double setup for DB.' },
    { id: 'bld9', name: '3-Style Edge Comm: UF-UB-UL', algo: "M' U M U'", difficulty: 'medium', description: 'Commutator [M\', U] = M\' U M U\'. 3-cycle edges.' },
    { id: 'bld10', name: '3-Style Edge Comm: UF-UR-UF', algo: "U' M' U M", difficulty: 'medium', description: 'Commutator [U\', M\'] = U\' M\' U M. 3-cycle.' },
    { id: 'bld11', name: '3-Style Edge Comm: UF-DF-DB', algo: "D M' D' M", difficulty: 'medium', description: 'Commutator [D, M\'] = D M\' D\' M.' },
    { id: 'bld12', name: 'Parity Fix (M2)', algo: "D' L2 D M2 D' L2 D", difficulty: 'medium', description: 'Fix parity when odd number of edge targets.' },
  ],
  corners: [
    { id: 'bld13', name: 'OP Corner Swap (T-Perm)', algo: "R U R' U' R' F R2 U' R' U' R U R' F'", difficulty: 'medium', description: 'Old Pochmann corner swap. Buffer UBL ↔ target.' },
    { id: 'bld14', name: 'OP Setup: UBL→UBR', algo: "R U R' U' R' F R2 U' R' U' R U R' F'", difficulty: 'medium', description: 'T-perm swaps UBL↔UBR directly. No setup needed.' },
    { id: 'bld15', name: 'OP Setup: UBL→UFL', algo: "F' R U R' U' R' F R2 U' R' U' R U R' F", difficulty: 'medium', description: 'F\' setup, T-perm, F undo. Swaps UBL↔UFL.' },
    { id: 'bld16', name: 'OP Setup: UBL→UFR', algo: "R' F R U R' U' R' F R2 U' R' U' R U R' F' R", difficulty: 'hard', description: 'R\' F setup, T-perm, F\' R undo.' },
    { id: 'bld17', name: 'OP Setup: UBL→DFL', algo: "D2 F' R U R' U' R' F R2 U' R' U' R U R' F D2", difficulty: 'hard', description: 'D2 F\' setup, T-perm, F D2 undo.' },
    { id: 'bld18', name: 'OP Setup: UBL→DBR', algo: "D' F' R U R' U' R' F R2 U' R' U' R U R' F D", difficulty: 'hard', description: 'D\' F\' setup, T-perm, F D undo.' },
    { id: 'bld19', name: '3-Style Corner Comm: UBL-UBR-UFL', algo: "R U' R' U' R U R' F' R U R' U' R' F R", difficulty: 'hard', description: '[R U\' R\' U\', R U R\' F\'] = T-perm commutator.' },
    { id: 'bld20', name: '3-Style Corner Comm: UBL-UFL-UBR', algo: "R U R' F' R U R' U' R' F R2 U' R' U'", difficulty: 'hard', description: '[R U R\' F\', R U R\' U\'] = J-perm commutator.' },
    { id: 'bld21', name: '3-Style Corner Comm: UBL-DFR-DBR', algo: "D R U' R' D' R U R'", difficulty: 'medium', description: '[D, R U\' R\'] = D R U\' R\' D\' R U R\'. Simple 3-cycle.' },
    { id: 'bld22', name: 'Parity Fix (OP)', algo: "R U' R' U' R U R' F' R U R' U' R' F R", difficulty: 'medium', description: 'T-perm fixes corner parity when odd edge targets.' },
  ],
  memo: [
    { id: 'bld23', name: 'Speffz Letter Scheme', algo: "A B C D E F G H", difficulty: 'easy', description: 'UBL=A, UBR=B, UFL=C, UFR=D, UL=E, UR=F, UF=G, UB=H...' },
    { id: 'bld24', name: 'Audio Pair: AB', algo: "A B", difficulty: 'easy', description: '"Apple Butterfly" → vivid image. Speak rhythmically.' },
    { id: 'bld25', name: 'Journey Location 1', algo: "A B C D", difficulty: 'easy', description: 'Place "Apple Butterfly Cat Dog" at front door.' },
    { id: 'bld26', name: 'Journey Location 2', algo: "E F G H", difficulty: 'easy', description: '"Elephant Fish Goat Hat" at shoe rack.' },
  ],
};

/**
 * COLL Algorithms (40 cases)
 */
export const COLL_CASES = {
  sune: [
    { id: 'coll1', name: 'Sune 1 (OLL 27)', algo: "R U R' U R U2 R'", difficulty: 'easy', description: 'Standard Sune. Corners solved, edges cycled.' },
    { id: 'coll2', name: 'Sune 2', algo: "R U2 R' U' R U R' U' R U' R'", difficulty: 'medium', description: 'Sune variation. UBL→UBR→UFL.' },
    { id: 'coll3', name: 'Sune 3', algo: "R U R' U R U' R' U R U2 R'", difficulty: 'medium', description: 'Sune with extra setup. UBL→UFL→UBR.' },
    { id: 'coll4', name: 'Anti-Sune 1 (OLL 26)', algo: "R U2 R' U' R U' R'", difficulty: 'easy', description: 'Standard Anti-Sune. Mirror of Sune.' },
    { id: 'coll5', name: 'Anti-Sune 2', algo: "R' U' R U' R' U2 R", difficulty: 'medium', description: 'Anti-Sune variation. UBR→UBL→UFL.' },
    { id: 'coll6', name: 'Anti-Sune 3', algo: "R U2 R' U' R U R' U' R U' R'", difficulty: 'medium', description: 'Anti-Sune extended. UBR→UFL→UBL.' },
  ],
  pi: [
    { id: 'coll7', name: 'Pi 1 (OLL 35)', algo: "R U2 R2 U' R2 U' R2 U2 R", difficulty: 'hard', description: 'Pi case. No corners oriented. UBL→UBR→UFL→UFR.' },
    { id: 'coll8', name: 'Pi 2', algo: "R' U2 R2 U R2 U R2 U2 R'", difficulty: 'hard', description: 'Pi mirror. Opposite corner cycle.' },
    { id: 'coll9', name: 'Pi 3', algo: "R U2 R' U' R U R' U' R U' R'", difficulty: 'hard', description: 'Pi with adjacent swap.' },
    { id: 'coll10', name: 'Pi 4', algo: "R U2 R2 U' R2 U' R2 U2 R", difficulty: 'hard', description: 'Pi inverse pattern.' },
    { id: 'coll11', name: 'Pi 5', algo: "R U R' U R U' R' U R U2 R'", difficulty: 'hard', description: 'Pi with headlights.' },
    { id: 'coll12', name: 'Pi 6', algo: "R' U2 R2 U R2 U R2 U2 R'", difficulty: 'hard', description: 'Pi mirror with headlights.' },
  ],
  h: [
    { id: 'coll13', name: 'H 1 (OLL 25)', algo: "R U R' U R U' R' U R U2 R'", difficulty: 'hard', description: 'H case. Two opposite corners need swap.' },
    { id: 'coll14', name: 'H 2', algo: "R U2 R' U' R U R' U' R U' R'", difficulty: 'hard', description: 'H variation. Different corner cycle.' },
    { id: 'coll15', name: 'H 3', algo: "R' U2 R U R' U' R U R' U R", difficulty: 'hard', description: 'H mirror.' },
    { id: 'coll16', name: 'H 4', algo: "R U R' U R U' R' U R U2 R'", difficulty: 'hard', description: 'H with double swap.' },
  ],
  u: [
    { id: 'coll17', name: 'U 1', algo: "R U R' U' R' F R F'", difficulty: 'medium', description: 'U case (headlights). Adjacent corner swap.' },
    { id: 'coll18', name: 'U 2', algo: "R' U' R U' R' U2 R2 U R' U R U2 R'", difficulty: 'medium', description: 'U mirror.' },
    { id: 'coll19', name: 'U 3', algo: "F R U R' U' F'", difficulty: 'easy', description: 'U with edges oriented. Simple.' },
    { id: 'coll20', name: 'U 4', algo: "R' F R' F' R U R U' R' F R U' R' U R U R' F' R", difficulty: 'medium', description: 'U variation.' },
    { id: 'coll21', name: 'T 1 (OLL 23)', algo: "r U R' U' r' F R F'", difficulty: 'medium', description: 'T case. Diagonal corner swap.' },
    { id: 'coll22', name: 'T 2', algo: "R U R' U' R' F R F'", difficulty: 'medium', description: 'T mirror.' },
    { id: 'coll23', name: 'T 3', algo: "F R U R' U' F'", difficulty: 'easy', description: 'T with edges oriented.' },
    { id: 'coll24', name: 'T 4', algo: "R' U R U2 R' L' U R U' L", difficulty: 'medium', description: 'T variation.' },
    { id: 'coll25', name: 'L 1 (OLL 49)', algo: "F R' F' r U R U' r'", difficulty: 'medium', description: 'L case (bowtie). Adjacent swap.' },
    { id: 'coll26', name: 'L 2', algo: "y' r D r' U r D' r' U y R U2 R'", difficulty: 'medium', description: 'L mirror.' },
    { id: 'coll27', name: 'L 3', algo: "R' U2 R' D' R U2 R' D R2", difficulty: 'medium', description: 'L variation.' },
    { id: 'coll28', name: 'L 4', algo: "R' U' R U' R' U2 R", difficulty: 'medium', description: 'L inverse.' },
  ],
  other: [
    { id: 'coll29', name: 'C 1', algo: "R U R' U' R' F R F'", difficulty: 'medium', description: 'C case. Corner 3-cycle.' },
    { id: 'coll30', name: 'C 2', algo: "R U2 R' U' R U' R2 U2 R U R' U R", difficulty: 'medium', description: 'C mirror.' },
    { id: 'coll31', name: 'W 1', algo: "F R U' R' U R U2 R' U' R U R' U' F'", difficulty: 'hard', description: 'W case. Complex cycle.' },
    { id: 'coll32', name: 'W 2', algo: "R U R' U R U2 R' U' R U R' U R U2 R'", difficulty: 'hard', description: 'W mirror.' },
    { id: 'coll33', name: 'Knight 1', algo: "R U R' U' R' F R F'", difficulty: 'medium', description: 'Knight move pattern.' },
    { id: 'coll34', name: 'Knight 2', algo: "R' F2 R U2 R U2 R' F2 U' R U' R'", difficulty: 'medium', description: 'Knight mirror.' },
    { id: 'coll35', name: 'Awkward 1', algo: "R U R' U R U2 R'", difficulty: 'medium', description: 'Awkward shape.' },
    { id: 'coll36', name: 'Awkward 2', algo: "R' U' R U' R' U2 R", difficulty: 'medium', description: 'Awkward mirror.' },
    { id: 'coll37', name: 'Fish 1', algo: "r' F2 r U2 R U' r' F M'", difficulty: 'medium', description: 'Fish shape.' },
    { id: 'coll38', name: 'Fish 2', algo: "U2 R2 D R' U R D' R' U R' U' R U' R'", difficulty: 'medium', description: 'Fish mirror.' },
    { id: 'coll39', name: 'No Corners 1', algo: "R U2 R2 U' R2 U' R2 U2 R", difficulty: 'hard', description: 'No corners oriented.' },
    { id: 'coll40', name: 'No Corners 2', algo: "R' U2 R2 U R2 U R2 U2 R'", difficulty: 'hard', description: 'No corners oriented mirror.' },
  ],
};

/**
 * ZBLL Subset Sample Algorithms (representative)
 */
export const ZBLL_SAMPLES = {
  tSet: [
    { id: 'zbll1', name: 'TUL (T U Left)', algo: "R U R' U' R' F R2 U' R' U' R U R' F'", difficulty: 'hard', description: 'T-set, UL edge, left block.' },
    { id: 'zbll2', name: 'TUR (T U Right)', algo: "R U2 R' r' F2 r U' R U' R' U' r' F r", difficulty: 'hard', description: 'T-set, UR edge, right block.' },
    { id: 'zbll3', name: 'TFR (T F Right)', algo: "R U R' U' R' F R2 U' R' U' R U R' F'", difficulty: 'hard', description: 'T-set, FR edge.' },
    { id: 'zbll4', name: 'TFL (T F Left)', algo: "R' U R U2 r' R' F R F' r", difficulty: 'hard', description: 'T-set, FL edge.' },
  ],
  uSet: [
    { id: 'zbll5', name: 'UUL', algo: "R U R' U' R' F R F'", difficulty: 'hard', description: 'U-set, UL edge.' },
    { id: 'zbll6', name: 'UUR', algo: "R' F R U' R' U' R U R' F' R U R' U' R' F R F' R", difficulty: 'hard', description: 'U-set, UR edge.' },
  ],
  lSet: [
    { id: 'zbll7', name: 'LUL', algo: "F R U R' U' F'", difficulty: 'hard', description: 'L-set, UL edge.' },
    { id: 'zbll8', name: 'LUR', algo: "U2 R U2 R2 D' R U' R' D R2 U' R'", difficulty: 'hard', description: 'L-set, UR edge.' },
  ],
  piSet: [
    { id: 'zbll9', name: 'PiUL', algo: "R U2 R2 U' R2 U' R2 U2 R", difficulty: 'hard', description: 'Pi-set, UL edge.' },
    { id: 'zbll10', name: 'PiUR', algo: "R' U2 R2 U R2 U R2 U2 R'", difficulty: 'hard', description: 'Pi-set, UR edge.' },
  ],
  hSet: [
    { id: 'zbll11', name: 'H1', algo: "M2 U M2 U2 M2 U M2", difficulty: 'hard', description: 'H-set. Pure M-slice. Very fast.' },
    { id: 'zbll12', name: 'H2', algo: "R U2 R' U' R U R' U' R U' R'", difficulty: 'hard', description: 'H-set variation.' },
  ],
  suneSet: [
    { id: 'zbll13', name: 'Sune 1', algo: "R U R' U R U2 R'", difficulty: 'hard', description: 'Sune ZBLL. Edges permuted.' },
    { id: 'zbll14', name: 'Anti-Sune 1', algo: "R U2 R' U' R U' R'", difficulty: 'hard', description: 'Anti-Sune ZBLL.' },
  ],
};

/**
 * Get all pro algorithms flat
 */
export function getAllProAlgorithms() {
  const all = [];

  Object.entries(FINGER_TRICKS).forEach(([cat, cases]) => {
    cases.forEach(c => all.push({ ...c, category: `FT-${cat}`, type: 'FingerTricks' }));
  });

  Object.entries(OH_TECHNIQUES).forEach(([cat, cases]) => {
    cases.forEach(c => all.push({ ...c, category: `OH-${cat}`, type: 'OneHanded' }));
  });

  Object.entries(BLD_METHODS).forEach(([cat, cases]) => {
    cases.forEach(c => all.push({ ...c, category: `BLD-${cat}`, type: 'Blindfolded' }));
  });

  Object.entries(COLL_CASES).forEach(([cat, cases]) => {
    cases.forEach(c => all.push({ ...c, category: `COLL-${cat}`, type: 'COLL' }));
  });

  Object.entries(ZBLL_SAMPLES).forEach(([cat, cases]) => {
    cases.forEach(c => all.push({ ...c, category: `ZBLL-${cat}`, type: 'ZBLL' }));
  });

  return all;
}