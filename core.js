/* Pure calculation engine. PC means nominal free-gas cubic feet, provisionally. */
(function(root){'use strict';
const PC_TO_L=28.316846592;
function parse(value){const s=String(value).trim();return /^(?:\d+(?:[.,]\d+)?|[.,]\d+)$/.test(s)?Number(s.replace(',','.')):NaN;}
function calculate(v){const errors={};
if(![60,220,300,370].includes(v.capacity))errors.capacity='Selecciona un cilindro válido.';
if(!Number.isFinite(v.nominal)||v.nominal<=0)errors.nominal='Introduce una presión nominal mayor que 0.';
if(!Number.isFinite(v.pressure)||v.pressure<0)errors.pressure='Introduce una presión actual de 0 o más.';
else if(Number.isFinite(v.nominal)&&v.pressure>v.nominal)errors.pressure='La presión actual no debe superar la nominal. Verifica ambos datos.';
if(!Number.isFinite(v.reserve)||v.reserve<0)errors.reserve='Introduce una reserva de 0 o más.';
else if(Number.isFinite(v.nominal)&&v.reserve>=v.nominal)errors.reserve='La reserva debe ser menor que la presión nominal.';
if(!Number.isFinite(v.flow)||v.flow<=0)errors.flow='Introduce un flujo mayor que 0.';
if(Object.keys(errors).length)return {errors};
const factor=v.capacity*PC_TO_L/v.nominal,liters=factor*Math.max(v.pressure-v.reserve,0),safe=liters/v.flow,zero=factor*v.pressure/v.flow;
if(![factor,liters,safe,zero].every(Number.isFinite)||zero>Number.MAX_SAFE_INTEGER)return {errors:{flow:'La combinación de valores excede el rango de cálculo. Verifica los datos.'}};
return {errors:{},factor,liters,safe,zero};}
function duration(minutes){if(minutes===0)return '0 min';if(minutes<1)return '<1 min';const total=Math.floor(minutes),d=Math.floor(total/1440),h=Math.floor((total%1440)/60),m=total%60;return (minutes>=1440?d+' d '+h+' h ':Math.floor(total/60)>0?Math.floor(total/60)+' h ':'')+m+' min';}
const api={parse,calculate,duration,PC_TO_L};root.OxyTime=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);