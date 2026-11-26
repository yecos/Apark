'use strict';
function aparkOverviewCamera(width,height){
  const scale=Math.max(width/APARK_SCENE.width,height/APARK_SCENE.height);
  return{scale,x:(width-APARK_SCENE.width*scale)/2,y:(height-APARK_SCENE.height*scale)/2};
}
function aparkExplorationCamera(width, height) {
  const top = 100;
  const bottom = height - (width <= 640 ? 330 : width <= 900 ? 190 : 110);
  const scale = Math.max(0.1, (bottom - top) / (APARK_SCENE.groundBottom - APARK_SCENE.roofTop));
  const towerCenter = width * (width <= 640 ? 0.34 : width <= 900 ? 0.35 : 0.43);
  return {
    scale,
    x: towerCenter - (1372 + 194 / 2) * scale,
    y: top - APARK_SCENE.roofTop * scale
  };
}
