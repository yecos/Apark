'use strict';
function aparkExplorationCamera(width, height) {
  const top = 100;
  const bottom = height - (width <= 640 ? 330 : width <= 900 ? 190 : 110);
  const scale = Math.max(0.1, (bottom - top) / (1280 - 45));
  const towerCenter = width * (width <= 640 ? 0.34 : width <= 900 ? 0.35 : 0.43);
  return {
    scale,
    x: towerCenter - (844 + 194 / 2) * scale,
    y: top - 45 * scale
  };
}
