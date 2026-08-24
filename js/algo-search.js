/**
 * Cube Master — Algorithm Search
 * Live search across all rendered F2L/OLL/PLL algorithm cards.
 * Filters cards by name, algorithm text, difficulty, and description;
 * hides non-matching sections and shows a result count.
 */

import { getAllAlgorithms } from './advanced-data.js';

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('algo-search');
  const countEl = document.getElementById('algo-search-count');
  if (!input) return;

  // Index every algo card present on the page (rendered by advanced-cube.js).
  // The haystack is rebuilt live on each filter pass so it always reflects
  // the current UI language (see i18n.js).
  const cards = Array.from(document.querySelectorAll('.algo-card'));
  const index = cards.map((card) => ({ card }));

  function buildHaystack(card) {
    const type = card.dataset.algoType || '';
    const name = card.querySelector('.algo-card__title')?.textContent.trim() || '';
    const notation = card.querySelector('.algo-card__notation')?.textContent.trim() || '';
    const description = card.querySelector('.algo-card__description')?.textContent.trim() || '';
    const difficulty = card.dataset.difficulty || card.querySelector('.badge')?.textContent.trim() || '';
    return `${type} ${name} ${notation} ${description} ${difficulty}`.toLowerCase();
  }

  // Sections to collapse when they have no visible cards
  const sections = Array.from(document.querySelectorAll('[id$="-grid"]'));

  function applyFilter(rawQuery) {
    const q = rawQuery.trim().toLowerCase();
    let visible = 0;

    for (const entry of index) {
      const match = !q || buildHaystack(entry.card).includes(q);
      entry.card.style.display = match ? '' : 'none';
      if (match) visible++;
    }

    // Hide grids (and their section headers up to the <section>) with zero matches
    for (const grid of sections) {
      const anyVisible = Array.from(grid.querySelectorAll('.algo-card'))
        .some((c) => c.style.display !== 'none');
      grid.style.display = anyVisible ? '' : 'none';
    }

    // While searching, jump to the tab containing the first match so
    // results inside inactive tab panels are actually visible.
    if (q) {
      const first = index.find((e) => e.card.style.display !== 'none');
      const panel = first && first.card.closest('.tab-panel');
      if (panel && !panel.classList.contains('tab-panel--active')) {
        document.querySelector(`[role="tab"][aria-controls="${panel.id}"]`)?.click();
      }
    }

    if (countEl) {
      countEl.textContent = q ? `${visible} result${visible === 1 ? '' : 's'} for "${rawQuery.trim()}"` : '';
    }
  }

  input.addEventListener('input', () => applyFilter(input.value));

  // Escape clears
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = '';
      applyFilter('');
    }
  });

  // Expose for console/debug and future cross-page search page
  window.__algoSearch = { applyFilter, getAllAlgorithms };
});
