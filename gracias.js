// script.js

document.addEventListener("DOMContentLoaded", function () {
    const confettiContainer = document.querySelector('.confetti');

    // Crear 100 piezas de confeti
    for (let i = 0; i < 100; i++) { // Puedes ajustar el número de piezas según tu preferencia
        const confettiPiece = document.createElement('div'); // Crear un nuevo elemento div
        confettiPiece.classList.add('confetti-piece'); // Agregar la clase 'confetti-piece'
        confettiPiece.style.left = `${Math.random() * 100}vw`; // Posicionar aleatoriamente horizontalmente
        confettiPiece.style.animationDuration = `${Math.random() * 3 + 2}s`; // Duración de animación aleatoria entre 2 y 5 segundos
        confettiContainer.appendChild(confettiPiece); // Agregar el confeti al contenedor
    }
});
