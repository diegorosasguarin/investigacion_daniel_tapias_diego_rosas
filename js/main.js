// R2: Clase que extiende HTMLElement para el componente personalizado del menú de restaurante
class MenuPlato extends HTMLElement {
    constructor() {
        super();
        // R2: Creación del Shadow DOM en modo open
        this.attachShadow({ mode: 'open' });
    }

    // R3: Definición de atributos observados
    static get observedAttributes() {
        return ['nombre', 'precio', 'disponibilidad'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        // R1: Clonación del template propio dentro del Shadow DOM
        const template = document.getElementById('template-plato');
        if (!template) return;

        const clone = template.content.cloneNode(true);

        // R3: Lectura de atributos y asignación al template
        const nombre = this.getAttribute('nombre') || 'Plato sin nombre';
        const precioAttr = this.getAttribute('precio') || '0';
        const disponibilidad = this.getAttribute('disponibilidad') || 'Disponible';

        // Conversión y formato del precio a moneda
        const precioNumerico = Number(precioAttr);
        const precioFormateado = !isNaN(precioNumerico) 
            ? `$ ${precioNumerico.toLocaleString('es-CO')}` 
            : `$ ${precioAttr}`;

        // Asignación de datos a los elementos internos del template
        clone.querySelector('.nombre').textContent = nombre;
        clone.querySelector('.precio').textContent = precioFormateado;

        const badge = clone.querySelector('.badge');
        badge.textContent = disponibilidad;

        // Asignación de clase dinámica según disponibilidad
        if (disponibilidad.toLowerCase() === 'disponible') {
            badge.classList.add('disponible');
        } else {
            badge.classList.add('agotado');
        }

        // Limpiar shadowRoot y adjuntar el contenido clonado con su slot (R4)
        this.shadowRoot.replaceChildren(clone);
    }
}

// R2: Registro del Custom Element con nombre con guion medio
customElements.define('menu-plato', MenuPlato);
