document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tarjetas
    initCards();
    
    // Crear corazones flotantes
    createFloatingHearts(30);
    
    // Configurar botón de celebración
    document.getElementById('celebrateBtn').addEventListener('click', startCelebration);
    
    // Configurar scroll reveal
    initScrollReveal();
    
    // Configurar el mensaje final con animación
    setTimeout(() => {
        const finalMessage = document.getElementById('finalMessage');
        finalMessage.classList.add('animate__fadeInUp');
        
        // Quitar la clase de animación después de que termine para evitar bucles
        setTimeout(() => {
            finalMessage.classList.remove('animate__fadeInUp');
        }, 1000); // 1 segundo es la duración de la animación fadeInUp
    }, 1000);
});

// Función para inicializar las tarjetas
function initCards() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Añadir animación al cargar
        setTimeout(() => {
            card.classList.add('animate__animated', 'animate__fadeIn');
        }, 200 * parseInt(card.getAttribute('data-index')));
        
        // Configurar flip de la tarjeta
        card.addEventListener('click', function() {
            // Si ya está volteada, no hacer nada (el botón se encargará)
            if (card.classList.contains('flipped')) return;
            
            // Voltear tarjeta
            card.classList.add('flipped');
        });
        
        // Configurar botón de cerrar
        const closeBtn = card.querySelector('.close-btn');
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevenir que el click se propague a la tarjeta
            card.classList.remove('flipped');
        });
    });
}

// Función para crear corazones flotantes en el fondo
function createFloatingHearts(count) {
    const container = document.querySelector('.floating-hearts');
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.className = 'floating-heart';
        
        // Estilos para el corazón
        heart.style.position = 'absolute';
        heart.style.fontSize = `${Math.random() * 14 + 10}px`;
        heart.style.opacity = Math.random() * 0.5 + 0.1;
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        
        // Animación
        const duration = Math.random() * 30 + 20;
        heart.style.animation = `float ${duration}s infinite ease-in-out`;
        heart.style.animationDelay = `${Math.random() * 10}s`;
        
        container.appendChild(heart);
    }
}

// Función para iniciar celebración
function startCelebration() {
    const overlay = document.getElementById('celebrationOverlay');
    overlay.classList.add('active');
    
    // Crear fuegos artificiales
    createFireworks();
    
    // Crear explosión de corazones
    createHeartsBurst();
    
    // Configurar cierre de celebración al hacer clic
    overlay.addEventListener('click', function() {
        this.classList.remove('active');
    });
}

// Crear fuegos artificiales
function createFireworks() {
    const fireworksContainer = document.querySelector('.fireworks');
    
    // Limpiar fuegos artificiales anteriores
    fireworksContainer.innerHTML = '';
    
    // Crear múltiples fuegos artificiales
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * 80 + 10; // Posición X (10% - 90%)
            const y = Math.random() * 80 + 10; // Posición Y (10% - 90%)
            createSingleFirework(x, y, fireworksContainer);
        }, i * 800);
    }
}

// Crear un fuego artificial individual
function createSingleFirework(x, y, container) {
    const colors = ['#ff6b8b', '#ffb5c2', '#ffd3da', '#ffffff', '#f9d5e5'];
    
    // Crear el punto de explosión
    const firework = document.createElement('div');
    firework.style.position = 'absolute';
    firework.style.left = `${x}%`;
    firework.style.top = `${y}%`;
    
    // Crear partículas
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        
        // Estilos de partícula
        particle.style.position = 'absolute';
        particle.style.width = '5px';
        particle.style.height = '5px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Animación
        const angle = Math.random() * Math.PI * 2; // Ángulo aleatorio
        const distance = Math.random() * 100 + 50; // Distancia
        const duration = Math.random() * 1 + 0.5; // Duración
        
        // GSAP para animación más suave
        gsap.fromTo(particle, 
            { 
                x: 0, 
                y: 0, 
                opacity: 1,
                scale: Math.random() * 0.5 + 0.5
            },
            { 
                x: Math.cos(angle) * distance, 
                y: Math.sin(angle) * distance, 
                opacity: 0,
                scale: 0,
                duration: duration,
                ease: "power2.out"
            }
        );
        
        firework.appendChild(particle);
    }
    
    container.appendChild(firework);
    
    // Eliminar después de la animación
    setTimeout(() => {
        if (container.contains(firework)) {
            container.removeChild(firework);
        }
    }, 2000);
}

// Crear explosión de corazones
function createHeartsBurst() {
    const container = document.querySelector('.hearts-burst');
    
    // Limpiar corazones anteriores
    container.innerHTML = '';
    
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓'];
    
    // Crear corazones
    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.position = 'absolute';
        heart.style.fontSize = `${Math.random() * 20 + 15}px`;
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.zIndex = '10';
        heart.style.opacity = '0';
        
        // Animación con GSAP
        gsap.to(heart, {
            x: (Math.random() - 0.5) * window.innerWidth * 0.7,
            y: (Math.random() - 0.5) * window.innerHeight * 0.7,
            opacity: 1,
            duration: 0.3,
            ease: "power1.out",
            onComplete: function() {
                gsap.to(heart, {
                    y: '+=' + (Math.random() * 100 + 50),
                    opacity: 0,
                    duration: 1,
                    delay: Math.random() * 1.5,
                    ease: "power1.in"
                });
            }
        });
        
        container.appendChild(heart);
    }
    
    // Limpiar después de la animación
    setTimeout(() => {
        container.innerHTML = '';
    }, 4000);
}

// Función para scroll reveal
function initScrollReveal() {
    const cards = document.querySelectorAll('.card');
    
    // Observer para detectar cuando las tarjetas están en vista
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = entry.target.getAttribute('data-index');
                setTimeout(() => {
                    entry.target.classList.add('animate__animated', 'animate__fadeIn');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observar todas las tarjetas
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Función de sonido (simulada)
function playSound(type) {
    // Esta función simula la reproducción de sonidos
    // En una implementación real, usarías el Web Audio API o elementos de audio HTML5
    console.log(`Sonido reproducido: ${type}`);
}