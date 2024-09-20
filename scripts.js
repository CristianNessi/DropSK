// Obtener elementos del DOM
const carritoEnlace = document.getElementById('carrito-enlace');
const carrito = document.getElementById('carrito');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const carritoContenido = document.querySelector('.carrito-contenido');
const contadorCarrito = document.getElementById('contador-carrito');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const btnPagar = document.getElementById('pagar');
const selectPago = document.getElementById('select-pago');

let productosEnCarrito = [];
let total = 0;

// Función para abrir el carrito con animación
carritoEnlace.addEventListener('click', (e) => {
    e.preventDefault();
    carrito.classList.add('mostrar'); // Mostrar el carrito con animación
});

// Función para cerrar el carrito con animación
cerrarCarrito.addEventListener('click', () => {
    carrito.classList.remove('mostrar'); // Ocultar el carrito con animación
});

// Función para agregar productos al carrito
document.querySelectorAll('.btn-agregar').forEach(boton => {
    boton.addEventListener('click', (e) => {
        const producto = e.target.closest('.producto');
        const nombre = producto.getAttribute('data-nombre');
        const precio = parseFloat(producto.getAttribute('data-precio'));

        productosEnCarrito.push({ nombre, precio });
        total += precio;

        actualizarCarrito();
    });
});

// Función para actualizar el carrito
function actualizarCarrito() {
    // Actualizar contador de productos
    contadorCarrito.innerText = productosEnCarrito.length;

    // Actualizar lista de productos en el carrito
    listaCarrito.innerHTML = '';
    productosEnCarrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="nombre-producto">${producto.nombre}</span> 
                        <span class="precio-producto">$${producto.precio.toFixed(2)}</span>
                        <button class="btn-eliminar" data-index="${index}">Eliminar</button>`;
        listaCarrito.appendChild(li);
    });

    // Actualizar total
    totalCarrito.innerText = total.toFixed(2);

    // Guardar en localStorage
    localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
    localStorage.setItem('totalCarrito', total);
}

// Cargar datos del carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const productosGuardados = JSON.parse(localStorage.getItem('productosEnCarrito'));
    if (productosGuardados) {
        productosEnCarrito = productosGuardados;
        total = parseFloat(localStorage.getItem('totalCarrito'));
        actualizarCarrito();
    }

    // Manejo del botón de pagar
    btnPagar.addEventListener('click', () => {
        const metodoPago = selectPago.value;

        // Verificar el valor del método de pago seleccionado
        console.log('Método de pago seleccionado:', metodoPago);

        if (metodoPago) {
            localStorage.setItem('metodoPagoSeleccionado', metodoPago);
            window.location.href = 'pago.html'; // Redirigir a la página de pago
        } else {
            alert('Por favor, selecciona un método de pago.');
        }
    });
});

// Función para eliminar productos del carrito
listaCarrito.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-eliminar')) {
        const index = e.target.getAttribute('data-index');
        total -= productosEnCarrito[index].precio;
        productosEnCarrito.splice(index, 1);

        actualizarCarrito();
    }
});
