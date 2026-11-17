# Investigación: Web Components, HTML Templates y Frameworks

## Parte 1. Investigación: Web Components

1. **¿Qué problema resuelven los Web Components y qué aporta cada tecnología: Custom Elements, Shadow DOM y HTML Templates?**
Resuelven el problema de la reutilización de código y la modularidad nativa en el desarrollo web, evitando conflictos de estilos y lógica entre componentes. Los **Custom Elements** permiten definir etiquetas HTML personalizadas y su comportamiento en JavaScript. El **Shadow DOM** aísla el DOM interno y los estilos CSS del componente para que no interfieran con el documento principal (encapsulamiento). Los **HTML Templates** proveen la estructura en crudo de la plantilla que se clonará y reutilizará múltiples veces sin renderizarse de inmediato.

2. **¿En qué se diferencia un `<template>` de un `<div>` oculto con `display: none`?**
Un `<div>` oculto con `display: none` se encuentra en el DOM principal, por lo que el navegador descarga sus recursos (como imágenes o scripts), los procesa y `document.querySelector` puede encontrarlo y manipularlo inmediatamente. En cambio, un `<template>` no se renderiza en el DOM, sus contenidos están inactivos (no se ejecutan scripts ni se cargan recursos internos automáticamente) y `document.querySelector` dentro de él no devuelve elementos a menos que se clone explícitamente su contenido (`content`).

3. **¿Qué cambia entre el Shadow DOM en modo "open" y en modo "closed"?**
En el modo `"open"`, el Shadow DOM es accesible desde JavaScript externo mediante la propiedad `element.shadowRoot`, permitiendo que scripts de la página externa consulten o manipulen su estructura interna. En el modo `"closed"`, `shadowRoot` devuelve `null` desde el exterior, bloqueando el acceso directo al árbol interno y ofreciendo un encapsulamiento más estricto (aunque la seguridad real en JavaScript es limitada).

4. **¿Qué es un `<slot>` y para qué sirve en un componente reutilizable?**
Un `<slot>` (ranura) es un marcador de posición dentro del Shadow DOM de un componente que permite inyectar contenido HTML definido por el usuario o consumidor desde el exterior. Sirve para crear componentes flexibles y adaptables donde la estructura base es fija pero permite personalizar textos, iconos o notas adicionales en zonas específicas.

5. **¿Qué navegadores soportan hoy los Web Components? Indica la fuente y la fecha de consulta.**
Los Web Components (Custom Elements, Shadow DOM y HTML Templates) cuentan con soporte nativo completo en todos los navegadores modernos (Chrome, Edge, Safari, Firefox, Opera tanto en escritorio como en dispositivos móviles). 
- *Fuente:* MDN Web Directions / Can I use (Custom Elements v1 & Shadow DOM v1).
- *Fecha de consulta:* 17 de noviembre de 2026.

---

## Parte 2. Investigación: frameworks, librerías y Node.js

1. **Explica con un ejemplo la diferencia entre estándar del navegador, librería, framework y entorno de ejecución.**

Usamos como ejemplo la tarjeta de plato de nuestro restaurante, construida de cuatro formas distintas:

- **Estándar del navegador:** es una tecnología que ya viene incluida en el navegador y no se instala. Nuestro componente `<menu-plato>` usa Custom Elements, Shadow DOM y `<template>`, que funcionan solo con abrir `index.html`, igual que `fetch` o `document.querySelector`.
- **Librería:** es un conjunto de herramientas que **nuestro código llama** cuando las necesita, y nosotros decidimos cómo organizar el proyecto. Si hiciéramos la tarjeta con React, escribiríamos una función `MenuPlato` y nosotros le pediríamos a React que la dibuje donde queremos; el resto de la página lo manejamos como queramos.
- **Framework:** es una estructura que **llama a nuestro código** y nos dice dónde va cada cosa. Si usáramos Angular, tendríamos que crear el proyecto con su herramienta, poner la tarjeta en archivos y carpetas con el formato que Angular exige y marcarla con `@Component`; Angular decide cuándo crearla y mostrarla. Esa diferencia de quién controla a quién es lo que separa un framework de una librería.
- **Entorno de ejecución:** es el programa que permite ejecutar JavaScript **fuera del navegador**. No sirve para dibujar la tarjeta, sino para cosas como un servidor que envía la lista de platos del menú o para ejecutar `npm install`. Node.js es un entorno de ejecución, no un framework ni una librería.


2. **Completa la tabla con una o dos frases por celda:**

