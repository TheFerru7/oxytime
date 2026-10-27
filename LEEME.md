# OxyTime V6 — corrección conservando V5
Paquete preparado para revisión; no publicado.

## Qué se comprobó en la web publicada
Se abrió https://theferru7.github.io/oxytime/ y se observó el contenido HTML V6 con CSS V5: fondo #f2f6fb, sin reglas para welcome-card y sin el límite de ancho de la nueva bienvenida. La consola mostró TypeError: Cannot set properties of null (setting 'value') en app.js. El app.js V5 usa el campo full, que el HTML V6 anterior había reemplazado por nominal. La mezcla impide inicializar correctamente la app. El worker V5 recuperado usa caché primero para los recursos y red primero para la navegación, lo que explica esa mezcla.

Además de ese fallo, la entrega anterior sustituyó el diseño original: se perdió el logo del cilindro con reloj y se cambiaron bienvenida, colores y paneles. Esta corrección toma el HTML, CSS, SVG y PNG originales del commit 243705e de TheFerru7/oxytime. Conserva la bienvenida centrada «El tiempo de tu oxígeno, más claro», el logo original y el estilo azul de V5.

## Funciones mantenidas
60/220/300/370 PC; presión manual sin botones rápidos; nominal 2000 PSI y reserva 200 PSI editables; flujo continuo; ambos tiempos automáticos; días solo desde 24 h; nuevo cálculo; temas claro/oscuro/automático; validación; recursos offline y guía de instalación. Se conservan los formatos PSI de V5 (2000, 2 000, 2,000) y el guardado local de tema, reserva y presión nominal; no se guardan presión actual ni flujo. Al migrar, se conserva el tema V5, pero el valor nominal inicial pasa a 2000 PSI como fue aprobado.

El cálculo conserva el motor ya probado: contenido nominal L = PC × 28,316846592; factor L/PSI = contenido nominal / presión nominal; minutos a reserva = factor × máx(actual − reserva, 0) / flujo; cero teórico = factor × actual / flujo. Las capacidades y su correspondencia con la presión nominal siguen siendo provisionales, pendientes de ficha técnica. Es un modelo proporcional, no validación clínica.

Fuentes: https://www.nist.gov/document/1020-2-labeling-guides-volumepdf y https://www.nwts.nhs.uk/_file/pN0hvQGnbr_306184.pdf

## Cómo resuelve la mezcla de versiones
El HTML usa oxytime-v6-1.css, oxytime-v6-1-core.js y oxytime-v6-1-app.js. Esos nombres no coinciden con los recursos guardados por V5. sw.js y service-worker.js contienen el mismo worker para actualizar cualquiera de las dos rutas previas de OxyTime. El nuevo worker limita todas sus rutas a su carpeta y solo elimina cachés identificadas de OxyTime, conservando las de Gasometría. Nunca borres todos los datos del dominio.

## Subida, cuando se decida usar esta corrección
En TheFerru7/oxytime → main → Add file → Upload files, subir todo el contenido extraído de este ZIP, incluida icons, directamente en la raíz. Reemplazar los archivos del mismo nombre, en especial index.html, sw.js y service-worker.js. No subir una carpeta contenedora. Confirmar el commit y esperar Pages. No se requiere modificar Gasometría Pro.

Abrir OxyTime con internet, cerrar ventanas antiguas y abrir de nuevo. Esperar «Lista para usar sin conexión». Si una instalación antigua no se actualiza, actualizar exclusivamente el registro con alcance /oxytime/; no limpiar todo theferru7.github.io.

## Verificación y límites
28 grupos de comprobaciones automatizadas aprobados: cálculo, cuatro capacidades, reserva, nominal, inválidos, decimales y umbral 24 h, coincidencia de campos HTML/JS, nombres nuevos de recursos, conservación literal de logo y CSS V5, precaché, limpieza aislada, navegación offline simulada y ambas rutas del worker. Incluye 14 grupos adicionales de interacción con DOM simulado: navegación, cálculo automático inmediato, retirada de resultados inválidos, cambio de nominal, reserva, días, tres temas, nuevo cálculo, persistencia y migración del tema V5, almacenamiento sin presión/flujo y formatos PSI. Sintaxis JS verificada.

Se inspeccionó la página pública defectuosa en navegador real. No se pudo abrir la vista local del paquete corregido: la configuración de permisos rechazó iniciar el servidor con el acceso necesario y la herramienta de navegador bloqueó direcciones file://. No se afirma revisión visual de esta corrección ni prueba de migración en navegador real. Pendientes: vista de escritorio/móvil de la corrección, instalación y modo avión Android/iPhone, y ficha técnica de cilindros. El paquete no se publicó automáticamente.
