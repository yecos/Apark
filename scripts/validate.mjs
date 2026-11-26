import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=process.cwd(),html=fs.readFileSync('dist/index.html','utf8'),js=fs.readFileSync('dist/app.js','utf8'),css=fs.readFileSync('dist/style.css','utf8');
new vm.Script(js);
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
if(new Set(ids).size!==ids.length)throw Error('Duplicate HTML IDs');
const queries=[...js.matchAll(/\$\('#([\w-]+)'\)/g)].map(m=>m[1]);
for(const id of queries)if(!ids.includes(id))throw Error('Missing element '+id);
for(const [,file]of html.matchAll(/(?:src|href)="([^"#]+)"/g)){if(!file.startsWith('http')&&!fs.existsSync(path.join(root,'dist',file)))throw Error('Missing asset '+file)}
if(!css.includes('prefers-reduced-motion'))throw Error('Missing reduced motion support');
if(!html.includes('<html lang="es">'))throw Error('Missing Spanish document language');
const mapSource=fs.readFileSync('dist/floor-map.js','utf8');
new vm.Script(mapSource);
const levels=vm.runInNewContext(mapSource+';APARK_LEVELS');
const floors=levels.filter(level=>level.kind==='floor'),rooftop=levels.find(level=>level.kind==='rooftop');
if(floors.length!==18||levels.length!==19)throw Error('Expected 18 floors and a separate rooftop');
if(floors[0].id!==1||floors[0].y!==1183||floors[0].y+floors[0].height!==1254)throw Error('Floor 1 must cover the street entrance');
if(floors[17].y!==117||floors[17].y+floors[17].height!==181)throw Error('Floor 18 must cover all three circular windows');
for(let i=1;i<floors.length;i++)if(floors[i].y+floors[i].height!==floors[i-1].y)throw Error('Gap or overlap at floor '+floors[i].id);
if(!rooftop?.points||rooftop.y!==45||rooftop.y+rooftop.height!==117)throw Error('Rooftop must follow the stepped roof silhouette');
for(const level of levels)if(level.width<190||level.height<=0)throw Error('Incomplete floor coverage');
if(html.indexOf('src="floor-map.js"')>html.indexOf('src="app.js"'))throw Error('Floor geometry must load before the app');
if([html,js,css,mapSource].some(source=>source.includes('\uFFFD')))throw Error('Invalid source text encoding');
const cameraSource=fs.readFileSync('dist/camera-fit.js','utf8');
new vm.Script(cameraSource);
const fitCamera=vm.runInNewContext(mapSource+';'+cameraSource+';aparkExplorationCamera');
for(const [width,height]of [[1920,1080],[1440,900],[1280,720],[900,700],[656,878],[390,844],[360,640]]){
  const camera=fitCamera(width,height);
  const safeBottom=height-(width<=640?330:width<=900?190:110);
  for(const level of levels){
    const left=level.x*camera.scale+camera.x,right=left+level.width*camera.scale;
    const top=level.y*camera.scale+camera.y,bottom=top+level.height*camera.scale;
    if(left<0||right>width||top<99.99||bottom>safeBottom+.01)throw Error(`Unreachable ${level.label} at ${width}x${height}`);
  }
}
console.log(JSON.stringify({syntax:'passed',uniqueIds:ids.length,elementReferences:'passed',assets:'passed',floorSegmentation:'passed',accessibilityBasics:'passed'}));

const overview=vm.runInNewContext(mapSource+';'+cameraSource+';aparkOverviewCamera');
for(const [width,height]of [[1280,720],[1920,1080],[1440,900],[1600,1200],[2560,1080],[3440,1440]]){
  const camera=overview(width,height),sceneWidth=3180*camera.scale,sceneHeight=1365*camera.scale;
  if(camera.x>0.01||camera.y>0.01||camera.x+sceneWidth<width-.01||camera.y+sceneHeight<height-.01)throw Error('Panorama leaves empty viewport borders');
  for(const level of levels){
    const top=level.y*camera.scale+camera.y,bottom=top+level.height*camera.scale;
    const left=level.x*camera.scale+camera.x,right=left+level.width*camera.scale;
    if(top<0||bottom>height||left<0||right>width)throw Error(`Initial view crops ${level.label} at ${width}x${height}`);
  }
}
console.log('Initial panorama: full viewport coverage and complete tower verified.');
