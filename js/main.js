// NAJANAM - JavaScript Funktionen

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainMenu = document.querySelector('.main-menu');
    
    if (mobileToggle && mainMenu) {
        mobileToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // ARIA-Attribute aktualisieren
            const isExpanded = mainMenu.classList.contains('active');
            mobileToggle.setAttribute('aria-expanded', isExpanded);
            mobileToggle.setAttribute('aria-label', isExpanded ? 'Menü schliessen' : 'Menü öffnen');
            
            // Body-Scroll verhindern wenn Menü offen ist
            if (isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Menü schliessen beim Klick auf einen Link
        const menuLinks = mainMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.setAttribute('aria-label', 'Menü öffnen');
                document.body.style.overflow = '';
            });
        });
        
        // Menü schliessen bei Klick ausserhalb
        document.addEventListener('click', function(event) {
            if (!mobileToggle.contains(event.target) && !mainMenu.contains(event.target)) {
                mainMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                mobileToggle.setAttribute('aria-label', 'Menü öffnen');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Move hero content up when scrolling
            heroContent.style.transform = `translateY(${rate}px)`;
        });
    }

    // Deutsche Übersetzungen laden
    loadGermanTranslations();
    
    // Lazy Loading für Bilder implementieren
    initLazyLoading();
    
    // Hero-Bild mit Intersection Observer optimieren
    optimizeHeroImage();

    // Funktion zum Laden der deutschen Übersetzungen
    function loadGermanTranslations() {
        // Sprache im HTML-Element auf Deutsch setzen
        const htmlDoc = document.getElementById('html-doc');
        if (htmlDoc) {
            htmlDoc.lang = 'de';
        }
        
        // Deutsche Übersetzungsdatei laden
        fetch('translations/de.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Deutsche Übersetzungsdatei konnte nicht geladen werden. Status: ' + response.status);
                }
                return response.json();
            })
            .then(translations => {
                // Alle Elemente mit data-i18n Attribut übersetzen
                const elements = document.querySelectorAll('[data-i18n]');
                
                elements.forEach(element => {
                    const key = element.getAttribute('data-i18n');
                    
                    if (translations[key]) {
                        // Prüfen, ob es sich um ein Eingabefeld handelt
                        if (element.tagName === 'INPUT' && element.type === 'submit') {
                            element.value = translations[key];
                        } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' || element.tagName === 'BUTTON') {
                            element.placeholder = translations[key];
                        } else {
                            element.innerHTML = translations[key];
                        }
                    }
                });
                
                // Title übersetzen
                if (translations['page_title']) {
                    document.title = translations['page_title'];
                }
                
                // Meta-Description übersetzen
                const metaDescription = document.querySelector('meta[name="description"]');
                if (metaDescription && translations['meta_description']) {
                    metaDescription.setAttribute('content', translations['meta_description']);
                }
            })
            .catch(error => {
                console.error('Fehler beim Laden der deutschen Übersetzungen:', error);
            });
    }

    // Kontaktformular-Validierung
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            let errorMessages = {
                name_required: 'Bitte geben Sie Ihren Namen ein',
                email_invalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
                message_required: 'Bitte geben Sie eine Nachricht ein',
                privacy_required: 'Bitte stimmen Sie den Datenschutzbestimmungen zu',
                form_success: 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.'
            };
            
            // Deutsche Fehlermeldungen aus der Übersetzungsdatei laden
            fetch('translations/de.json')
                .then(response => response.json())
                .then(translations => {
                    if (translations.errors) {
                        errorMessages = {...errorMessages, ...translations.errors};
                    }
                    validateForm();
                })
                .catch(error => {
                    console.error('Fehler beim Laden der deutschen Übersetzungen:', error);
                    validateForm();
                });
            
            function validateForm() {
                // Name validieren
                const nameInput = document.getElementById('name');
                const nameError = document.getElementById('nameError');
                if (nameInput.value.trim() === '') {
                    nameError.textContent = errorMessages.name_required;
                    isValid = false;
                } else {
                    nameError.textContent = '';
                }
                
                // E-Mail validieren
                const emailInput = document.getElementById('email');
                const emailError = document.getElementById('emailError');
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailInput.value)) {
                    emailError.textContent = errorMessages.email_invalid;
                    isValid = false;
                } else {
                    emailError.textContent = '';
                }
                
                // Nachricht validieren
                const messageInput = document.getElementById('message');
                const messageError = document.getElementById('messageError');
                if (messageInput.value.trim() === '') {
                    messageError.textContent = errorMessages.message_required;
                    isValid = false;
                } else {
                    messageError.textContent = '';
                }
                
                // Datenschutz validieren
                const privacyInput = document.getElementById('privacy');
                const privacyError = document.getElementById('privacyError');
                if (!privacyInput.checked) {
                    privacyError.textContent = errorMessages.privacy_required;
                    isValid = false;
                } else {
                    privacyError.textContent = '';
                }
                
                // Wenn das Formular gültig ist, könnte hier ein AJAX-Request erfolgen
                if (isValid) {
                    const formSuccess = document.getElementById('formSuccess');
                    formSuccess.textContent = errorMessages.form_success;
                    contactForm.reset();
                    
                    // Nach 3 Sekunden die Erfolgsmeldung ausblenden
                    setTimeout(() => {
                        formSuccess.textContent = '';
                    }, 3000);
                }
            }
        });
    }
    
    // Lazy Loading Funktion
    function initLazyLoading() {
        // Native Lazy Loading für moderne Browser
        const images = document.querySelectorAll('img[data-src]');
        
        // Prüfen ob Intersection Observer unterstützt wird
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        // Bild laden
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        
                        // Srcset laden falls vorhanden
                        if (img.dataset.srcset) {
                            img.srcset = img.dataset.srcset;
                            img.removeAttribute('data-srcset');
                        }
                        
                        // Klasse für Fade-in Animation
                        img.classList.add('lazy-loaded');
                        
                        // Observer stoppen für dieses Bild
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px', // Bilder 50px vor Sichtbarkeit laden
                threshold: 0.01
            });
            
            // Alle Bilder mit data-src beobachten
            images.forEach(img => imageObserver.observe(img));
            
            // Auch für Background-Images
            const bgImages = document.querySelectorAll('[data-bg]');
            bgImages.forEach(element => {
                imageObserver.observe(element);
            });
        } else {
            // Fallback für ältere Browser - sofort laden
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                if (img.dataset.srcset) {
                    img.srcset = img.dataset.srcset;
                    img.removeAttribute('data-srcset');
                }
            });
        }
    }
    
    // Hero-Bild Optimierung mit Intersection Observer
    function optimizeHeroImage() {
        const hero = document.querySelector('.hero');
        
        if (!hero || !('IntersectionObserver' in window)) {
            return;
        }
        
        // Hero-Section beobachten für Performance-Optimierungen
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Hero ist sichtbar - Parallax aktivieren
                    hero.classList.add('hero-visible');
                } else {
                    // Hero nicht sichtbar - Parallax deaktivieren für Performance
                    hero.classList.remove('hero-visible');
                }
            });
        }, {
            threshold: 0.1
        });
        
        heroObserver.observe(hero);
    }
    
    // FAQ Accordion initialisieren
    initFAQAccordion();
    
    // FAQ Accordion Funktionalität
    function initFAQAccordion() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const answer = this.nextElementSibling;
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                
                // Schließe alle anderen offenen Antworten in derselben Kategorie
                const category = this.closest('.faq-category');
                const allQuestions = category.querySelectorAll('.faq-question');
                const allAnswers = category.querySelectorAll('.faq-answer');
                
                allQuestions.forEach(q => q.setAttribute('aria-expanded', 'false'));
                allAnswers.forEach(a => a.classList.remove('active'));
                
                // Toggle die aktuelle Antwort
                if (!isExpanded) {
                    this.setAttribute('aria-expanded', 'true');
                    answer.classList.add('active');
                }
            });
        });
    }
});
