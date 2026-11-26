'use strict';
// Coordinates measured on the panoramic facade in a 3180 x 1365 logical canvas.
const APARK_SCENE = Object.freeze({width:3180,height:1365,roofTop:45,groundBottom:1254});
// Floor 1 is the street entrance; floor 18 contains the three circular windows.
const APARK_FLOOR_EDGES = Object.freeze([
  1254, 1183, 1112, 1052, 991, 927, 866, 815, 759,
  701, 631, 565, 504, 446, 382, 310, 245, 181, 117
]);
const APARK_LEVELS = Object.freeze([
  ...APARK_FLOOR_EDGES.slice(1).map((top, index) => Object.freeze({
    id: index + 1,
    label: `Piso ${String(index + 1).padStart(2, '0')}`,
    kind: 'floor',
    x: 1372, y: top, width: 194,
    height: APARK_FLOOR_EDGES[index] - top
  })),
  Object.freeze({
    id: 19, label: 'Rooftop', kind: 'rooftop',
    x: 1374, y: 45, width: 190, height: 72,
    points: '1374,117 1374,67 1427,67 1427,45 1479,45 1479,67 1564,67 1564,117'
  })
]);
