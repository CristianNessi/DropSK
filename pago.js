document.addEventListener('DOMContentLoaded', () => {
    const productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];
    const totalCarrito = parseFloat(localStorage.getItem('totalCarrito')) || 0;
    const metodoPagoSeleccionado = (localStorage.getItem('metodoPagoSeleccionado') || '').toLowerCase();

    // Mostrar el método de pago seleccionado para depuración
    console.log('Método de pago recuperado:', metodoPagoSeleccionado);

    const metodoPagoInfo = document.getElementById('metodo-pago-info');
    const formularioPago = document.getElementById('formulario-pago');
    const comprobante = document.getElementById('comprobante');

    // Mostrar total a pagar
    metodoPagoInfo.innerHTML = `<p>Total a pagar: $${totalCarrito.toFixed(2)}</p>
                                <p>Método de pago seleccionado: ${metodoPagoSeleccionado}</p>`;

    formularioPago.style.display = 'block';

    // Mostrar el formulario correspondiente al método de pago
    switch (metodoPagoSeleccionado) {
        case 'wise':
            formularioPago.innerHTML = `
                <h2>Pago con Wise</h2>
                <p>Por favor, realiza el pago a las siguientes credenciales:</p>
                <p><strong>IBAN:</strong> ES1234567890123456789012</p>
                <p><strong>Nombre del Banco:</strong> Banco Ejemplo</p>
                <p><strong>Beneficiario:</strong> Nombre Beneficiario</p>
                <p>Adjunta una captura de pantalla del comprobante de pago.</p>
                <label for="captura-wisepay" class="btn archivo-boton">Cargar Comprobante</label>
                <input type="file" id="captura-wisepay" style="display: none;" />
                <button id="confirmar-pago" class="btn">Pagar</button>
            `;
            break;
        case 'paypal':
            formularioPago.innerHTML = `
                <h2>Pago con PayPal</h2>
                <p>Por favor, realiza el pago a la siguiente dirección:</p>
                <p><strong>Dirección de PayPal:</strong> ejemplo@paypal.com</p>
                <p>Adjunta una captura de pantalla del comprobante de pago.</p>
                <label for="captura-wisepay" class="btn archivo-boton">Cargar Comprobante</label>
                <input type="file" id="captura-wisepay" style="display: none;" />
                <button id="confirmar-pago" class="btn">Pagar</button>
            `;
            break;
        case 'transferencia':
            formularioPago.innerHTML = `
                <h2>Pago por Transferencia Bancaria</h2>
                <p>Por favor, realiza el pago a las siguientes credenciales:</p>
                <p><strong>IBAN:</strong> ES1234567890123456789012</p>
                <p><strong>Nombre del Banco:</strong> Banco Ejemplo</p>
                <p><strong>Beneficiario:</strong> Nombre Beneficiario</p>
                <p>Adjunta una captura de pantalla del comprobante de pago.</p>
                <label for="captura-wisepay" class="btn archivo-boton">Cargar Comprobante</label>
                <input type="file" id="captura-wisepay" style="display: none;" />
                <button id="confirmar-pago" class="btn">Pagar</button>
            `;
            break;
        case 'tarjeta':
            formularioPago.innerHTML = `
                <h2>Pago con Tarjeta de Crédito/Débito</h2>
                <form id="form-tarjeta">
                    <label for="numero-tarjeta">Número de Tarjeta:</label>
                    <input type="text" id="numero-tarjeta" required />
                    <label for="fecha-expiracion">Fecha de Expiración:</label>
                    <input type="text" id="fecha-expiracion" required />
                    <label for="cvv">CVV:</label>
                    <input type="text" id="cvv" required />
                    <button type="submit" class="btn">Pagar</button>
                </form>
            `;
            break;
        default:
            formularioPago.innerHTML = `<p>Por favor, selecciona un método de pago válido.</p>`;
            break;
    }

    // Manejar el evento del botón de pagar
    document.getElementById('confirmar-pago')?.addEventListener('click', () => {
        comprobante.style.display = 'block';
        const comprobanteDetalles = document.getElementById('comprobante-detalles');
        comprobanteDetalles.innerHTML = `<p>Total a pagar: $${totalCarrito.toFixed(2)}</p>
                                          <p>Método de pago seleccionado: ${metodoPagoSeleccionado}</p>`;

        // Limpiar localStorage después del pago
        localStorage.removeItem('productosEnCarrito');
        localStorage.removeItem('totalCarrito');
        localStorage.removeItem('metodoPagoSeleccionado');

        // Redirigir a la página de agradecimiento
        window.location.href = 'gracias.html';
    });
});
