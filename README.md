# APARK � Explorador arquitect�nico

Experiencia interactiva de NEXO Studio sobre el render aprobado del proyecto APARK.

## Funciones

- Selecci�n directa de niveles en la fachada y mediante la lista lateral.
- Acercamientos animados, recorrido autom�tico y vista general.
- Detalle de fachada, planta e interiores por nivel.
- Configuraci�n del nombre, niveles y l�mites de la selecci�n.
- Carga de im�genes JPG, PNG y WebP de hasta 15 MB por archivo.
- Dise�o adaptable, navegaci�n con teclado y movimiento reducido.

## Desarrollo

Sitio est�tico sin dependencias. Para comprobar los archivos:

```sh
npm run check
```

Para servirlo localmente:

```sh
python -m http.server 8080 --directory dist
```

## Vercel

Importar `yecos/Apark`, usar la ra�z del repositorio y el directorio de salida `dist`. La configuraci�n est� en `vercel.json`. La rama de producci�n es `main`.

## Informaci�n por confirmar

La selecci�n inicial usa **18 niveles visuales de referencia y planta baja**; debe ajustarse con los planos y la numeraci�n reales. No se incluyen precios, �reas, unidades o disponibilidad inventados.

Las transiciones actuales son acercamientos sobre una imagen 2D. La rotaci�n 3D del referente requiere un modelo del proyecto; las plantas e interiores se agregan con archivos reales.

## Datos locales

`Mi proyecto` guarda los ajustes en localStorage y las im�genes en IndexedDB del navegador. No se sincronizan entre visitantes, dispositivos ni dominios. Las im�genes cargadas por este panel no forman parte del repositorio ni del despliegue.
