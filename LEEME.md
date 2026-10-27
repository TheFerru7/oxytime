# OxyTime V6 · GitHub Pages

Entrega: 26 de octubre de 2026. Archivos estáticos, sin instalación de paquetes, fuentes externas, analítica ni servidor de aplicación. No se ha publicado ni modificado ningún repositorio.

## Publicar reemplazando V5

1. En GitHub entra únicamente en **TheFerru7/oxytime**. Descarga una copia de V5 o anota su último commit para poder restaurarlo.
2. Revisa Settings → Pages y confirma qué rama y carpeta usa la versión actual. Si es `main` y `/ (root)`, coloca el contenido de este ZIP directamente en la raíz de `main`. Si Pages usa `/docs`, coloca el contenido en `/docs`. No agregues una carpeta contenedora OxyTime-V6.
3. Usa Add file → Upload files y sube los archivos extraídos, incluida la carpeta `icons`. GitHub no descomprime un ZIP subido. Deben quedar `index.html`, `styles.css`, `core.js`, `app.js`, `manifest.webmanifest`, `service-worker.js`, `.nojekyll`, `icons/` y esta guía en la carpeta publicada. Confirma que los archivos existentes se reemplazan y no se duplican en otra carpeta.
4. Conserva cualquier configuración existente de publicación, dominio, CNAME y archivos ajenos a OxyTime. Si ya existe un flujo de Actions para Pages, conserva su mecanismo y reemplaza solo los archivos de su carpeta de origen. No cambies a otro mecanismo de despliegue sin revisar esa configuración.
5. Guarda un commit, espera el despliegue de Pages y abre **https://theferru7.github.io/oxytime/**. La cabecera debe indicar V6. No necesitas cambiar el repositorio ni los archivos de Gasometría Pro.

### Actualización de instalaciones V5

La implementación y el nombre del service worker anterior no estuvieron disponibles. Por ello, la migración automática desde cualquier V5 no puede garantizarse. El nuevo worker usa alcance relativo a `/oxytime/` y no borra cachés de otras aplicaciones. Solo limpia sus propias versiones de caché V6.

Tras publicar, abre OxyTime con internet, cierra sus ventanas y vuelve a abrirlo. Si aún ves V5, prueba una recarga completa. Si persiste, en las herramientas del navegador → Application/Aplicación → Service Workers, elimina **solo** el registro cuyo alcance sea `https://theferru7.github.io/oxytime/` y recarga esa dirección con internet. No uses «Borrar todos los datos del sitio», «Eliminar todos los service workers» ni limpies todo `theferru7.github.io`: podría afectar Gasometría Pro. En iPhone, quitar el acceso de OxyTime y volver a añadirlo puede ayudar, pero no garantiza limpiar el registro anterior. No borres datos globales de Safari.

Las actualizaciones V6 usan un nombre de caché versionado; para futuras modificaciones cambia `CACHE` en `service-worker.js`. El worker nuevo toma el control y recarga la página para evitar mezclar los recursos de dos versiones. Haz las actualizaciones fuera de un cálculo activo.

## Instalar y comprobar offline

- Android: abre la URL en Chrome con internet y espera **Lista sin conexión**; menú → Instalar aplicación/Añadir a pantalla de inicio (la etiqueta depende del navegador).
- iPhone: abre la URL en Safari con internet; Compartir → Añadir a pantalla de inicio. Abre también la instalación y espera **Lista sin conexión**.
- En ambos: cierra la app, activa modo avión, ábrela de nuevo y realiza el ejemplo de abajo. Comprueba también la recarga sin conexión. La primera carga requiere internet y HTTPS; abrir `index.html` mediante `file://` no instala el servicio offline.
- El sistema puede eliminar almacenamiento web, especialmente si hay poco espacio. Después de una limpieza de datos o reinstalación, abre con internet otra vez. La app no guarda presiones ni flujos; solo intenta conservar el tema.

## Fórmula y supuesto provisional

Se interpreta PC como pies cúbicos de **gas disponible nominal**, no volumen interno de agua del cilindro. Se supone provisionalmente que 60, 220, 300 y 370 PC corresponden a la presión nominal configurada (2000 PSI inicialmente). **Falta confirmar esa relación con la ficha técnica de cada cilindro/proveedor.** No se han certificado esas capacidades para tu equipo.

