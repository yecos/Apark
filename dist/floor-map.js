'use strict';
// Coordinates measured on the approved 2048 × 1365 facade, at each balcony slab.
// Floor 1 is the street entrance; floor 18 contains the three circular windows.
const APARK_FLOOR_EDGES = Object.freeze([
  1280, 1206, 1130, 1070, 1008, 949, 887, 828, 769,
  712, 638, 577, 515, 454, 386, 313, 249, 181, 117
]);
const APARK_LEVELS = Object.freeze([
  ...APARK_FLOOR_EDGES.slice(1).map((top, index) => Object.freeze({
    id: index + 1,
    label: `Piso ${String(index + 1).padStart(2, '0')}`,
    kind: 'floor',
    x: 844, y: top, width: 194,
    height: APARK_FLOOR_EDGES[index] - top
  })),
  Object.freeze({
    id: 19, label: 'Rooftop', kind: 'rooftop',
    x: 846, y: 45, width: 190, height: 72,
    points: '846,117 846,67 899,67 899,45 951,45 951,67 1036,67 1036,117'
  })
]);
