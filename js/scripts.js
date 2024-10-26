
document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencias a los elementos del DOM
    const galeriaForm = document.getElementById('galeria-form');
    const totalDisplayGaleria = document.getElementById('total-galeria');
    const imagenProducto = document.getElementById('imagen-producto');
    const nombreProducto = document.getElementById('nombre-producto');
    const productoSeleccionadoDiv = document.getElementById('producto-seleccionado');
    const productoSelect = document.getElementById('producto');
    const presupuestoContainer = document.getElementById('presupuesto-container');
    const presupuestoFinal = document.getElementById('presupuesto-final');
    const resetearButton = document.getElementById('resetear-presupuesto');

    // Recuperar productos seleccionados del localStorage
    let productosSeleccionados = JSON.parse(localStorage.getItem('productosSeleccionados')) || [];
    let totalPresupuesto = productosSeleccionados.reduce((total, producto) => total + producto.precio, 0);
    
    // Mostrar total en la página de galería
    if (totalDisplayGaleria) {
        totalDisplayGaleria.textContent = `Total: $${totalPresupuesto}`;
    }

    // Mostrar producto seleccionado en la galería
    function mostrarProductoSeleccionado() {
        const precioProducto = parseFloat(productoSelect.options[productoSelect.selectedIndex]?.dataset.precio) || 0;
        const imagenSeleccionada = productoSelect.options[productoSelect.selectedIndex]?.dataset.imagen || '';
        const nombreSeleccionado = productoSelect.options[productoSelect.selectedIndex]?.text || '';

        totalDisplayGaleria.textContent = `Total: $${precioProducto}`;

        if (imagenSeleccionada) {
            imagenProducto.src = imagenSeleccionada;
            imagenProducto.alt = nombreSeleccionado;
            nombreProducto.textContent = nombreSeleccionado;
            productoSeleccionadoDiv.style.display = 'block'; // Mostrar el producto seleccionado
        } else {
            productoSeleccionadoDiv.style.display = 'none'; // Ocultar si no hay selección
        }
    }

    // Actualizar el precio y la imagen cuando se selecciona un producto en la galería
    if (productoSelect) {
        productoSelect.addEventListener('change', mostrarProductoSeleccionado);
    }

    // Al enviar el formulario de la galería
    if (galeriaForm) {
        galeriaForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const productoSeleccionado = productoSelect.value;
            const precioSeleccionado = parseFloat(productoSelect.options[productoSelect.selectedIndex]?.dataset.precio) || 0;
            const nombreSeleccionado = productoSelect.options[productoSelect.selectedIndex]?.text || '';

            if (!productoSeleccionado) {
                alert("Por favor, selecciona un producto.");
                return;
            }

            // Agregar producto al array
            productosSeleccionados.push({ nombre: nombreSeleccionado, precio: precioSeleccionado });
            totalPresupuesto += precioSeleccionado;

            // Guardar productos seleccionados en localStorage
            localStorage.setItem('productosSeleccionados', JSON.stringify(productosSeleccionados));

            // Confirmación de que el producto ha sido agregado
            alert(`Producto ${nombreSeleccionado} agregado al presupuesto.`);

            // Limpiar selección
            productoSelect.value = '';
            totalDisplayGaleria.textContent = 'Total: $0';
            productoSeleccionadoDiv.style.display = 'none';

            // Mostrar productos seleccionados en la página de presupuesto
            mostrarProductosPresupuesto();
        });
    }

    // Mostrar productos en la página de presupuesto
    function mostrarProductosPresupuesto() {
        if (!presupuestoContainer) return;

        presupuestoContainer.innerHTML = ''; // Limpiar contenedor

        if (productosSeleccionados.length === 0) {
            presupuestoFinal.textContent = 'Presupuesto Total: $0';
            presupuestoContainer.innerHTML = '<p>No hay productos en el presupuesto.</p>';
            return;
        }

        let total = 0;
        productosSeleccionados.forEach(producto => {
            const productoElement = document.createElement('div');
            productoElement.textContent = `${producto.nombre} - $${producto.precio}`;
            presupuestoContainer.appendChild(productoElement);
            total += producto.precio;
        });
        presupuestoFinal.textContent = `Presupuesto Total: $${total}`;
    }

    // Mostrar productos cuando se carga la página de presupuesto
    if (presupuestoContainer) {
        mostrarProductosPresupuesto();
    }

    // Botón de reseteo de presupuesto
    if (resetearButton) {
        resetearButton.addEventListener('click', () => {
            productosSeleccionados = [];
            totalPresupuesto = 0;
            localStorage.setItem('productosSeleccionados', JSON.stringify(productosSeleccionados));
            mostrarProductosPresupuesto();
            alert("Presupuesto y productos seleccionados han sido reseteados.");

            // Resetear la galería también
            if (totalDisplayGaleria) {
                totalDisplayGaleria.textContent = 'Total: $0';
            }
        });
    }
    const logo = document.querySelector('.logo');

    // Inicialmente ocultar el logo
    logo.style.opacity = '0';
    logo.style.transition = 'opacity 1s ease';

    // Función para alternar la visibilidad del logo
    function alternarLogo() {
        if (logo.style.opacity === '0') {
            logo.style.opacity = '1'; // Mostrar el logo
        } else {
            logo.style.opacity = '0'; // Ocultar el logo
        }
    }

    // Iniciar el intervalo para alternar el logo cada 1 segundo
    setInterval(alternarLogo, 1000);
    
});

