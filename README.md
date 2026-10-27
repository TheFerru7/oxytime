# OxyTime V5 — GitHub Pages

Paquete estático sin dependencias, cuentas, analítica ni datos de pacientes. Solo se guardan tema, reserva y presión nominal en el navegador. Presión y flujo no se guardan.

## Publicar en TheFerru7/oxytime
1. Descomprime OxyTime-V5.zip.
2. Abre https://github.com/TheFerru7/oxytime y selecciona Add file → Upload files.
3. Sube el CONTENIDO descomprimido, incluidas las carpetas icons y el archivo .nojekyll. index.html debe quedar en la raíz del repositorio, no dentro de otra carpeta. No subas el ZIP como aplicación. Confirma los cambios en main.
4. Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main → /(root) → Save.
5. Espera a que termine el despliegue. URL esperada: https://theferru7.github.io/oxytime/ (no publicada por este paquete).

Guía oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Instalar y usar sin conexión
Abre la URL HTTPS con conexión y espera “Lista para usar sin conexión”. Después puedes recargar sin red. En Android/Chrome usa Instalar app cuando aparezca o el menú del navegador. En iPhone/iPad: Safari → Compartir → Añadir a pantalla de inicio. La disponibilidad de instalación depende del navegador. Abrir index.html directamente permite calcular, pero no activa el service worker.

## Modelo y límites
PC significa pies cúbicos nominales de gas a la presión de llenado indicada por el fabricante. 1 PC = 28,316846592 L.
Tiempo (min) = PC × 28,316846592 × máx(PSI actual − PSI reserva, 0) / PSI nominal / flujo en L/min.
Hasta cero: misma fórmula con reserva 0. Minutos completos redondeados hacia abajo. Se muestran horas acumuladas/minutos y días/horas/minutos.

Presión nominal inicial 2200 PSI y reserva inicial 200 PSI son supuestos editables, no valores universales ni recomendaciones clínicas. Verifica etiqueta y protocolo local; PC por sí solo no determina la presión nominal. Solo flujo continuo, no pulso. El modelo no considera fugas, temperatura, exactitud del manómetro o regulador.
Referencia de contexto sobre presión y duración: https://oxygen.crto.on.ca/oxygen-a-brief-review/

**Aproximación clínica no validada.** No sustituye evaluación profesional ni protocolos. No planifiques uso hasta cero PSI. Mantén respaldo y verifica físicamente el suministro.

## Formatos
PSI: 2000, 2 000 o 2,000; decimales PSI: 2000.5 o 2000,5. Comas agrupadas de tres cifras en PSI se interpretan como miles. Flujo: 2.5 o 2,5. Espacios se ignoran. No mezclar punto y coma en flujo; no usar punto para miles en PSI. Campos negativos, vacíos o no numéricos se rechazan.

## Actualizaciones
Al editar archivos, cambia el sufijo de CACHE en sw.js (por ejemplo -1 a -2) para renovar el paquete offline. Cierra y abre la app tras actualizar con conexión.

## Verificación manual tras publicar
Calcula 60 PC / 2200 PSI / 2 L/min / reserva 200: 12 h 52 min hasta reserva y 14 h 9 min hasta cero. Cambia temas, recarga y verifica persistencia. Prueba flujo 2,5 y PSI 2 000. Espera estado offline y recarga en modo avión. Comprueba instalación en tu navegador.