`Vnominal (L) = PC × 28,316846592`

`k (L/PSI) = Vnominal / Pnominal`

`t_reserva (min) = k × max(Pactual − Preserva, 0) / flujo`

`t_cero (min) = k × Pactual / flujo`

Presiones manométricas en PSI; flujo en L/min. Se aproxima contenido proporcional a presión manométrica a temperatura constante. No se agrega presión atmosférica a esta aproximación práctica de contenido útil hasta cero manométrico. No modela compresibilidad real, cambios térmicos, fugas ni presión mínima de trabajo del regulador. Cero teórico no significa suministro clínicamente utilizable hasta el final.

La conversión de PC a litros es verificable. La duración como contenido dividido entre flujo coincide con la referencia de NWTS. La corrección por fracción de presión es una aproximación de ingeniería; su aplicación a estas cuatro etiquetas sigue pendiente de datos del proveedor. No debe interpretarse como validación clínica del producto.

Fuentes:
- NIST, conversión exacta de ft³ a L: https://www.nist.gov/document/1020-2-labeling-guides-volumepdf
- North West & North Wales Paediatric Transport Service, contenido/flujo: https://www.nwts.nhs.uk/_file/pN0hvQGnbr_306184.pdf

### Ejemplo reproducible

60 PC, presión actual 1500 PSI, nominal 2000 PSI, reserva 200 PSI, flujo 5 L/min:

- Contenido nominal: 1699,01079552 L.
- Factor: 0,84950539776 L/PSI.
- Por encima de reserva: 1104,357017088 L.
- Hasta reserva: 220,8714034176 min → **3 h 40 min**.
- Hasta cero: 254,851619328 min → **4 h 14 min**.

Los minutos completos se redondean hacia abajo. Entre 0 y 1 minuto aparece `<1 min`; cero exacto aparece `0 min`. Desde 1440 minutos se muestran días, horas y minutos; antes de 24 h no aparecen días.

## Comportamiento y validación

Dos pantallas: bienvenida y calculadora. La presión actual se escribe manualmente sin botones de acceso rápido. Presión nominal 2000 PSI y reserva 200 PSI editables. Flujo obligatorio mayor que cero. Se aceptan decimales con punto o coma, sin separador de miles. Se bloquean entradas vacías/no numéricas, valores no finitos, negativos, presión superior a nominal, reserva mayor o igual a nominal y resultados fuera de rango.

La presión actual igual o menor a reserva es válida: muestra cero hasta reserva y un aviso. El resultado desaparece al invalidar una entrada. «Nuevo cálculo» borra presión actual y flujo, conservando cilindro, nominal, reserva y tema de la sesión. Nominal/reserva están dentro de un panel desplegable. Tema claro, oscuro y automático; automático sigue al sistema.

## Revisión de V5 y alcance de las pruebas

El historial recuperado no contenía capturas, adjuntos ni código V5; solo referencias a mensajes sin su contenido. No fue posible confirmar cuáles eran las inconsistencias visuales señaladas. V6 usa etiquetas y unidades uniformes, reserva como resultado principal, cero teórico secundario, aviso provisional visible, controles con foco, disposición de una columna bajo 650 px y temas con colores definidos para todos los paneles.

Pruebas realizadas: comprobación de sintaxis de los tres archivos JavaScript; 13 grupos de pruebas automatizadas de fórmula, cuatro capacidades, reserva, cambio de nominal, decimales, entradas inválidas, umbral de 24 h, desbordamiento y worker en entorno simulado (precaché completo, navegación offline y aislamiento de Gasometría). Ver PRUEBAS.txt para resultados y comprobaciones de navegador.

Pendientes de aceptación: comparación visual con las capturas V5 no disponibles; prueba en dispositivos Android/iPhone reales; migración desde el service worker V5 real; confirmación de capacidades/presión nominal del proveedor. El diseño adaptable y los iconos están implementados; no se afirma certificación de compatibilidad con todas las versiones de los sistemas móviles.

## Revertir

Si hay un problema, restaura el commit de V5 en **oxytime**, espera el despliegue y actualiza solo el registro offline de OxyTime. No cambies Gasometría Pro ni limpies el almacenamiento compartido del dominio.
