'use strict';
const $=id=>document.getElementById(id),media=matchMedia('(prefers-color-scheme: dark)');
const ids=['capacity','pressure','flow','reserve','full'];let touched=new Set(),timer;
let pref='auto';try{
const saved=JSON.parse(localStorage.getItem('oxytime-v6-settings')||'null');
const legacy=JSON.parse(localStorage.getItem('oxytime-v5-settings')||'null');
pref=localStorage.getItem('oxytime-v6-theme')||saved?.theme||legacy?.theme||'auto';
if(saved){const full=OxyTime.parsePressure(saved.full),reserve=OxyTime.parsePressure(saved.reserve);if(Number.isFinite(full)&&full>0&&Number.isFinite(reserve)&&reserve>=0&&reserve<full){$('full').value=String(full);$('reserve').value=String(reserve);}}
}catch{}
function persistSettings(){try{const full=OxyTime.parsePressure($('full').value),reserve=OxyTime.parsePressure($('reserve').value);if(Number.isFinite(full)&&full>0&&Number.isFinite(reserve)&&reserve>=0&&reserve<full)localStorage.setItem('oxytime-v6-settings',JSON.stringify({theme:$('theme').value,full:String(full),reserve:String(reserve)}));}catch{}}
if(!['auto','light','dark'].includes(pref))pref='auto';$('theme').value=pref;
function theme(){document.documentElement.dataset.theme=$('theme').value==='auto'?(media.matches?'dark':'light'):$('theme').value;}
theme();media.addEventListener('change',theme);$('theme').onchange=()=>{theme();try{localStorage.setItem('oxytime-v6-theme',$('theme').value);persistSettings();}catch{}};
function route(){const calc=location.hash==='#calculadora';$('welcome').hidden=calc;$('calculator').hidden=!calc;document.title=calc?'Calculadora · OxyTime V6':'OxyTime V6';}
window.addEventListener('hashchange',route);route();$('start').onclick=()=>{location.hash='calculadora';setTimeout(()=>$('pressure').focus(),0);};
function render(){
const v={capacity:OxyTime.parse($('capacity').value),pressure:OxyTime.parsePressure($('pressure').value),flow:OxyTime.parse($('flow').value),reserve:OxyTime.parsePressure($('reserve').value),nominal:OxyTime.parsePressure($('full').value)};
const r=OxyTime.calculate(v),errors=r.errors,labels={capacity:'Capacidad',pressure:'Presión actual',flow:'Flujo',reserve:'Reserva',nominal:'Presión nominal'};
const messages=[];for(const k of Object.keys(labels)){const id=k==='nominal'?'full':k;const show=errors[k]&&(touched.has(id)||$(id).value.trim()!=='');$(id).setAttribute('aria-invalid',show?'true':'false');$(id).setAttribute('aria-describedby','error');if(show)messages.push(labels[k]+': '+errors[k]);}
$('error').textContent=messages.join(' ');const valid=Object.keys(errors).length===0;$('results').hidden=!valid;$('empty').hidden=valid;if(!valid)return;
$('safe').textContent=OxyTime.duration(r.safe);$('zero').textContent=OxyTime.duration(r.zero);
$('safeDays').textContent='';$('zeroDays').textContent='';
$('reserveNote').textContent=v.pressure<=v.reserve?'La presión ya está en la reserva o por debajo de ella.':'Con reserva de '+v.reserve.toLocaleString('es')+' PSI.';
$('reserveNote').classList.toggle('warning',v.pressure<=v.reserve);
$('assumptions').textContent=v.capacity+' PC · '+v.pressure+' PSI actuales · '+v.nominal+' PSI nominales · '+v.flow+' L/min continuos. Capacidades provisionales.';
}
ids.forEach(id=>$(id).addEventListener('input',()=>{touched.add(id);clearTimeout(timer);persistSettings();render();}));
$('form').onsubmit=e=>{e.preventDefault();ids.forEach(id=>touched.add(id));render();};
$('reset').onclick=()=>{clearTimeout(timer);$('pressure').value='';$('flow').value='';touched=new Set();render();$('pressure').focus();};render();
if('serviceWorker' in navigator&&location.protocol!=='file:'){
let firstController=!!navigator.serviceWorker.controller,reloaded=false;
navigator.serviceWorker.addEventListener('controllerchange',()=>{if(firstController&&!reloaded){reloaded=true;location.reload();}firstController=true;});
navigator.serviceWorker.addEventListener('message',e=>{if(e.data?.type==='OXYTIME_READY')$('offline').textContent='Lista para usar sin conexión en este dispositivo.';});
navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).then(async reg=>{
const check=async()=>{const cache=await caches.open('oxytime-v6-1-'+reg.scope);if(await cache.match(new URL('./index.html?v=6.1',reg.scope).href))$('offline').textContent='Lista para usar sin conexión en este dispositivo.';};
await navigator.serviceWorker.ready;await check();const watch=worker=>{if(worker)worker.addEventListener('statechange',()=>{if(worker.state==='activated')check().catch(()=>{});});};
watch(reg.installing);reg.addEventListener('updatefound',()=>watch(reg.installing));reg.update().catch(()=>{});
}).catch(()=>{$('offline').textContent='No se pudo preparar el modo offline. Recarga con conexión.';});
}else $('offline').textContent='Offline requiere HTTPS o localhost.';
let installEvent;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvent=e;$('install').hidden=false;});$('install').onclick=async()=>{if(installEvent){await installEvent.prompt();installEvent=null;$('install').hidden=true;}};window.addEventListener('appinstalled',()=>{$('install').hidden=true;});
