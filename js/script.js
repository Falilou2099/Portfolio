// Smooth scrolling pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation de la barre de navigation
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Gestion du menu mobile
const menuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Création de l'overlay pour le menu mobile
const overlay = document.createElement('div');
overlay.classList.add('menu-overlay');
document.body.appendChild(overlay);

// Fonction pour ouvrir/fermer le menu mobile
function toggleMobileMenu() {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active');
    body.classList.toggle('menu-open');
}

// Événement pour le bouton hamburger
menuToggle.addEventListener('click', toggleMobileMenu);

// Fermer le menu quand on clique sur l'overlay
overlay.addEventListener('click', toggleMobileMenu);

// Fermer le menu quand on clique sur un lien (sauf les dropdowns)
document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active') && window.innerWidth <= 768) {
            toggleMobileMenu();
        }
    });
});

// Gestion des sous-menus
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
        // Sur mobile uniquement, empêcher la navigation et gérer les dropdowns
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const parent = this.parentElement;
            const dropdownMenu = parent.querySelector('.dropdown-menu');
            
            // Fermer tous les autres sous-menus
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                if (dropdown !== parent && dropdown.classList.contains('active')) {
                    dropdown.classList.remove('active');
                }
            });
            
            // Ouvrir/fermer le sous-menu actuel
            parent.classList.toggle('active');
        }
    });
});

// Réinitialiser les styles des dropdowns lors du redimensionnement
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        // Réinitialiser les styles des dropdowns en mode desktop
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.style.display = '';
        });
        document.querySelectorAll('.dropdown-toggle i').forEach(icon => {
            icon.style.transform = '';
        });
        
        // Réinitialiser le menu mobile s'il est ouvert
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
        }
    }
});

// Gestion du formulaire de contact
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupération des valeurs du formulaire
    const formData = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        message: this.querySelector('textarea').value
    };
    
    // Ici, vous pouvez ajouter le code pour envoyer les données à un serveur
    console.log('Données du formulaire :', formData);
    
    // Réinitialisation du formulaire
    this.reset();
    alert('Message envoyé avec succès !');
});

// Animation des barres de progression des compétences
function animateSkills() {
    const skills = document.querySelectorAll('.skill-item');
    
    skills.forEach(skill => {
        const progress = skill.querySelector('.progress');
        const width = progress.style.width;
        
        progress.style.width = '0';
        
        setTimeout(() => {
            progress.style.width = width;
        }, 300);
    });
}

// Déclencher l'animation des compétences lors du scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target);
        }
    });
});

observer.observe(document.querySelector('#competences'));



    (function() {
        // Replace with your actual EmailJS User ID
        emailjs.init("tourefaliloumbacke@gmail.com");
    })();

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const statusDiv = document.getElementById('form-status');
        statusDiv.textContent = 'Envoi en cours...';
        statusDiv.style.color = 'blue';

        // Replace with your actual EmailJS service and template IDs
        emailjs.sendForm('tourefaliloumbacke@gmail.com', 'template_s9yy9ey', this)
            .then(function() {
                statusDiv.textContent = 'Message envoyé avec succès !';
                statusDiv.style.color = 'green';
                document.getElementById('contact-form').reset();
            }, function(error) {
                statusDiv.textContent = 'Erreur lors de l\'envoi du message. Veuillez réessayer.';
                statusDiv.style.color = 'red';
                console.error('EmailJS Error:', error);
            });
    });
