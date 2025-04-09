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
