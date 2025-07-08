// Chargement des scripts React depuis CDN
document.addEventListener('DOMContentLoaded', function() {
    // Ajouter les scripts React
    const reactScript = document.createElement('script');
    reactScript.src = 'https://unpkg.com/react@18/umd/react.production.min.js';
    reactScript.crossOrigin = '';
    
    const reactDOMScript = document.createElement('script');
    reactDOMScript.src = 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js';
    reactDOMScript.crossOrigin = '';
    
    const babelScript = document.createElement('script');
    babelScript.src = 'https://unpkg.com/@babel/standalone/babel.min.js';
    
    document.head.appendChild(reactScript);
    document.head.appendChild(reactDOMScript);
    document.head.appendChild(babelScript);
    
    // Charger les polices modernes
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700&family=Roboto:wght@300;400;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
    
    // Appliquer des polices modernes
    document.documentElement.style.setProperty('--modern-font', "'Orbitron', sans-serif");
    document.documentElement.style.setProperty('--body-font', "'Roboto', sans-serif");
    
    // Appliquer la police Orbitron aux titres
    const titles = document.querySelectorAll('h1, h2, h3, .logo a');
    titles.forEach(title => {
        title.style.fontFamily = 'var(--modern-font)';
    });
    
    // Créer l'effet de particules
    createParticles();
    
    // Ajouter une barre de chargement futuriste
    createLoadingBar();
    
    // Ajouter des effets de texte futuriste
    applyFuturisticTextEffects();
    
    // Ajouter des effets de survol aux cartes
    enhanceCards();
    
    // Ajouter des animations au défilement
    initScrollAnimations();
    
    // Initialiser les composants React
    initReactComponents();
});

// Création de particules pour l'arrière-plan
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    document.body.appendChild(particlesContainer);
    
    // Créer 50 particules
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position aléatoire
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        
        // Taille aléatoire
        const size = Math.random() * 3 + 1;
        
        // Vitesse aléatoire
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        
        // Appliquer les styles
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Création d'une barre de chargement futuriste
function createLoadingBar() {
    const loadingBar = document.createElement('div');
    loadingBar.className = 'loading-bar';
    document.body.appendChild(loadingBar);
    
    // Masquer la barre après 2 secondes
    setTimeout(() => {
        loadingBar.style.opacity = '0';
        setTimeout(() => {
            loadingBar.remove();
        }, 1000);
    }, 2000);
}

// Application d'effets de texte futuriste
function applyFuturisticTextEffects() {
    // Effet de texte qui change de couleur au survol
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        // Sélectionner des mots aléatoires pour l'effet
        const words = p.textContent.split(' ');
        if (words.length > 5) {
            const randomIndex = Math.floor(Math.random() * (words.length - 3)) + 2;
            const word = words[randomIndex];
            
            // Remplacer le mot par une version avec l'effet
            words[randomIndex] = `<span class="futuristic-text" data-text="${word}">${word}</span>`;
            p.innerHTML = words.join(' ');
        }
    });
    
    // Effet de glitch sur certains titres
    const headings = document.querySelectorAll('h1, h2');
    headings.forEach((heading, index) => {
        if (index % 2 === 0) {
            heading.classList.add('glitch-text');
        }
    });
}

