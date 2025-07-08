// Script pour ajouter des effets 3D et animations avancées
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter un effet de profondeur 3D aux cartes
    add3DEffectToCards();
    
    // Ajouter un effet de parallaxe au défilement
    addParallaxEffect();
    
    // Ajouter des animations de texte avancées
    addTextAnimations();
    
    // Ajouter un effet de suivi de souris
    addMouseFollowEffect();
});

// Effet de profondeur 3D aux cartes
function add3DEffectToCards() {
    const cards = document.querySelectorAll('.glow-card, .dynamic-card, .project-card, .stage-item, .veille-article');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // Position X de la souris dans la carte
            const y = e.clientY - rect.top;  // Position Y de la souris dans la carte
            
            // Calculer les angles de rotation en fonction de la position de la souris
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * 5; // Limiter la rotation à 5 degrés
            const rotateX = ((centerY - y) / centerY) * 5;
            
            // Appliquer les transformations 3D
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            
            // Effet de lumière dynamique
            const shine = `radial-gradient(circle at ${x}px ${y}px, rgba(57, 255, 20, 0.2) 0%, transparent 80%)`;
            this.style.backgroundImage = shine;
        });
        
        // Réinitialiser les transformations lorsque la souris quitte la carte
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            this.style.backgroundImage = 'none';
        });
    });
}

// Effet de parallaxe au défilement
function addParallaxEffect() {
    // Sélectionner les éléments qui auront un effet de parallaxe
    const parallaxElements = document.querySelectorAll('.hero, .section h2, .grid-background');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            // Calculer le décalage en fonction de la position de défilement
            const offset = scrollTop * 0.4;
            
            // Appliquer différents effets selon le type d'élément
            if (element.classList.contains('hero')) {
                element.style.backgroundPositionY = `${offset}px`;
            } else if (element.classList.contains('grid-background')) {
                element.style.transform = `translateY(${offset * 0.2}px)`;
            } else {
                element.style.transform = `translateY(${offset * 0.1}px)`;
            }
        });
    });
}

