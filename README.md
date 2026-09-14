# Mapeo — Carretera Puerto Peñasco · Sonoyta

App web instalable (PWA) con el mapa de los 13 puntos georreferenciados. Al tocar un punto se abre una tarjeta sobre la ubicación con foto, nombre y descripción, editable desde ahí mismo. Todo lo que se captura se guarda en el dispositivo y la app funciona sin conexión una vez abierta.

## Publicar en Vercel

1. **GitHub.** Cree un repositorio nuevo (puede ser privado) y suba estos archivos: en la página del repositorio, *Add file → Upload files*, arrastre todo el contenido de esta carpeta y confirme (*Commit changes*).
2. **Vercel.** Entre a vercel.com con su cuenta de GitHub → *Add New → Project* → elija el repositorio → *Deploy*. No hay que configurar nada: es un sitio estático.
3. Vercel le da una dirección del tipo `mapeo-xxxx.vercel.app`.

## Instalar en el iPhone

1. Abra esa dirección en **Safari** (tiene que ser Safari, no Chrome).
2. Toque **Compartir** → **Añadir a pantalla de inicio**.
3. Aparece el ícono *Mapeo*. Se abre a pantalla completa como cualquier app.

En Android: abrir en Chrome → menú ⋮ → *Instalar aplicación*.

## Uso

- Toque un marcador para ver su tarjeta; **Editar** para capturar nombre, descripción y foto. Los puntos con foto se muestran en verde.
- Los cambios (nombre, observaciones, fotos) se guardan en la **base compartida** (Firebase Firestore, proyecto `mapeo-37501`): todos los dispositivos ven lo mismo. Si no hay señal, se guardan en el teléfono y se suben al reconectar. **Respaldo** descarga un `.json`; **Importar** lo sube a la base.
- **Satélite** cambia la vista. Los mosaicos que ya se vieron quedan guardados para consultarlos sin señal.

## Actualizar los puntos base

Edite el bloque `<script id="datos">` en `index.html` y suba el cambio a GitHub; Vercel vuelve a publicar automáticamente. Lo capturado en cada dispositivo se conserva.