// Amélioration des cartes avec des effets
function enhanceCards() {
    const cards = document.querySelectorAll('.glow-card, .dynamic-card, .project-card, .stage-item');
    
    cards.forEach(card => {
        // Ajouter un fond de grille futuriste
        const gridBackground = document.createElement('div');
        gridBackground.className = 'grid-background';
        card.appendChild(gridBackground);
        
        // Ajouter un effet de survol
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculer l'angle de rotation basé sur la position de la souris
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            // Appliquer la rotation
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        // Réinitialiser la rotation lorsque la souris quitte la carte
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Initialisation des animations au défilement
function initScrollAnimations() {
    // Créer un observateur d'intersection
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observer tous les éléments qui doivent être animés
    const elements = document.querySelectorAll('.section, .hero-content, .glow-card, .dynamic-card, .project-card');
    elements.forEach(element => {
        // Ajouter une classe pour l'animation
        element.classList.add('animate-element');
        observer.observe(element);
    });
    
    // Ajouter des styles pour les animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Initialisation des composants React
function initReactComponents() {
    // Attendre que React soit chargé
    setTimeout(() => {
        if (window.React && window.ReactDOM && window.Babel) {
            // Créer un conteneur pour les composants React
            const reactContainer = document.createElement('div');
            reactContainer.id = 'react-components';
            document.body.appendChild(reactContainer);
            
            // Créer un script pour les composants React
            const reactComponentsScript = document.createElement('script');
            reactComponentsScript.type = 'text/babel';
            reactComponentsScript.innerHTML = `
                // Composant de notification futuriste
                const FuturisticNotification = () => {
                    const [visible, setVisible] = React.useState(false);
                    const [message, setMessage] = React.useState('');
                    
                    React.useEffect(() => {
                        setTimeout(() => {
                            setMessage('Bienvenue sur mon portfolio futuriste');
                            setVisible(true);
                            
                            setTimeout(() => {
                                setVisible(false);
                            }, 5000);
                        }, 3000);
                    }, []);
                    
                    return (
                        <div className={\`futuristic-notification \${visible ? 'visible' : ''}\`}>
                            <div className="notification-content">
                                <div className="notification-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                                        <path d="M12 16v-4"></path>
                                        <path d="M12 8h.01"></path>
                                    </svg>
                                </div>
                                <div className="notification-message">{message}</div>
                            </div>
                        </div>
                    );
                };
                
                // Composant de bouton futuriste
                const FuturisticButton = ({ text, link }) => {
                    const [hovered, setHovered] = React.useState(false);
                    
                    return (
                        <a 
                            href={link} 
                            className="futuristic-button"
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}
                        >
                            <span className="button-text">{text}</span>
                            <span className={\`button-glow \${hovered ? 'active' : ''}\`}></span>
                        </a>
                    );
                };
                
                // Composant de compteur de compétences
                const SkillCounter = ({ skill, value }) => {
                    const [count, setCount] = React.useState(0);
                    
                    React.useEffect(() => {
                        const interval = setInterval(() => {
                            setCount(prevCount => {
                                if (prevCount < value) {
                                    return prevCount + 1;
                                }
                                clearInterval(interval);
                                return prevCount;
                            });
                        }, 30);
                        
                        return () => clearInterval(interval);
                    }, [value]);
                    
                    return (
                        <div className="skill-counter">
                            <div className="skill-name">{skill}</div>
                            <div className="skill-value">{count}%</div>
                        </div>
                    );
                };
                
                // Rendu des composants React
                ReactDOM.render(
                    <React.Fragment>
                        <FuturisticNotification />
                        <div className="react-buttons-container">
                            <FuturisticButton text="Voir mes projets" link="projects.html" />
                            <FuturisticButton text="Me contacter" link="contact.html" />
                        </div>
                        <div className="skill-counters-container">
                            <SkillCounter skill="HTML/CSS" value={90} />
                            <SkillCounter skill="JavaScript" value={85} />
                            <SkillCounter skill="React" value={80} />
                            <SkillCounter skill="Node.js" value={75} />
                        </div>
                    </React.Fragment>,
                    document.getElementById('react-components')
                );
                
                // Styles pour les composants React
                const style = document.createElement('style');
                style.textContent = \`
                    /* Notification futuriste */
                    .futuristic-notification {
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: rgba(26, 26, 26, 0.8);
                        backdrop-filter: blur(10px);
                        border: 1px solid rgba(57, 255, 20, 0.3);
                        border-radius: 8px;
                        padding: 15px;
                        z-index: 1000;
                        transform: translateX(150%);
                        transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);
                        box-shadow: 0 0 20px rgba(57, 255, 20, 0.3);
                    }
                    
                    .futuristic-notification.visible {
                        transform: translateX(0);
                    }
                    
                    .notification-content {
                        display: flex;
                        align-items: center;
                    }
                    
                    .notification-icon {
                        width: 24px;
                        height: 24px;
                        margin-right: 15px;
                        color: var(--neon-green);
                    }
                    
                    .notification-message {
                        color: var(--text-light);
                        font-family: var(--modern-font);
                    }
                    
                    /* Bouton futuriste */
                    .react-buttons-container {
                        display: flex;
                        justify-content: center;
                        gap: 20px;
                        margin: 30px 0;
                    }
                    
                    .futuristic-button {
                        position: relative;
                        display: inline-block;
                        padding: 12px 30px;
                        background: rgba(26, 26, 26, 0.8);
                        color: var(--text-light);
                        text-decoration: none;
                        font-family: var(--modern-font);
                        font-weight: 500;
                        letter-spacing: 1px;
                        border: 1px solid rgba(57, 255, 20, 0.3);
                        border-radius: 4px;
                        overflow: hidden;
                        transition: all 0.3s ease;
                    }
                    
                    .futuristic-button:hover {
                        background: rgba(57, 255, 20, 0.1);
                        color: var(--neon-green);
                        transform: translateY(-3px);
                        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
                    }
                    
                    .button-glow {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(57, 255, 20, 0.2), transparent);
                        transform: translateX(-100%);
                    }
                    
                    .button-glow.active {
                        animation: buttonGlow 1.5s infinite;
                    }
                    
                    @keyframes buttonGlow {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                    
                    /* Compteur de compétences */
                    .skill-counters-container {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 20px;
                        margin: 40px 0;
                    }
                    
                    .skill-counter {
                        background: rgba(26, 26, 26, 0.8);
                        border: 1px solid rgba(57, 255, 20, 0.3);
                        border-radius: 8px;
                        padding: 15px;
                        width: 150px;
                        text-align: center;
                        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                        transition: transform 0.3s ease;
                    }
                    
                    .skill-counter:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(57, 255, 20, 0.2);
                    }
                    
                    .skill-name {
                        color: #fff;
                        font-family: var(--modern-font);
                        margin-bottom: 10px;
                    }
                    
                    .skill-value {
                        color: #3498db;
                        font-family: var(--modern-font);
                        font-size: 2rem;
                        font-weight: 700;
                        text-shadow: 0 0 10px rgba(57, 255, 20, 0.5);
                    }
                \`;
                document.head.appendChild(style);
            `;
            
            document.body.appendChild(reactComponentsScript);
        }
    }, 1000);
}

// Fonction pour ajouter des effets de survol aux liens de navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links li a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = 'var(--neon-green)';
            this.style.textShadow = '0 0 10px rgba(57, 255, 20, 0.5)';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.color = '';
                this.style.textShadow = '';
            }
        });
    });
});

// Fonction pour ajouter un effet de défilement fluide avec un indicateur de progression
window.addEventListener('DOMContentLoaded', function() {
    // Créer un indicateur de progression de défilement
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    // Mettre à jour l'indicateur lors du défilement
    window.addEventListener('scroll', function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        
        scrollIndicator.style.width = scrollPercentage + '%';
    });
    
    // Ajouter des styles pour l'indicateur
    const style = document.createElement('style');
    style.textContent = `
        .scroll-indicator {
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: var(--neon-green);
            z-index: 9999;
            width: 0;
            box-shadow: 0 0 10px rgba(57, 255, 20, 0.5);
        }
    `;
    document.head.appendChild(style);
});