// Animations de texte avancées
function addTextAnimations() {
    // Sélectionner tous les titres h1 et h2
    const titles = document.querySelectorAll('h1, h2');
    
    titles.forEach(title => {
        if (!title.classList.contains('glitch-text')) {
            // Diviser le texte en lettres individuelles
            const text = title.textContent;
            let newHTML = '';
            
            for (let i = 0; i < text.length; i++) {
                if (text[i] === ' ') {
                    newHTML += ' ';
                } else {
                    newHTML += `<span class="animated-letter" style="animation-delay: ${i * 0.05}s">${text[i]}</span>`;
                }
            }
            
            title.innerHTML = newHTML;
        }
    });
    
    // Ajouter des styles pour l'animation des lettres
    const style = document.createElement('style');
    style.textContent = `
        .animated-letter {
            display: inline-block;
            transform: translateY(20px);
            opacity: 0;
            animation: fadeInUp 0.5s forwards;
        }
        
        @keyframes fadeInUp {
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Observer les titres pour déclencher l'animation lors du défilement
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const letters = entry.target.querySelectorAll('.animated-letter');
                letters.forEach((letter, index) => {
                    letter.style.animationDelay = `${index * 0.05}s`;
                    letter.style.animationPlayState = 'running';
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    titles.forEach(title => {
        if (!title.classList.contains('glitch-text')) {
            observer.observe(title);
        }
    });
}

// Effet de suivi de souris
function addMouseFollowEffect() {
    // Créer un élément qui suivra le curseur
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    // Créer un élément pour l'effet de traînée
    const cursorTrail = document.createElement('div');
    cursorTrail.className = 'cursor-trail';
    document.body.appendChild(cursorTrail);
    
    // Ajouter des styles pour le curseur personnalisé
    const style = document.createElement('style');
    style.textContent = `
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: rgba(57, 255, 20, 0.3);
            border: 1px solid var(--neon-green);
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
            transition: width 0.2s, height 0.2s, background-color 0.2s;
            mix-blend-mode: screen;
            box-shadow: 0 0 10px rgba(57, 255, 20, 0.5);
        }
        
        .cursor-trail {
            position: fixed;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: rgba(57, 255, 20, 0.5);
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9998;
            transition: width 0.1s, height 0.1s, opacity 0.5s;
            mix-blend-mode: screen;
        }
        
        a:hover ~ .custom-cursor,
        button:hover ~ .custom-cursor {
            width: 40px;
            height: 40px;
            background-color: rgba(57, 255, 20, 0.1);
            mix-blend-mode: overlay;
        }
    `;
    document.head.appendChild(style);
    
    // Mettre à jour la position du curseur personnalisé
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Effet de traînée avec délai
        setTimeout(() => {
            cursorTrail.style.left = e.clientX + 'px';
            cursorTrail.style.top = e.clientY + 'px';
        }, 50);
    });
    
    // Effet spécial sur les éléments interactifs
    const interactiveElements = document.querySelectorAll('a, button, .cta-button, .project-card, .glow-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = 'rgba(57, 255, 20, 0.1)';
            cursor.style.mixBlendMode = 'overlay';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'rgba(57, 255, 20, 0.3)';
            cursor.style.mixBlendMode = 'screen';
        });
    });
    
    // Masquer le curseur par défaut
    document.body.style.cursor = 'none';
    
    // Mais le réactiver sur les champs de formulaire pour une meilleure expérience utilisateur
    const formElements = document.querySelectorAll('input, textarea, select');
    formElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            document.body.style.cursor = 'auto';
            cursor.style.opacity = '0';
            cursorTrail.style.opacity = '0';
        });
        
        element.addEventListener('mouseleave', function() {
            document.body.style.cursor = 'none';
            cursor.style.opacity = '1';
            cursorTrail.style.opacity = '1';
        });
    });
}

// Ajouter un effet de vague au survol des boutons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cta-button, .futuristic-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            // Créer l'élément de vague
            const wave = document.createElement('div');
            wave.className = 'button-wave';
            this.appendChild(wave);
            
            // Positionner la vague à l'endroit où la souris est entrée
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            wave.style.left = x + 'px';
            wave.style.top = y + 'px';
            
            // Supprimer la vague après l'animation
            setTimeout(() => {
                wave.remove();
            }, 1000);
        });
    });
    
    // Ajouter des styles pour l'effet de vague
    const style = document.createElement('style');
    style.textContent = `
        .button-wave {
            position: absolute;
            width: 10px;
            height: 10px;
            background: rgba(57, 255, 20, 0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            animation: buttonWave 1s linear;
        }
        
        @keyframes buttonWave {
            0% {
                width: 0;
                height: 0;
                opacity: 0.5;
            }
            100% {
                width: 300px;
                height: 300px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// Ajouter un effet de défilement fluide
document.addEventListener('DOMContentLoaded', function() {
    // Styles pour le défilement fluide
    const style = document.createElement('style');
    style.textContent = `
        html {
            scroll-behavior: smooth;
        }
        
        body {
            overflow-x: hidden;
        }
        
        .smooth-scroll-section {
            will-change: transform;
        }
    `;
    document.head.appendChild(style);
    
    // Ajouter la classe aux sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('smooth-scroll-section');
    });
});

// Ajouter un effet de matrice en arrière-plan (subtil)
document.addEventListener('DOMContentLoaded', function() {
    // Créer un canvas pour l'effet de matrice
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-bg';
    document.body.appendChild(canvas);
    
    // Styles pour le canvas
    const style = document.createElement('style');
    style.textContent = `
        .matrix-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
            opacity: 0.05;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
    
    // Configuration du canvas
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Caractères pour l'effet matrice
    const chars = '01';
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    // Position Y de chaque colonne
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    // Dessiner l'effet matrice
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#39ff14';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    // Animation de l'effet matrice
    setInterval(drawMatrix, 80);
    
    // Redimensionner le canvas lors du redimensionnement de la fenêtre
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Réinitialiser les colonnes
        const columns = canvas.width / fontSize;
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
    });
});
