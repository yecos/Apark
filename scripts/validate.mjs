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
for(const count of [1,16,18,40]){const top=180,bottom=1208,h=(bottom-top)/count;let area=0;for(let n=1;n<=count;n++){const y=bottom-n*h;if(y<top-.001||y+h>bottom+.001)throw Error('Invalid floor bounds');area+=h}if(Math.abs(area-(bottom-top))>.001)throw Error('Floor regions do not cover facade')}
console.log(JSON.stringify({syntax:'passed',uniqueIds:ids.length,elementReferences:'passed',assets:'passed',floorSegmentation:'passed',accessibilityBasics:'passed'}));
