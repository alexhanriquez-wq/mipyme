# PYMES — Web estática

Página de presentación de PYMES, servicio de diseño de páginas web para comercios, emprendimientos y profesionales de Campo Largo y otras localidades de Chaco.

## Archivos

- `index.html`: contenido y estructura de la página.
- `styles.css`: diseño, colores, componentes y adaptación a móviles.
- `script.js`: menú móvil, año automático y enlaces de WhatsApp.
- `assets/favicon.svg`: icono del sitio.
- `CNAME`: dominio personalizado futuro.

## Antes de publicar: personalizá estos datos

### 1. Número de WhatsApp

Abrí `script.js` y cambiá:

```js
const WHATSAPP_NUMBER = "5490000000000";
```

por tu número real en formato internacional, solo dígitos, sin `+`, espacios ni guiones. Para Argentina suele ser `54` + característica sin `0` + número sin `15`. Verificá el formato correcto de tu línea antes de publicar. El número de ejemplo no es real.

### 2. Dominio

El archivo `CNAME` contiene `pymes.uno`. GitHub Pages requiere que seas propietario o administres ese dominio y que configures los registros DNS. Si todavía no compraste/configuraste el dominio, podés borrar temporalmente `CNAME` y publicar primero en la URL `usuario.github.io/repositorio`.

### 3. Textos, servicios y redes

Revisá `index.html` para ajustar la descripción de la marca, servicios, localidades y textos. Los ejemplos visuales son ilustraciones CSS, no trabajos de clientes reales. No agregues testimonios o casos de éxito hasta tenerlos.

### 4. Tipografía

La web usa Google Fonts para Manrope y DM Sans. Si querés evitar cualquier dependencia externa, eliminá los enlaces de Google Fonts en `index.html`; el sitio usará fuentes de respaldo del sistema.

## Publicar con GitHub Pages

1. Iniciá sesión en GitHub y creá un repositorio, por ejemplo `pymes-web`.
2. Subí `index.html`, `styles.css`, `script.js`, la carpeta `assets` y, si vas a configurar el dominio, `CNAME` a la raíz del repositorio.
3. En el repositorio, entrá a **Settings → Pages**.
4. En **Build and deployment**, seleccioná **Deploy from a branch**.
5. Elegí la rama `main` y la carpeta `/ (root)`, y guardá.
6. Esperá la publicación. GitHub mostrará la URL pública en esa misma sección.

## Conectar `pymes.uno`

- Primero registrá el dominio y abrí la configuración DNS del proveedor.
- En GitHub, en **Settings → Pages → Custom domain**, escribí `pymes.uno` y guardá. Si GitHub modifica el archivo `CNAME`, conservá el valor correcto.
- Configurá los registros DNS que GitHub Pages indica para tu dominio. Para el dominio raíz normalmente se usan registros A/AAAA publicados en la documentación oficial de GitHub Pages; para `www` se usa un CNAME hacia tu usuario o sitio `*.github.io`. Usá los valores actuales de la documentación oficial y no inventes registros.
- Si querés que `www.pymes.uno` también funcione, añadilo en el proveedor DNS según las instrucciones de GitHub.
- Una vez verificado, activá **Enforce HTTPS** en Settings → Pages cuando esté disponible.

La propagación DNS puede tardar. GitHub Pages aloja sitios estáticos; no procesa formularios del lado del servidor ni incluye un sistema de administración de contenido por defecto.

## Prueba local

Podés abrir `index.html` en un navegador para revisar el diseño. Para una prueba local más fiel, ejecutá un servidor estático desde esta carpeta, por ejemplo:

```bash
python3 -m http.server 8000
```

y abrí `http://localhost:8000`.
