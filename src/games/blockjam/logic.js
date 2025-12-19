
export function isInside(level, cell) {
  return cell.row >= 0 && cell.col >= 0 && cell.row < level.rows && cell.col < level.cols;
}
export function tileAt(tiles, cell) {
  return tiles.find(t => t.pos.row === cell.row && t.pos.col === cell.col);
}
export function isGoalReached(tile) {
  return tile.goal && tile.pos.row === tile.goal.row && tile.pos.col === tile.goal.col;
}
export function hasWon(tiles) {
  return tiles.every(t => !t.goal || isGoalReached(t));
}

/**
 * Slide a tile by (dr, dc) if next cell is free/bounded.
 */
export function trySlide(level, tiles, tileId, dr, dc, movesLeft) {
  const idx = tiles.findIndex(t => t.id === tileId);
  if (idx === -1) return { moved: false, newTiles: tiles, win: false, movesLeft };
  const t = tiles[idx];
  if (t.locked) return { moved: false, newTiles: tiles, win: false, movesLeft };

  const next = { row: t.pos.row + dr, col: t.pos.col + dc };
  if (!isInside(level, next)) return { moved: false, newTiles: tiles, win: false, movesLeft };
  if (tileAt(tiles, next)) return { moved: false, newTiles: tiles, win: false, movesLeft };

  const newTiles = tiles.map(x => (x.id === t.id ? { ...x, pos: next } : x));
  const win = hasWon(newTiles);
  return { moved: true, newTiles, win, movesLeft: Math.max(0, movesLeft - 1) };
}