document.addEventListener('DOMContentLoaded', () => {
    const productoSelect = document.getElementById('producto');
    const presupuestoContainer = document.getElementById('presupuesto-container');
    const presupuestoFinal = document.getElementById('presupuesto-final');
    const añadirProductoButton = document.getElementById('añadir-producto');
    const resetearButton = document.getElementById('resetear-presupuesto');
    const plazoInput = document.getElementById('plazo');

    let productosSeleccionados = JSON.parse(localStorage.getItem('productosSeleccionados')) || [];

    // Función para mostrar productos seleccionados en el presupuesto
    function mostrarProductosPresupuesto() {
        presupuestoContainer.innerHTML = ''; // Limpiar contenedor

        if (productosSeleccionados.length === 0) {
            presupuestoFinal.textContent = 'Presupuesto Total: $0';
            presupuestoContainer.innerHTML = '<p>No hay productos en el presupuesto.</p>';
            return;
        }

        let total = 0;
        productosSeleccionados.forEach(producto => {
            const productoElement = document.createElement('div');
            productoElement.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
            presupuestoContainer.appendChild(productoElement);
            total += producto.precio;
        });
        presupuestoFinal.textContent = `Presupuesto Total: $${total.toFixed(2)}`;
    }

    // Escuchar el botón "Añadir" para agregar el producto seleccionado
    añadirProductoButton.addEventListener('click', () => {
        const productoSeleccionado = productoSelect.value;
        const precioSeleccionado = parseFloat(productoSelect.options[productoSelect.selectedIndex]?.dataset.precio) || 0;
        const nombreSeleccionado = productoSelect.options[productoSelect.selectedIndex]?.text || '';

        if (!productoSeleccionado) {
            alert("Por favor, selecciona un producto.");
            return;
        }

        // Obtener el costo de los extras seleccionados
        const extrasSeleccionados = document.querySelectorAll('.extra:checked');
        let totalExtras = 0;
        extrasSeleccionados.forEach(extra => {
            totalExtras += parseFloat(extra.value);
        });

        // Obtener el plazo y calcular el costo adicional
        const plazo = parseInt(plazoInput.value) || 1; // Valor por defecto de 1 día
        const costoPorDia = 10; // Puedes ajustar este valor según tu lógica
        const costoPlazo = costoPorDia * plazo;

        const precioTotal = precioSeleccionado + totalExtras + costoPlazo;

        // Agregar el producto al array `productosSeleccionados`
        productosSeleccionados.push({ nombre: nombreSeleccionado, precio: precioTotal });
        localStorage.setItem('productosSeleccionados', JSON.stringify(productosSeleccionados));
        mostrarProductosPresupuesto();

        // Confirmación
        alert(`Producto ${nombreSeleccionado} agregado al presupuesto con extras por $${totalExtras} y un plazo de ${plazo} días por $${costoPlazo}.`);
    });

    // Botón de reseteo de presupuesto
    resetearButton.addEventListener('click', () => {
        productosSeleccionados = [];
        localStorage.removeItem('productosSeleccionados'); // Eliminar del localStorage
        mostrarProductosPresupuesto();
        alert("Presupuesto y productos seleccionados han sido reseteados.");
    });

    // Cargar los productos al iniciar la página
    mostrarProductosPresupuesto();
});
fetch('noticias.json')
    .then(response => response.json())
    .then(noticias => {
        const noticiasContainer = document.createElement('div'); // Contenedor para noticias
        noticias.forEach(noticia => {
            const noticiaDiv = document.createElement('div'); // Crear un div para la noticia
            noticiaDiv.classList.add('noticia'); // Añadir la clase para el estilo
            
            // Crear el contenido de la noticia
            const titulo = document.createElement('h3'); // Título
            titulo.textContent = noticia.titulo;
            const contenido = document.createElement('p'); // Contenido
            contenido.textContent = noticia.contenido;

            // Agregar título y contenido al div de la noticia
            noticiaDiv.appendChild(titulo);
            noticiaDiv.appendChild(contenido);

            // Crear el botón para ir a la Galería
            if (noticia.titulo === "Nuevos Instrumentos") { // Verificar si el título es el que deseas
                const botonGaleria = document.createElement('a'); // Crear un enlace
                botonGaleria.textContent = "Ir a la Galería"; // Texto del botón
                botonGaleria.href = "views/galeria.html"; // URL de la Galería
                botonGaleria.classList.add('boton-galeria'); // Añadir clase para estilo
                noticiaDiv.appendChild(botonGaleria); // Agregar el botón al div de la noticia
            }

            // Agregar el div de la noticia al contenedor de noticias
            noticiasContainer.appendChild(noticiaDiv);
        });

        // Asegúrate de seleccionar la sección de noticias correcta
        const seccionNoticias = document.querySelector('section:last-of-type'); // Selecciona la última sección (donde quieres las noticias)
        seccionNoticias.appendChild(noticiasContainer); // Agregar el contenedor de noticias al final
    })
    .catch(error => console.error('Error al cargar las noticias:', error));
    document.addEventListener('DOMContentLoaded', () => {
        // Array de imágenes con rutas relativas
      
        const galeriaContainer = document.getElementById('galeria-container');
    
        // Cargar imágenes en el contenedor
        imagenes.forEach(imagen => {
            const imgElement = document.createElement('img');
            imgElement.src = imagen; // Ruta de la imagen
            imgElement.alt = 'Imagen de galería'; // Texto alternativo
            imgElement.style.width = '100%'; // Para que las imágenes ocupen todo el contenedor
            imgElement.style.height = 'auto'; // Mantener la relación de aspecto
            galeriaContainer.appendChild(imgElement);
        });
        
    });
    
    // Verificar si estamos en la página de contacto usando el ID del mapa
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('map')) {
        // Coordenadas de la ubicación del negocio
        const businessLocation = [39.4699, -0.3763]; // Ubicación en Valencia

        // Inicializar el mapa
        const map = L.map('map').setView(businessLocation, 12); // 12 es el nivel de zoom

        // Capa del mapa
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        // Marcador de la ubicación del negocio
        L.marker(businessLocation).addTo(map)
            .bindPopup('Ubicación del Negocio')
            .openPopup();

        // Obtener la ubicación del visitante
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const userLocation = [position.coords.latitude, position.coords.longitude];

                // Marcador para la ubicación del visitante
                L.marker(userLocation).addTo(map)
                    .bindPopup('Tu Ubicación')
                    .openPopup();

                // Añadir un polígono que representa la ruta entre las dos ubicaciones
                const latlngs = [businessLocation, userLocation];
                const polyline = L.polyline(latlngs, { color: 'blue' }).addTo(map);
                
                // Centrar el mapa en la ubicación del usuario
                map.fitBounds(polyline.getBounds());
            }, () => {
                alert("No se pudo obtener la ubicación del visitante.");
            });
        } else {
            alert("Geolocalización no soportada por este navegador.");
        }
    }
});
