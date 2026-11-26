# APARK · Explorador arquitectónico

Experiencia interactiva de NEXO Studio sobre el render aprobado del proyecto APARK.

## Funciones

- Selección directa de niveles en la fachada y mediante la lista lateral.
- Acercamientos animados, recorrido automático y vista general.
- Detalle de fachada, planta e interiores por nivel.
- Configuración del nombre, niveles y límites de la selección.
- Carga de imágenes JPG, PNG y WebP de hasta 15 MB por archivo.
- Diseño adaptable, navegación con teclado y movimiento reducido.

## Desarrollo

Sitio estático sin dependencias. Para comprobar los archivos:

```sh
npm run check
```

Para servirlo localmente:

```sh
python -m http.server 8080 --directory dist
```

## Vercel

Importar `yecos/Apark`, usar la raíz del repositorio y el directorio de salida `dist`. La configuración está en `vercel.json`. La rama de producción es `main`.

## Información por confirmar

La selección inicial usa **18 niveles visuales de referencia y planta baja**; debe ajustarse con los planos y la numeración reales. No se incluyen precios, áreas, unidades o disponibilidad inventados.

Las transiciones actuales son acercamientos sobre una imagen 2D. La rotación 3D del referente requiere un modelo del proyecto; las plantas e interiores se agregan con archivos reales.

## Datos locales

`Mi proyecto` guarda los ajustes en localStorage y las imágenes en IndexedDB del navegador. No se sincronizan entre visitantes, dispositivos ni dominios. Las imágenes cargadas por este panel no forman parte del repositorio ni del despliegue.