| Criterio | Web Components nativos | React | Vue | Angular |
| :--- | :--- | :--- | :--- | :--- |
| **Tipo (estándar, librería o framework)** | Estándar del navegador: viene incluido en Chrome, Firefox, Safari y Edge. | Librería para construir interfaces de usuario; solo se encarga de la vista. | Framework progresivo: se puede usar solo en una parte de la página o para una aplicación completa. | Framework completo que define cómo se organiza toda la aplicación. |
| **Cómo se crea un componente** | Con una clase que extiende `HTMLElement` y se registra con `customElements.define()`. | Con una función de JavaScript que devuelve JSX, una sintaxis parecida a HTML dentro de JS. | Con un archivo `.vue` que junta en un solo lugar `<template>`, `<script>` y `<style>`. | Con una clase en TypeScript marcada con el decorador `@Component`, que indica su plantilla y estilos. |
| **Necesita instalar herramientas (npm)** | No. Basta con un archivo HTML y uno JS abiertos en el navegador. | Para proyectos reales sí (npm y una herramienta como Vite), aunque se puede probar con un `<script>` desde un CDN. | Para proyectos reales sí (npm y Vite), pero también funciona con un `<script>` desde un CDN sin instalar nada. | Sí, siempre: necesita Node.js, npm y Angular CLI para crear y compilar el proyecto. |
| **Ventajas principales** | No depende de nadie, funciona en cualquier página y con cualquier otra tecnología, y el Shadow DOM aísla los estilos. | Comunidad enorme, muchas librerías complementarias y actualiza la vista automáticamente cuando cambian los datos. | Fácil de aprender, documentación muy clara y se puede adoptar de a poco en un proyecto existente. | Trae todo incluido (rutas, formularios, peticiones HTTP, pruebas) y obliga a todos los equipos a trabajar igual. |
| **Desventajas principales** | Hay que escribir más código a mano y no trae herramientas para manejar estados o datos complejos. | Como solo maneja la vista, hay que elegir e instalar otras librerías para rutas, formularios, etc. | Ecosistema y oferta laboral más pequeños que los de React. | Curva de aprendizaje alta (TypeScript, decoradores, módulos) y es demasiado pesado para proyectos pequeños. |

3. **¿Qué es Node.js, para qué se usa y qué relación tiene npm con React, Vue y Angular? Si una tienda en línea usa React y Node.js, ¿qué hace cada uno?**
Node.js es un entorno de ejecución de JavaScript basado en el motor V8 de Google que permite ejecutar código JS en el servidor. `npm` (Node Package Manager) es el gestor de paquetes que permite instalar, actualizar y gestionar las librerías y dependencias necesarias para trabajar con React, Vue o Angular. En una tienda en línea, **React** se encarga de renderizar la interfaz de usuario interactiva en el navegador del cliente (frontend), mientras que **Node.js** opera en el servidor (backend) gestionando las peticiones, lógica de negocio, conexiones a bases de datos y APIs.

4. **Elige la herramienta que usarías en cada caso y justifica en 3 a 5 líneas:**
- **a. Un botón de chat que varias empresas pegan en sus propias páginas:**
  *Herramienta:* **Web Components nativos**.
  *Justificación:* Al ser un widget independiente que se integra en webs de terceros construidas con cualquier tecnología (WordPress, React, HTML plano), los Web Components evitan conflictos de estilos gracias al Shadow DOM y no exigen instalar frameworks pesados.
- **b. Una aplicación web grande para un banco, con muchos equipos de desarrollo:**
  *Herramienta:* **Angular**.
  *Justificación:* Su arquitectura opinionada, uso estricto de TypeScript, inyección de dependencias y modularidad garantizan que múltiples equipos sigan los mismos patrones estandarizados, facilitando el mantenimiento y escalabilidad a gran escala.

---

## Fuentes de la Investigación

1. **MDN Web Docs** - *Web Components*.
   - Enlace: https://developer.mozilla.org/es/docs/Web/API/Web_components
   - Fecha de consulta: 17 de noviembre de 2026.
2. **web.dev** - *Custom Elements v1: Reusable Web Components*.
   - Enlace: https://web.dev/articles/custom-elements-v1
   - Fecha de consulta: 17 de noviembre de 2026.
3. **Can I use** - *Custom Elements (V1), Shadow DOM (V1) y HTML templates*.
   - Enlace: https://caniuse.com/custom-elementsv1
   - Fecha de consulta: 17 de noviembre de 2026.
4. **Node.js (Explicacion de terceros)** - *Que es NodeJS*.
   - Enlace: https://lenguajejs.com/nodejs/introduccion/que-es/
   - Fecha de consulta: 17 de noviembre de 2026.
5. **npm Docs (Explicación de terceros)** - *Que es NPM?*.
   - Enlace: https://lenguajejs.com/npm/introduccion/que-es/
   - Fecha de consulta: 17 de noviembre de 2026.
6. **React (Explicación de terceros)** - *Que es React?*.
   - Enlace: https://lenguajejs.com/react/introduccion/que-es-react/
   - Fecha de consulta: 17 de noviembre de 2026.
7. **Vue.js (documentación oficial)** - *Introduction*.
   - Enlace: https://vuejs.org/guide/introduction
   - Fecha de consulta: 17 de noviembre de 2026.
8. **Angular (documentación oficial)** - *What is Angular?*
   - Enlace: https://angular.dev/overview
   - Fecha de consulta: 17 de noviembre de 2026.
